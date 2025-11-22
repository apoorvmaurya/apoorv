'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { communityActivities } from '@/lib/data/portfolio';

export default function Community() {
    const activityIcons = {
        talk: '🎤',
        workshop: '🛠️',
        contribution: '💻',
        mentorship: '👨‍🏫',
        other: '🌟',
    };

    return (
        <section id="community" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        Community Involvement
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communityActivities.map((activity, index) => (
                        <AnimatedSection key={activity.id} delay={index * 0.1}>
                            <Card className="h-full">
                                <div className="text-4xl mb-4">{activityIcons[activity.type]}</div>
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    {activity.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">{activity.description}</p>
                                <p className="text-accent-cyan text-sm font-medium">{activity.date}</p>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
