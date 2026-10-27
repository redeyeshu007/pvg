import React from "react";
import { MARQUEE_ITEMS } from "@/config/marquee";

/**
 * Decorative 4-point luxury star separator
 */
function MarqueeStar() {
  return (
    <svg
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A572] flex-shrink-0 opacity-90 mx-6 sm:mx-8 lg:mx-10"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
    </svg>
  );
}

/**
 * Single repeating track of marquee phrases with star separators
 */
function MarqueeTrack({ isAriaHidden = false }: { isAriaHidden?: boolean }) {
  return (
    <div
      className="flex items-center flex-shrink-0"
      aria-hidden={isAriaHidden ? "true" : undefined}
    >
      {MARQUEE_ITEMS.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <span className="text-xs sm:text-[13px] font-sans uppercase font-medium tracking-[0.22em] sm:tracking-[0.26em] text-[#173B63] whitespace-nowrap transition-colors hover:text-[#C5A572] cursor-default select-none">
            {item}
          </span>
          <MarqueeStar />
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * HotelMarquee Component for Pavan Vela Grand
 *
 * Characteristics:
 * - Pure white background (#FFFFFF) with subtle border-y separation.
 * - Primary text in deep royal blue (#173B63) with champagne gold (#C5A572) stars.
 * - Restrained, continuous, seamless right-to-left marquee animation.
 * - Pauses on hover, respects `prefers-reduced-motion`.
 * - Zero layout shift; screen-reader accessible with duplicate tracks hidden from AT.
 */
export function HotelMarquee() {
  return (
    <aside
      aria-label="Pavan Vela Grand Hotel Features and Stay Highlights"
      className="relative w-full bg-white border-y border-slate-100 overflow-hidden h-12 sm:h-14 flex items-center flex-shrink-0 group"
    >
      {/* Edge gradient masks for seamless visual fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-white via-white/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-white via-white/80 to-transparent"
        aria-hidden="true"
      />

      {/* Infinite Scrolling Track */}
      <div className="flex animate-marquee-scroll">
        {/* Primary Track (Read by Screen Readers) */}
        <MarqueeTrack isAriaHidden={false} />

        {/* Seamless Duplicate Track 1 (Hidden from Screen Readers) */}
        <MarqueeTrack isAriaHidden={true} />

        {/* Seamless Duplicate Track 2 (Buffer for Ultra-Wide / 4K displays) */}
        <MarqueeTrack isAriaHidden={true} />

        {/* Seamless Duplicate Track 3 */}
        <MarqueeTrack isAriaHidden={true} />
      </div>
    </aside>
  );
}

export default HotelMarquee;
