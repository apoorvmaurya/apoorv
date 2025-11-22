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
                // Cyber Noir Theme
                background: {
                    DEFAULT: '#0a0a0f',
                    secondary: '#12121a',
                    tertiary: '#1a1a2e',
                },
                primary: {
                    50: '#f0f0ff',
                    100: '#e5e5ff',
                    200: '#d4d4ff',
                    300: '#b8b8ff',
                    400: '#9999ff',
                    500: '#7a7aff',
                    600: '#6b5cff',
                    700: '#5c4deb',
                    800: '#4d3fc7',
                    900: '#4136a3',
                    950: '#2a2270',
                },
                accent: {
                    cyan: '#00f5ff',
                    purple: '#b24bf3',
                    pink: '#ff2e97',
                    blue: '#4d7cff',
                },
                glass: {
                    light: 'rgba(255, 255, 255, 0.05)',
                    medium: 'rgba(255, 255, 255, 0.1)',
                    dark: 'rgba(0, 0, 0, 0.3)',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'cyber-grid': 'linear-gradient(rgba(122, 122, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 122, 255, 0.1) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '50px 50px',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(122, 122, 255, 0.5), 0 0 10px rgba(122, 122, 255, 0.3)' },
                    '100%': { boxShadow: '0 0 10px rgba(122, 122, 255, 0.8), 0 0 20px rgba(122, 122, 255, 0.5), 0 0 30px rgba(122, 122, 255, 0.3)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'glow-sm': '0 0 10px rgba(122, 122, 255, 0.5)',
                'glow-md': '0 0 20px rgba(122, 122, 255, 0.6)',
                'glow-lg': '0 0 30px rgba(122, 122, 255, 0.7)',
            },
        },
    },
    plugins: [],
};

export default config;
