// NourishBridge Design System Motion Tokens & Variants
// Optimized for fluid, GPU-accelerated spring animations (Linear / Stripe / Airbnb quality)

export const springs = {
  // Snappy for micro-interactions (buttons, icons, chips)
  snappy: { type: "spring", stiffness: 450, damping: 32 },
  // Gentle for cards, modals, dropdowns
  gentle: { type: "spring", stiffness: 260, damping: 26 },
  // Bouncy for success checkmarks, badges
  bouncy: { type: "spring", stiffness: 500, damping: 22 },
  // Smooth for large layout / page transitions
  smooth: { type: "spring", stiffness: 180, damping: 24 }
};

export const transitions = {
  default: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
};

// Page entrance & exit variants
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Stagger container for lists and grids
export const staggerContainer = (staggerDelay = 0.06, delayChildren = 0.04) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren
    }
  }
});

// Stagger item reveal
export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28
    }
  }
};

// Subtle card hover micro-interaction
export const cardHover = {
  rest: { y: 0, transition: springs.snappy },
  hover: { 
    y: -4, 
    transition: springs.snappy 
  },
  tap: { 
    y: -1, 
    scale: 0.99,
    transition: springs.snappy 
  }
};

// Button press feedback
export const buttonPress = {
  hover: { scale: 1.02 },
  tap: { scale: 0.97 }
};

// Modal animation variants
export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export const modalDialogVariants = {
  initial: { opacity: 0, scale: 0.95, y: 14 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: springs.gentle 
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    y: 8, 
    transition: { duration: 0.15, ease: "easeOut" } 
  }
};
