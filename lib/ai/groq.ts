import { APIError } from '@/lib/errors';

// Initialize Groq config
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.warn('GROQ_API_KEY is not set. AI chatbot will not function.');
}

/**
 * Build system prompt with resume context
 */
export function buildSystemPrompt(resumeContext: string): string {
    return `You are an AI assistant for Apoorv Maurya's professional portfolio website. Your role is to help visitors learn about Apoorv's background, skills, experience, and projects in a friendly and professional manner.

CONTEXT - Apoorv's Resume:
${resumeContext}

INSTRUCTIONS:
1. Answer questions about Apoorv's professional background, skills, experience, and projects based on the resume context provided.
2. Be conversational, friendly, and professional.
3. If asked about something not in the resume, politely say you don't have that information but suggest they contact Apoorv directly.
4. Keep responses concise and relevant (2-3 paragraphs maximum).
5. When appropriate, suggest actions like:
   - "NAVIGATE:section-id" to navigate to a specific section (e.g., "NAVIGATE:projects", "NAVIGATE:experience", "NAVIGATE:contact")
   - "DOWNLOAD:resume" to download the resume
   - "CONTACT:open" to open the contact form
6. Always be helpful and encourage visitors to explore the portfolio or reach out to Apoorv.

AVAILABLE SECTIONS:
- hero (home/introduction)
- about (about Apoorv)
- experience (work experience)
- skills (technical skills)
- projects (portfolio projects)
- community (community involvement)
- contact (contact form)

Remember: You represent Apoorv professionally. Be helpful, accurate, and engaging!`;
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

    let message = response;
    let action: { type: string; payload?: any } | undefined;

    // Check for navigate action
    const navigateMatch = response.match(actionPatterns.navigate);
    if (navigateMatch) {
        action = { type: 'navigate', payload: navigateMatch[1] };
        message = message.replace(actionPatterns.navigate, '').trim();
    }

    // Check for download action
    const downloadMatch = response.match(actionPatterns.download);
    if (downloadMatch) {
        action = { type: 'download', payload: downloadMatch[1] };
        message = message.replace(actionPatterns.download, '').trim();
    }

    // Check for contact action
    const contactMatch = response.match(actionPatterns.contact);
    if (contactMatch) {
        action = { type: 'contact', payload: contactMatch[1] };
        message = message.replace(actionPatterns.contact, '').trim();
    }

    return { message, action };
}

/**
 * Generate chat response using Groq LLaMA API
 */
export async function generateChatResponse(
    userMessage: string,
    resumeContext: string,
    conversationHistory: { role: string; parts: { text: string }[] }[] = []
): Promise<{ message: string; action?: { type: string; payload?: any } }> {
    try {
        if (!apiKey) {
            throw new APIError('Groq API is not configured. Please set GROQ_API_KEY.', 500);
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
            // Add conversation history
            ...conversationHistory.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.parts[0]?.text || '',
            })),
            // Add current user message
            {
                role: 'user',
                content: userMessage,
            },
        ];

        // Call Groq API via standard HTTPS fetch
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 0.95,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Groq API response error:', errorData);
            throw new Error(errorData?.error?.message || `Groq API returned status ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';

        // Parse action from response
        return parseAction(text);
    } catch (error: any) {
        console.error('Groq API error:', error);

        if (error.message?.includes('API key') || error.message?.includes('unauthorized')) {
            throw new APIError('AI service authentication failed. Please configure GROQ_API_KEY correctly.', 500);
        }

        if (error.message?.includes('rate limit') || error.message?.includes('429')) {
            throw new APIError('Groq service rate limit exceeded. Please try again in a moment.', 429);
        }

        throw new APIError('Failed to generate response. Please try again.', 500);
    }
}
