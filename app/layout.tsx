import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://apoorv-gamma.vercel.app'),
    title: 'Apoorv Maurya | AI-Enabled Portfolio',
    description:
        'Apoorv Maurya - AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products. Explore my projects, experience, and skills.',
    keywords: [
        'Apoorv Maurya',
        'Portfolio',
        'AI/ML Engineer',
        'Multi-Agent Systems',
        'LLM Integration',
        'Full Stack Developer',
        'Software Engineer',
    ],
    authors: [{ name: 'Apoorv Maurya' }],
    creator: 'Apoorv Maurya',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://apoorv-gamma.vercel.app',
        title: 'Apoorv Maurya | AI-Enabled Portfolio',
        description:
            'Apoorv Maurya - AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products',
        siteName: 'Apoorv Maurya Portfolio',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Apoorv Maurya - AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Apoorv Maurya's Portfolio",
        description:
            'Apoorv Maurya - AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products',
        images: ['/og-image.png'],
    },
    other: {
        'x:card': 'summary_large_image',
        'x:title': 'Apoorv Maurya',
        'x:description':
            'Apoorv Maurya - AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products',
        'x:image': '/og-image.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body className="antialiased min-h-screen w-full" suppressHydrationWarning>
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}