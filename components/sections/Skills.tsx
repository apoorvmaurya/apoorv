'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { skillCategories } from '@/lib/data/portfolio';

export default function Skills() {
    return (
        <section id="skills" className="py-20 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        Technical Skills
                    </h2>
                </AnimatedSection>

                <div className="centered-card-grid">
                    {skillCategories.map((category, index) => (
                        <AnimatedSection key={category.category} delay={index * 0.1}>
                            <Card className="flex flex-col h-full bg-background-secondary/40 border border-white/5 shadow-glass hover:border-white/10 transition-colors duration-300">
                                <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-3">
                                    {category.category}
                                </h3>
                                <div className="space-y-5 flex-grow">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="space-y-2">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span className="text-gray-200">{skill.name}</span>
                                                <span className="text-accent-cyan">{skill.proficiency}%</span>
                                            </div>
                                            {/* Progress Bar Container */}
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                                {/* Animated Progress Fill */}
                                                <motion.div
                                                    className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-purple to-accent-cyan shadow-glow-sm"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.proficiency || 80}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
