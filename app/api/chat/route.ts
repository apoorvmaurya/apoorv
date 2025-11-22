import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/ai/gemini';
import { getResumeContext } from '@/lib/ai/resume-context';
import { ValidationError, getUserFriendlyMessage, logError } from '@/lib/errors';

/**
 * POST /api/chat
 * Handle chat messages and generate AI responses
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, history } = body;

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

        // Format conversation history for Gemini
        const formattedHistory =
            history?.map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })) || [];

        // Generate response
        const response = await generateChatResponse(
            message,
            resumeContext.text,
            formattedHistory
        );

        return NextResponse.json({
            success: true,
            data: {
                message: response.message,
                action: response.action,
            },
        });
    } catch (error: any) {
        logError(error, 'Chat API');

        const statusCode = error.statusCode || 500;
        const message = getUserFriendlyMessage(error);

        return NextResponse.json(
            {
                success: false,
                error: message,
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
        const isConfigured = !!process.env.GOOGLE_GEMINI_API_KEY;

        return NextResponse.json({
            success: true,
            data: {
                configured: isConfigured,
                model: 'gemini-1.5-flash',
                features: ['context-aware', 'action-detection', 'resume-trained'],
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
