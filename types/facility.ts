/**
 * Facility Types for Pavan Vela Grand
 *
 * Source of truth: Confirmed property facilities only.
 * 1. Covered Parking
 * 2. Peaceful Surroundings (less traffic disturbance)
 */

export interface FacilityItem {
  readonly id: string;
  readonly title: string;
  readonly kicker: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly highlights: readonly string[];
  readonly isVerified: boolean;
}
