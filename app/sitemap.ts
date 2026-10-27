import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

/**
 * Next.js Metadata API - XML Sitemap Generator
 *
 * Exposes only verified, production-ready public routes.
 * Future pages will be added to this list as they are implemented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
