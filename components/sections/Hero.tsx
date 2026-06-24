'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { scrollToElement } from '@/lib/utils';

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Background effects */}
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent" />

            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <motion.div variants={staggerItem} className="text-center lg:text-left">
                        <motion.p
                            className="text-accent-cyan font-medium mb-4 text-base sm:text-lg"
                            variants={fadeInUp}
                        >
                            👋 Hello, I'm
                        </motion.p>

                        <motion.h1
                            className="text-6xl sm:text-7xl md:text-8xl font-heading font-bold mb-6 leading-tight"
                            variants={fadeInUp}
                        >
                            <span className="text-gradient">Apoorv Maurya</span>
                        </motion.h1>

                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl text-gray-300 mb-6 leading-snug"
                            variants={fadeInUp}
                        >
                            AI/ML Engineer · Multi-Agent Systems & LLM-Integrated Products
                        </motion.h2>

                        <motion.p
                            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            variants={fadeInUp}
                        >
                            Building innovative solutions at the intersection of full-stack development and
                            artificial intelligence. Specializing in autonomous multi-agent frameworks, LLM
                            integrations, and robust real-time applications.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            variants={fadeInUp}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => scrollToElement('projects')}
                            >
                                View My Work
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToElement('contact')}
                            >
                                Get In Touch
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Profile image */}
                    <motion.div
                        className="relative"
                        variants={staggerItem}
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Neural mesh background glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-purple rounded-full blur-3xl opacity-35 animate-pulse-slow" />
                            
                            <div className="relative glass-strong rounded-full p-2 glow-effect">
                                {/* Spinning data-ring */}
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary-500 via-accent-purple to-accent-cyan rounded-full animate-spin-slow opacity-75" style={{ margin: '-2px' }} />
                                <div className="absolute inset-0 bg-[#0a0a0f] rounded-full" style={{ margin: '1px' }} />
                                
                                {/* Pulse Node checkpoints */}
                                <div className="absolute top-1/4 -left-1 w-3 h-3 bg-accent-cyan rounded-full glow-effect animate-pulse z-20" />
                                <div className="absolute bottom-1/4 -right-1 w-3 h-3 bg-accent-purple rounded-full glow-effect animate-pulse z-20" style={{ animationDelay: '1s' }} />
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full glow-effect animate-pulse z-20" style={{ animationDelay: '0.5s' }} />
                                
                                <div className="relative z-10 rounded-full overflow-hidden">
                                    <Image
                                        src="/profile.png"
                                        alt="Apoorv Maurya"
                                        width={500}
                                        height={500}
                                        className="rounded-full relative z-10"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                {/* <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <svg
                                className="w-6 h-6 text-primary-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div> */}
            </motion.div>
        </section>
    );
}
