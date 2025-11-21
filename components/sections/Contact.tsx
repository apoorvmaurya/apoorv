"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { revealSection, staggerContainer, fadeIn } from "@/lib/animation";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, WifiOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    // Check if online
    if (!isOnline) {
      toast({
        title: "No internet connection",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const templateParams = {
        to_email: "apoorvmauryapoorv@gmail.com",
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status === 200) {
        setIsSuccess(true);
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset();

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again or contact me directly via email.",
        variant: "destructive",
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSubmit(data)}
            className="gap-1"
          >
            Retry
          </Button>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 md:py-20 bg-background">
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-indigo-600">Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Have a question or want to work together? Feel free to contact me!
          </p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Info */}
            <motion.div variants={fadeIn("right")} className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Email</h4>
                      <a
                        href="mailto:apoorvmauryapoorv@gmail.com"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-indigo-600 transition-colors break-all"
                      >
                        apoorvmauryapoorv@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Phone</h4>
                      <a href="tel:+917081817800" className="text-xs sm:text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                        +91 7081817800
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Location</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Noida, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                  <p className="text-xs sm:text-sm text-muted-foreground italic">
                    Currently available for contract based, freelance projects and full-time positions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeIn("left", 0.2)} className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Send me a Message</h3>

                {!isOnline && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">You are currently offline. Please check your connection.</p>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                autoComplete="name"
                                className="min-h-[44px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                autoComplete="email"
                                type="email"
                                className="min-h-[44px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Subject"
                              autoComplete="off"
                              className="min-h-[44px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              rows={6}
                              autoComplete="off"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 min-h-[44px] text-base"
                      disabled={isSubmitting || !isOnline}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}