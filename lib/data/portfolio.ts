import { Experience, Project, SkillCategory, CommunityActivity } from '@/types';

export const experiences: Experience[] = [
    {
        id: '1',
        company: 'DevX Days',
        position: 'Full-Stack Developer Intern',
        startDate: '2025-01',
        endDate: '2025-09',
        description: [
            'Architected async data ingestion pipelines in Next.js + TypeScript, directly applicable to the queue-based OCR and document ingestion patterns (SQS/BullMQ) required for legal document workflows.',
            'Built API-response caching layers (SWR) reducing redundant calls by ~60% per session.',
            'Implemented streaming response delivery and lazy-loading patterns that cut initial load time by 40% - directly transferable to streaming LLM draft generation required for real-time legal document creation.',
            'Engineered multi-step validated UI flows with mandatory confirmation gates for critical user actions which directly mirrors the Human-in-the-Loop checkpoint design required in agent architectures.',
        ],
        technologies: ['Next.js', 'TypeScript', 'SWR', 'BullMQ', 'SQS'],
    },
    {
        id: '2',
        company: 'Pixelwand',
        position: 'Frontend Developer Intern',
        startDate: '2024-07',
        endDate: '2024-12',
        description: [
            'Converted complex Figma designs into pixel-accurate React components using styled-components, validated pixel accuracy across the mobile, tablet, and desktop breakpoints via component-level QA.',
            'Designed and documented a reusable React component library that measurably reduced the feature development time by ~25%, establishing the team\'s shared UI standard across all client products.',
        ],
        technologies: ['React', 'styled-components', 'Figma'],
    },
];

export const projects: Project[] = [
    {
        id: '1',
        title: 'RetentIQ',
        description: 'Multi-agent churn-intelligence SaaS platform combining scikit-learn and LangChain-orchestrated LLMs.',
        longDescription:
            'Architected a multi-agent churn-intelligence SaaS platform combining a scikit-learn RandomForestClassifier with a LangChain-orchestrated Groq LLM layer. Built a database-backed async ingestion pipeline routing Stripe webhooks into a background job queue, decoupling data ingestion from the Express request thread and keeping the API non-blocking under concurrent loads. Implemented logprob-style confidence scoring on LLM outputs, flagging below-threshold predictions prominently before surfacing to users.',
        image: '/retentiq.png',
        technologies: ['FastAPI', 'Python', 'scikit-learn', 'LangChain', 'Groq LLM', 'Supabase', 'Docker', 'CI/CD'],
        liveUrl: 'https://retentiq-chi.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/retentiq',
        featured: true,
    },
    {
        id: '2',
        title: 'Planora',
        description: 'Real-time collaborative trip planning platform with a pgvector RAG-style AI layer.',
        longDescription:
            'Built a full-stack real-time collaborative platform with a RAG-style AI layer: user preferences and history chunked, embedded, and stored in Supabase pgvector - retrieved via cosine similarity to ground Llama 3.3 itinerary generation. Integrated Llama 3.3 via LangChain with streaming response delivery for real-time draft generation and engineered a Momentum Engine. Built conflict-free collaborative state sync using Supabase Realtime channels.',
        image: '/planora.png',
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'Llama 3.3', 'Vercel AI SDK', 'Zustand'],
        liveUrl: 'https://planora-plum-beta.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/planora',
        featured: true,
    },
    {
        id: '3',
        title: 'Data Alchemist',
        description: 'AI Resource Allocation Configurator',
        longDescription:
            'Data Alchemist is an AI-powered Next.js web application designed to transform messy spreadsheet data (CSV or XLSX) into clean, validated, and actionable insights for resource allocation. It provides a comprehensive suite of tools for data ingestion, real-time validation, AI-driven data correction and rule generation, and flexible priority configuration. The goal is to bring order to complex data, making it easy for non-technical users to manage and prepare data for downstream allocation systems.',
        image: '/alchemist.png',
        technologies: ['Next.js', 'TypeScript', 'Google Gemini', 'TailwindCSS'],
        liveUrl: 'https://data-alchemist-ten-lovat.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/data_alchemist',
        featured: true,
    },
    {
        id: '4',
        title: 'AssessMed',
        description: 'Clinical decision interface exposing FastAPI-served ML prediction models.',
        longDescription:
            'Built a full-stack clinical decision interface exposing FastAPI-served ML prediction models through guided & validated UI flows. Implemented API-response caching at the FastAPI layer to eliminate repeated ML inference overhead, significantly reducing latency. Designed a multi-step input form with real-time field validation.',
        image: '/assesmed.png',
        technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Supabase', 'TailwindCSS'],
        liveUrl: 'https://assesmed.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/AssesMed',
        featured: false,
    },
    {
        id: '5',
        title: 'AI Companion',
        description: 'Video Call & Streaming Platform',
        longDescription:
            'A full-stack web application for real-time video calls with AI companions, featuring WebRTC peer-to-peer streaming, intelligent conversations powered by Google Gemini, voice synthesis via ElevenLabs, lifelike avatars from D-ID, and conversation memory via LangMem.',
        image: '/companion.png',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'WebRTC', 'D-ID', 'LangMem', 'ElevenLabs'],
        liveUrl: 'https://companion-smoky.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/companion',
        featured: true,
    },
    {
        id: '6',
        title: 'iCloud Clone',
        description: 'Cloud storage solution',
        longDescription:
            'A cloud storage platform with file management, sharing, and collaboration features.',
        image: '/icloud.png',
        technologies: ['React', 'Node.js', 'AWS S3', 'MongoDB'],
        // liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/apoorvmaurya/iCloud',
        featured: false,
    },
];

