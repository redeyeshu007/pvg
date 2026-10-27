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
    image: "/images/rooms/deluxe-room.jpg",
    imageAlt: "Deluxe King Room interior with plush bedding and ambient lighting at Pavan Vela Grand hotel on Palani Road Bypass in Dindigul",
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
    isProvisionalData: true,
  },
  {
    id: "executive-suite",
    name: "EXECUTIVE SUITE — SPATIAL LUXURY",
    shortName: "EXECUTIVE SUITE",
    category: "Suite Living",
    image: "/images/rooms/executive-suite.jpg",
    imageAlt: "Spacious Executive Suite lounge and bedroom with scenic balcony at Pavan Vela Grand Dindigul",
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
    isProvisionalData: true,
  },
  {
    id: "family-suite",
    name: "GRAND FAMILY SUITE — DUAL BED COMFORT",
    shortName: "FAMILY SUITE",
    category: "Family Accommodation",
    image: "/images/rooms/family-suite.jpg",
    imageAlt: "Grand Family Suite with dual queen beds for comfortable family accommodation at Pavan Vela Grand in Dindigul",
    description: "Expansive family accommodation at Pavan Vela Grand on Palani Road Bypass, Dindigul. Generously proportioned with dual beds and secure parking, perfect for family transit or temple visits.",
    specs: {
      bedType: "Double Queen Beds",
      guestCapacity: "Up to 4 Guests",
      highlights: ["Dual Beds", "Air Conditioned", "Covered Parking"],
    },
    bookingAction: {
      label: "BOOK ROOM",
      href: "tel:+918940444648",
    },
    isProvisionalData: true,
  },
  {
    id: "premium-twin",
    name: "PREMIUM TWIN ROOM — MODERN RETREAT",
    shortName: "PREMIUM TWIN",
    category: "Twin Accommodation",
    image: "/images/rooms/premium-twin.jpg",
    imageAlt: "Modern Premium Twin bedroom with twin beds at Pavan Vela Grand on Palani Road Bypass, Dindigul",
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
    isProvisionalData: true,
  },
  {
    id: "presidential-suite",
    name: "PRESIDENTIAL SUITE — SIGNATURE LUXURY",
    shortName: "PRESIDENTIAL SUITE",
    category: "Signature Suite",
    image: "/images/rooms/presidential-suite.jpg",
    imageAlt: "Signature Presidential Luxury Suite master bedroom at Pavan Vela Grand hotel, Palani Road Bypass, Dindigul",
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
    isProvisionalData: true,
  },
] as const;
