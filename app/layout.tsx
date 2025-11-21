import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import EmailJSInit from '@/components/sections/EmailJSInit';
import { ErrorBoundary } from '@/components/error-boundary';
import OfflineDetector from '@/components/offline-detector';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apoorv\'s Portfolio',
  description: 'A showcase of professional work, skills and experience',
  icons: {
    icon: '/profile.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apoorv-gamma.vercel.app/',
    title: 'Apoorv\'s Portfolio',
    description: 'Full Stack Developer | UI/UX Engineer | ML Practitioner',
    images: [
      {
        url: '/profile.png', // Should ideally be a larger OG image
        width: 1200,
        height: 630,
        alt: 'Apoorv Maurya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoorv\'s Portfolio',
    description: 'Full Stack Developer | UI/UX Engineer | ML Practitioner',
    images: ['/profile.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className={`${inter.className} overflow-x-hidden w-screen`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to content
        </a>
        <EmailJSInit />
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <OfflineDetector />
            <div className="relative min-h-screen flex flex-col">
              <NavBar />
              <main id="main-content" className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}