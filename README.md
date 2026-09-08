<div align="center">

# 🎧 DJ MANTU — EVENT SOUND & ENTERTAINMENT PLATFORM

### _Turn Every Moment Into An Unforgettable Memory_

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <b>A production-ready, full-stack booking platform and management suite built for DJ Mantu — Western Odisha's premier open-format DJ, sound engineer, and arena-grade event producer.</b>
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
  <a href="#-contact--booking">Contact</a>
</p>

---

</div>

## 🌟 Executive Overview

**DJ Mantu Event Booking Platform** is an enterprise-grade digital portal engineered to streamline the booking and management of weddings, grand receptions, sangeets, college festivals, corporate galas, and VIP celebrations.

Powered by **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**, this application marries modern dark-mode cyberpunk aesthetics with mission-critical features:

- **Instant Client Onboarding**: 4-step wizard with consultation preferences and direct WhatsApp & Call lead generation.
- **Real-Time Date Availability Engine**: Visual booking calendar with instant conflict prevention.
- **Edge-to-Edge Lightbox Media Suite**: Unified gallery supporting high-res photos and video embeds with zero letterboxing.
- **Executive Administration Suite (`/admin`)**: Analytics, booking status pipeline, calendar blocking, direct media uploads, and live website CMS with automatic ISR cache invalidation.

---

## ✨ Key Features

### 🌐 Public Client Experience

- **⚡ Multi-Step Interactive Booking Wizard (`/book`)**:
  - Step 1: Event type, date, time slot, venue city, and guest count.
  - Step 2: Tiered sound & lighting package selection (Club, Wedding, Arena).
  - Step 3: SFX add-ons (Dry Ice Cloud Fog, Cold Pyro Sparkulars, DMX Truss lighting).
  - Step 4: Customer verification, celebration scale / discussion preferences, celebratory confetti, and one-click WhatsApp forwarding with pre-formatted event specs.

- **💬 Direct WhatsApp & Call Consultation Model**:
  - Transparent tailored inquiries: Replaced static public price tags with direct **WhatsApp for Details** and **Call for Details** action buttons across every package card and service item.
  - Pre-filled WhatsApp chat messages with exact package or service titles for seamless client conversion.

- **🎧 Comprehensive Event Services Catalog (`/services`)**:
  - **Royal Wedding & Baraat DJ**: Laptop setup for baraats, grand entry music for bride and groom, and regional festive hits (Sambalpuri, Chhattisgarhi, Nagpuri, Odia, Punjabi & Bollywood).
  - **Private Party**: High-energy sound, ambient party lighting, and custom playlists for birthdays, anniversaries, and farmhouse celebrations.
  - **College Cultural Fests**: Festival-scale line array audio, high-power multi-beam lasers, and campus crowd EDM fests.
  - **Wedding Reception Gala**: Sophisticated dinner melodies transitioning smoothly into explosive family dance beats.
  - **Dry Ice Low Fog & Cold Pyro Sparks**: Fairy-tale cloud entries and indoor-safe cold sparkular pyrotechnics.

- **📅 Real-Time Availability Calendar (`/availability`)**:
  - Interactive monthly calendar showing **Available**, **Booked**, **Pending**, and **Blocked** dates.
  - Real-time conflict protection preventing double bookings on the same date.
  - One-click date selection that directly prefills the booking wizard.

- **🖼️ Unified Visual & Video Gallery (`/gallery`)**:
  - Filter items by category (_Weddings, Receptions, Parties, Birthdays, Corporate_).
  - **Zero-Blank-Space Lightbox**: Photos fit the frame edge-to-edge with no dark letterbox voids.
  - **Dual Display Modes**: Toggle between **Fill Frame (Full Widescreen)** and **Fit Photo (Snug uncropped frame)**.
  - **Ambient Glow Backdrop**: Soft, color-matching blurred ambient reflection behind images for an ultra-premium visual feel.
  - **Embedded Video Player**: Smooth playback for YouTube URLs and direct uploaded MP4 videos.
  - **Hover-Based Asset Prefetching**: High-resolution assets prefetch into browser memory on thumbnail hover for instantaneous lightbox opening.

- **💬 Floating WhatsApp Concierge**:
  - Animated, responsive WhatsApp CTA widget allowing instant customer communication from any page on the site.

