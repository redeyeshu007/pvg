import type { Variants, Transition } from "framer-motion";

/**
 * Pavan Vela Grand - Animation Design Tokens
 *
 * Designed for refined, smooth, premium hotel interactions without excessive movement.
 */
export const EASINGS = {
  luxury: [0.16, 1, 0.3, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
};

export const TRANSITIONS = {
  fade: {
    duration: 0.5,
    ease: EASINGS.smooth,
  } satisfies Transition,
  reveal: {
    duration: 0.7,
    ease: EASINGS.luxury,
  } satisfies Transition,
  stagger: {
    staggerChildren: 0.12,
    delayChildren: 0.05,
  } satisfies Transition,
  button: {
    duration: 0.2,
    ease: EASINGS.snappy,
  } satisfies Transition,
};

/**
 * Standard Entrance & Reveal Variants
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITIONS.fade,
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.reveal,
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.reveal,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITIONS.stagger,
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITIONS.reveal,
  },
};

export const buttonInteraction: Variants = {
  hover: { scale: 1.02, transition: TRANSITIONS.button },
  tap: { scale: 0.98, transition: TRANSITIONS.button },
};

/**
 * Reduced-Motion Helper
 * Strips transform and spatial movement when reduced motion is preferred by user/system.
 */
export function getAccessibleVariant(
  variant: Variants,
  prefersReducedMotion: boolean
): Variants {
  if (!prefersReducedMotion) return variant;

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };
}
