import { BRAND_CONFIG } from "@/config/brand";
import { SITE_URL } from "@/config/site";
import type { HotelJsonLdOptions, LocalBusinessJsonLdOptions } from "@/types/seo";

/**
 * Generates Schema.org Hotel / LodgingBusiness JSON-LD structured data.
 *
 * NOTE: Strictly adheres to verified brand information.
 * Does NOT fabricate star ratings, guest review counts, aggregate scores,
 * opening hours, or speculative pricing models.
 */
export function generateHotelJsonLd(options?: HotelJsonLdOptions) {
  const url = options?.siteUrl || SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${url}/#hotel`,
    name: BRAND_CONFIG.name,
    alternateName: BRAND_CONFIG.shortName,
    url: url,
    telephone: BRAND_CONFIG.contact.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND_CONFIG.location.addressLine,
      addressLocality: BRAND_CONFIG.location.city,
      addressRegion: BRAND_CONFIG.location.state,
      addressCountry: BRAND_CONFIG.location.countryCode,
    },
  };
}

/**
 * Generates Schema.org LocalBusiness JSON-LD structured data.
 * Enhances regional Google Local Search context for Palani Road Bypass, Dindigul.
 */
export function generateLocalBusinessJsonLd(options?: LocalBusinessJsonLdOptions) {
  const url = options?.siteUrl || SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#localbusiness`,
    name: BRAND_CONFIG.name,
    alternateName: BRAND_CONFIG.shortName,
    url: url,
    telephone: BRAND_CONFIG.contact.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND_CONFIG.location.addressLine,
      addressLocality: BRAND_CONFIG.location.city,
      addressRegion: BRAND_CONFIG.location.state,
      addressCountry: BRAND_CONFIG.location.countryCode,
    },
  };
}
