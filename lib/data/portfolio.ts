import { Experience, Project, SkillCategory, CommunityActivity } from '@/types';

export const experiences: Experience[] = [
    {
        id: '1',
        company: 'Tech Company',
        position: 'Senior Full Stack Developer',
        startDate: '2022-01',
        endDate: 'Present',
        description: [
            'Led development of scalable web applications using Next.js and TypeScript',
            'Implemented AI-powered features using Google Gemini and OpenAI APIs',
            'Mentored junior developers and conducted code reviews',
        ],
        technologies: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AI/ML'],
    },
    {
        id: '2',
        company: 'Previous Company',
        position: 'Full Stack Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        description: [
            'Developed and maintained multiple client-facing applications',
            'Integrated third-party APIs and payment gateways',
            'Optimized application performance and database queries',
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'AWS'],
    },
];

export const projects: Project[] = [
    {
        id: '1',
        title: 'AI Alchemist',
        description: 'AI-powered content generation platform',
        longDescription:
            'A comprehensive AI platform that leverages multiple AI models for content generation, image creation, and data analysis.',
        image: '/alchemist.png',
        technologies: ['Next.js', 'TypeScript', 'Google Gemini', 'TailwindCSS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/apoorvmaurya',
        featured: true,
    },
    {
        id: '2',
        title: 'AssesMed',
        description: 'Medical assessment and diagnosis platform',
        longDescription:
            'Healthcare platform for medical assessments and patient management with AI-assisted diagnosis.',
        image: '/assesmed.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/apoorvmaurya',
        featured: true,
    },
    {
        id: '3',
        title: 'AI Companion',
        description: 'Intelligent virtual assistant',
        longDescription:
            'An AI-powered virtual companion that provides personalized assistance and conversation.',
        image: '/companion.png',
        technologies: ['Next.js', 'OpenAI', 'PostgreSQL', 'Prisma'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/apoorvmaurya',
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
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/apoorvmaurya',
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
        date: '2023',
        type: 'contribution',
    },
    {
        id: '2',
        title: 'Tech Talks & Workshops',
        description: 'Conducted workshops on modern web development and AI integration',
        date: '2023',
        type: 'talk',
    },
    {
        id: '3',
        title: 'Mentorship Program',
        description: 'Mentoring aspiring developers in web development and career guidance',
        date: '2022-Present',
        type: 'mentorship',
    },
];
