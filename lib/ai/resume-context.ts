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

        // Sanitize stale claims from Resume.pdf to align strictly with verified portfolio data
        text = sanitizeResumeText(text);

        return text;
    } catch (error) {
        console.error('Error extracting resume text:', error);
        return getFallbackResumeContext();
    }
}

/**
 * Sanitize raw resume text to align with verified portfolio data
 */
export function sanitizeResumeText(rawText: string): string {
    return rawText
        // Fix project name
        .replace(/AssessMed/g, 'AssesMed')
        // RetentIQ corrections: LightGBM + TreeSHAP + Groq GPT-OSS, NOT LangChain / RandomForest
        .replace(/FastAPI\s*·\s*Python\s*·\s*scikit-learn\s*·\s*LangChain\s*·\s*Groq LLM\s*·\s*Supabase/gi, 'LightGBM · TreeSHAP · Groq GPT-OSS · Next.js · Node.js · Supabase')
        .replace(/combining a scikit-learn RandomForestClassifier with a LangChain-\s*orchestrated Groq LLM layer/gi, 'combining deterministic LightGBM gradient boosted decision trees, TreeSHAP feature attributions, and Groq GPT-OSS models')
        .replace(/LangChain-\s*orchestrated Groq LLM layer/gi, 'Groq GPT-OSS models for retention playbooks')
        // Planora corrections: Groq GPT-OSS via Vercel AI SDK, NOT Llama 3.3; shared expense tracking, NOT OCR; no pgvector
        .replace(/Supabase pgvector/gi, 'Supabase PostgreSQL')
        .replace(/\bpgvector\b/gi, 'PostgreSQL')
        .replace(/Integrated Llama 3\.3 via LangChain/gi, 'Integrated Groq GPT-OSS via Vercel AI SDK')
        .replace(/Llama 3\.3/gi, 'Groq GPT-OSS (gpt-oss-20b with gpt-oss-120b fallback) via Vercel AI SDK')
        .replace(/queue-based OCR and document ingestion/gi, 'queue-based document ingestion')
        .replace(/expense receipt OCR/gi, 'shared expense tracking')
        .replace(/receipt OCR expense splitting/gi, 'shared expense tracking')
        .replace(/expense OCR/gi, 'shared expense tracking')
        .replace(/receipt OCR/gi, 'shared expense tracking')
        // AssesMed corrections: frontend-only guided clinical intake UI with mock predictions, NOT Python/FastAPI ML service
        .replace(/Next\.js\s*·\s*TypeScript\s*·\s*Python\s*·\s*FastAPI\s*·\s*Supabase\s*·\s*TailwindCSS/gi, 'Next.js · TypeScript · Tailwind CSS · React (Frontend-only)')
        .replace(/Full-stack clinical decision interface exposing FastAPI-served ML prediction models through guided & validated UI flows/gi, 'Frontend-only clinical intake interface featuring guided, validated UI workflows and mock predictions')
        .replace(/exposing FastAPI-served ML prediction models/gi, 'guided, validated clinical intake interface with mock predictions')
        .replace(/exposing ML prediction models/gi, 'guided, validated clinical intake interface with mock predictions')
        .replace(/API-response caching at the FastAPI layer to eliminate repeated ML inference overhead, significantly reducing latency on high-frequency prediction queries/gi, 'Client-side response caching, dynamic input validation, and real-time mock disease risk predictions')
        .replace(/operate the ML tool/gi, 'operate the clinical intake interface')
        // Skills corrections: remove LangChain / LangGraph, pgvector, AWS Textract
        .replace(/LangChain\s*\/\s*LangGraph,\s*/gi, '')
        .replace(/LangChain,\s*/gi, '')
        .replace(/LangGraph,\s*/gi, '')
        .replace(/Claude API\s*\/\s*OpenAI\s*\/\s*Groq Llama/gi, 'Groq GPT-OSS / OpenAI APIs')
        .replace(/Groq Llama/gi, 'Groq GPT-OSS')
        .replace(/AWS Textract,\s*/gi, '')
        .replace(/LangChain/gi, 'Groq GPT-OSS');
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
- Backend & Database: Node.js, Express.js, FastAPI, Groq / OpenAI APIs, Supabase (PostgreSQL), MySQL
- AI / ML: Vercel AI SDK, LLM Integration, LightGBM, TreeSHAP
- Tools & Platforms: Git, Docker, Postman, Vercel, Render, Figma
- Misc: Technical Documentation, Content Writing, Community Management, Cross-Functional Collaboration

EXPERIENCE:
- DevX Days (Full-Stack Developer Intern, Jan 2025 – Sept 2025):
  * Architected async data ingestion pipelines in Next.js + TypeScript.
  * Built API-response caching layers using SWR to eliminate redundant network requests across user sessions.
  * Implemented streaming response delivery and lazy-loading patterns to optimize initial page render.
  * Engineered multi-step validated UI flows with mandatory confirmation gates for critical user actions.
- Pixelwand (Frontend Developer Intern, July 2024 – Dec 2024):
  * Converted complex Figma designs into pixel-accurate React components using styled-components, validating responsive layouts across mobile, tablet, and desktop breakpoints.
  * Designed and documented a reusable React component library, establishing the team's shared UI standard across client-facing products.

PROJECTS:
- RetentIQ: Open-source predictive churn intelligence platform with LightGBM, TreeSHAP feature attributions, Groq GPT-OSS models, Next.js frontend, and Node/TypeScript orchestration.
- Planora: Real-time collaborative group trip planner built with Next.js 15, React 19, Supabase Realtime, and Groq GPT-OSS (gpt-oss-20b with gpt-oss-120b fallback) via Vercel AI SDK for structured itineraries, PlaBot chat edits, and shared expense tracking.
- AssesMed: Frontend-only guided clinical intake interface featuring validated multi-step UI workflows, dynamic field validation, client-side response caching, and hardcoded mock disease risk predictions (not a Python/FastAPI ML service).

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
