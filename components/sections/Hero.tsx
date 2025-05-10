"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/lib/animation";

export default function Hero() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden bg-gradient-to-b from-background to-background/90"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeIn("up", 0.2)}
            className="text-lg md:text-xl font-medium text-indigo-500"
          >
            Hello, I&apos;m
          </motion.h2>
          
          <motion.h1 
            variants={fadeIn("up", 0.3)}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Apoorv Maurya
          </motion.h1>
          
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Full Stack Developer
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              UI/UX Engineer | ML Practitioner | Bridging Code and Intelligence
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeIn("up", 0.5)}
            className="flex justify-center gap-4 pt-6"
          >
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  window.scrollTo({
                    top: projectsSection.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
            >
              View Projects
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: [0, 12, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}