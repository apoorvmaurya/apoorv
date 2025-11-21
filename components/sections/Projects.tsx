"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/constants";
import { revealSection, staggerContainer, fadeIn, cardHover } from "@/lib/animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-background"
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="text-indigo-600">Projects</span>
          </h2>
          <p
            className="text-base sm:text-lg text-muted-foreground"
          >
            A showcase of my recent work and featured projects
          </p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.1)}
              whileHover="hover"
              initial="rest"
              className="h-full"
            >
              <motion.div
                variants={cardHover}
                className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-indigo-500/10 text-xs sm:text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                    <Button asChild variant="default" size="sm" className="gap-1 w-full sm:w-auto min-h-[44px] sm:min-h-0">
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-1 w-full sm:w-auto min-h-[44px] sm:min-h-0">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}