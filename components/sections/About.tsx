'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';

export default function About() {
    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        About Me
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection delay={0.2}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-purple rounded-2xl blur-2xl opacity-20" />
                            <Image
                                src="/about.png"
                                alt="About Apoorv"
                                width={600}
                                height={600}
                                className="rounded-2xl relative z-10"
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <Card>
                            <h3 className="text-2xl font-heading font-bold mb-4">
                                Passionate Developer & Technology Leader
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    I'm a Full Stack Developer with a passion for creating innovative solutions that
                                    combine cutting-edge web technologies with artificial intelligence. With years of
                                    experience in software development, I specialize in building scalable, performant
                                    applications that deliver exceptional user experiences.
                                </p>
                                <p>
                                    My expertise spans across modern web frameworks like Next.js and React, backend
                                    technologies including Node.js and Python, and AI/ML integration using Google
                                    Gemini and OpenAI APIs. I'm constantly exploring new technologies and best
                                    practices to stay at the forefront of web development.
                                </p>
                                <p>
                                    Beyond coding, I'm committed to giving back to the developer community through
                                    open-source contributions, mentorship, and knowledge sharing. I believe in the
                                    power of collaboration and continuous learning.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gradient">5+</div>
                                    <div className="text-sm text-gray-400">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gradient">50+</div>
                                    <div className="text-sm text-gray-400">Projects Completed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gradient">100%</div>
                                    <div className="text-sm text-gray-400">Client Satisfaction</div>
                                </div>
                            </div>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
