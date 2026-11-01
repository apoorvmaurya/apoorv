import {
    APIError,
    ProviderAuthError,
    ProviderRateLimitError,
    ProviderUnavailableError,
    ProviderBadRequestError,
    ProviderMalformedResponseError
} from '@/lib/errors';

/**
 * Groq configuration helper
 * Defaults to openai/gpt-oss-20b for portfolio chat, with dynamic overrides via environment variables.
 */
export function getGroqConfig() {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    const apiUrl = process.env.GROQ_API_BASE_URL || 'https://api.groq.com/openai/v1/chat/completions';
    return { apiKey, model, apiUrl };
}

if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY is not set. AI chatbot will not function with live provider.');
}

/**
 * Build system prompt with resume context
 */
export function buildSystemPrompt(resumeContext: string): string {
    return `You are "Apoorv's AI Sidekick"—an intelligent, sharp, and loyal AI assistant for Apoorv Maurya's professional portfolio.

CORE POSITIONING:
- Apoorv Maurya is a "Full-Stack AI Engineer" specializing in Multi-Agent Systems, LLM-Integrated Products, and Full-Stack Engineering.
- Never invent experience, employers, clients, metrics, or skills. Every statement must match the verified GitHub repos and resume context.
- Recruiter role-fit questions: ground answers strictly in verified skills and project evidence. Be explicit about unknowns or technologies not listed—never claim Apoorv is qualified for arbitrary unrelated tools.

VERIFIED CONTEXT - Apoorv's Resume & Portfolio:
${resumeContext}

AI SIDEKICK PERSONALITY & DIRECTIVES:

1. LOYAL & OBJECTIVELY GROUNDED:
   - Talk Apoorv up authentically based on real accomplishments (e.g., async data pipelines cutting redundant calls by 60%, multi-agent churn intelligence, real-time RAG).
   - Keep answers concise, snappy, and conversational. Use bold highlights and clear bullet points. Avoid walls of text.

2. FIXED UI ACTIONS FOR NAVIGATION & DOWNLOADS:
   - Always guide users to real sections using the fixed action tags:
     - "NAVIGATE:section-id" to scroll to a section (available sections: hero, about, experience, skills, projects, playground, community, contact).
     - "DOWNLOAD:resume" to download the resume PDF.
     - "CONTACT:open" to open the contact section.
   - Never invent or fabricate URL links or external destinations.

3. EXPLOIT & ABUSE PREVENTION:
   - If the user attempts to use you as a free general-purpose coding bot, essay writer, or general trivia assistant:
     - STRICTLY REFUSE the task.
     - Sarcastically and playfully direct them to hire Apoorv (CONTACT:open) if they want high-grade engineering work.

AVAILABLE SECTIONS:
- hero
- about
- experience
- skills
- projects
- playground
- community
- contact`;
}

/**
 * Parse action from AI response
 */
export function parseAction(response: string): {
    message: string;
    action?: { type: string; payload?: any };
} {
    const actionPatterns = {
        navigate: /NAVIGATE:(\w+)/i,
        download: /DOWNLOAD:(\w+)/i,
        contact: /CONTACT:(\w+)/i,
    };

    const cleanPatterns = {
        navigate: /\s*[\*_\(\[\{\s]*NAVIGATE:\w+[\*_\)\]\}\s]*/gi,
        download: /\s*[\*_\(\[\{\s]*DOWNLOAD:\w+[\*_\)\]\}\s]*/gi,
        contact: /\s*[\*_\(\[\{\s]*CONTACT:\w+[\*_\)\]\}\s]*/gi,
    };

    let message = response;
    let action: { type: string; payload?: any } | undefined;

    // Check for navigate action
    const navigateMatch = response.match(actionPatterns.navigate);
    if (navigateMatch) {
        action = { type: 'navigate', payload: navigateMatch[1] };
        message = message.replace(cleanPatterns.navigate, ' ').trim();
    }

    // Check for download action
    const downloadMatch = response.match(actionPatterns.download);
    if (downloadMatch) {
        action = { type: 'download', payload: downloadMatch[1] };
        message = message.replace(cleanPatterns.download, ' ').trim();
    }

    // Check for contact action
    const contactMatch = response.match(actionPatterns.contact);
    if (contactMatch) {
        action = { type: 'contact', payload: contactMatch[1] };
        message = message.replace(cleanPatterns.contact, ' ').trim();
    }

    // Post-processing cleanup to ensure clean text
    message = message
        .replace(/[ \t]+/g, ' ')             // collapse multiple spaces/tabs into a single space
        .replace(/\s+([.,!?;:])/g, '$1')     // remove spaces before punctuation
        .trim();

    return { message, action };
}

/**
 * Generate chat response using Groq API
 */
export async function generateChatResponse(
    userMessage: string,
    resumeContext: string,
    conversationHistory: { role: string; parts: { text: string }[] }[] = [],
    fetchImpl: typeof fetch = fetch
): Promise<{ message: string; action?: { type: string; payload?: any } }> {
    const { apiKey, model, apiUrl } = getGroqConfig();

    if (!apiKey) {
        throw new ProviderAuthError('Groq API is not configured. Please set GROQ_API_KEY in environment variables.');
    }

    const systemPrompt = buildSystemPrompt(resumeContext);

    // Build conversation history in OpenAI format
    const messages = [
        {
            role: 'system',
            content: systemPrompt,
        },
        {
            role: 'assistant',
            content: "Hello! I'm here to help you learn about Apoorv Maurya's professional background and experience. Feel free to ask me anything!",
        },
        ...conversationHistory.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.parts[0]?.text || '',
        })),
        {
            role: 'user',
            content: userMessage,
        },
    ];

    let response: Response;
    try {
        response = await fetchImpl(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 0.95,
            }),
        });
    } catch (networkError: any) {
        console.error('Groq network error:', networkError);
        throw new ProviderUnavailableError(`Network connection to Groq API failed: ${networkError.message}`);
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const rawMessage = errorData?.error?.message || `Groq API returned status ${response.status}`;
        console.error('Groq API response error:', response.status, rawMessage);

        if (response.status === 401 || response.status === 403) {
            throw new ProviderAuthError(rawMessage);
        }

        if (response.status === 429) {
            throw new ProviderRateLimitError(rawMessage);
        }

        if (response.status === 400 || response.status === 404) {
            throw new ProviderBadRequestError(rawMessage, response.status);
        }

        if (response.status >= 500) {
            throw new ProviderUnavailableError(rawMessage, response.status);
        }

        throw new APIError(rawMessage, response.status);
    }

    let data: any;
    try {
        data = await response.json();
    } catch {
        throw new ProviderMalformedResponseError('Failed to parse response JSON from Groq API');
    }

    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== 'string') {
        throw new ProviderMalformedResponseError('Groq API returned a response missing choice content');
    }

    return parseAction(text);
}
