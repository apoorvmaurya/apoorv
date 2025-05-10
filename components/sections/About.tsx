"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { revealSection, staggerContainer, fadeIn } from "@/lib/animation";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-muted/30"
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={fadeIn("right")}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-indigo-600">Me</span>
              </h2>
              <div className="w-20 h-1 bg-indigo-600 mb-8"></div>
            </motion.div>

            <motion.p variants={fadeIn("right", 0.1)} className="text-lg text-muted-foreground">
              I&apos;m a passionate senior frontend developer with over 5 years of experience building modern web applications. I specialize in React, TypeScript, and Next.js, creating responsive and performant user interfaces.
            </motion.p>
            
            <motion.p variants={fadeIn("right", 0.2)} className="text-lg text-muted-foreground">
              With a strong foundation in user experience design principles and a keen eye for detail, I strive to create intuitive and visually appealing interfaces that solve real-world problems and delight users.
            </motion.p>
            
            <motion.p variants={fadeIn("right", 0.3)} className="text-lg text-muted-foreground">
              Beyond coding, I&apos;m an active member of the developer community, where I contribute to open-source projects, write technical articles, and mentor junior developers.
            </motion.p>
            
            <motion.div variants={fadeIn("right", 0.4)} className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="font-semibold text-xl">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="text-muted-foreground">hello@example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Experience</h3>
                <p className="text-muted-foreground">5+ Years</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Availability</h3>
                <p className="text-muted-foreground">Open to offers</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-border shadow-xl"
          >
            <Image
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}