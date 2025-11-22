'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { experiences } from '@/lib/data/portfolio';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-background-secondary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        Work Experience
                    </h2>
                </AnimatedSection>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-accent-purple to-accent-cyan" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <AnimatedSection key={exp.id} delay={index * 0.2}>
                                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="flex-1" />

                                    {/* Timeline dot */}
                                    <div className="relative flex-shrink-0 w-16 flex justify-center">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple glow-effect-strong" />
                                    </div>

                                    <div className="flex-1">
                                        <Card className={index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}>
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-heading font-bold text-white">
                                                        {exp.position}
                                                    </h3>
                                                    <p className="text-accent-cyan font-medium">{exp.company}</p>
                                                </div>
                                                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                                                    {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                                                </span>
                                            </div>

                                            <ul className="space-y-2 mb-4">
                                                {exp.description.map((item, i) => (
                                                    <li key={i} className="text-gray-300 text-sm flex items-start">
                                                        <span className="text-primary-500 mr-2">▹</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech) => (
                                                    <Badge key={tech} variant="primary">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
