/**
 * About Section Types for Pavan Vela Grand
 *
 * Narrative Structure: "The Place. The Purpose. The Promise."
 * 1. Editorial Story Hero
 * 2. Chapter One: The Place (Deep Navy)
 * 3. Chapter Two: The Purpose (White Background with 3 Editorial Highlights)
 * 4. Chapter Three: The Promise (Deep Navy with Timeline)
 * 5. Closing Conversion CTA
 */

export interface AboutHighlight {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly anchorHref?: string;
  readonly anchorLabel?: string;
}

export interface AboutPromiseStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface AboutHeroContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly caption: string;
}

export interface AboutPlaceContent {
  readonly chapterNumber: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly leadParagraph: string;
  readonly supportingParagraph: string;
  readonly locationBadge: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly caption: string;
}

export interface AboutPurposeContent {
  readonly chapterNumber: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
  readonly highlights: readonly AboutHighlight[];
}

export interface AboutPromiseContent {
  readonly chapterNumber: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
  readonly steps: readonly AboutPromiseStep[];
}

export interface AboutCtaContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
  readonly primaryActionLabel: string;
  readonly primaryActionHref: string;
  readonly whatsappLabel: string;
  readonly whatsappHref: string;
  readonly phoneDisplay: string;
  readonly locationNote: string;
}
