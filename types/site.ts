/**
 * Site metadata and environment configuration types.
 */

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly url: string;
  readonly defaultTitle: string;
  readonly titleTemplate: string;
  readonly defaultDescription: string;
  readonly locale: string;
  readonly isProduction: boolean;
  readonly allowIndexing: boolean;
}
