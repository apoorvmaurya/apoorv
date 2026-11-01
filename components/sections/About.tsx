'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { publication } from '@/lib/data/portfolio';

export default function About() {
    return (
        <section id="about" className="py-20 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F4F4F5] mb-12 text-center">
                        About <span className="text-[#F0B35A]">Me</span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <AnimatedSection delay={0.2}>
                        <div className="relative">
                            <Image
                                src="/about.png"
                                alt="About Apoorv"
                                width={600}
                                height={600}
                                className="rounded-2xl relative z-10"
                                style={{ height: "auto" }}
                                loading="eager"
                                priority
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <Card>
                            <h3 className="text-2xl font-heading font-bold mb-4">
                                Full-Stack AI Engineer · LLM-Integrated Products
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    I am a Full-Stack AI Engineer with hands-on experience designing and delivering
                                    systems at the intersection of full-stack engineering and applied artificial intelligence.
                                    My work focuses on autonomous multi-agent systems, LLM-integrated products, and responsive,
                                    production web architectures.
                                </p>
                                <p>
                                    My stack covers multi-agent orchestration (LangChain, LangGraph), LLM APIs (OpenAI, Claude, Groq),
                                    modern frontend frameworks (Next.js, React, Tailwind CSS), and scalable backend backbones
                                    (FastAPI, Node.js, Supabase with pgvector).
                                </p>
                                <p>
                                    Beyond software engineering, I contribute to applied AI research and community technical programs,
                                    mentoring students and organizing developer initiatives.
                                </p>
                            </div>

                            {/* Verifiable Facts Row */}
                            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-white font-heading">5</div>
                                    <div className="text-xs text-gray-400 mt-1">Live Deployed Demos</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-white font-heading">6</div>
                                    <div className="text-xs text-gray-400 mt-1">Public GitHub Repos</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-[#F0B35A] font-heading">ICDSA 2025</div>
                                    <div className="text-xs text-gray-400 mt-1">Co-Authored Paper</div>
                                </div>
                            </div>

                            {/* Publications Entry */}
                            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs uppercase font-bold tracking-wider text-[#F0B35A] px-2 py-0.5 rounded bg-[#F0B35A]/10 border border-[#F0B35A]/25">
                                        Peer-Reviewed Publication
                                    </span>
                                    <span className="text-xs text-gray-400">January 2026</span>
                                </div>
                                <h4 className="text-base font-semibold text-white mb-1.5 leading-snug">
                                    &ldquo;{publication.title}&rdquo;
                                </h4>
                                <p className="text-xs text-gray-300 mb-3">
                                    {publication.authorship}, {publication.venue}, {publication.date}.
                                </p>
                                <a
                                    href={publication.doiUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F0B35A] hover:text-[#E5A448] transition-colors"
                                >
                                    <span>View Paper on Springer (DOI)</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
