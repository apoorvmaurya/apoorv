import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import EmailJSInit from '@/components/sections/EmailJSInit';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: 'Professional Portfolio',
  description: 'A showcase of professional work, skills and experience',
  icons: {
    icon: '/profile.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
         <EmailJSInit />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
