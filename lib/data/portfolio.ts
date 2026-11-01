import { Experience, Project, SkillCategory, CommunityActivity, Publication, SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/apoorvmaurya',
        icon: 'github',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/apoorv-maurya2506/',
        icon: 'linkedin',
    },
    {
        name: 'X',
        url: 'https://x.com/apoorvmaurya_',
        icon: 'x',
    },
    {
        name: 'Email',
        url: 'mailto:apoorvmauryaapoorv@gmail.com',
        icon: 'email',
    },
];

export const publication: Publication = {
    title: 'Hybrid Generative AI Framework for Multilingual Text Summarization in Indian Languages',
    authorship: 'co-authored',
    venue: 'ICDSA 2025 proceedings, Springer LNNS vol. 1722',
    publisher: 'Springer',
    date: 'published January 2026',
    doiUrl: 'https://doi.org/10.1007/978-3-032-10756-5_9',
};

export const experiences: Experience[] = [
    {
        id: '1',
        company: 'DevX Days',
        position: 'Full-Stack Developer Intern',
        startDate: '2025-01',
        endDate: '2025-09',
        description: [
            'Architected async data ingestion pipelines in Next.js + TypeScript.',
            'Built API-response caching layers (SWR) reducing redundant calls by ~60% per session.',
            'Implemented streaming response delivery and lazy-loading patterns that cut initial load time by 40%.',
            'Engineered multi-step validated UI flows with mandatory confirmation gates for critical user actions.',
        ],
        technologies: ['Next.js', 'TypeScript', 'SWR'],
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
        description: 'Open-source predictive churn intelligence with LightGBM, TreeSHAP feature attributions, and LLM retention playbooks.',
        longDescription:
            'Open-source predictive churn intelligence and customer health scoring platform. Integrates deterministic LightGBM gradient boosted decision trees for numerical churn probabilities with game-theoretic TreeSHAP for 12-dimensional feature attribution. Uses high-throughput LLM playbooks via Groq with deterministic in-process fallback, built with a Next.js frontend, Node/TypeScript orchestration, Drizzle ORM, and Supabase.',
        image: '/retentiq.png',
        technologies: ['Next.js', 'TypeScript', 'Node.js', 'LightGBM', 'TreeSHAP', 'Groq LLM', 'Supabase'],
        liveUrl: 'https://retentiq-chi.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/retentiq',
        featured: true,
    },
    {
        id: '2',
        title: 'Planora',
        description: 'Real-time collaborative group trip planner with AI itinerary generation, consensus voting, and expense OCR.',
        longDescription:
            'Collaborative travel planning platform built with Next.js 15, React 19, Supabase Realtime, and the Groq inference engine. Features structured chronological itinerary generation with traveler pacing profiles, in-trip collaborative chat agent (PlaBot) for bulk itinerary edits, democratic group voting with consensus promotion, and receipt OCR expense splitting.',
        image: '/planora.png',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase Realtime', 'Groq Llama 3.3', 'Tailwind CSS', 'Zustand'],
        liveUrl: 'https://planora-gamma.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/planora',
        featured: true,
    },
    {
        id: '3',
        title: 'Data Alchemist',
        description: 'AI Resource Allocation Configurator',
        longDescription:
            'Designed a full-stack resource-allocation configurator featuring dynamic parameter adjustment, animated visualizers, and state sync via Zustand.',
        image: '/data-alchemist.png',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Zustand', 'Framer Motion'],
        liveUrl: 'https://data-alchemist-apoorv.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/data-alchemist',
        featured: true,
    },
    {
        id: '4',
        title: 'AssesMed',
        description: 'Full-stack clinical decision interface exposing ML prediction models through validated UI flows.',
        longDescription:
            'Full-stack clinical decision interface exposing FastAPI-served machine learning prediction models through guided, validated UI workflows. Implements client-side response caching, dynamic input validation, and real-time disease risk assessment tracking.',
        image: '/assesmed.png',
        technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Supabase', 'Tailwind CSS'],
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
        githubUrl: 'https://github.com/apoorvmaurya/iCloud',
        featured: false,
    },
];

export const skillCategories: SkillCategory[] = [
    {
        category: 'Languages',
        skills: [
            { name: 'TypeScript', category: 'frontend', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'JavaScript', category: 'frontend', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'Python', category: 'backend', context: 'used in personal projects' },
            { name: 'SQL', category: 'database', context: 'used in personal projects' },
        ],
    },
    {
        category: 'Frontend',
        skills: [
            { name: 'React.js', category: 'frontend', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'Next.js (App Router / SSR)', category: 'frontend', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'Tailwind CSS', category: 'frontend', context: 'used in personal projects' },
        ],
    },
    {
        category: 'Backend & Database',
        skills: [
            { name: 'Node.js', category: 'backend', context: 'used in personal projects' },
            { name: 'FastAPI', category: 'backend', context: 'used in personal projects' },
            { name: 'LangChain / LangGraph', category: 'backend', context: 'used in personal projects' },
            { name: 'Groq / OpenAI / Claude APIs', category: 'backend', context: 'used in personal projects' },
            { name: 'Supabase & pgvector', category: 'backend', context: 'used in personal projects' },
            { name: 'SWR Caching', category: 'backend', context: 'used in internship work at Pixelwand / DevX Days' },
        ],
    },
    {
        category: 'AI & ML',
        skills: [
            { name: 'LLM Multi-Agent Systems', category: 'ai', context: 'used in personal projects' },
            { name: 'RAG Architecture (pgvector)', category: 'ai', context: 'used in personal projects' },
            { name: 'scikit-learn (Classification)', category: 'ai', context: 'used in personal projects' },
            { name: 'Vercel AI SDK', category: 'ai', context: 'used in personal projects' },
        ],
    },
    {
        category: 'Tools & Platforms',
        skills: [
            { name: 'Git & GitHub', category: 'tools', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'Figma Component Systems', category: 'tools', context: 'used in internship work at Pixelwand / DevX Days' },
            { name: 'Docker & Docker Compose', category: 'tools', context: 'used in personal projects' },
            { name: 'Postman', category: 'tools', context: 'used in personal projects' },
            { name: 'Vercel & Render', category: 'tools', context: 'used in internship work at Pixelwand / DevX Days' },
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
