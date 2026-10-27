import type { BookingActionConfig, BookingActionType } from "@/types/booking";
import { BRAND_CONFIG } from "./brand";

/**
 * Future Booking Actions Configuration
 *
 * Defines the configuration boundaries for the two planned primary actions:
 * 1. Book a Table
 * 2. Book a Room
 *
 * NOTE: No booking UI, buttons, forms, or mock transaction engines are implemented
 * in this setup step. The actual workflows will be attached in a subsequent task.
 */
export const BOOKING_ACTIONS: Record<BookingActionType, BookingActionConfig> = {
  BOOK_TABLE: {
    id: "BOOK_TABLE",
    label: "Book a Table",
    description: "Table reservation inquiry for dining at Pavan Vela Grand.",
    enabled: true,
    target: {
      type: "phone",
      destination: BRAND_CONFIG.contact.phoneTel,
    },
  },
  BOOK_ROOM: {
    id: "BOOK_ROOM",
    label: "Book a Room",
    description: "Room booking and accommodation inquiry at Pavan Vela Grand.",
    enabled: true,
    target: {
      type: "phone",
      destination: BRAND_CONFIG.contact.phoneTel,
    },
  },
};
