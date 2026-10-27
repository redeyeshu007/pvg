/**
 * Experience Section Types for Pavan Vela Grand
 *
 * Source of truth: Verified hotel information & SEO plan.
 * Captures the 3-part guest journey:
 * 1. Editorial Introduction
 * 2. Interactive Guest Journey (01 Arrive, 02 Unwind, 03 Settle In)
 * 3. Premium Booking CTA
 */

export interface ExperienceJourneyItem {
  readonly id: string;
  readonly step: string;
  readonly stage: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly tag: string;
}

export interface ExperienceIntroContent {
  readonly eyebrow: string;
  readonly location: string;
  readonly headlinePrimary: string;
  readonly headlineSecondary: string;
  readonly description: string;
  readonly ctaText: string;
  readonly image: string;
  readonly imageAlt: string;
}

export interface ExperienceCtaContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly description: string;
  readonly ctaText: string;
  readonly phone: string;
  readonly phoneTel: string;
  readonly whatsappHref: string;
  readonly locationNote: string;
}
