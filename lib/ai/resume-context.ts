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
Apoorv Maurya - Professional Portfolio

PROFESSIONAL SUMMARY:
Experienced Full Stack Developer and Technology Leader with expertise in web development, AI/ML, and cloud technologies. Passionate about building scalable applications and innovative solutions.

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Python, Express.js, REST APIs
- Database: MongoDB, PostgreSQL, MySQL, Redis
- AI/ML: TensorFlow, PyTorch, Google Gemini, OpenAI
- Cloud & DevOps: AWS, Google Cloud, Docker, Kubernetes, CI/CD
- Tools: Git, GitHub, VS Code, Postman

EXPERIENCE:
Multiple years of experience in software development, working on various projects ranging from web applications to AI-powered solutions. Strong background in full-stack development, system architecture, and team leadership.

PROJECTS:
- Built multiple full-stack applications using modern web technologies
- Developed AI-powered solutions leveraging machine learning and natural language processing
- Created scalable cloud-based applications with microservices architecture
- Contributed to open-source projects and community initiatives

EDUCATION:
Strong educational background in Computer Science and Software Engineering.

INTERESTS:
Artificial Intelligence, Machine Learning, Web Development, Cloud Computing, Open Source, Community Building

For more detailed information, please explore the portfolio sections or contact Apoorv directly.
  `.trim();
}

/**
 * Clear resume context cache (useful for development)
 */
export function clearResumeCache(): void {
    cachedResumeContext = null;
}
