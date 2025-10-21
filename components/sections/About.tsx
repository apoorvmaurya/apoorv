"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { revealSection, staggerContainer, fadeIn } from "@/lib/animation";

export default function About() {
  const [hasMounted, setHasMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30">
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
              I&apos;m a Full Stack developer specialised in Frontend development with hands-on experience in building responsive, scalable web interfaces using Next.js, React, and TypeScript.
            </motion.p>

            <motion.p variants={fadeIn("right", 0.2)} className="text-lg text-muted-foreground">
              I&apos;m currently exploring AI/ML by working on practical projects and expanding my backend understanding. Passionate about clean UI, performance optimization, and contributing to impactful tech communities.
            </motion.p>

            <motion.p variants={fadeIn("right", 0.3)} className="text-lg text-muted-foreground">
              Beyond coding, I&apos;m an active member of the developer community, where I contribute to open-source projects and write technical articles.
            </motion.p>

            <motion.div variants={fadeIn("right", 0.4)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="font-semibold text-xl">Location</h3>
                <p className="text-muted-foreground">Noida</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="text-muted-foreground break-words">
                  <a href="mailto:apoorvmauryapoorv@gmail.com" className="hover:text-indigo-600 transition-colors">
                    apoorvmauryapoorv@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Experience</h3>
                <p className="text-muted-foreground">0-1 Yrs.</p>
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
              src="/about.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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