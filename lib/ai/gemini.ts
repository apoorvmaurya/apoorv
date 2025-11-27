import { GoogleGenAI } from '@google/genai';
import { APIError } from '@/lib/errors';

// Initialize Gemini AI with new SDK
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GOOGLE_GEMINI_API_KEY is not set. AI chatbot will not function.');
}

const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

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
 * Generate chat response using new Google GenAI SDK
 */
export async function generateChatResponse(
    userMessage: string,
    resumeContext: string,
    conversationHistory: { role: string; parts: { text: string }[] }[] = []
): Promise<{ message: string; action?: { type: string; payload?: any } }> {
    try {
        if (!genAI) {
            throw new APIError('Gemini API is not configured. Please set GOOGLE_GEMINI_API_KEY.', 500);
        }

        const systemPrompt = buildSystemPrompt(resumeContext);

        // Build conversation history in new format
        const messages = [
            {
                role: 'user',
                content: systemPrompt,
            },
            {
                role: 'model',
                content: "Hello! I'm here to help you learn about Apoorv Maurya's professional background and experience. Feel free to ask me anything!",
            },
            // Add conversation history
            ...conversationHistory.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                content: msg.parts[0]?.text || '',
            })),
            // Add current user message
            {
                role: 'user',
                content: userMessage,
            },
        ];

        // Generate response using new SDK
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: messages.map(msg => msg.content).join('\n\n'),
            config: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 1024,
            },
        });

        const text = response.text || '';

        // Parse action from response
        return parseAction(text);
    } catch (error: any) {
        console.error('Gemini API error:', error);

        if (error.message?.includes('API key')) {
            throw new APIError('AI service is not configured properly.', 500);
        }

        if (error.message?.includes('quota')) {
            throw new APIError('AI service quota exceeded. Please try again later.', 429);
        }

        throw new APIError('Failed to generate response. Please try again.', 500);
    }
}
