import { z } from "zod";

/**
 * Validates international and Indian phone numbers:
 * Must have between 7 and 15 digits after stripping formatting characters.
 */
const PHONE_PATTERN = /^(\+?[0-9]{1,4}[\s-]?)?(\(?[0-9]{2,5}\)?[\s-]?)?[0-9]{3,4}[\s-]?[0-9]{3,5}$/;

/**
 * Strict schema for Pavan Vela Grand room booking enquiry.
 * Strictly limited to the 5 required fields. Any unexpected field is rejected.
 */
export const bookingEnquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full Name must be at least 2 characters")
      .max(100, "Full Name must not exceed 100 characters")
      .regex(
        /^[a-zA-Z\s.'\-]+$/,
        "Full Name may only contain letters, spaces, hyphens, periods, or apostrophes"
      ),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(120, "Email address must not exceed 120 characters"),
    contactNumber: z
      .string()
      .trim()
      .min(7, "Contact Number must be at least 7 digits")
      .max(25, "Contact Number is too long")
      .refine(
        (val) => {
          const digitsOnly = val.replace(/\D/g, "");
          return digitsOnly.length >= 7 && digitsOnly.length <= 15 && PHONE_PATTERN.test(val);
        },
        {
          message: "Please enter a valid phone number (Indian mobile or international format with 7–15 digits)",
        }
      ),
    numberOfRooms: z.coerce
      .number()
      .int("Number of Rooms must be a whole number")
      .min(1, "Number of Rooms must be at least 1")
      .max(30, "Number of Rooms cannot exceed 30"),
    totalGuests: z.coerce
      .number()
      .int("Total Number of Guests must be a whole number")
      .min(1, "Total Number of Guests must be at least 1")
      .max(100, "Total Number of Guests cannot exceed 100"),
  })
  .strict();

export type BookingEnquirySchemaType = z.infer<typeof bookingEnquirySchema>;
