import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
// Work experience data
//export const experiences = [
//  {
//    title: "Full Stack Developer",
//    company: "DevX Days",
//    date: "Jan 2025 - Present",
//    description: [
//      "Built responsive landing page using Next.js with TypeScript implementing SSR for improved SEO performance.",  
//      "Reduced page loading time by 40% through code splitting and lazy loading techniques.", 
//      "Implemented client-side caching strategies resulting in smoother navigation experience for users.", 
//      "Resolved cross-browser compatibility issues by creating custom CSS solutions for legacy browser support.",
//    ],
//    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
//  },
//  {
//    title: "Frontend Developer Intern",
//    company: "Pixelwand",
//    date: "July 2024 - Dec 2024",
//    description: [
//      "Developed AWS service migration UI with optimistic updates, reducing user wait time by 30%.", 
//      "Translated complex Figma design mock-ups into pixel-perfect web pages using React and styled-components.",
//      "Created reusable component library that reduced development time for new features by 25%.",
//      "Implemented responsive designs ensuring consistent user experience across mobile, tablet, and desktop devices.", 
//    ],
//    tech: ["React", "styled-components", "Figma", "AWS"],
//  },
//  {
//    title: "AIML Trainee",
//    company: "Verzeo",
//    date: "October 2022 - January 2023",
//    description: [
//      "Implemented object recognition model using TensorFlow and Keras achieving 87% accuracy.",
//      "Documented model architecture and training process for team knowledge sharing.",
//    ],
//    tech: ["TensorFlow", "Keras", "Python"],
//  },
//];
// Projects data

export const projects = [
  {
    title: "AssessMed",
    description: "Machine learning-based disease prediction system with intuitive UI flows that simplified complex medical input processes for non-technical users.",
    imageUrl: "/assesmed.png",
    demoUrl: "https://assesmed.vercel.app/",
    githubUrl: "https://github.com/apoorvmaurya/AssesMed",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS",],
  },
  {
    title: "iCloud",
    description: "Comprehensive web application for college administrative operations with role-based access control system ensuring data security and privacy.",
    imageUrl: "/icloud.png",
    demoUrl: "https://github.com/apoorvmaurya/iCloud",
    githubUrl: "https://github.com/apoorvmaurya/iCloud",
    tech: ["PHP", "CSS", "MySQL", "XAMPP", "Apache Server"],
  },
  {
    title: "Virtual Workstation",
    description: "Personal desktop voice assistant with custom voice command recognition achieving 90% accuracy using speech recognition libraries.",
    imageUrl: "/workstation.png",
    demoUrl: "https://apoorvmaurya.github.io/WorkStation-Virtual-Assistant-/",
    githubUrl: "https://github.com/apoorvmaurya/WorkStation-Virtual-Assistant-",
    tech: ["Python", "speech recognition", "pyttsx3", "multithreading"],
  },
  {
    title: "Open Source: Vibey",
    description: "Enhanced UI/UX and implemented predictive search functionality with typeahead feature.",
    imageUrl: "/vibey.png",
    demoUrl: "https://vibey.live",
    githubUrl: "https://github.com/apoorvmaurya/vibey",
    tech: ["JavaScript", "React", "CSS"],
  },
];
