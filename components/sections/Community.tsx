'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { communityActivities } from '@/lib/data/portfolio';

export default function Community() {
    const renderIcon = (type: string) => {
        switch (type) {
            case 'contribution':
                return (
                    <svg className="w-6 h-6 text-[#F0B35A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
            case 'talk':
                return (
                    <svg className="w-6 h-6 text-[#F0B35A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                );
            case 'mentorship':
                return (
                    <svg className="w-6 h-6 text-[#F0B35A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6 text-[#F0B35A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
        }
    };

    return (
        <section id="community" className="py-20 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F4F4F5] mb-12 text-center">
                        Community <span className="text-[#F0B35A]">Involvement</span>
                    </h2>
                </AnimatedSection>

                <div className="centered-card-grid">
                    {communityActivities.map((activity, index) => (
                        <AnimatedSection key={activity.id} delay={index * 0.1}>
                            <Card className="flex flex-col h-full border border-white/10 hover:border-[#F0B35A]/40 transition-colors duration-300 p-6">
                                <div className="w-12 h-12 rounded-xl bg-[#F0B35A]/10 border border-[#F0B35A]/25 flex items-center justify-center mb-5">
                                    {renderIcon(activity.type)}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-[#F4F4F5] mb-2">
                                    {activity.title}
                                </h3>
                                <p className="text-[#A1A1AA] text-sm mb-4 flex-grow leading-relaxed">
                                    {activity.description}
                                </p>
                                <p className="text-xs font-mono font-medium text-[#F0B35A]">
                                    {activity.date}
                                </p>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
