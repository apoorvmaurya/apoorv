"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/lib/animation";

export default function Hero() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 sm:pt-16 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-background to-background/90"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeIn("up", 0.2)}
            className="text-base sm:text-lg md:text-xl font-medium text-indigo-500"
          >
            Hello, I&apos;m
          </motion.h2>

          <motion.h1
            variants={fadeIn("up", 0.3)}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            Apoorv Maurya
          </motion.h1>

          <motion.div variants={fadeIn("up", 0.4)} className="space-y-2 sm:space-y-3">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
              Full Stack Developer
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              UI/UX Engineer | ML Practitioner | Bridging Code and Intelligence
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.5)}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-4 sm:px-0"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white min-h-[44px] text-base"
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
              className="w-full sm:w-auto min-h-[44px] text-base"
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
      </div>
    </section>
  );
}
