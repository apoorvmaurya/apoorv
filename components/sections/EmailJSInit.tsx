"use client";

import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// This component initializes EmailJS when the app loads
export default function EmailJSInit() {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  // This component doesn't render anything
  return null;
}