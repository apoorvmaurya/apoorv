import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { ResumeContext } from '@/types';

// Cache for resume context
let cachedResumeContext: ResumeContext | null = null;

/**
 * Extract text from Resume PDF
 */
export async function extractResumeText(): Promise<string> {
    try {
        const resumePath = path.join(process.cwd(), 'Resume.pdf');

        // Check if file exists
        if (!fs.existsSync(resumePath)) {
            console.error('Resume.pdf not found at:', resumePath);
            return getFallbackResumeContext();
        }

        // Read PDF file
        const dataBuffer = fs.readFileSync(resumePath);

        // Parse PDF
        const data = await pdf(dataBuffer);

        // Extract and clean text
        let text = data.text;

        // Clean up text (remove excessive whitespace, etc.)
        text = text
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\n\s*\n/g, '\n') // Remove empty lines
            .trim();

        return text;
    } catch (error) {
        console.error('Error extracting resume text:', error);
        return getFallbackResumeContext();
    }
}

/**
 * Get resume context (with caching)
 */
export async function getResumeContext(): Promise<ResumeContext> {
    // Return cached context if available
    if (cachedResumeContext) {
        return cachedResumeContext;
    }

    // Extract text from PDF
    const text = await extractResumeText();

    // Create context object
    cachedResumeContext = {
        text,
        metadata: {
            extractedAt: new Date(),
        },
    };

    return cachedResumeContext;
}

/**
 * Fallback resume context if PDF extraction fails
 */
function getFallbackResumeContext(): string {
    return `
Apoorv Maurya - Full-Stack AI Engineer · LLM-Integrated Products

PROFESSIONAL SUMMARY:
Full-Stack AI Engineer specializing in LLM-Integrated Products. Experienced in building scalable applications at the intersection of full-stack development and artificial intelligence.

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, SQL
- Frontend: React.js, Next.js (App Router / SSR), Tailwind CSS
- Backend & Database: Node.js, Express.js, FastAPI, LangChain / LangGraph, Claude API / OpenAI / Groq Llama, Supabase, MySQL
- AI / ML: Vercel AI SDK, LLM Integration, LightGBM, TreeSHAP
- Tools & Platforms: Git, Docker, AWS Textract, S3 / MinIO, Postman, Vercel, Render, Figma
- Misc: Technical Documentation, Content Writing, Community Management, Cross-Functional Collaboration

EXPERIENCE:
- DevX Days (Full-Stack Developer Intern, Jan 2025 – Sept 2025):
  * Architected async data ingestion pipelines in Next.js + TypeScript.
  * Built API-response caching layers (SWR) reducing redundant calls by ~60% per session.
  * Implemented streaming response delivery and lazy-loading patterns that cut initial load time by 40%.
  * Engineered multi-step validated UI flows with mandatory confirmation gates for critical user actions.
- Pixelwand (Frontend Developer Intern, July 2024 – Dec 2024):
  * Converted complex Figma designs into pixel-accurate React components using styled-components, validated pixel accuracy across the mobile, tablet, and desktop breakpoints via component-level QA.
  * Designed and documented a reusable React component library that measurably reduced the feature development time by ~25%, establishing the team's shared UI standard across all client products.

PROJECTS:
- RetentIQ: Open-source predictive churn intelligence platform with LightGBM, TreeSHAP feature attributions, Groq LLM playbooks, Next.js frontend, and Node/TypeScript orchestration.
- Planora: Real-time collaborative group trip planner built with Next.js 15, React 19, Supabase Realtime, and Groq Llama 3.3 for structured itineraries, PlaBot chat edits, and expense OCR.
- AssesMed: Full-stack clinical decision interface exposing FastAPI-served ML prediction models through guided, validated UI workflows and client-side response caching.

EDUCATION:
- IIT-Guwahati: Credit Linked AI/ML Extended Program (March 2025 – Present)
- Galgotias University: BTech in Computer Science & Engineering (Oct 2021 – June 2025)

For more detailed information, please explore the portfolio sections or contact Apoorv directly.
  `.trim();
}

/**
 * Clear resume context cache (useful for development)
 */
export function clearResumeCache(): void {
    cachedResumeContext = null;
}
