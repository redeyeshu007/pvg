/**
 * SEO & Structured Data Types
 */

export interface ConstructMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface StructuredDataOptions {
  siteUrl?: string;
}

export type HotelJsonLdOptions = StructuredDataOptions;

export type LocalBusinessJsonLdOptions = StructuredDataOptions;
