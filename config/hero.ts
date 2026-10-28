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
    id: "exterior-daylight",
    src: "/images/hero/pvg-building-exterior.png",
    alt: "Pavan Vela Grand (Hotel PVG Grand) building exterior on Palani Road Bypass in Dindigul",
    category: "Architecture & Facade",
    caption: "Pavan Vela Grand hotel building on Palani Road Bypass, Dindigul",
  },
  {
    id: "reception-lobby",
    src: "/images/hero/pvg-reception-lobby.png",
    alt: "Pavan Vela Grand hotel front desk and reception area with marble counter and welcoming hospitality lounge",
    category: "Reception & Front Desk",
    caption: "Welcoming reception lobby and guest arrival lounge",
  },
  {
    id: "entrance-ground",
    src: "/images/hero/pvg-entrance-ground.png",
    alt: "Ground entrance and facade of Hotel PVG Grand with decorative glass doors on Palani Road Bypass",
    category: "Entrance & Portico",
    caption: "Main hotel entrance and portico on Palani Road Bypass",
  },
  {
    id: "gold-emblem",
    src: "/images/hero/pvg-gold-emblem.png",
    alt: "Illuminated golden Hotel PVG Grand emblem plaque with sacred Vel and peacock insignia",
    category: "Hotel Emblem",
    caption: "Official golden Hotel PVG Grand insignia plaque",
  },
  {
    id: "facade-twilight",
    src: "/images/hero/pvg-facade-twilight.png",
    alt: "Hotel PVG Grand illuminated building facade with warm architectural spotlighting at evening",
    category: "Evening Ambiance",
    caption: "Evening architectural facade and illuminated rooftop sign",
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
