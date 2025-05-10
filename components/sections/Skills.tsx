"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/constants";
import { revealSection, staggerContainer, fadeIn, progressBar } from "@/lib/animation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
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
            My <span className="text-indigo-600">Skills</span>
          </h2>
          <p 
            className="text-lg text-muted-foreground"
          >
            A comprehensive overview of my technical expertise and proficiency
          </p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical" className="mt-6">
              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                {skills.technical.map((skill, index) => (
                  <motion.div key={skill.name} variants={fadeIn("up", index * 0.1)} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        variants={progressBar}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        custom={skill.level}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="frameworks" className="mt-6">
              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                {skills.frameworks.map((skill, index) => (
                  <motion.div key={skill.name} variants={fadeIn("up", index * 0.1)} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        variants={progressBar}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        custom={skill.level}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="tools" className="mt-6">
              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                {skills.tools.map((skill, index) => (
                  <motion.div key={skill.name} variants={fadeIn("up", index * 0.1)} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        variants={progressBar}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        custom={skill.level}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
}