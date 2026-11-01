'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'experience' },
    { label: 'AI Lab', href: 'playground' },
    { label: 'Skills', href: 'skills' },
    { label: 'Projects', href: 'projects' },
    { label: 'Community', href: 'community' },
    { label: 'Contact', href: 'contact' },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollProgress = useScrollProgress();

    // Handle scroll to show/hide navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map((item) => item.href);
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard support - ESC to close menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const handleNavClick = (href: string) => {
        scrollToElement(href);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-[#F0B35A] z-50 origin-left"
                style={{ scaleX: scrollProgress }}
            />

            {/* Navigation Header */}
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isScrolled
                        ? 'top-4 mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-full bg-[#18181B] border border-[#2E2E32] shadow-xl px-6'
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={`${isScrolled ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => handleNavClick('hero')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <h1 className="text-2xl font-heading font-bold text-[#F4F4F5] tracking-tight">
                                Apoorv Maurya
                            </h1>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`px-3.5 py-1.5 rounded-md text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] ${
                                        activeSection === item.href
                                            ? 'text-[#F0B35A] font-semibold'
                                            : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                                    }`}
                                    suppressHydrationWarning
                                >
                                    {item.label}
                                </button>
                            ))}
                            {/* Resume Link Button in Nav */}
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-3 px-3 py-1.5 rounded-md text-sm font-medium text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                            >
                                Resume
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg border border-neutral-700 text-[#F4F4F5] bg-[#18181B]/80 hover:bg-[#18181B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A]"
                            onPointerDown={(e) => {
                                e.preventDefault();
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu modal */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden bg-[#111111]/98 backdrop-blur-xl flex flex-col justify-center items-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 rounded-lg border border-neutral-800 text-[#A1A1AA] hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center space-y-6 w-full max-w-xs">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`w-full py-2.5 rounded-lg text-lg transition-colors text-center ${
                                        activeSection === item.href
                                            ? 'text-[#F0B35A] font-bold'
                                            : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 rounded-lg text-base font-medium text-center text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Resume PDF
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
