# Pavan Vela Grand (PVG) — Frontend Codebase

Production-ready frontend architecture for **Pavan Vela Grand**, a premier hotel located on Palani Road Bypass, Dindigul, Tamil Nadu, India.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and modern web standards with a strict focus on local SEO, performance, accessibility, and modular scalability.

---

## 1. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 with customized luxury hotel design tokens
- **Animations (Foundation)**: Motion for React (`framer-motion` & `motion`)
- **Icons**: Lucide React
- **Validation**: Zod (for future form verification)
- **Code Quality**: ESLint 9 (Next.js Core Web Vitals & TypeScript rules)

---

## 2. Project Architecture

```
d:/JAVIX/Export/PVG/
├── app/                      # Next.js App Router (routes, layout, crawl configs)
│   ├── layout.tsx            # Global root layout, font loaders, JSON-LD injection
│   ├── page.tsx              # Minimal development status screen (no visual UI)
│   ├── robots.ts             # Search engine crawl directives
│   ├── sitemap.ts            # Dynamic XML sitemap generator
│   └── globals.css           # App-level CSS import bridge
├── config/                   # Centralized brand, site, and booking boundaries
│   ├── brand.ts              # Official brand identity, verified contact & location
│   ├── site.ts               # Canonical site URL, metadata defaults, indexing rule
│   ├── booking.ts            # Boundaries for "Book a Table" and "Book a Room"
│   └── index.ts              # Central configuration export
├── types/                    # Shared TypeScript interfaces and contracts
│   ├── brand.ts              # Brand, location, contact, and palette interfaces
│   ├── site.ts               # Site configuration interfaces
│   ├── seo.ts                # Metadata builder and JSON-LD options
│   ├── booking.ts            # Booking action and reservation draft contracts
│   └── index.ts              # Central types export
├── lib/                      # Core helpers and architectural foundations
│   ├── utils.ts              # Styling merge utility (cn) and string formatters
│   ├── seo/                  # Technical SEO engine
│   │   ├── metadata.ts       # Canonical URL builder & constructMetadata helper
│   │   ├── jsonld.ts         # Schema.org Hotel & LocalBusiness generators
│   │   └── index.ts
│   └── animation/            # Motion and interaction foundations
│       ├── variants.ts       # Timing curves, entrance variants, reduced-motion helper
│       └── index.ts
├── styles/                   # Design system & CSS tokens
│   ├── tokens.css            # Centralized brand color variables & accessibility tokens
│   └── globals.css           # Tailwind base layers, focus rings, smooth scroll rules
├── components/               # Component architecture (modularized by purpose)
│   ├── ui/                   # Reusable primitive UI elements (buttons, inputs, cards)
│   ├── layout/               # Global structural elements (future navbar, footer)
│   └── seo/                  # SEO server components (JsonLd script injector)
└── public/                   # Static assets
    ├── images/               # Future verified hotel photography
    └── icons/                # Favicon and brand SVG icons
```

---

## 3. Brand & Design Tokens

Official verified brand configuration is centralized in `config/brand.ts`:

- **Official Name**: Pavan Vela Grand
- **Short Name**: PVG
- **Location**: Palani Road Bypass, Dindigul, Tamil Nadu, India
- **Contact Number**: 89404 44648 (`+918940444648`)
- **Primary Design Tokens**:
  - White: `#FFFFFF` (`--color-brand-white`)
  - Deep Blue: `#173B63` (`--color-brand-blue`)
  - Premium Gold: `#C5A572` (`--color-brand-gold`)
  - Light Background: `#F7F9FC` (`--color-brand-bg`)
  - Primary Text: `#182230` (`--color-brand-text`)

> **Strict Governance Note**: Unverified amenities, room prices, guest reviews, ratings, and policies are strictly excluded until officially provided.

---

## 4. Technical SEO Foundation

- **Next.js Metadata API**: `lib/seo/metadata.ts` provides `constructMetadata()` for consistent titles, meta descriptions, canonical URLs, Open Graph images, and Twitter cards.
- **Canonical URLs**: `constructCanonicalUrl()` guarantees consistent absolute canonical links without duplicate trailing slashes.
- **Structured Data (JSON-LD)**:
  - `generateHotelJsonLd()`: Outputs Schema.org `Hotel` with verified name, location, and telephone.
  - `generateLocalBusinessJsonLd()`: Outputs Schema.org `LocalBusiness` for local Dindigul and Palani Road Bypass map/search indexing.
  - `components/seo/JsonLd.tsx`: Server Component for secure, zero-client script delivery.
- **Robots Directives (`app/robots.ts`)**: Respects the `NEXT_PUBLIC_ALLOW_INDEXING` flag. Crawling is disallowed in non-production environments to avoid indexing staging branches.
- **Sitemap (`app/sitemap.ts`)**: Dynamically indexes only verified, live public routes.

---

## 5. Future Booking Architecture

`config/booking.ts` and `types/booking.ts` define the integration boundaries for the two planned primary customer actions:
1. **Book a Table** (`BOOK_TABLE`)
2. **Book a Room** (`BOOK_ROOM`)

The contracts support pluggable destinations (phone, WhatsApp, modal drawer, or custom reservation workflow) without coupling the application to any premature backend or third-party booking vendor.

---

## 6. Environment Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable | Description | Default (Dev) | Production Target |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemaps, and canonical links. | `http://localhost:3000` | `https://pavanvelagrand.com` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Controls search engine crawling via `robots.ts`. | `false` | `true` |

---

## 7. Development & Build Commands

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Run TypeScript verification
npm run typecheck

# Run ESLint code quality checks
npm run lint

# Create production build
npm run build

# Start production server
npm run start
```
