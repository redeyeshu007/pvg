import type { RoomAccommodation } from "@/types/room";

/**
 * Accommodation Configuration for Pavan Vela Grand
 *
 * Configurable collection of up to 5 room and suite accommodation options.
 * Accurately represents hotel accommodation options in Dindigul on Palani Road Bypass.
 *
 * GOVERNANCE & SEO RULES:
 * 1. Naturally incorporates local search phrases:
 *    - "Pavan Vela Grand Dindigul"
 *    - "Rooms in Dindigul"
 *    - "Hotel rooms in Dindigul"
 *    - "Accommodation in Dindigul"
 *    - "Hotel on Palani Road Bypass, Dindigul"
 * 2. Confirmed hotel features only: air conditioning, covered parking, quiet bypass location.
 * 3. Does NOT fabricate prices, ratings, review schema, or unverified amenities.
 * 4. NOTE: Specific room names, bed types, and capacities are provisional and flagged
 *    with `isProvisionalData: true` pending property management sign-off.
 */
export const ROOMS_ACCOMMODATIONS: readonly RoomAccommodation[] = [
  {
    id: "deluxe-room",
    name: "DELUXE KING ROOM — PEACEFUL STAY",
    shortName: "DELUXE KING ROOM",
    category: "Deluxe Accommodation",
    image: "/images/rooms/pvg-king-room.png",
    imageAlt: "Authentic Hotel PVG Grand Deluxe King Room with tufted headboard, branded PVG pillow covers, crisp bedding, air conditioning, and bedside telephone on Palani Road Bypass in Dindigul",
    description: "Comfortable hotel rooms in Dindigul situated along Palani Road Bypass. Thoughtfully designed for restful relaxation away from traffic disturbance, with air conditioning and secure on-site covered parking.",
    specs: {
      bedType: "King Bed",
      guestCapacity: "2 Guests",
      highlights: ["Air Conditioned", "Covered Parking", "Quiet Setting"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: false,
  },
  {
    id: "executive-suite",
    name: "EXECUTIVE SUITE — SPATIAL LUXURY",
    shortName: "EXECUTIVE SUITE",
    category: "Suite Living",
    image: "/images/rooms/pvg-executive-suite.png",
    imageAlt: "Authentic Hotel PVG Grand Executive Suite bedroom with spacious double and single beds, ambient cove lighting, air conditioning, and marble flooring on Palani Road Bypass in Dindigul",
    description: "Spacious suite accommodation in Dindigul tailored for business travelers and extended stays at Pavan Vela Grand. Features a dedicated lounge, air conditioning, and convenient on-site parking.",
    specs: {
      bedType: "King Bed",
      guestCapacity: "2-3 Guests",
      highlights: ["Dedicated Lounge", "Air Conditioned", "Covered Parking"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: false,
  },
  {
    id: "family-suite",
    name: "GRAND FAMILY SUITE — FOUR BED COMFORT",
    shortName: "FAMILY SUITE",
    category: "Family Accommodation",
    image: "/images/rooms/pvg-family-suite.png",
    imageAlt: "Authentic Hotel PVG Grand Family Suite with four individual beds, golden runners, air conditioning, and marble flooring on Palani Road Bypass in Dindigul",
    description: "Expansive family accommodation at Pavan Vela Grand on Palani Road Bypass, Dindigul. Generously proportioned with four individual beds and secure parking, perfect for family transit or temple visits.",
    specs: {
      bedType: "Four Individual Beds",
      guestCapacity: "Up to 4 Guests",
      highlights: ["Four Single Beds", "Air Conditioned", "Covered Parking"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: false,
  },
  {
    id: "premium-twin",
    name: "PREMIUM TWIN ROOM — MODERN RETREAT",
    shortName: "PREMIUM TWIN",
    category: "Twin Accommodation",
    image: "/images/rooms/pvg-twin-room.png",
    imageAlt: "Authentic Hotel PVG Grand Twin Bedroom with twin beds, ambient cove lighting, air conditioning, and LED TV on Palani Road Bypass in Dindigul",
    description: "Twin-bed hotel rooms in Dindigul ideal for colleagues, transit travelers, or friends. Enjoy quiet air-conditioned relaxation on Palani Road Bypass with dedicated on-site covered parking.",
    specs: {
      bedType: "Two Twin Beds",
      guestCapacity: "2 Guests",
      highlights: ["Two Single Beds", "Air Conditioned", "Covered Parking"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: false,
  },
  {
    id: "presidential-suite",
    name: "PRESIDENTIAL SUITE — SIGNATURE LUXURY",
    shortName: "PRESIDENTIAL SUITE",
    category: "Signature Suite",
    image: "/images/rooms/pvg-presidential-suite.png",
    imageAlt: "Authentic Hotel PVG Grand Presidential Suite bedroom with plush double bed, tufted headboard, decorative swan towels, air conditioning, and marble flooring on Palani Road Bypass in Dindigul",
    description: "Signature luxury suite accommodation at Pavan Vela Grand Dindigul. Expansive proportions, serene ambiance away from bypass traffic, air conditioning, and attentive hospitality.",
    specs: {
      bedType: "Master King Bed",
      guestCapacity: "2 Guests",
      highlights: ["Signature Suite", "Air Conditioned", "Covered Parking"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: false,
  },
] as const;
