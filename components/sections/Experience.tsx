"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/lib/constants";
import { revealSection, staggerContainer, fadeIn, listItem } from "@/lib/animation";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase,
  Calendar,
  CheckCircle2
} from "lucide-react";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 bg-indigo-50 dark:bg-indigo-950/20 overflow-hidden"
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={fadeIn("up")}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Work <span className="text-indigo-600">Experience</span>
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.1)}
            className="text-lg text-muted-foreground"
          >
            My professional journey and career highlights
          </motion.p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto relative"
        >
          {/* Timeline center line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800/50 transform -translate-x-1/2" />
          
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={fadeIn(index % 2 === 0 ? "left" : "right", index * 0.2)}
              className={`relative mb-12 md:mb-24 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
            >
              {/* Timeline dot */}
              <div 
                className={`hidden md:block absolute top-0 w-6 h-6 rounded-full bg-indigo-600 ${
                  index % 2 === 0 ? "-right-[3.25rem]" : "-left-[3.25rem]"
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-400 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              
              {/* Experience card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                </div>
                
                <div className="flex items-center mb-4 text-muted-foreground">
                  <span className="font-medium mr-2">{experience.company}</span>
                  <span>•</span>
                  <div className="flex items-center ml-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{experience.date}</span>
                  </div>
                </div>
                
                <motion.ul 
                  variants={staggerContainer}
                  className="mb-4 space-y-2"
                >
                  {experience.description.map((item, i) => (
                    <motion.li 
                      key={i} 
                      variants={listItem}
                      className="flex"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}