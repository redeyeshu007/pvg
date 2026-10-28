import type { FacilityItem } from "@/types/facility";

/**
 * Facilities Configuration for Pavan Vela Grand
 *
 * Source of truth: Pavan_Vela_Grand_Website_SEO_Plan.docx
 *
 * Confirmed facilities ONLY:
 * 1. Covered Parking
 * 2. Peaceful surroundings with less traffic disturbance
 *
 * Governance:
 * - Do NOT invent Wi-Fi, swimming pool, restaurant, 24h room service, or gym.
 * - Do NOT claim complete silence or soundproof rooms.
 */

export const FACILITIES_CONTENT = {
  kicker: "THOUGHTFUL COMFORT",
  heading: "Facilities at Pavan Vela Grand",
  description:
    "Discover the thoughtful conveniences and peaceful setting at Pavan Vela Grand, located on Palani Road Bypass, Dindigul.",
} as const;

export const FACILITIES_LIST: readonly FacilityItem[] = [
  {
    id: "covered-parking",
    title: "Covered Parking",
    kicker: "ON-SITE CONVENIENCE",
    description:
      "Enjoy the convenience of covered parking when visiting Pavan Vela Grand in Dindigul. Our dedicated on-site sheltered parking structure keeps your vehicle protected from the weather and easily accessible throughout your stay on Palani Road Bypass.",
    image: "/images/facilities/covered-parking.jpg",
    imageAlt:
      "Authentic on-site covered parking facility with shaded structure for guest vehicles at Pavan Vela Grand Dindigul",
    highlights: [
      "On-Site Covered Parking",
      "Direct & Easy Property Access",
      "Shaded Vehicle Protection",
    ],
    isVerified: true,
  },
  {
    id: "peaceful-setting",
    title: "A Peaceful Setting",
    kicker: "TRANQUIL LOCATION",
    description:
      "Enjoy a setting with less traffic disturbance at Pavan Vela Grand, Dindigul. Positioned along the Palani Road Bypass, the property offers a calm, open environment away from busy town congestion, ideal for restful transit and family stays.",
    image: "/images/facilities/pvg-peaceful-setting.png",
    imageAlt:
      "Authentic Hotel PVG Grand building facade with blue rooftop signs, spacious open courtyard, and peaceful setting along Palani Road Bypass in Dindigul",
    highlights: [
      "Noticeably Less Traffic Disturbance",
      "Scenic Palani Road Bypass Location",
      "Restful & Calm Atmosphere",
    ],
    isVerified: true,
  },
] as const;
