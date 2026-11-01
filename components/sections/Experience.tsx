'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { experiences } from '@/lib/data/portfolio';
import { formatDate } from '@/lib/utils';

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-background-secondary relative scroll-mt-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F4F4F5] mb-12 text-center">
                        Work <span className="text-[#F0B35A]">Experience</span>
                    </h2>
                </AnimatedSection>

                {/* Simple Stacked List */}
                <div className="space-y-6 sm:space-y-8">
                    {experiences.map((exp, index) => (
                        <AnimatedSection key={exp.id} delay={index * 0.1}>
                            <Card className="border border-white/10 hover:border-[#F0B35A]/40 transition-colors duration-300 p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 pb-4 border-b border-white/5">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F4F4F5]">
                                            {exp.position}
                                        </h3>
                                        <p className="text-[#F0B35A] font-semibold text-base sm:text-lg mt-0.5">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <span className="text-xs sm:text-sm text-[#A1A1AA] font-mono tracking-wide py-1 px-3 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
                                        {formatDate(exp.startDate)} – {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>

                                <ul className="space-y-2.5 mb-6">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-[#D4D4D8] text-sm sm:text-base flex items-start leading-relaxed">
                                            <span className="text-[#F0B35A] mr-2.5 select-none font-bold text-sm">▪</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 rounded-md text-xs font-medium text-[#F4F4F5] bg-white/5 border border-white/10"
                                        >
                                            {tech}
                                        </span>
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
