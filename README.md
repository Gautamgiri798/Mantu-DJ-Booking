<div align="center">

# 🎧 DJ MANTU — EVENT SOUND & ENTERTAINMENT PLATFORM

### _Turn Every Moment Into An Unforgettable Memory_

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_Neon-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <b>A production-ready, full-stack booking platform and management suite built for DJ Mantu — Brajrajnagar's Premium DJ & Event Sound Specialist, serving Western Odisha and Eastern Chhattisgarh.</b>
</p>

<p align="center">
  <a href="#-executive-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture--data-flow">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-admin-portal">Admin Portal</a> •
  <a href="#-api-endpoints-overview">API Reference</a> •
  <a href="#-legal--compliance">Legal</a>
</p>

---

</div>

## 🌟 Executive Overview

**DJ Mantu Event Booking Platform** is an enterprise-grade digital portal engineered to streamline inquiries, booking workflows, and client management for weddings, royal baraats, receptions, sangeets, college festivals, corporate galas, and private celebrations across Brajrajnagar, Jharsuguda, Sambalpur, Rourkela, Western Odisha, and Eastern Chhattisgarh.

Powered by **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **PostgreSQL (via Prisma ORM & Neon DB)**, this application pairs a high-voltage obsidian dark-mode aesthetic with mission-critical operational tools:

- **⚡ Instant Client Inquiries**: 4-step booking wizard with direct WhatsApp & Call consultation integration.
- **📅 Real-Time Availability Engine**: Interactive monthly calendar with instant date-conflict prevention and offline booking recording.
- **🖼️ Edge-to-Edge Lightbox Media Suite**: Unified gallery supporting high-res photos and video embeds with zero letterboxing void and dual aspect modes.
- **🛡️ Executive Administration Suite (`/admin`)**: Analytics KPI dashboard, full in-place booking dossier editor, direct offline booking logging, calendar blackout controls, responsive media uploads, and live website CMS with automatic ISR cache invalidation.
- **⚖️ Legal & Contract Suite**: Dedicated Terms of Booking & Performance Agreement (`/terms`) and Digital Personal Data Protection (DPDP) Privacy Policy (`/privacy`).

---

## ✨ Key Features

### 🌐 Public Client Experience

- **⚡ 4-Step Interactive Booking Wizard (`/book`)**:
  - **Step 1: Event Schedule & Location**: Event type, date, time slot, and venue city/address.
  - **Step 2: Audio & Visual Package**: Tiered sound setups (Club, Wedding, Arena Concert) with full gear specs.
  - **Step 3: SFX & Atmosphere Add-Ons**: Dry Ice Low Fog Clouds, Cold Pyro Sparkulars, and DMX Truss moving head beams.
  - **Step 4: Contact & Instant Dispatch**: Name, mobile phone, custom celebration notes, and one-click WhatsApp forwarding with pre-formatted event specs.

- **💬 Direct WhatsApp & Phone Consultation Model**:
  - High-conversion call-to-actions: **"WhatsApp for Details"** and **"Call for Details"** across all package tiers and service listings.
  - Pre-filled WhatsApp chat messages with exact package or service titles for immediate personalized quotation.
  - Dedicated direct hotline: **`+91 9337828746`**.

- **🎧 Comprehensive Event Services Catalog (`/services`)**:
  - **Royal Wedding & Baraat DJ**: High-impact mobile setup for baraat processions, royal entry anthems, and multi-genre dance anthems (Sambalpuri, Odia, Chhattisgarhi, Nagpuri, Bollywood, Punjabi & EDM).
  - **Private Parties & Celebrations**: High-energy sound, ambient party lighting, and custom curated playlists for birthdays, anniversaries, and farmhouse nights.
  - **College Cultural Fests & EDM Nights**: Line array audio reinforcement, multi-beam synchronized lasers, and high-capacity crowd control sound.
  - **Wedding Reception Gala**: Sophisticated dinner lounge melodies transitioning smoothly into explosive family dance celebrations.
  - **Dry Ice Low Fog & Cold Pyro Sparks**: Fairy-tale cloud entries and indoor-safe cold sparkular pyrotechnics.

