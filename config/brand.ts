import type { BrandConfig } from "@/types/brand";

/**
 * Pavan Vela Grand (PVG) - Centralized Brand Configuration
 *
 * Single source of truth for verified brand identity, official contact details,
 * physical location, and core design tokens.
 *
 * GOVERNANCE RULES:
 * 1. Do NOT invent hotel amenities, room prices, guest reviews, ratings, or policies.
 * 2. Keep contact details and location centralized here so they are updated in one place.
 */
export const BRAND_CONFIG: BrandConfig = {
  name: "Pavan Vela Grand",
  shortName: "PVG",
  location: {
    addressLine: "Palani Road Bypass",
    city: "Dindigul",
    state: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
    formattedAddress: "Palani Road Bypass, Dindigul, Tamil Nadu, India",
  },
  contact: {
    phone: "89404 44648",
    phoneTel: "+918940444648",
  },
  design: {
    direction: "elegant, premium, modern, spacious, and trustworthy",
    palette: {
      white: "#FFFFFF",
      deepBlue: "#173B63",
      premiumGold: "#C5A572",
      lightBackground: "#F7F9FC",
      primaryText: "#182230",
    },
  },
};
