"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES, type HeroSlide } from "@/config/hero";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Automatic Hero Image Slider for Pavan Vela Grand
 *
 * Requirements met:
 * - Minimum 5 distinct high-resolution hotel photographs.
 * - Automatic rotation every 5 seconds.
 * - Luxurious, smooth crossfade transition (approx 1000ms).
 * - Preloads the first slide with `priority`.
 * - Pauses on hover/focus for user convenience.
 * - Respects `prefers-reduced-motion`.
 * - Discreet category indicator and minimalist navigation dots.
 */
export function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 5-second automatic rotation
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isPaused, nextSlide]);

  const currentSlide: HeroSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      aria-label="Pavan Vela Grand Property Photographs"
      className="relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Crossfading Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            priority={currentIndex === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />

          {/* Luxury ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none hidden lg:block" />
        </motion.div>
      </AnimatePresence>


      {/* Vertical 'SCROLL TO EXPLORE' indicator (Desktop Right Edge - as in reference) */}
      <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center pointer-events-none select-none">
        <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.32em] text-white/70 [writing-mode:vertical-rl] rotate-180 drop-shadow-sm">
          Scroll to Explore
        </span>
        <span className="w-[1px] h-12 bg-white/40 mt-3" />
      </div>

      {/* Minimalist Slide Navigation Dots (Bottom Right - as in reference) */}
      <div
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-10 flex items-center space-x-2 bg-black/35 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15"
        role="tablist"
        aria-label="Image Carousel Slides"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}: ${slide.category}`}
              onClick={() => goToSlide(index)}
              className="p-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full transition-transform"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-7 h-1.5 bg-[#C5A572]"
                    : "w-1.5 h-1.5 bg-white/55 group-hover:bg-white/90"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeroImageSlider;