- **🎨 Dark-Mode Cyberpunk / Obsidian Aesthetics**:
  - Permanent dark theme with deep obsidian backgrounds (`#08080C`), electric violet accents, hot pink gradients, and frosted glass cards (`glass-panel`).
  - Animated neon trust bar with live equalizer, glowing badges, and multi-color gradient text.
  - Mobile-first, fully responsive design with fluid touch navigation and smooth micro-animations.

---

### 🛡️ Executive Administration Suite (`/admin`)

- **📊 Real-Time Analytics Dashboard**:
  - Key Performance Indicators: Total Bookings, Confirmed Revenue, Pending Inquiries, and Conversion Rates.
  - Live activity feed showing recent booking requests with instant action buttons.

- **📑 Full Booking Lifecycle Pipeline (`/admin/bookings`)**:
  - Track booking statuses: `PENDING` ➔ `CONTACTED` ➔ `CONFIRMED` ➔ `COMPLETED` ➔ `CANCELLED`.
  - Filter bookings by status, search by customer phone or booking reference code (`DJ-YYYY-XXX`).
  - View comprehensive event details, venue address, client notes, and selected package add-ons.

- **📆 Interactive Calendar Blocking (`/admin/calendar`)**:
  - Visual monthly calendar management.
  - One-click manual date blocking for private bookings, personal leave, or equipment maintenance.

- **📁 Direct Media Upload & Gallery CMS (`/admin/gallery`)**:
  - Direct multipart file uploads (`/api/admin/upload`) saved to disk with timestamped filenames.
  - Add, edit, reorder, or feature photos and video performances without touching code.

- **⚙️ Live Website Content Sync (`/admin/settings`)**:
  - Dynamically update Hero Headline, Subtitle, Brand Tagline, Bio, Address, Phone, WhatsApp, and Service Areas.
  - **Instant Next.js ISR Route Invalidation (`revalidatePath`)**: Edits immediately reflect on the live public site without server restarts or rebuilds.
  - Automatic cache clearing for Redis and memory layers.

- **📦 Package & Service Catalog Management (`/admin/packages`, `/admin/services`)**:
  - Update configurations, duration, equipment lists, and features for all sound packages and specialized event services.

---

## 🏗️ Architecture & Data Flow

