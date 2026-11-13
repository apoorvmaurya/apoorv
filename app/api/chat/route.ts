import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse, getGroqConfig } from '@/lib/ai/groq';
import { getResumeContext } from '@/lib/ai/resume-context';
import { getRuleBasedFallback } from '@/lib/ai/fallback';
import { ValidationError, getUserFriendlyMessage, logError } from '@/lib/errors';
import { projects, skillCategories, communityActivities } from '@/lib/data/portfolio';

// In-memory sliding window rate limiter
interface RateLimitEntry {
    count: number;
    resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (rateLimitMap.size > 1000) {
        for (const [key, value] of rateLimitMap.entries()) {
            if (now > value.resetTime) {
                rateLimitMap.delete(key);
            }
        }
    }

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    entry.count++;
    return false;
}

/**
 * POST /api/chat
 * Handle chat messages and generate AI responses with rule-based fallback
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, history } = body;

        // Check rate limit by client IP (skip rate limit during strict automated CI tests)
        const url = new URL(req.url);
        const isStrict = url.searchParams.get('strict') === 'true' || req.headers.get('x-test-strict') === 'true';
        const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || '127.0.0.1';

        if (!isStrict && isRateLimited(clientIp)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please wait a minute before sending another message.',
                },
                { status: 429 }
            );
        }

        // Validate input
        if (!message || typeof message !== 'string') {
            throw new ValidationError('Message is required and must be a string');
        }

        if (message.trim().length === 0) {
            throw new ValidationError('Message cannot be empty');
        }

        if (message.length > 1000) {
            throw new ValidationError('Message is too long (max 1000 characters)');
        }

        // Get resume context
        const resumeContext = await getResumeContext();

        // Get additional portfolio context to ensure full alignment between site & resume
        const portfolioContextText = `
ADDITIONAL PORTFOLIO DATA (ON THE WEBSITE):
Projects on Site:
${projects.map(p => `- ${p.title} (${p.featured ? 'Featured' : 'Non-featured'}): ${p.description}. Tech: ${p.technologies.join(', ')}`).join('\n')}

Skill Categories on Site:
${skillCategories.map(c => `- ${c.category}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

Community & Achievements on Site:
${communityActivities.map(a => `- ${a.title}: ${a.description} (${a.date})`).join('\n')}
`;

        const combinedContext = `${resumeContext.text}\n\n${portfolioContextText}`;

        // Format conversation history for Groq
        const formattedHistory =
            history?.map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })) || [];

        // Attempt provider generation
        try {
            const response = await generateChatResponse(
                message,
                combinedContext,
                formattedHistory
            );

            return NextResponse.json({
                success: true,
                data: {
                    message: response.message,
                    action: response.action,
                    source: 'provider',
                },
            });
        } catch (llmError: any) {
            // In strict mode (e.g. CI failure fixture tests), rethrow so error maps to exact failure status
            if (isStrict) {
                throw llmError;
            }

            console.warn('Groq provider error encountered. Activating rule-based fallback:', llmError.message);
            const fallback = getRuleBasedFallback(message);

            return NextResponse.json({
                success: true,
                data: {
                    message: fallback.message,
                    action: fallback.action,
                    source: 'fallback',
                },
            });
        }
    } catch (error: any) {
        logError(error, 'Chat API');

        const statusCode = error.statusCode || 500;
        const message = getUserFriendlyMessage(error);

        return NextResponse.json(
            {
                success: false,
                error: message,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            },
            { status: statusCode }
        );
    }
}

/**
 * GET /api/chat
 * Get chat configuration and status
 */
export async function GET() {
    try {
        const { apiKey, model } = getGroqConfig();

        return NextResponse.json({
            success: true,
            data: {
                configured: !!apiKey,
                model,
                features: ['context-aware', 'action-detection', 'resume-trained', 'rule-based-fallback'],
            },
        });
    } catch (error) {
        console.error('Chat config error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to get chat configuration',
            },
            { status: 500 }
        );
    }
}
