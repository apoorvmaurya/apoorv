import { Experience, Project, SkillCategory, CommunityActivity } from '@/types';

export const experiences: Experience[] = [
    {
        id: '1',
        company: 'DevX Days',
        position: 'Full Stack Developer Intern',
        startDate: '2025-01',
        endDate: '2025-09',
        description: [
            'Build responsive landing page using Next.js with TypeScript implementing SSR for improved SEO performance.',
            'Reduced page loading time by 40% through code splitting and lazy loading techniques.',
            'Implemented client-side caching strategies resulting in smoother navigation experience for users.',
            'Resolved cross-browser compatibility issues by creating custom CSS solutions for legacy browser support.',
        ],
        technologies: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
    {
        id: '2',
        company: 'Pixelwand',
        position: 'Frontend Developer Intern',
        startDate: '2024-07',
        endDate: '2024-12',
        description: [
            'Developed AWS service migration UI with optimistic updates, reducing user wait time by 30%.',
            'Translated complex Figma design mock-ups into pixel-perfect web pages using React and styled-components.',
            'Created reusable component library that reduced development time for new features by 25%. ',
            'Implemented responsive designs ensuring consistent user experience across mobile, tablet, and desktop devices.',
        ],
        technologies: ['React', 'Node.js', 'Express.js', 'AWS'],
    },
];

export const projects: Project[] = [
    {
        id: '1',
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
        id: '2',
        title: 'AssessMed',
        description: 'Advanced Health Prediction with AI',
        longDescription:
            'AssessMed leverages cutting-edge machine learning algorithms to provide accurate disease prediction based on your symptoms and medical history.',
        image: '/assesmed.png',
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'AI/ML'],
        liveUrl: 'https://assesmed.vercel.app/',
        githubUrl: 'https://github.com/apoorvmaurya/AssesMed',
        featured: true,
    },
    {
        id: '3',
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
        id: '4',
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
        category: 'Frontend',
        skills: [
            { name: 'React', category: 'frontend', proficiency: 95 },
            { name: 'Next.js', category: 'frontend', proficiency: 95 },
            { name: 'TypeScript', category: 'frontend', proficiency: 90 },
            { name: 'JavaScript', category: 'frontend', proficiency: 95 },
            { name: 'TailwindCSS', category: 'frontend', proficiency: 90 },
            { name: 'HTML5/CSS3', category: 'frontend', proficiency: 95 },
        ],
    },
    {
        category: 'Backend',
        skills: [
            { name: 'Node.js', category: 'backend', proficiency: 90 },
            { name: 'Express.js', category: 'backend', proficiency: 85 },
            { name: 'Python', category: 'backend', proficiency: 80 },
            { name: 'REST APIs', category: 'backend', proficiency: 90 },
            { name: 'GraphQL', category: 'backend', proficiency: 75 },
        ],
    },
    {
        category: 'Database',
        skills: [
            { name: 'MongoDB', category: 'database', proficiency: 85 },
            { name: 'PostgreSQL', category: 'database', proficiency: 85 },
            { name: 'MySQL', category: 'database', proficiency: 80 },
            { name: 'Redis', category: 'database', proficiency: 75 },
        ],
    },
    {
        category: 'AI & ML',
        skills: [
            { name: 'Google Gemini', category: 'ai', proficiency: 85 },
            { name: 'OpenAI APIs', category: 'ai', proficiency: 85 },
            { name: 'TensorFlow', category: 'ai', proficiency: 70 },
            { name: 'PyTorch', category: 'ai', proficiency: 65 },
        ],
    },
    {
        category: 'Tools & Cloud',
        skills: [
            { name: 'Git/GitHub', category: 'tools', proficiency: 95 },
            { name: 'Docker', category: 'tools', proficiency: 80 },
            { name: 'AWS', category: 'tools', proficiency: 75 },
            { name: 'Vercel', category: 'tools', proficiency: 90 },
            { name: 'CI/CD', category: 'tools', proficiency: 80 },
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
