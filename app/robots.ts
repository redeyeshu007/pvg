import type { MetadataRoute } from "next";
import { SITE_CONFIG, ALLOW_INDEXING } from "@/config/site";

/**
 * Next.js Metadata API - Crawl Directives
 *
 * Directs search engine crawlers according to environment configuration.
 * Development and preview deployments disallow crawling to prevent duplicate/staging indexing.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
