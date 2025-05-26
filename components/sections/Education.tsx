"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { education } from "@/lib/constants";
import { revealSection, staggerContainer, fadeIn, listItem } from "@/lib/animation";
import { 
  GraduationCap,
  Calendar,
} from "lucide-react";

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="education"
      ref={ref}
      className="py-20 bg-muted/30"
      suppressHydrationWarning={true}
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
        suppressHydrationWarning={true}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-indigo-600">Education</span>
          </h2>
          
          <h3 className="text-lg text-muted-foreground">
            Academic achievements and qualifications
          </h3>
          
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto space-y-12"
          suppressHydrationWarning={true}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.2)}
              className="bg-card border border-border rounded-lg p-6 shadow-md"
              suppressHydrationWarning={true}
            >
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <span className="font-medium">{edu.institution}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{edu.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}