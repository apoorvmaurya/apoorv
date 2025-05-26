"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { communityActivities } from "@/lib/constants";
import { revealSection, staggerContainer, fadeIn } from "@/lib/animation";
import { Users, Calendar, Heart } from "lucide-react";

export default function Community() {
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
    <section
      id="community"
      ref={ref}
      className="py-20 bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/10"
    >
      <motion.div
        variants={revealSection}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Community <span className="text-indigo-600">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            My contributions to the tech community and beyond
          </p>
          <div className="w-20 h-1 bg-indigo-600 mt-6 mx-auto"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityActivities.map((activity, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", index * 0.15)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full">
                    <Heart className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center mb-2">
                  {activity.title}
                </h3>

                <div className="flex items-center justify-center mb-4 text-muted-foreground">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{activity.organization}</span>
                </div>

                <div className="flex items-center justify-center mb-6 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{activity.date}</span>
                </div>

                <p className="text-center text-muted-foreground">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            className="text-center mt-12 bg-card border border-border rounded-lg p-8 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Let&apos;s Collaborate!</h3>
            <p className="text-muted-foreground">
              I&apos;m always looking for new opportunities to contribute to the tech community, whether it&apos;s through mentoring, speaking at events, or collaborating on open-source projects. If you have an opportunity in mind, I&apos;d love to hear about it!
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
