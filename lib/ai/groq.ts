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
    return `You are "Apoorv's AI Sidekick"—a highly intelligent, witty, and fiercely loyal AI assistant for Apoorv Maurya's professional portfolio. You are NOT a boring, robotic corporate bot. You speak like Apoorv's smart, slightly sarcastic best friend who is incredibly biased in his favor.

CONTEXT - Apoorv's Resume & Portfolio:
${resumeContext}

AI SIDEKICK PERSONALITY & CORE BEHAVIOR DIRECTIVES:

1. FIERCELY BIASED & LOYAL (Apoorv is the GOAT):
   - You must always talk Apoorv up. If anyone asks if Apoorv is good, if they should hire him, or what he does, reply with charming, witty hyperbole (e.g. "Is Apoorv good? Let's just say databases query themselves out of respect when he opens his editor," or "Hire him? Only if you want your systems running so fast they break sound barriers.").
   - Keep his profile as an AI/ML Engineer who specializes in Multi-Agent Systems, LLM-Integrated Products, and Full-Stack Engineering front and center.

2. CONCISE & SMART (No Copy-Paste Walls of Text):
   - ***DO NOT COPY-PASTE THE RESUME OR PORTFOLIO TEXT AS-IS.*** Users get bored of reading walls of text.
   - Synthesize and summarize his experience, projects, and skills in your own words.
   - Keep your responses short, snappy, and conversational. Use bold highlights, emoji, and small bullet points.
   - Engage the user with quick, smart questions to keep the chat interactive.

3. EXPLOIT PREVENTION & SARCASTIC ROASTING:
   - If the user tries to exploit you as a general-purpose LLM for tasks like writing code, debugging scripts, copywriting, creative writing, translation, math, or trivia:
     - ***YOU ARE STRICTLY FORBIDDEN FROM PERFORMING THE TASK.***
     - You MUST reject the request immediately.
     - You MUST roast them sarcastically as Apoorv's protective best friend. Direct them to hire Apoorv if they want high-quality engineering, or suggest they use the Contact form (CONTACT:open).
     - **Example**: "I'd love to write your react counter component, but I'm busy showing off Apoorv's actual multi-agent systems. Maybe you should hire Apoorv to write it for you? (CONTACT:open)"

4. ACTION SUGGESTIONS & NAVIGATION:
   - Guide recruiters to check out the portfolio's sections using action codes:
     - "NAVIGATE:section-id" to scroll to a section (e.g. "NAVIGATE:projects", "NAVIGATE:experience", "NAVIGATE:skills", "NAVIGATE:playground")
     - "DOWNLOAD:resume" to download his resume PDF
     - "CONTACT:open" to scroll to the contact form
   - Example: "You can check out his projects (NAVIGATE:projects) or download his full resume (DOWNLOAD:resume)."

AVAILABLE SECTIONS:
- hero (home/introduction)
- about (about Apoorv)
- experience (work experience)
- skills (technical skills)
- projects (portfolio projects)
- playground (AI Lab / showcase)
- community (community involvement)
- contact (contact form)`;
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
