'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { skillCategories } from '@/lib/data/portfolio';

export default function Skills() {
    return (
        <section id="skills" className="py-20 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F4F4F5] mb-4 text-center">
                        Technical <span className="text-[#F0B35A]">Skills</span>
                    </h2>
                    <p className="text-[#A1A1AA] text-center mb-12 max-w-2xl mx-auto text-base sm:text-lg">
                        Grouped by core technical area and labeled by verified application context.
                    </p>
                </AnimatedSection>

                {/* Equalized Height Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {skillCategories.map((category, index) => (
                        <AnimatedSection key={category.category} delay={index * 0.05} className="h-full flex flex-col">
                            <Card className="flex flex-col h-full border border-white/10 hover:border-[#F0B35A]/40 transition-colors duration-300 p-6">
                                <h3 className="text-xl font-heading font-bold text-[#F4F4F5] mb-5 pb-3 border-b border-white/10">
                                    {category.category}
                                </h3>
                                <div className="flex flex-col gap-2.5 flex-grow">
                                    {category.skills.map((skill) => {
                                        const isInternship = skill.context.includes('internship');
                                        return (
                                            <div
                                                key={skill.name}
                                                className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.04] border border-white/5 hover:border-white/15 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-sm font-semibold text-[#F4F4F5]">
                                                        {skill.name}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                                                            isInternship
                                                                ? 'bg-[#F0B35A]/15 text-[#F0B35A] border-[#F0B35A]/30'
                                                                : 'bg-white/5 text-[#A1A1AA] border-white/10'
                                                        }`}
                                                    >
                                                        {isInternship ? 'Internship' : 'Personal Project'}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#A1A1AA]">
                                                    {skill.context}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
