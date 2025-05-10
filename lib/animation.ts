import { Variants } from "framer-motion";

// Fade in animation variants
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = 0
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Stagger container variant for children animations
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Card hover animation variants
export const cardHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.2, 
      type: "tween",
      ease: "easeOut" 
    } 
  },
  hover: { 
    scale: 1.05, 
    y: -5, 
    transition: { 
      duration: 0.4, 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
};

// Section reveal variants
export const revealSection: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75],
    }
  }
};

// Text reveal variants
export const revealText: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// List item reveal variants
export const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Progress bar animation
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};