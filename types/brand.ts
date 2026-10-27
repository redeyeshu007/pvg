/**
 * Pavan Vela Grand (PVG) - Brand Types
 *
 * Defines strictly typed structures for hotel identity, location, contact,
 * and design tokens.
 */

export interface BrandLocation {
  readonly addressLine: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly countryCode: string;
  readonly formattedAddress: string;
}

export interface BrandContact {
  readonly phone: string;
  readonly phoneTel: string;
  readonly email?: string;
}

export interface BrandColorPalette {
  readonly white: string;
  readonly deepBlue: string;
  readonly premiumGold: string;
  readonly lightBackground: string;
  readonly primaryText: string;
}

export interface BrandDesign {
  readonly direction: string;
  readonly palette: BrandColorPalette;
}

export interface BrandConfig {
  readonly name: string;
  readonly shortName: string;
  readonly location: BrandLocation;
  readonly contact: BrandContact;
  readonly design: BrandDesign;
}