- **📅 Real-Time Availability Calendar (`/availability`)**:
  - Interactive monthly calendar displaying **Available**, **Booked**, **Pending**, and **Admin Blocked** dates.
  - Real-time conflict protection preventing double bookings on identical dates.
  - One-click date selection directly pre-fills the booking wizard.

- **🖼️ Unified Visual & Video Showcase (`/gallery`)**:
  - Filter items by event category (_Weddings, Receptions, Parties, Birthdays, Corporate_).
  - **Zero-Blank-Space Lightbox**: Photos fit the viewport edge-to-edge without unsightly black letterbox voids.
  - **Dual Display Modes**: Seamlessly toggle between **Fill Frame (Full Widescreen Immersive)** and **Fit Photo (Snug Uncropped Original)**.
  - **Ambient Glow Backdrop**: Soft, color-matching blurred ambient reflection behind images for an ultra-premium visual feel.
  - **Embedded Video Playback**: Smooth playback for YouTube embeds and uploaded MP4 performance recordings.
  - **Hover-Based Asset Prefetching**: High-resolution assets prefetch into browser memory on thumbnail hover for instantaneous modal opening.

- **📜 Legal & Compliance Pages**:
  - **Terms of Booking & Performance Agreement (`/terms`)**: 8-section legal framework covering booking confirmation, payment schedules, technical & power riders, cancellation & refund policies, outdoor weather protocols, sound level compliance, damage liabilities, and force majeure.
  - **Privacy Policy (`/privacy`)**: Digital Personal Data Protection (DPDP) Act compliant documentation detailing data collection, purpose of use, phone/WhatsApp communication policies, security protocols, and client rights.

- **💬 Floating WhatsApp Concierge**:
  - Pulsing neon WhatsApp quick-action widget floating seamlessly across every page for instant customer access.

- **🎨 Dark-Mode Cyberpunk / Obsidian Aesthetics**:
  - Permanent dark theme built on deep obsidian tones (`#08080C`), electric violet accents, hot pink gradients, and frosted glass panels (`glass-panel`).
  - 100% responsive across mobile phones (360px+), tablets, laptops, and ultra-wide desktop monitors.

---

### 🛡️ Executive Administration Suite (`/admin`)

- **📊 Real-Time Analytics Dashboard**:
  - Key Performance Indicators: Total Inquiries, Confirmed Bookings, Pipeline Volume, and Conversion Rates.
  - Activity stream featuring recent booking requests with quick-action contact shortcuts.

- **📑 Full-Control Booking Lifecycle & Dossier Editor (`/admin/bookings`)**:
  - Full status lifecycle management: `PENDING` ➔ `CONTACTED` ➔ `CONFIRMED` ➔ `COMPLETED` ➔ `CANCELLED`.
  - Search by client name, mobile phone number, or booking reference code (`DJ-YYYY-XXX`).
  - Filter bookings by status tab with real-time badge counts.
  - **Comprehensive Slide-Over Booking Dossier**: In-place editing for **every option** — Client Name, Phone, WhatsApp, Occasion / Event Type, Event Date, Performance Hours, Venue / Street Address, City / Town, Agreed Amount, Special Music Instructions, and Private Owner Notes.
  - **Single-Click Real-Time Sync**: Instant database update (`PATCH /api/admin/bookings`), live UI refresh, and automatic public availability calendar date-lock synchronization.
  - Quick-action **Call Client** and **WhatsApp Chat** buttons directly embedded in the dossier.

- **📆 Interactive Calendar & Offline Booking Engine (`/admin/calendar`)**:
  - Monthly calendar overview with color-coded date statuses (`BOOKED`, `PENDING`, `AVAILABLE`, `BLOCKED`).
  - **Direct Offline Booking Logging**: Record phone or walk-in bookings on any date with separate Venue/Address and optional City fields.
  - **In-Place Booking Editing & Rescheduling**: Edit or reschedule existing bookings directly from the calendar modal without leaving the page.
  - One-click date blocking for private tour performances, personal leave, or sound gear maintenance.

