'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { scrollToElement } from '@/lib/utils';
import { socialLinks } from '@/lib/data/portfolio';

export default function Hero() {
    const githubLink = socialLinks.find((l) => l.name === 'GitHub');
    const linkedinLink = socialLinks.find((l) => l.name === 'LinkedIn');

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-[#111111]"
        >
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <motion.div variants={staggerItem} className="text-center lg:text-left">
                        <motion.p
                            className="text-[#F0B35A] font-medium mb-3 text-base sm:text-lg tracking-wide"
                            variants={fadeInUp}
                        >
                            Hello, I'm
                        </motion.p>

                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight text-[#F4F4F5] tracking-tight"
                            variants={fadeInUp}
                        >
                            Apoorv Maurya<span className="text-[#F0B35A]">.</span>
                        </motion.h1>

                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl text-[#EDEDED] font-medium mb-6 leading-snug"
                            variants={fadeInUp}
                        >
                            Full-Stack AI Engineer · LLM-Integrated Products
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-[#A1A1AA] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
                            variants={fadeInUp}
                        >
                            Full-stack developer shipping LLM-integrated products - two internships, deployed personal AI projects, and a co-authored paper in the ICDSA 2025 proceedings (published 2026). Specializing in autonomous multi-agent frameworks, LLM integrations, and robust real-time applications.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center lg:justify-start items-center"
                            variants={fadeInUp}
                        >
                            <button
                                type="button"
                                onClick={() => scrollToElement('projects')}
                                className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 text-base sm:text-lg bg-[#F0B35A] text-[#111111] hover:bg-[#E5A448] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                            >
                                View My Work
                            </button>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-3.5 text-base sm:text-lg text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                            >
                                Resume
                            </a>
                            <button
                                type="button"
                                onClick={() => scrollToElement('contact')}
                                className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-3.5 text-base sm:text-lg text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                            >
                                Get In Touch
                            </button>

                            {/* GitHub & LinkedIn Hero Icons */}
                            <div className="flex items-center space-x-3 ml-1">
                                {githubLink && (
                                    <a
                                        href={githubLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub Profile"
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                )}
                                {linkedinLink && (
                                    <a
                                        href={linkedinLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn Profile"
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-[#F4F4F5] border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B35A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Profile image with static hairline ring */}
                    <motion.div
                        className="relative flex justify-center lg:justify-end"
                        variants={staggerItem}
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full p-2.5 sm:p-3 border border-[#2E2E32]">
                            <div className="relative w-full h-full rounded-full border border-neutral-700/60 overflow-hidden">
                                <Image
                                    src="/profile.png"
                                    alt="Apoorv Maurya"
                                    fill
                                    className="rounded-full object-cover"
                                    priority
                                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 420px"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
