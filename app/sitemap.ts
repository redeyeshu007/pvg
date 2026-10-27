import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

/**
 * Next.js Metadata API - XML Sitemap Generator
 *
 * Exposes only verified, production-ready public routes.
 * Future pages will be added to this list as they are implemented.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = "2026-10-27T00:00:00.000Z";

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
