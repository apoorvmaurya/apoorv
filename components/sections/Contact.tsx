'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { socialLinks } from '@/lib/data/portfolio';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const githubLink = socialLinks.find((l) => l.name === 'GitHub');
    const linkedinLink = socialLinks.find((l) => l.name === 'LinkedIn');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const onSubmit = (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const subject = encodeURIComponent(`[Portfolio Contact] ${data.subject} - from ${data.name}`);
            const body = encodeURIComponent(
                `Hi Apoorv,\n\n${data.message}\n\n---\nSender: ${data.name}\nEmail: ${data.email}`
            );
            const mailtoUrl = `mailto:apoorvmauryaapoorv@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoUrl;
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Contact form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F4F4F5] mb-4 text-center">
                        Get In <span className="text-[#F0B35A]">Touch</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Interested in collaboration or hiring for Full-Stack AI Engineer roles? Feel free to reach out directly.
                    </p>
                </AnimatedSection>

                {/* Direct Social Links (GitHub & LinkedIn) */}
                <AnimatedSection delay={0.1}>
                    <div className="flex justify-center items-center gap-4 mb-10">
                        {githubLink && (
                            <a
                                href={githubLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-[#2E2E32] text-gray-200 hover:text-white hover:border-[#F0B35A]/50 transition-all duration-200 hover:scale-105 text-sm font-semibold"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>GitHub Profile</span>
                            </a>
                        )}
                        {linkedinLink && (
                            <a
                                href={linkedinLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-[#2E2E32] text-gray-200 hover:text-white hover:border-[#F0B35A]/50 transition-all duration-200 hover:scale-105 text-sm font-semibold"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span>LinkedIn Profile</span>
                            </a>
                        )}
                    </div>
                </AnimatedSection>

                <div className="max-w-2xl mx-auto">
                    <AnimatedSection delay={0.2}>
                        {/* Visible Destination Banner */}
                        <div className="mb-6 p-4 rounded-xl bg-[#18181B] border border-[#2E2E32] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A] flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Form Destination</p>
                                    <p className="text-sm font-mono font-medium text-[#F4F4F5]">apoorvmauryaapoorv@gmail.com</p>
                                </div>
                            </div>
                            <a
                                href="mailto:apoorvmauryaapoorv@gmail.com"
                                className="inline-flex items-center justify-center text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#F0B35A] text-[#111111] hover:bg-[#E5A448] transition-colors self-start sm:self-auto"
                            >
                                Open in Email Client
                            </a>
                        </div>

                        <Card>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <Input
                                        label="Name"
                                        placeholder="Your name"
                                        error={errors.name?.message}
                                        {...register('name')}
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        error={errors.email?.message}
                                        {...register('email')}
                                    />
                                </div>

                                <Input
                                    label="Subject"
                                    placeholder="What's this about?"
                                    error={errors.subject?.message}
                                    {...register('subject')}
                                />

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Your message..."
                                        autoComplete="off"
                                        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-[#2E2E32] text-[#F4F4F5] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0B35A] focus:border-transparent transition-all duration-200 resize-none"
                                        suppressHydrationWarning={true}
                                        {...register('message')}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    isLoading={isSubmitting}
                                >
                                    Send Message
                                </Button>

                                {submitStatus === 'success' && (
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
                                        Opening your email client addressed to <span className="font-mono text-[#F4F4F5]">apoorvmauryaapoorv@gmail.com</span>. If your client didn&apos;t open automatically, please click &quot;Open in Email Client&quot; above.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                                        Failed to open email client. Please reach out directly to <a href="mailto:apoorvmauryaapoorv@gmail.com" className="underline font-mono">apoorvmauryaapoorv@gmail.com</a>.
                                    </div>
                                )}
                            </form>
                        </Card>
                    </AnimatedSection>

                    {/* Contact info */}
                    <AnimatedSection delay={0.4}>
                        <div className="mt-12 centered-card-grid">
                            <Card className="text-center flex flex-col h-full">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A]">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-white mb-1">Email</h4>
                                <a
                                    href="mailto:apoorvmauryaapoorv@gmail.com"
                                    className="text-sm text-[#F0B35A] hover:underline font-mono"
                                >
                                    apoorvmauryaapoorv@gmail.com
                                </a>
                            </Card>

                            <Card className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A]">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-white mb-1">Location</h4>
                                <p className="text-sm text-gray-400">India</p>
                            </Card>

                            <Card className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A]">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-white mb-1">Response Time</h4>
                                <p className="text-sm text-gray-400">Within 24 hours</p>
                            </Card>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
