import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Approved Charcoal & Warm Amber Design Tokens
                charcoal: {
                    base: '#111111',
                    elevated: '#18181B',
                    surface: '#222225',
                },
                amber: {
                    accent: '#F0B35A',
                    hover: '#E5A448',
                    muted: 'rgba(240, 179, 90, 0.15)',
                },
                neutral: {
                    heading: '#F4F4F5',
                    muted: '#A1A1AA',
                    hairline: '#2E2E32',
                    'hairline-hover': '#52525B',
                },
                background: {
                    DEFAULT: '#111111',
                    secondary: '#18181B',
                    tertiary: '#222225',
                },
                foreground: {
                    DEFAULT: '#F4F4F5',
                    muted: '#A1A1AA',
                },
                primary: {
                    DEFAULT: '#F0B35A',
                    hover: '#E5A448',
                    muted: 'rgba(240, 179, 90, 0.15)',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 8px 24px -4px rgba(0, 0, 0, 0.5)',
                'card-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.65)',
            },
        },
    },
    plugins: [],
};

export default config;
