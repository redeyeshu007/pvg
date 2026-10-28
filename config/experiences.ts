import type {
  ExperienceIntroContent,
  ExperienceJourneyItem,
  ExperienceCtaContent,
} from "@/types/experience";

/**
 * Experiences Configuration for Pavan Vela Grand
 *
 * Source of truth:
 * - Pavan_Vela_Grand_Website_SEO_Plan.docx
 * - Verified property details on Palani Road Bypass, Dindigul
 *
 * Narrative Flow:
 * Section A: Editorial Introduction (Deep Navy #10263D)
 * Section B: Interactive Guest Journey (01 Arrive, 02 Unwind, 03 Settle In)
 * Section C: Premium Booking Call to Action (Deep Navy #10263D)
 */

export const EXPERIENCES_INTRO: ExperienceIntroContent = {
  eyebrow: "THE PVG EXPERIENCE",
  location: "DINDIGUL · TAMIL NADU",
  headlinePrimary: "More than a stay.",
  headlineSecondary: "A feeling of comfort.",
  description:
    "Discover the thoughtful conveniences and peaceful setting at Pavan Vela Grand, located on Palani Road Bypass, Dindigul. Explore our rooms and discover a comfortable place to stay in Dindigul.",
  ctaText: "Explore the Experience",
  image: "/images/experiences/pvg-experience-room.png",
  imageAlt:
    "Authentic Hotel PVG Grand spacious bedroom with double and single beds, ambient purple cove lighting, and air conditioning on Palani Road Bypass in Dindigul",
};

export const EXPERIENCES_JOURNEY_HEADER = {
  label: "YOUR JOURNEY",
  heading: "Every stay has its own story.",
  description:
    "From arriving in Dindigul to choosing the right room, discover the details that help make your stay at Pavan Vela Grand convenient and comfortable.",
} as const;

export const EXPERIENCES_JOURNEY_ITEMS: readonly ExperienceJourneyItem[] = [
  {
    id: "experience-arrive",
    step: "01",
    stage: "Arrive",
    title: "A Convenient Arrival",
    description:
      "Find Pavan Vela Grand on Palani Road Bypass, Dindigul, with a location that makes planning your stay straightforward.",
    image: "/images/hero/exterior.jpg",
    imageAlt:
      "Pavan Vela Grand hotel exterior in Dindigul, Tamil Nadu on Palani Road Bypass",
    tag: "EASY BYPASS ACCESS",
  },
  {
    id: "experience-unwind",
    step: "02",
    stage: "Unwind",
    title: "Find Your Room",
    description:
      "Explore the available rooms at Pavan Vela Grand and choose an option that suits your stay in Dindigul.",
    image: "/images/rooms/executive-suite.jpg",
    imageAlt:
      "Executive Suite interior with private balcony and scenic view at Pavan Vela Grand Dindigul",
    tag: "COMFORTABLE ROOMS",
  },
  {
    id: "experience-settle-in",
    step: "03",
    stage: "Settle In",
    title: "Thoughtful Convenience",
    description:
      "Enjoy the convenience of covered parking at Pavan Vela Grand, a practical consideration for guests arriving by car.",
    image: "/images/facilities/covered-parking.jpg",
    imageAlt:
      "Dedicated covered parking facility for guest vehicles at Pavan Vela Grand hotel in Dindigul",
    tag: "COVERED PARKING",
  },
] as const;

export const EXPERIENCES_CTA: ExperienceCtaContent = {
  eyebrow: "YOUR NEXT STAY STARTS HERE",
  headline: "Make Your Stay Yours.",
  description:
    "Looking for a hotel in Dindigul? Explore the available rooms at Pavan Vela Grand and contact our team to enquire about your stay.",
  ctaText: "Book a Room",
  phone: "89404 44648",
  phoneTel: "tel:+918940444648",
  whatsappHref:
    "https://wa.me/918940444648?text=Hello%20Pavan%20Vela%20Grand%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.",
  locationNote: "Palani Road Bypass, Dindigul, Tamil Nadu, India",
};