- **📁 Responsive Media Upload & Gallery CMS (`/admin/gallery`)**:
  - Direct multipart file uploads (`/api/admin/upload`) saved locally to disk with timestamped filenames.
  - Dedicated mobile & desktop action bar for instant photo/video deletion and featured showcase toggling.
  - Clean slate database seed ready for fresh, authentic event uploads.

- **⚙️ Live Website Content CMS (`/admin/settings`)**:
  - Dynamically update Hero Headline, Subtitle, Brand Tagline, Artist Bio, Phone, WhatsApp, Base Location, and Service Areas.
  - **Instant Next.js ISR Route Invalidation (`revalidatePath`)**: Updates immediately reflect on the live public site without server restarts or rebuilds.
  - Automatic cache clearing for Redis and memory layers.

- **📦 Package & Service Catalog Management (`/admin/packages`, `/admin/services`)**:
  - Edit equipment lists, duration, sound specifications, and feature highlights for all sound packages and specialized event services.

---

## 🏗️ Architecture & Data Flow

```mermaid
flowchart TD
    %% 1. Clients Layer
    subgraph Clients["📱 Experience Layer"]
        Visitor["🌐 Public Visitor<br/>(Mobile, Tablet & Desktop)"]
        Admin["👑 System Admin<br/>(/admin Control Center)"]
    end

    %% 2. Next.js Fullstack Engine
    subgraph Engine["⚡ Next.js 16 Full-Stack Platform"]
        Frontend["🖥️ Presentation Layer<br/>• Dynamic Hero & Neon Trust Bar<br/>• Edge-to-Edge Lightbox Gallery<br/>• 4-Step Interactive Booking Wizard<br/>• Legal & Compliance Pages (/terms, /privacy)"]
        Services["🛡️ Application Services & Handlers<br/>• Booking Pipeline & Status Manager<br/>• Real-Time Date Availability Engine<br/>• Live CMS & Media Upload Dispatcher"]
        Auth["🔐 Security & Session Guard<br/>• Jose HTTP-Only JWT Cookies<br/>• Bcrypt Password Hashing"]
        ISR["🔄 On-Demand ISR Engine<br/>revalidatePath('/', 'layout')"]
    end

    %% 3. Storage & Persistence
    subgraph DataTier["💾 Persistence & Caching Tier"]
        DB[("🗄️ Prisma ORM<br/>PostgreSQL (Neon DB)")]
        Cache[("⚡ High-Speed Cache<br/>In-Memory / Redis")]
        Media["📁 Local Asset Store<br/>/public/uploads/"]
    end

    %% 4. External Communications
    subgraph External["🚀 External Integrations"]
        WhatsApp["💬 WhatsApp Business API<br/>Direct Lead & Inquiry Forwarding<br/>+91 9337828746"]
    end

    %% Clean Non-Crossing Data Flow
    Visitor -->|1. Browse, Check Dates & Inquire| Frontend
    Frontend -->|2. Submit Event Booking| Services
    Admin -->|Authenticate| Auth
    Auth -->|Authorize Operations| Services
    
    Services -->|Read / Write Data| DB
    Services -->|Cache & Invalidate| Cache
    Services -->|Store Media Files| Media
    Services -->|Trigger Instant Sync| ISR
    ISR -.->|Zero-Downtime Cache Update| Frontend
    
    Frontend -->|Direct Consultation| WhatsApp
    Services -->|One-Click Inquiry Forward| WhatsApp

    %% Styling for Premium Contrast
    classDef clientStyle fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#ffffff;
    classDef engineStyle fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef dataStyle fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef extStyle fill:#451a03,stroke:#fb923c,stroke-width:2px,color:#ffffff;

    class Visitor,Admin clientStyle;
    class Frontend,Services,Auth,ISR engineStyle;
    class DB,Cache,Media dataStyle;
    class WhatsApp extStyle;
```

