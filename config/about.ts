import type {
  AboutHeroContent,
  AboutPlaceContent,
  AboutPurposeContent,
  AboutPromiseContent,
  AboutCtaContent,
} from "@/types/about";

/**
 * About Section Configuration for Pavan Vela Grand
 *
 * Narrative Flow: "The Place. The Purpose. The Promise."
 * Source of truth: Pavan_Vela_Grand_Website_SEO_Plan.docx & verified brand facts.
 */

export const ABOUT_HERO: AboutHeroContent = {
  eyebrow: "GET TO KNOW US",
  headline: "A different perspective on staying.",
  description:
    "Discover Pavan Vela Grand, located on Palani Road Bypass, Dindigul, Tamil Nadu. Explore our available rooms and discover the thoughtful conveniences that shape your stay.",
  image: "/images/about/pvg-about-hero.png",
  imageAlt:
    "Authentic golden Hotel PVG Grand official insignia plaque with peacock, Vel, and rooster insignia mounted on textured stone facade on Palani Road Bypass in Dindigul",
  caption: "PAVAN VELA GRAND · DINDIGUL",
};

export const ABOUT_PLACE: AboutPlaceContent = {
  chapterNumber: "01",
  eyebrow: "THE PLACE",
  heading: "Rooted in Dindigul.",
  leadParagraph:
    "Located on Palani Road Bypass in Dindigul, Tamil Nadu, Pavan Vela Grand offers guests a clearly identifiable location when planning a hotel stay in the city.",
  supportingParagraph:
    "Positioned along the Palani Road Bypass corridor, the property provides straightforward vehicle access for travelers and families visiting Dindigul. Enjoy the ease of reaching your accommodation smoothly without navigating congested inner-town streets.",
  locationBadge: "DINDIGUL, TAMIL NADU",
  image: "/images/about/pvg-rooted-dindigul.png",
  imageAlt:
    "Authentic Hotel PVG Grand building facade with blue rooftop signs, glass entrance, and driveway on Palani Road Bypass in Dindigul",
  caption: "Palani Road Bypass, Dindigul",
};

export const ABOUT_PURPOSE: AboutPurposeContent = {
  chapterNumber: "02",
  eyebrow: "THE PURPOSE",
  heading: "Comfort is in the details.",
  description:
    "A comfortable stay begins with clear information, convenient choices, and an environment where guests can plan their time with confidence.",
  highlights: [
    {
      number: "01",
      title: "A Convenient Location",
      description:
        "Pavan Vela Grand is located on Palani Road Bypass, Dindigul, making its location easy to identify when planning your stay in Dindigul.",
      tag: "EASY BYPASS ACCESS",
      anchorHref: "#facilities",
      anchorLabel: "View Location Context",
    },
    {
      number: "02",
      title: "Thoughtful Convenience",
      description:
        "Covered parking is available at Pavan Vela Grand for guests arriving by car.",
      tag: "SHELTERED VEHICLE PARKING",
      anchorHref: "#facilities",
      anchorLabel: "Parking Information",
    },
    {
      number: "03",
      title: "Space to Settle In",
      description:
        "The property offers a relatively peaceful setting with less traffic disturbance around the hotel.",
      tag: "CALM ATMOSPHERE",
      anchorHref: "#suites",
      anchorLabel: "Explore Accommodations",
    },
  ],
};

export const ABOUT_PROMISE: AboutPromiseContent = {
  chapterNumber: "03",
  eyebrow: "THE PROMISE",
  heading: "A stay that starts with clarity.",
  description:
    "From exploring available rooms to making a booking enquiry, Pavan Vela Grand helps guests take the next step with clear information and direct contact.",
  steps: [
    {
      step: "01",
      title: "Explore Your Stay",
      description:
        "View the available rooms and their verified details across our accommodations catalogue.",
    },
    {
      step: "02",
      title: "Make an Enquiry",
      description:
        "Contact the hotel directly by phone or WhatsApp to ask about dates, room options, and availability.",
    },
    {
      step: "03",
      title: "Confirm Directly",
      description:
        "Receive direct confirmation from the hotel front desk team before finalizing your travel plans.",
    },
  ],
};

export const ABOUT_CTA: AboutCtaContent = {
  eyebrow: "YOUR NEXT STAY STARTS HERE",
  heading: "Discover Your Stay at Pavan Vela Grand.",
  description:
    "Looking for a hotel in Dindigul? Explore our available rooms and contact the hotel team to enquire about your stay.",
  primaryActionLabel: "Book a Room",
  primaryActionHref: "tel:+918940444648",
  whatsappLabel: "WhatsApp Enquiry",
  whatsappHref:
    "https://wa.me/918940444648?text=Hello%20Pavan%20Vela%20Grand%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.",
  phoneDisplay: "+91 89404 44648",
  locationNote: "Palani Road Bypass, Dindigul, Tamil Nadu, India",
};
