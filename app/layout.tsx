import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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
    title: 'Apoorv Maurya | AI-Enabled Portfolio',
    description:
        'Portfolio of Apoorv Maurya - Full Stack Developer, AI Enthusiast, and Technology Leader. Explore my projects, experience, and skills.',
    keywords: [
        'Apoorv Maurya',
        'Portfolio',
        'Full Stack Developer',
        'AI',
        'Machine Learning',
        'Web Development',
        'Software Engineer',
    ],
    authors: [{ name: 'Apoorv Maurya' }],
    creator: 'Apoorv Maurya',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://apoorv-gamma.vercel.app',
        title: 'Apoorv Maurya | AI-Enabled Portfolio',
        description:
            'Portfolio of Apoorv Maurya - Full Stack Developer, AI Enthusiast, and Technology Leader.',
        siteName: 'Apoorv Maurya Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Apoorv Maurya | AI-Enabled Portfolio',
        description:
            'Portfolio of Apoorv Maurya - Full Stack Developer, AI Enthusiast, and Technology Leader.',
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
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}