### 🧩 Architectural Layer Breakdown

| Layer | Primary Technologies | Key Responsibilities & Capabilities |
| :--- | :--- | :--- |
| **Experience Layer** | React 19, Tailwind CSS v4, Lucide React | Mobile-first responsive views (`/`, `/gallery`, `/availability`, `/services`, `/packages`, `/book`, `/terms`, `/privacy`) and executive control portal (`/admin`). |
| **Core Application Engine** | Next.js 16 (App Router), Node.js | Edge-optimized Server Components, Route Handlers (`/api/*`), automated session validation, and on-demand ISR cache invalidation (`revalidatePath`). |
| **Persistence & Caching** | Prisma ORM 6, PostgreSQL (Neon DB), ioredis | Cloud relational storage with strict relations for bookings, customers, availability, gallery, and CMS settings, backed by in-memory / Redis caching. |
| **External Integrations** | WhatsApp Business API, Cloud CDN | High-conversion direct lead dispatch, automated pre-formatted WhatsApp chat payloads, and media streaming. |

---

## 💻 Tech Stack

| Category | Technology | Version / Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.3.4` (App Router, Server Actions, Route Handlers) |
| **UI Library** | [React](https://react.dev/) | `19.2.8` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.0` with CSS variables & `@theme` design tokens |
| **Icons & SFX** | [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Dynamic vector icons and celebratory confetti animations |
| **Database & ORM** | [Prisma ORM](https://www.prisma.io/) | `6.19.3` with **PostgreSQL** (Neon DB serverless connection pool) |
| **Caching Layer** | [ioredis](https://github.com/redis/ioredis) | Redis caching with automatic sub-millisecond in-memory fallback |
| **Authentication** | [Jose](https://github.com/panva/jose), [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Secure HTTP-only JWT cookies & password hashing |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.0` (Strict typing mode) |

---

## 📁 Project Structure

```
Mantu-DJ-Booking/
├── prisma/
│   ├── schema.prisma                  # PostgreSQL schema (Admin, Booking, Customer, Availability, Package, Service, Gallery, Settings)
│   └── seed.ts                        # Clean slate seed script (Admin user, website settings, default packages & services)
├── public/
│   ├── audio/                         # DJ mix track previews
│   ├── images/                        # Artist avatar, sound setup photos, logo
│   └── uploads/                       # User-uploaded gallery photos & video files
├── src/
│   ├── app/
│   │   ├── (public)/                  # Public views sharing top navigation & footer
│   │   │   ├── about/                 # Artist bio, equipment specs & experience
│   │   │   ├── availability/          # Real-time event date availability calendar
│   │   │   ├── book/                  # 4-step interactive booking wizard
│   │   │   ├── contact/               # Contact card, address & direct consultation links
│   │   │   ├── gallery/               # Unified zero-void lightbox gallery & video player
│   │   │   ├── packages/              # Sound & lighting package tiers
│   │   │   ├── privacy/               # Digital Personal Data Protection Privacy Policy
│   │   │   ├── services/              # Event services catalog & SFX details
│   │   │   ├── terms/                 # Terms of Booking & Performance Agreement
│   │   │   ├── layout.tsx             # Public shell (Navbar, Floating WhatsApp, Footer)
│   │   │   └── page.tsx               # High-energy homepage with live CMS sync
│   │   ├── admin/                     # Executive administrative portal
│   │   │   ├── (dashboard)/           # Authenticated admin dashboard
│   │   │   │   ├── bookings/          # Booking pipeline & slide-over dossier
│   │   │   │   ├── calendar/          # Date blackout & calendar manager
│   │   │   │   ├── customers/         # Customer directory & history
│   │   │   │   ├── gallery/           # Responsive gallery CMS & media uploads
│   │   │   │   ├── packages/          # Sound package editor & gear manager
│   │   │   │   ├── services/          # Service catalog & add-on manager
│   │   │   │   ├── settings/          # Live website copy & contact CMS
│   │   │   │   └── page.tsx           # Analytics overview with KPI counters
│   │   │   └── login/                 # Secure JWT login screen
│   │   ├── api/                       # API route handlers
│   │   │   ├── admin/                 # Protected endpoints (bookings, calendar, gallery, packages, services, settings, upload, cache)
│   │   │   ├── availability/          # Real-time date availability check
│   │   │   └── bookings/              # Public booking inquiry submission
│   │   ├── favicon.ico                # Site favicon
│   │   ├── globals.css                # Global styles, CSS variables, dark theme & animations
│   │   ├── layout.tsx                 # Root layout (fonts, metadata, viewport)
│   │   ├── robots.ts                  # SEO robots.txt generation
│   │   └── sitemap.ts                 # SEO sitemap generation
│   ├── components/                    # Reusable UI component library
│   │   ├── admin/                     # Admin-specific components
│   │   │   ├── AdminCalendarView.tsx  # Calendar blackout grid & status controls
│   │   │   ├── AdminSidebar.tsx       # Desktop & mobile admin navigation
│   │   │   ├── BookingManagementTable.tsx # Booking pipeline table & slide-over dossier
│   │   │   ├── GalleryManagementClient.tsx # Media upload form & responsive cards
│   │   │   ├── PackageManagementClient.tsx # Sound package editor
│   │   │   ├── ServiceManagementClient.tsx # Service catalog editor
│   │   │   └── WebsiteSettingsClient.tsx # Live CMS settings editor
│   │   ├── ArtistBioDisplay.tsx       # Artist biography & stats display
│   │   ├── ArtistHeadlinerCard.tsx    # Hero artist profile card
│   │   ├── AvailabilityChecker.tsx    # Interactive date availability calendar
│   │   ├── BookingWizard.tsx          # 4-step animated booking wizard
│   │   ├── FloatingWhatsApp.tsx       # Direct conversion WhatsApp floating CTA
│   │   ├── Footer.tsx                 # High-impact footer with service area badges
│   │   ├── GalleryLightbox.tsx        # Zero-blank-space photo & video lightbox
│   │   ├── Navbar.tsx                 # Responsive backdrop-blur navigation
│   │   ├── NavigationProgressBar.tsx  # Page transition progress indicator
│   │   ├── PackageCard.tsx            # Tiered package cards with feature lists
│   │   ├── ServiceIcons.tsx           # Custom SVG event category icons
│   │   ├── SocialIcons.tsx            # Social media vector links
│   │   └── SpecializedServicesGrid.tsx# Services page grid layout
│   └── lib/                           # Utility & infrastructure modules
│       ├── auth.ts                    # JWT session management & middleware
│       ├── data.ts                    # Cached data fetching (gallery, settings)
│       ├── prisma.ts                  # Prisma client singleton
│       ├── redis.ts                   # Redis cache with in-memory fallback
│       ├── services-data.ts           # Service catalog definitions & icon mapping
│       └── utils.ts                   # Helper utilities (WhatsApp links, formatting)
├── .env.example                       # Environment variables template
├── eslint.config.mjs                  # ESLint configuration
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies & scripts
├── postcss.config.mjs                 # PostCSS configuration for Tailwind
├── README.md                          # Project documentation
└── tsconfig.json                      # TypeScript configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL Database**: A hosted PostgreSQL instance (recommended: [Neon DB](https://neon.tech/), [Supabase](https://supabase.com/)) or a local PostgreSQL server.

### 2. Clone the Repository

```bash
git clone https://github.com/Gautamgiri798/Mantu-DJ-Booking.git
cd Mantu-DJ-Booking
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Configure your `.env` settings:

```env
# PostgreSQL Database Connection (Neon DB / Supabase / Local PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-example-pooler.region.aws.neon.tech/neondb?sslmode=require"

# JWT Secret for Admin Authentication Session Cookies
JWT_SECRET="dj-mantu-ultra-secure-session-key-2026-event-booking"

# Public Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional Redis Cache URL (falls back to memory if Redis is unavailable)
REDIS_URL="redis://127.0.0.1:6379"

# Admin Portal Authentication
ADMIN_EMAIL="admin@djmantu.com"
ADMIN_PASSWORD="admin123"
```

> 💡 _If Redis is not running locally, the application automatically uses an in-memory cache with zero configuration required._

### 5. Push Database Schema & Seed Clean Slate

Synchronize the database schema with your PostgreSQL database and seed default settings, packages, services, and the admin account:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

> 💡 _`npm run db:seed` provisions a clean slate without mock bookings or demo gallery items, leaving the platform ready for genuine production use._

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Portal

Access the administration suite at:

```
http://localhost:3000/admin
```

### Admin Credentials (Configurable in `.env`):

- **Email**: `admin@djmantu.com` (configured via `ADMIN_EMAIL` in `.env`)
- **Password**: `admin123` (change anytime via `ADMIN_PASSWORD` in `.env`)

> 💡 _You can change your password anytime by updating `ADMIN_PASSWORD="your-new-password"` in `.env`. The change takes effect immediately without needing to reset or wipe the database._

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Fetch availability data & bookings | Public |
| `POST` | `/api/bookings` | Submit a new event booking inquiry | Public |
| `GET` | `/api/availability/check` | Real-time date availability query | Public |
| `POST` | `/api/admin/login` | Authenticate admin and set JWT cookie | Public |
| `POST` | `/api/admin/logout` | Clear authentication session cookie | Admin |
| `GET` / `PATCH` / `DELETE` | `/api/admin/bookings` | Inspect, edit complete dossier, or delete bookings | Admin |
| `GET` / `POST` | `/api/admin/calendar` | Fetch schedule, block/unblock dates, log offline bookings & edit | Admin |
| `GET` / `POST` | `/api/admin/settings` | Retrieve or update live website content & branding | Admin |
| `GET` / `POST` | `/api/admin/gallery` | Retrieve or create gallery items | Admin |
| `POST` | `/api/admin/upload` | Direct multipart photo/video media upload | Admin |
| `GET` / `POST` | `/api/admin/packages` | Manage packages & equipment specs | Admin |
| `GET` / `POST` | `/api/admin/services` | Manage services & equipment catalog | Admin |
| `POST` | `/api/admin/cache` | Purge Redis / memory caches on demand | Admin |

---

## ⚖️ Legal & Compliance

The platform includes two dedicated, professionally drafted legal agreements accessible to all clients and event organizers:

1. **Terms of Booking & Performance Agreement (`/terms`)**:
   - **Section 1: Booking & Confirmation**: Non-refundable token deposit required to lock dates.
   - **Section 2: Payment Schedule**: 50% advance before sound setup dispatch; remaining 50% upon sound check before performance commences.
   - **Section 3: Technical & Power Rider**: Minimum dedicated 5 kVA – 15 kVA unshared generator / phase supply requirements.
   - **Section 4: Cancellation & Rescheduling**: Notice periods, forfeiture terms, and 12-month credit policy for unavoidable date shifts.
   - **Section 5: Outdoor Events & Inclement Weather**: Waterproof shelter mandates; right to power down in heavy rain/dust to protect equipment.
   - **Section 6: Sound Levels & Local Ordinances**: Compliance with local administration sound limits and police guidelines.
   - **Section 7: Equipment Safety & Client Liability**: Client responsibility for crowd/stage damage to sound gear, mixers, and lighting fixtures.
   - **Section 8: Force Majeure**: Protections against natural disasters, road blockades, or government bans.

2. **Privacy Policy (`/privacy`)**:
   - Compliant with India's **Digital Personal Data Protection (DPDP) Act**.
   - Outlines collection of client names, mobile numbers, event locations, and event dates.
   - Strict zero-sale and zero-spam policy for client contact data.
   - WhatsApp communication and quote delivery consent guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Crafted with passion, bass, and precision for <b>DJ Mantu</b>.</sub>
</div>
