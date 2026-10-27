import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display, Cinzel } from "next/font/google";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateHotelJsonLd, generateLocalBusinessJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#173B63",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hotelJsonLd = generateHotelJsonLd();
  const localBusinessJsonLd = generateLocalBusinessJsonLd();

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${cinzel.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={[hotelJsonLd, localBusinessJsonLd]} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-[var(--color-brand-bg)] text-[var(--color-brand-text)] selection:bg-[#C5A572]/20 selection:text-[#173B63]"
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
