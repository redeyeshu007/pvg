/**
 * Room and Suite Accommodation Types for Pavan Vela Grand
 *
 * Designed to cleanly separate presentation from data, enabling
 * direct substitution when the property provides finalized room inventories.
 */

export interface RoomSpec {
  readonly bedType?: string;
  readonly guestCapacity?: string;
  readonly highlights: readonly string[];
}

export interface RoomAccommodation {
  readonly id: string;
  readonly name: string;
  readonly shortName?: string;
  readonly category: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly description: string;
  readonly specs?: RoomSpec;
  readonly bookingAction: {
    readonly label: string;
    readonly href: string;
  };
  /**
   * Governance marker: Flag indicating provisional/editorial layout data
   * to be validated with property management before production rollout.
   */
  readonly isProvisionalData?: boolean;
}
