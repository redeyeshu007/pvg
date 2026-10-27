import { Navbar, Footer } from "@/components/layout";
import { HeroSection } from "@/components/hero/HeroSection";
import { HotelMarquee } from "@/components/hero/HotelMarquee";
import { RoomsSuitesSection } from "@/components/rooms/RoomsSuitesSection";
import { FacilitiesSection } from "@/components/facilities/FacilitiesSection";
import { ExperiencesSection } from "@/components/experiences/ExperiencesSection";
import { AboutSection } from "@/components/about/AboutSection";

/**
 * Pavan Vela Grand - Homepage
 *
 * Single-Page Hotel Landing Experience:
 * - Premium White Navbar with official wordmark, configurable navigation, and single "Book a Room" CTA.
 * - Dynamic Hero Section with SEO-friendly H1, verified supporting copy, and 5-image automatic carousel.
 * - Premium Infinite Scrolling Marquee strip featuring verified hotel amenities & stay highlights.
 * - Rooms & Suites Carousel Section (#stay & #suites) with 3-card sliding interaction and genuine photos.
 * - Facilities Section (#facilities) showcasing verified Covered Parking and Peaceful Surroundings.
 * - Experiences Section (#experiences) with 3-part storytelling journey.
 * - About Section (#about) with editorial storytelling across 3 chapters: The Place, The Purpose, The Promise.
 * - Luxury Footer (#footer) with verified contact details, location, and quick navigation.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#182230]">
      {/* 1. Premium Website Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Infinite Scrolling Marquee Strip */}
        <HotelMarquee />

        {/* 4. Rooms & Suites Section (#stay / #suites) */}
        <RoomsSuitesSection />

        {/* 5. Facilities Section (#facilities) */}
        <FacilitiesSection />

        {/* 6. Experiences Section (#experiences) */}
        <ExperiencesSection />

        {/* 7. About Section (#about) */}
        <AboutSection />
      </main>

      {/* 8. Luxury Hotel Footer (#footer) */}
      <Footer />
    </div>
  );
}
