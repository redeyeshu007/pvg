/**
 * Hero Section Configuration & Image Assets
 *
 * Sequence of 5 verified/development property photographs:
 * 1. Hotel exterior architecture
 * 2. Guest bedroom interior
 * 3. Luxury suite interior
 * 4. Reception and welcome lobby
 * 5. Dedicated covered parking facility
 */

export interface HeroSlide {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly category: string;
  readonly caption: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "exterior",
    src: "/images/hero/exterior.jpg",
    alt: "Pavan Vela Grand hotel exterior and architectural facade on Palani Road Bypass in Dindigul",
    category: "Architecture & Facade",
    caption: "Contemporary hotel architecture in a tranquil Dindigul setting",
  },
  {
    id: "guest-room",
    src: "/images/hero/guest-room.jpg",
    alt: "Comfortable guest bedroom with plush bedding and natural lighting at Pavan Vela Grand",
    category: "Guest Bedroom",
    caption: "Thoughtfully appointed guest rooms designed for restful comfort",
  },
  {
    id: "suite-interior",
    src: "/images/hero/suite-interior.jpg",
    alt: "Spacious luxury suite with private lounge and scenic hill views at Pavan Vela Grand Dindigul",
    category: "Luxury Suite",
    caption: "Expansive suite accommodations with scenic views and lounge seating",
  },
  {
    id: "reception-lobby",
    src: "/images/hero/reception-lobby.jpg",
    alt: "Pavan Vela Grand reception lobby with marble counter and welcoming hospitality lounge",
    category: "Reception & Lobby",
    caption: "Welcoming reception lobby offering attentive hospitality",
  },
  {
    id: "covered-parking",
    src: "/images/hero/covered-parking.jpg",
    alt: "Dedicated covered parking facility with shaded structure for vehicles at Pavan Vela Grand",
    category: "Covered Parking",
    caption: "Convenient on-site covered parking for peace of mind while travelling",
  },
] as const;

export const HERO_CONTENT = {
  kicker: "Palani Road Bypass • Dindigul",
  h1: "Pavan Vela Grand — Hotel in Dindigul",
  description:
    "Experience peaceful accommodation on Palani Road Bypass in Dindigul. Relax in comfort away from traffic disturbance, with convenient covered parking and warm, attentive hospitality.",
  ctaText: "Book a Room",
  ctaTel: "tel:+918940444648",
  ctaWhatsApp:
    "https://wa.me/918940444648?text=Hello%20Pavan%20Vela%20Grand%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.",
  trustPills: [
    { label: "Peaceful Setting", desc: "Low traffic disturbance" },
    { label: "Covered Parking", desc: "Secure on-site parking" },
    { label: "Direct Booking", desc: "Direct call & WhatsApp" },
  ],
} as const;
