"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { revealSection, staggerContainer, fadeIn } from "@/lib/animation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Loader2 
} from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send the form data to our API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: "apoorvmauryapoorv@gmail.com",
          from: data.email,
          subject: `Contact Form: ${data.subject}`,
          name: data.name,
          message: data.message,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-background"
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get In <span className="text-indigo-600">Touch</span>
          </h2>
          <p
            className="text-lg text-muted-foreground"
          >
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              variants={fadeIn("right")}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-card border border-border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:apoorvmauryapoorv@gmail.com" className="text-muted-foreground hover:text-indigo-600 transition-colors">
                        apoorvmauryapoorv@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a href="tel:+917081817800" className="text-muted-foreground hover:text-indigo-600 transition-colors">
                        +91 7081817800
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">
                        Noida, India
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                  <p className="text-sm text-muted-foreground italic">
                    Currently available for contract based, freelance projects and full-time positions.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              variants={fadeIn("left", 0.2)}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-6">Send me a Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              rows={6} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
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