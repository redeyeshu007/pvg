/**
 * Navigation Configuration for Pavan Vela Grand
 *
 * Configurable navigation items and primary booking CTA.
 * Uses anchor links to prevent dead routes while full pages are prepared.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Suites", href: "#suites" },
  { label: "Facilities", href: "#facilities" },
  { label: "Experiences", href: "#experiences" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
] as const;

export const NAV_BOOKING_CTA = {
  label: "Book a Room",
  href: "tel:+918940444648",
  whatsappHref: "https://wa.me/918940444648?text=Hello%20Pavan%20Vela%20Grand%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.",
} as const;
