import type { Metadata } from "next";
import { SITE_CONFIG, SITE_URL, ALLOW_INDEXING } from "@/config/site";
import type { ConstructMetadataParams } from "@/types/seo";

/**
 * Normalizes an internal path into a clean, canonical absolute URL.
 * Automatically strips double slashes and ensures standard HTTPS formatting in production.
 */
export function constructCanonicalUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${cleanPath.replace(/\/+$/, "")}`;
}

/**
 * Generates type-safe Next.js Metadata for pages and layouts.
 *
 * Configures:
 * - Title & Title Template
 * - Description
 * - Canonical URLs (preventing duplicate content issues)
 * - Open Graph metadata
 * - Twitter summary card
 * - Production indexability controls based on environment configuration
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.defaultDescription,
  path = "/",
  ogImage,
  noIndex = !ALLOW_INDEXING,
}: ConstructMetadataParams = {}): Metadata {
  const canonicalUrl = constructCanonicalUrl(path);
  const resolvedTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.defaultTitle;

  const images = ogImage
    ? [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: title
      ? {
          default: resolvedTitle,
          template: SITE_CONFIG.titleTemplate,
        }
      : {
          default: SITE_CONFIG.defaultTitle,
          template: SITE_CONFIG.titleTemplate,
        },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      title: resolvedTitle,
      description,
      siteName: SITE_CONFIG.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