export const skillCategories: SkillCategory[] = [
    {
        category: 'Languages',
        skills: [
            { name: 'TypeScript', category: 'frontend', proficiency: 90 },
            { name: 'JavaScript', category: 'frontend', proficiency: 95 },
            { name: 'Python', category: 'backend', proficiency: 85 },
            { name: 'SQL', category: 'database', proficiency: 80 },
        ],
    },
    {
        category: 'Frontend',
        skills: [
            { name: 'React.js', category: 'frontend', proficiency: 95 },
            { name: 'Next.js (App Router / SSR)', category: 'frontend', proficiency: 95 },
            { name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
        ],
    },
    {
        category: 'Backend & Database',
        skills: [
            { name: 'Node.js', category: 'backend', proficiency: 90 },
            { name: 'Express.js', category: 'backend', proficiency: 85 },
            { name: 'FastAPI', category: 'backend', proficiency: 85 },
            { name: 'LangChain / LangGraph', category: 'backend', proficiency: 85 },
            { name: 'Claude / OpenAI / Groq', category: 'backend', proficiency: 85 },
            { name: 'Supabase', category: 'backend', proficiency: 90 },
            { name: 'MySQL', category: 'database', proficiency: 80 },
        ],
    },
    {
        category: 'AI & ML',
        skills: [
            { name: 'Vercel AI SDK', category: 'ai', proficiency: 85 },
            { name: 'LLM Integration', category: 'ai', proficiency: 90 },
            { name: 'scikit-learn', category: 'ai', proficiency: 80 },
        ],
    },
    {
        category: 'Tools & Platforms',
        skills: [
            { name: 'Git', category: 'tools', proficiency: 95 },
            { name: 'Docker', category: 'tools', proficiency: 80 },
            { name: 'AWS Textract', category: 'tools', proficiency: 75 },
            { name: 'S3 / MinIO', category: 'tools', proficiency: 80 },
            { name: 'BullMQ / SQS', category: 'tools', proficiency: 80 },
            { name: 'Postman', category: 'tools', proficiency: 90 },
            { name: 'Vercel', category: 'tools', proficiency: 90 },
            { name: 'Render', category: 'tools', proficiency: 80 },
            { name: 'Figma', category: 'tools', proficiency: 75 },
        ],
    },
];

export const communityActivities: CommunityActivity[] = [
    {
        id: '1',
        title: 'Open Source Contributions',
        description: 'Active contributor to various open-source projects on GitHub',
        date: '2023-Present',
        type: 'contribution',
    },
    {
        id: '2',
        title: 'Workshops',
        description: 'Conducted workshops on APIs, Postman, and more',
        date: '2023-2024',
        type: 'talk',
    },
    {
        id: '3',
        title: 'Volunteering & Co-organizer Events',
        description: 'Volunteered and co-organized events for the OpenSourceDays community',
        date: '2022-2025',
        type: 'mentorship',
    },
];
