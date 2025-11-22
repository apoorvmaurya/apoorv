import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { APIError } from '@/lib/errors';

// Initialize Gemini AI
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GOOGLE_GEMINI_API_KEY is not set. AI chatbot will not function.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Get Gemini model instance
 */
export function getGeminiModel() {
    if (!genAI) {
        throw new APIError('Gemini API is not configured. Please set GOOGLE_GEMINI_API_KEY.', 500);
    }

    return genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
        },
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ],
    });
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
 * Generate chat response
 */
export async function generateChatResponse(
    userMessage: string,
    resumeContext: string,
    conversationHistory: { role: string; parts: { text: string }[] }[] = []
): Promise<{ message: string; action?: { type: string; payload?: any } }> {
    try {
        const model = getGeminiModel();
        const systemPrompt = buildSystemPrompt(resumeContext);

        // Start chat with history
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: 'model',
                    parts: [
                        {
                            text: "Hello! I'm here to help you learn about Apoorv Maurya's professional background and experience. Feel free to ask me anything!",
                        },
                    ],
                },
                ...conversationHistory,
            ],
        });

        // Send message and get response
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const text = response.text();

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
