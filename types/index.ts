/**
 * Type definitions for the portfolio application
 */

// Chat types
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatAction {
    type: 'navigate' | 'download' | 'contact' | 'none';
    payload?: any;
}

export interface ChatResponse {
    message: string;
    action?: ChatAction;
}

// Portfolio data types
export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | 'Present';
    description: string[];
    technologies: string[];
    logo?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai' | 'other';
    proficiency?: number; // 0-100
}

export interface SkillCategory {
    category: string;
    skills: Skill[];
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface CommunityActivity {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'talk' | 'workshop' | 'contribution' | 'mentorship' | 'other';
}

// Form types
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// API response types
export interface APIResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Resume context type
export interface ResumeContext {
    text: string;
    metadata: {
        extractedAt: Date;
        pageCount?: number;
    };
}

// Component prop types
export interface SectionProps {
    id?: string;
    className?: string;
}

export interface AnimatedSectionProps extends SectionProps {
    children: React.ReactNode;
    delay?: number;
}

// Navigation types
export interface NavItem {
    label: string;
    href: string;
}
