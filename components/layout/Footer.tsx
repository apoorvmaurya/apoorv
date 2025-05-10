'use client';

import React from "react";
import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/apoorvmaurya",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/apoorv-maurya2506/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/apoorvmaurya_",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:apoorvmauryaapoorv@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-muted/40 py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Apoorv Maurya. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  asChild
                  variant="ghost" 
                  size="icon"
                  aria-label={link.name}
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}