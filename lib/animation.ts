import { Variants } from "framer-motion";

// Fade in animation variants with refined easing
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
        type: "spring",
        duration: 0.8,
        delay,
        stiffness: 100,
        damping: 15,
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
      delayChildren: 0.1,
    },
  },
};

// Enhanced card hover animation with smoother spring
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 15,
    }
  },
};

// Section reveal variants with smoother entrance
export const revealSection: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15,
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
      ease: [0.25, 0.1, 0.25, 1],
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
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
};

// Progress bar animation with smooth easing
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2,
    }
  })
};

// Button press animation for better feedback
export const buttonPress: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Slide in from side
export const slideIn = (direction: "left" | "right" = "left"): Variants => ({
  hidden: {
    x: direction === "left" ? -100 : 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
});

// Scale fade animation
export const scaleFade: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};