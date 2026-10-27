/**
 * Future Booking Architecture - Types & Integration Boundaries
 *
 * Provides architectural contracts for future table and room reservation actions
 * without coupling to any specific engine, database, or payment service.
 */

export type BookingActionType = "BOOK_TABLE" | "BOOK_ROOM";

export type BookingTargetType =
  | "phone"
  | "whatsapp"
  | "modal"
  | "custom_flow"
  | "external";

export interface BookingTarget {
  readonly type: BookingTargetType;
  readonly destination?: string;
}

export interface BookingActionConfig {
  readonly id: BookingActionType;
  readonly label: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly target: BookingTarget;
}

/**
 * Modular data contracts for future reservation workflows.
 */
export interface TableReservationRequest {
  readonly guestName: string;
  readonly guestPhone: string;
  readonly date: string;
  readonly timeSlot: string;
  readonly partySize: number;
  readonly specialRequests?: string;
}

export interface RoomReservationRequest {
  readonly guestName: string;
  readonly guestPhone: string;
  readonly checkInDate: string;
  readonly checkOutDate: string;
  readonly adultsCount: number;
  readonly childrenCount?: number;
  readonly roomType?: string;
  readonly specialRequests?: string;
}
