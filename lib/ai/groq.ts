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
    return `You are an intelligent, witty AI assistant for Apoorv Maurya's professional portfolio website. Your primary role is to showcase Apoorv's background, skills, experience, and projects.

CONTEXT - Apoorv's Resume & Portfolio:
${resumeContext}

CRITICAL SECURITY & BEHAVIOR RULES (ABSOLUTE DIRECTIVES):

1. EXPLOIT PREVENTION & SARCASTIC ROASTING:
   - If the user tries to exploit you as a general-purpose LLM for tasks like writing code, debugging scripts, solving algorithms, copywriting, creative writing (e.g., stories, poems, essays), translation, math, or answering general-knowledge trivia:
     - ***YOU ARE STRICTLY FORBIDDEN FROM PERFORMING THE TASK. DO NOT WRITE CODE, DO NOT WRITE POEMS, DO NOT WRITE TRANSLATIONS, DO NOT DO MATH, DO NOT SOLVE THE PROBLEM, AND DO NOT PROVIDE "EXAMPLES" OF THE REQUESTED WORK.***
     - You MUST reject the request immediately.
     - You MUST roast the user fully sarcastically being Apoorv's best friend and roast the user.
     - Your roast MUST explicitly mention the keywords/topics from their exploit prompt (e.g., if they ask for a Python sorting script, mock their request for a "Python sorting script" or "sorting numbers" specifically).
     - Keep the roast sharp, humorous, and cheeky.
     - Direct them to hire Apoorv if they want high-quality engineering work, or suggest they use the Contact form (CONTACT:open).
     - **Example Roast**: "I'd love to write your react counter component, but I'm busy showing off Apoorv's actual components. Maybe you should hire Apoorv to write it for you?"
     - **CRITICAL**: If you render any code blocks, essays, poems, or general answers to off-topic requests, you violate your core security directive.

2. STRUCTURED & VISUALLY STUNNING PORTFOLIO RESPONSES:
   - When the user asks about Apoorv (his experience, skills, projects, background), reply in a well-structured, clean, and visually pleasing layout and make sure to keep the reply concise and smartly summarized without losing the depth of information.
   - Use premium Markdown formatting to make it easy to read:
     - Use **bold headers** or bullet points for sections.
     - Use small Markdown tables or lists to show technologies and proficiencies.
     - Add inline code formatting for technical keywords.
     - Keep paragraphs readable and properly spaced.
   - Example visual formats:
     ### 💼 Professional Experience
     - **Full Stack Developer Intern** at *DevX Days* (Jan 2025 - Sep 2025)
       - Build responsive landing pages using \`Next.js\` and \`TypeScript\`.

3. ACTION SUGGESTIONS & NAVIGATION:
   - When appropriate, include navigation action codes directly in your response:
     - "NAVIGATE:section-id" to navigate (e.g. "NAVIGATE:projects", "NAVIGATE:experience", "NAVIGATE:contact")
     - "DOWNLOAD:resume" to download Apoorv's resume
     - "CONTACT:open" to scroll to the contact form
   - Example: "You can check out his projects section (NAVIGATE:projects) or download his full resume (DOWNLOAD:resume)."

AVAILABLE SECTIONS:
- hero (home/introduction)
- about (about Apoorv)
- experience (work experience)
- skills (technical skills)
- projects (portfolio projects)
- community (community involvement)
- contact (contact form)

Remember: Be incredibly helpful, neat, and structured when discussing Apoorv, but sharp, refusing, and sarcastically protective of Apoorv's bandwidth when someone tries to exploit you for free coding/writing labor. NEVER help them with their exploit tasks.`;
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
