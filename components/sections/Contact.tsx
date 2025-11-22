'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                console.warn('EmailJS keys not found. Simulating success.');
                await new Promise((resolve) => setTimeout(resolve, 1500));
            } else {
                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        from_name: data.name,
                        from_email: data.email,
                        subject: data.subject,
                        message: data.message,
                    },
                    publicKey
                );
            }

            console.log('Form data sent:', data);
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-background-secondary relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
                        Get In Touch
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss opportunities? Feel free to reach out!
                        I'm always open to interesting conversations and collaboration.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <Card>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
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
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-center">
                                    Failed to send message. Please try again or email me directly.
                                </div>
                            )}
                        </form>
                    </Card>
                </AnimatedSection>

                {/* Contact info */}
                <AnimatedSection delay={0.4}>
                    <div className="mt-12 centered-card-grid">
                        <Card className="text-center flex flex-col h-full">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-primary-400"
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
                            <p className="text-sm text-gray-400">contact@apoorvmaurya.com</p>
                        </Card>

                        <Card className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-primary-400"
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
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-primary-400"
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
        </section>
    );
}
