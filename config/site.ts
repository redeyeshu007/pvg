import type { SiteConfig } from "@/types/site";
import { BRAND_CONFIG } from "./brand";

/**
 * Pavan Vela Grand - Site and Environment Configuration
 *
 * Centralizes site URL, title templates, default descriptions,
 * and search engine indexing controls.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Ensure siteUrl has no trailing slash for consistent canonical and sitemap URLs
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Indexing is allowed only when explicitly enabled AND running in production
export const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" && IS_PRODUCTION;

export const SITE_CONFIG: SiteConfig = {
  name: BRAND_CONFIG.name,
  shortName: BRAND_CONFIG.shortName,
  url: SITE_URL,
  defaultTitle: "Pavan Vela Grand | Hotel in Dindigul with Covered Parking",
  titleTemplate: `%s | ${BRAND_CONFIG.name}`,
  defaultDescription:
    "Stay at Pavan Vela Grand on Palani Road Bypass, Dindigul. Explore comfortable rooms, peaceful surroundings and covered parking. Enquire directly.",
  locale: "en_IN",
  isProduction: IS_PRODUCTION,
  allowIndexing: ALLOW_INDEXING,
};
