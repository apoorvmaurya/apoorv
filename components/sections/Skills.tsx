'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { skillCategories } from '@/lib/data/portfolio';

export default function Skills() {
    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        Technical Skills
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <AnimatedSection key={category.category} delay={index * 0.1}>
                            <Card>
                                <h3 className="text-xl font-heading font-bold text-white mb-4">
                                    {category.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <Badge key={skill.name} variant="primary">
                                            {skill.name}
                                        </Badge>
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