```mermaid
flowchart TD
    %% 1. Clients Layer
    subgraph Clients["📱 Experience Layer"]
        Visitor["🌐 Public Visitor<br/>(Mobile & Desktop Web)"]
        Admin["👑 System Admin<br/>(/admin Control Center)"]
    end

    %% 2. Next.js Fullstack Engine
    subgraph Engine["⚡ Next.js 16 Full-Stack Platform"]
        Frontend["🖥️ Presentation Layer<br/>• Dynamic Hero & Neon Trust Bar<br/>• Edge-to-Edge Lightbox Gallery<br/>• 4-Step Interactive Booking Wizard"]
        Services["🛡️ Application Services & Handlers<br/>• Booking Pipeline & Status Manager<br/>• Real-Time Date Availability Engine<br/>• Live CMS & Media Upload Dispatcher"]
        Auth["🔐 Security & Session Guard<br/>• Jose HTTP-Only JWT Cookies<br/>• Bcrypt Password Hashing"]
        ISR["🔄 On-Demand ISR Engine<br/>revalidatePath('/', 'layout')"]
    end

    %% 3. Storage & Persistence
    subgraph DataTier["💾 Persistence & Caching Tier"]
        DB[("🗄️ Prisma ORM<br/>SQLite Database")]
        Cache[("⚡ High-Speed Cache<br/>In-Memory / Redis")]
        Media["📁 Local Asset Store<br/>/public/uploads/"]
    end

    %% 4. External Communications
    subgraph External["🚀 External Integrations"]
        WhatsApp["💬 WhatsApp Business API<br/>Direct Lead & Inquiry Forwarding"]
    end

    %% Clean Non-Crossing Data Flow
    Visitor -->|1. Browse & Inquire| Frontend
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
| **Experience Layer** | React 19, Tailwind CSS v4, Lucide | Mobile-first responsive views (`/`, `/gallery`, `/availability`, `/services`, `/book`) and high-security administrative control portal (`/admin`). |
| **Core Application Engine** | Next.js 16 (App Router), Node.js | Edge-optimized Server Components, Route Handlers (`/api/*`), automated session validation, and on-demand ISR cache invalidation (`revalidatePath`). |
| **Persistence & Caching** | Prisma ORM, SQLite (`dev.db`), ioredis | ACID-compliant relational storage for bookings, customers, media items, and CMS copy with sub-millisecond in-memory caching. |
| **External Integrations** | WhatsApp Business API, Cloud CDN | High-conversion direct lead dispatch, automated pre-formatted WhatsApp chat payloads, and media streaming. |

---

## 💻 Tech Stack

| Category           | Technology                                                                                            | Version / Details                                                |
| :----------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **Framework**      | [Next.js](https://nextjs.org/)                                                                        | `16.3.4` (App Router, Server Actions, Route Handlers)            |
| **UI Library**     | [React](https://react.dev/)                                                                           | `19.2.8`                                                         |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                                                              | `v4.0` with PostCSS plugin & CSS variables                       |
| **Icons & SFX**    | [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Dynamic vector icons and celebratory animations                  |
| **Database & ORM** | [Prisma ORM](https://www.prisma.io/)                                                                  | `6.19.3` with SQLite (Zero-config local setup, PostgreSQL ready) |
| **Caching Layer**  | [ioredis](https://github.com/redis/ioredis)                                                           | Redis caching with seamless in-memory fallback                   |
| **Authentication** | [Jose](https://github.com/panva/jose), [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)               | Secure HTTP-only JWT cookies & password hashing                  |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)                                                         | `5.0` (Strict typing)                                            |

---

## 📁 Project Structure

```
Mantu-DJ-Booking/
├── prisma/
│   ├── dev.db                       # SQLite database storage
│   ├── schema.prisma                # Database models (Admin, Booking, Customer, Availability, Package, Service, Gallery, Settings)
│   └── seed.ts                      # Database seed script with production-ready content
├── public/
│   ├── audio/                       # Audio previews & DJ mix tracks
│   ├── images/                      # Brand imagery, avatar & logos
│   └── uploads/                     # User-uploaded gallery photos & video files
├── src/
│   ├── app/
│   │   ├── (public)/                # Public routes with shared navigation layout
│   │   │   ├── about/               # Artist biography, gear specs & experience
│   │   │   ├── availability/        # Real-time event date availability calendar
│   │   │   ├── book/                # Interactive multi-step booking wizard
│   │   │   ├── contact/             # Contact card, address & direct WhatsApp link
│   │   │   ├── gallery/             # Unified visual gallery & video showcase
│   │   │   ├── packages/            # Sound & lighting package tiers
│   │   │   ├── services/            # Individual event services & SFX add-ons
│   │   │   ├── layout.tsx           # Public layout (Navbar, Floating WhatsApp, Footer)
│   │   │   └── page.tsx             # Dynamic homepage with live CMS settings
│   │   ├── admin/                   # Executive admin portal
│   │   │   ├── (dashboard)/         # Authenticated dashboard views
│   │   │   │   ├── bookings/        # Booking lifecycle pipeline & search
│   │   │   │   ├── calendar/        # Date blocking & scheduling view
│   │   │   │   ├── customers/       # Customer directory
│   │   │   │   ├── gallery/         # Direct media uploads & gallery CMS
│   │   │   │   ├── packages/        # Package configurations & equipment manager
│   │   │   │   ├── services/        # Service catalog manager
│   │   │   │   ├── settings/        # Live website copy & contact settings
│   │   │   │   └── page.tsx         # Dashboard overview with KPIs & analytics
│   │   │   └── login/               # Secure JWT login screen
│   │   ├── api/                     # API route handlers
│   │   │   ├── admin/               # Protected endpoints (bookings, calendar, gallery, packages, services, settings, upload, cache)
│   │   │   ├── availability/        # Date check endpoint (/api/availability/check)
│   │   │   └── bookings/            # Public booking inquiry submission
│   │   ├── favicon.ico              # Site favicon
│   │   ├── globals.css              # Global styles, CSS variables, dark theme & animations
│   │   ├── layout.tsx               # Root layout (fonts, metadata, dark mode init)
│   │   ├── robots.ts                # SEO robots.txt generation
│   │   └── sitemap.ts               # SEO sitemap generation
│   ├── components/                  # Reusable UI components
│   │   ├── admin/                   # Admin-specific components
│   │   │   ├── AdminCalendarView    # Interactive calendar blocking & management
│   │   │   ├── AdminSidebar         # Admin navigation sidebar
│   │   │   ├── BookingManagementTable # Booking pipeline data table
│   │   │   ├── GalleryManagementClient # Gallery upload & CMS client
│   │   │   ├── PackageManagementClient # Sound package editor
│   │   │   ├── ServiceManagementClient # Service catalog editor
│   │   │   └── WebsiteSettingsClient # Live CMS settings editor
│   │   ├── ArtistBioDisplay         # Artist biography & stats display
│   │   ├── ArtistHeadlinerCard      # Hero artist profile card
│   │   ├── AvailabilityChecker      # Interactive date availability calendar
│   │   ├── BookingWizard            # 4-step animated booking wizard
│   │   ├── FloatingWhatsApp         # Direct conversion WhatsApp floating CTA
│   │   ├── Footer                   # High-impact footer with service area badges
│   │   ├── GalleryLightbox          # Zero-blank-space photo & video lightbox
│   │   ├── Navbar                   # Responsive backdrop-blur navigation
│   │   ├── NavigationProgressBar    # Page transition progress indicator
│   │   ├── PackageCard              # Tiered package cards with feature lists
│   │   ├── ServiceIcons             # Custom SVG event category icons
│   │   ├── SocialIcons              # Social media vector links
│   │   └── SpecializedServicesGrid  # Services page grid layout
│   └── lib/                         # Utility & infrastructure modules
│       ├── auth.ts                  # JWT session management & middleware
│       ├── data.ts                  # Cached data fetching (gallery, settings)
│       ├── prisma.ts                # Prisma client singleton
│       ├── redis.ts                 # Redis cache with in-memory fallback
│       ├── services-data.ts         # Service catalog definitions & icon mapping
│       └── utils.ts                 # Helper utilities (WhatsApp links, formatting)
├── .env.example                     # Environment variables template
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies & scripts
├── postcss.config.mjs               # PostCSS configuration for Tailwind
├── README.md                        # Project documentation
└── tsconfig.json                    # TypeScript configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

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

Default `.env` configuration:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dj-mantu-ultra-secure-session-key-2026-event-booking"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
REDIS_URL="redis://127.0.0.1:6379"

# Admin Portal Authentication
ADMIN_EMAIL="admin@djmantu.com"
ADMIN_PASSWORD="admin123"
```

_(Note: If Redis is not running locally, the application automatically uses an in-memory cache)._

### 5. Setup Database & Seed Initial Content

Generate the Prisma Client and seed the database with initial settings, sound packages, services, and default admin credentials:

```bash
npx prisma generate
npm run db:seed
```

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

| Method         | Endpoint                  | Description                               | Access |
| :------------- | :------------------------ | :---------------------------------------- | :----- |
| `GET`          | `/api/bookings`           | Fetch availability data & bookings        | Public |
| `POST`         | `/api/bookings`           | Submit a new event booking inquiry        | Public |
| `GET`          | `/api/availability/check` | Real-time date availability query         | Public |
| `POST`         | `/api/admin/login`        | Authenticate admin and set JWT cookie     | Public |
| `POST`         | `/api/admin/logout`       | Clear authentication session              | Admin  |
| `GET` / `POST` | `/api/admin/settings`     | Retrieve or update live website settings  | Admin  |
| `GET` / `POST` | `/api/admin/gallery`      | Retrieve or create gallery items          | Admin  |
| `POST`         | `/api/admin/upload`       | Direct multipart photo/video media upload | Admin  |
| `GET` / `POST` | `/api/admin/packages`     | Manage packages & equipment specs         | Admin  |
| `GET` / `POST` | `/api/admin/services`     | Manage services & equipment catalog       | Admin  |
| `GET` / `POST` | `/api/admin/calendar`     | Manage calendar bookings & date blocks    | Admin  |
| `POST`         | `/api/admin/cache`        | Purge Redis / memory caches on demand     | Admin  |

---

## 🚢 Production Deployment

### Deploying to Vercel

1. Push your latest code to your GitHub repository.
2. Import the project into [Vercel](https://vercel.com/new).
3. Configure environment variables in the Vercel Dashboard (`JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, etc.).
4. For persistent storage in production:
   - Connect a cloud database (e.g. Supabase, Neon PostgreSQL, or PlanetScale) and update the datasource provider in `prisma/schema.prisma`.
   - Run Prisma migrations:
     ```bash
     npx prisma migrate deploy
     ```

---


## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Crafted with passion, bass, and precision for <b>DJ Mantu</b>.</sub>
</div>
