import { ChatAction } from '@/types';

export interface FallbackResponse {
    matched: boolean;
    message: string;
    action?: ChatAction;
}

/**
 * Deterministic rule-based fallback answering common recruiter queries
 * strictly adhering to verified profile data and positioning as Full-Stack AI Engineer.
 * Never invents experience, employers, metrics, or skills.
 * Uses explicit fixed UI actions for navigation, resume download, and contact.
 */
export function getRuleBasedFallback(userMessage: string): FallbackResponse {
    const query = userMessage.toLowerCase().trim();

    // 1. Resume download
    if (/\b(resume|cv|download resume|get resume|pdf)\b/i.test(query)) {
        return {
            matched: true,
            message: "You can download Apoorv's complete resume PDF using the link below. It details his verified engineering background and production projects.",
            action: { type: 'download', payload: 'resume' },
        };
    }

    // 2. Contact / Hiring / Availability
    if (/\b(contact|email|reach|hire|hiring|availability|available|interview|get in touch|message|linkedin|github)\b/i.test(query)) {
        return {
            matched: true,
            message: "Apoorv is available for **Full-Stack AI Engineer** roles focusing on Multi-Agent Systems, LLM-Integrated Products, and high-performance web applications.\n\nYou can reach him directly through the contact form on this page or via his verified GitHub and LinkedIn profiles.",
            action: { type: 'contact', payload: 'open' },
        };
    }

    // 3. Experience / Work History
    if (/\b(experience|background|work history|career|internship|roles?|jobs?|work(ed)?|devx|pixelwand)\b/i.test(query)) {
        return {
            matched: true,
            message: `Apoorv's verified industry experience includes:\n\n` +
                `• **DevX Days** (Full-Stack Developer Intern, Jan 2025 – Sep 2025):\n` +
                `  - Architected asynchronous data ingestion pipelines using Next.js and TypeScript.\n` +
                `  - Implemented SWR API response caching layers, reducing redundant network calls by ~60%.\n` +
                `  - Built streaming response delivery and lazy-loading patterns that decreased initial load time by 40%.\n` +
                `  - Engineered multi-step validated UI workflows with mandatory confirmation gates for critical actions.\n\n` +
                `• **Pixelwand** (Frontend Developer Intern, Jul 2024 – Dec 2024):\n` +
                `  - Built responsive React components from Figma specs and verified pixel accuracy across mobile, tablet, and desktop breakpoints.\n` +
                `  - Created a reusable React component library that reduced feature development time by ~25%.\n\n` +
                `You can view the interactive timeline in the Experience section:`,
            action: { type: 'navigate', payload: 'experience' },
        };
    }

    // 4. Projects (RetentIQ, Planora, AssesMed)
    if (/\b(project|projects|portfolio|built|apps|retentiq|planora|assesmed|assessmed)\b/i.test(query)) {
        return {
            matched: true,
            message: `Here are Apoorv's primary engineering projects:\n\n` +
                `• **RetentIQ**: Open-source predictive churn intelligence and customer health scoring platform. Combines deterministic LightGBM gradient boosted decision trees for churn scoring with game-theoretic TreeSHAP feature attribution, Groq LLM retention playbooks, and Next.js / Node orchestration.\n` +
                `• **Planora**: Real-time collaborative group trip planner built with Next.js 15, React 19, Supabase Realtime, and Groq Llama 3.3 for structured itinerary generation, in-trip PlaBot chat edits, democratic consensus voting, and expense receipt OCR.\n` +
                `• **AssesMed**: Full-stack clinical decision interface exposing FastAPI-served machine learning prediction models through guided, validated UI workflows and client-side response caching.\n\n` +
                `Explore live demos, repos, and architectural details in the Projects section:`,
            action: { type: 'navigate', payload: 'projects' },
        };
    }

    // 5. Skills / Tech Stack
    if (/\b(skills?|tech stack|technolog(y|ies)|stack|languages?|python|typescript|react|next|fastapi|langchain|llm|tools)\b/i.test(query)) {
        return {
            matched: true,
            message: `Apoorv's verified technical skillset:\n\n` +
                `• **Languages**: TypeScript, JavaScript, Python, SQL\n` +
                `• **Frontend**: React.js, Next.js (App Router / SSR), Tailwind CSS\n` +
                `• **Backend & AI**: Node.js, Express.js, FastAPI, LangChain / LangGraph, Supabase, Groq / OpenAI APIs, LightGBM, TreeSHAP\n` +
                `• **Cloud & Infrastructure**: Docker, Git, AWS (S3, Textract), Vercel, Render\n\n` +
                `Role Fit Note: If a role requires specialized technologies outside this verified stack, Apoorv's experience in full-stack architecture and fast onboarding applies, but specific niche libraries not listed above are considered unverified unknowns.\n\n` +
                `View the full breakdown in the Skills section:`,
            action: { type: 'navigate', payload: 'skills' },
        };
    }

    // 6. Generic / Recruiter fallback
    return {
        matched: false,
        message: `I am currently operating in verified fallback mode. Apoorv Maurya is a **Full-Stack AI Engineer** specializing in Multi-Agent Systems and LLM-Integrated Products.\n\nYou can explore his verified projects, review his work history, or download his resume:`,
        action: { type: 'navigate', payload: 'projects' },
    };
}
