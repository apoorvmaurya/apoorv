"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

  // Define experiences data directly in this component
  // Work experience data 
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "DevX Days",
      date: "Jan 2025 - Present",
      description: [
        "Built responsive landing page using Next.js with TypeScript implementing SSR for improved SEO performance.",
        "Reduced page loading time by 40% through code splitting and lazy loading techniques.",
        "Implemented client-side caching strategies resulting in smoother navigation experience for users.",
        "Resolved cross-browser compatibility issues by creating custom CSS solutions for legacy browser support.",
      ],
      tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Pixelwand",
      date: "July 2024 - Dec 2024",
      description: [
        "Developed AWS service migration UI with optimistic updates, reducing user wait time by 30%.",
        "Translated complex Figma design mock-ups into pixel-perfect web pages using React and styled-components.",
        "Created reusable component library that reduced development time for new features by 25%.",
        "Implemented responsive designs ensuring consistent user experience across mobile, tablet, and desktop devices.",
      ],
      tech: ["React", "styled-components", "Figma", "AWS"],
    },
    {
      title: "AIML Trainee",
      company: "Verzeo",
      date: "October 2022 - January 2023",
      description: [
        "Implemented object recognition model using TensorFlow and Keras achieving 87% accuracy.",
        "Documented model architecture and training process for team knowledge sharing.",
      ],
      tech: ["TensorFlow", "Keras", "Python"],
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 bg-indigo-50 dark:bg-indigo-950/20 overflow-hidden"
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
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Work <span className="text-indigo-600">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and career highlights
          </p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto relative"
          suppressHydrationWarning={true}
        >
          {/* Timeline center line - fixed in the middle */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800/50 transform -translate-x-1/2 z-10" />
          
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={fadeIn(index % 2 === 0 ? "left" : "right", index * 0.2)}
              className={`relative mb-12 md:mb-24 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
              suppressHydrationWarning={true}
            >
              {/* Timeline dot - always positioned at the center line */}
              <div 
                className="hidden md:block absolute top-10 w-6 h-6 rounded-full bg-indigo-600 z-20"
                style={{ 
                  left: index % 2 === 0 ? 'calc(100% + 2rem)' : 'calc(-2rem - 24px)',
                }}
                suppressHydrationWarning={true}
              >
                <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-400 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              
              {/* Experience card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                suppressHydrationWarning={true}
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
                
                {/* Use array-based descriptions instead of hardcoded ones */}
                <div className="mb-4 space-y-2">
                  {experience.description.map((desc, i) => (
                    <div key={i} className="flex" suppressHydrationWarning={true}>
                      <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4" suppressHydrationWarning={true}>
                  {experience.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary" suppressHydrationWarning={true}>
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