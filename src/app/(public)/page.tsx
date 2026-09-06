import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Disc3,
  CalendarCheck,
  Star,
  ShieldCheck,
  Music4,
  Flame,
  CheckCircle,
  MapPin,
  HeartHandshake,
  Users,
  Volume2,
  Zap,
  Sliders,
  Phone,
} from 'lucide-react';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import GalleryLightbox from '@/components/GalleryLightbox';
import PackageCard from '@/components/PackageCard';
import { createWhatsAppLink } from '@/lib/utils';
import {
  getWebsiteSettingsMap,
  getCachedServices,
  getCachedPackages,
  getCachedGallery,
} from '@/lib/data';
import { WhatsAppIcon } from '@/components/SocialIcons';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch cached dynamic content (Redis with in-memory fallback)
  const [services, packages, galleryItems, settingsMap] = await Promise.all([
    getCachedServices(6),
    getCachedPackages(4),
    getCachedGallery(9),
    getWebsiteSettingsMap(),
  ]);

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const tagline = settingsMap['tagline'] || "Rourkela's Premier DJ & Event Sound Specialist";
  const heroTitle = settingsMap['hero_title'] || 'Turn Every Moment Into An Unforgettable Memory';
  const heroSubtitle = settingsMap['hero_subtitle'] || 'Concert sound engineering, intelligent moving beam lights, and cinematic dry ice low fog tailored for Weddings, Sangeets & Mega Events in Rourkela and across Eastern India.';
  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const phone = settingsMap['phone'] || '+91 6372174006';
  const address = settingsMap['address'] || 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216';

  const waBookingLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I visited your website and would like to check availability and packages for an upcoming event.`
  );

  const eventCategories = [
    { name: 'Royal Weddings', tag: 'Baraat & Phere', icon: HeartHandshake, color: 'from-pink-500/20 to-purple-500/20' },
    { name: 'Receptions & Sangeet', tag: 'Grand Couple Entry', icon: Sparkles, color: 'from-purple-500/20 to-indigo-500/20' },
    { name: 'Birthday & Private Bashes', tag: 'Club Night Vibe', icon: Flame, color: 'from-amber-500/20 to-rose-500/20' },
    { name: 'College Festivals', tag: 'Open Air Rave', icon: Music4, color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'Corporate Galas', tag: 'Dinner & Dance', icon: Users, color: 'from-emerald-500/20 to-teal-500/20' },
    { name: 'Anniversary Parties', tag: 'Retro to Modern', icon: Disc3, color: 'from-violet-500/20 to-pink-500/20' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 sm:pt-20 pb-8 sm:pb-12">
        {/* Multilayered Ambient Concert Staging Light */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[400px] sm:h-[550px] bg-gradient-to-b from-purple-600/25 via-pink-600/15 to-transparent blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-900/20 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Top Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.2)] text-xs text-zinc-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-extrabold uppercase tracking-widest text-[11px] text-zinc-200">
              {tagline}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:inline-block" />
            <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider hidden sm:inline-block">
              2026 / 2027 Dates Open
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[1.08] sm:leading-[1.06] text-white font-heading whitespace-pre-line px-1">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed px-2">
            {heroSubtitle}
          </p>

          {/* CTAs - Luxury Concert Control Deck */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 max-w-xs sm:max-w-4xl mx-auto w-full">
            {/* 1. Primary Action: Book DJ Mantu */}
            <Link
              href="/book"
              className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider text-white whitespace-nowrap bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-400 shadow-[0_0_40px_rgba(217,70,239,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_55px_rgba(217,70,239,0.9)] hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/30 overflow-hidden w-full sm:w-auto"
            >
              {/* Animated Sheen Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
              
              {/* Spinning Vinyl Record Badge */}
              <div className="w-6 h-6 rounded-full bg-black/40 border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-180 transition-transform duration-700">
                <Disc3 className="w-3.5 h-3.5 text-pink-200" />
              </div>
              <span>Book {djName}</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 group-hover:bg-white/30 transition-all">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Link>

            {/* 2. Secondary Action: Check Availability */}
            <Link
              href="/availability"
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white whitespace-nowrap bg-gradient-to-b from-white/[0.12] to-white/[0.04] hover:from-white/[0.18] hover:to-white/[0.08] border border-white/25 hover:border-purple-400/70 shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] backdrop-blur-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 group-hover:bg-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-colors">
                <CalendarCheck className="w-3.5 h-3.5 text-purple-300" />
              </div>
              <span>Check Availability</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                Instant
              </span>
            </Link>

            {/* 3. Direct VIP WhatsApp Concierge */}
            <a
              href={waBookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-emerald-300 whitespace-nowrap bg-gradient-to-b from-emerald-500/20 to-emerald-950/60 hover:from-emerald-500/30 hover:to-emerald-900/70 border border-emerald-500/50 hover:border-emerald-400 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] backdrop-blur-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Unified Floating VIP Credential Console */}
          <div className="relative pt-6 flex items-center justify-center w-full">
            {/* Ambient Multi-Hue Stage Backlight */}
            <div className="absolute inset-0 max-w-3xl mx-auto h-14 bg-gradient-to-r from-cyan-500/20 via-purple-600/25 to-pink-600/20 blur-2xl rounded-full pointer-events-none" />

            {/* Glowing Border Wrap */}
            <div className="relative z-10 p-[1px] rounded-2xl sm:rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center justify-center gap-2 sm:gap-1 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl sm:rounded-full bg-zinc-950/90 backdrop-blur-2xl px-3 sm:px-6 py-2.5 text-xs text-zinc-300">
                {/* 1. Location & Tour Radar */}
                <div className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-white tracking-wide">
                    {address.split(',')[0] || 'Jharsuguda'}
                  </span>
                  <span className="text-zinc-400 font-medium">· Pan-Odisha</span>
                </div>

                {/* 2. Rating & Stars */}
                <div className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-extrabold text-amber-300 text-[11px] px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    4.9 / 5
                  </span>
                  <span className="text-zinc-300 font-medium">150+ Reviews</span>
                </div>

                {/* 3. Stage Experience */}
                <div className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 font-black text-[11px] shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                    <ShieldCheck className="w-3 h-3 text-purple-300" />
                    <span>10+ Years</span>
                  </span>
                  <span className="text-zinc-300 font-medium">650+ Events</span>
                </div>

                {/* 4. Live Equalizer Concert Acoustics */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 px-3 sm:px-4 py-1.5">
                  {/* Live Animated Equalizer */}
                  <div className="flex items-end gap-[3px] h-3.5 px-1 py-0.5 shrink-0">
                    <span className="w-1 bg-pink-400 rounded-full animate-mini-eq-1 shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
                    <span className="w-1 bg-fuchsia-400 rounded-full animate-mini-eq-2 shadow-[0_0_6px_rgba(217,70,239,0.8)]" />
                    <span className="w-1 bg-purple-400 rounded-full animate-mini-eq-3 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                    <span className="w-1 bg-pink-400 rounded-full animate-mini-eq-4 shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
                    <span className="w-1 bg-rose-400 rounded-full animate-mini-eq-5 shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 font-black text-[11px] shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    <Volume2 className="w-3 h-3 text-pink-300" />
                    <span>JBL & Pioneer</span>
                  </span>
                  <span className="text-zinc-400 font-medium hidden sm:inline">Acoustics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME AVAILABILITY CHECKER WIDGET */}
      {/* 2. REAL-TIME AVAILABILITY CHECKER WIDGET */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient Section Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-600/15 via-fuchsia-600/10 to-cyan-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] text-xs text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-extrabold uppercase tracking-widest text-[11px] text-zinc-200">
              Live Tour Calendar
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:inline-block" />
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider hidden sm:inline-block">
              Instant Verification
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight">
            Is DJ Mantu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-amber-200 drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]">
              Available On Your Date?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal">
            Select your event date and host city below for an immediate, real-time schedule verification.
          </p>
        </div>

        <AvailabilityChecker whatsapp={whatsapp} />
      </section>

      {/* 3. EVENT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Every Occasion Covered
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Tailored Experiences For Every Celebration
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            From high-voltage wedding baraats to corporate galas, sound and music are programmed specifically for your crowd.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {eventCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/services#${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                className="group relative rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-7 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/40"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">{cat.tag}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
              State-of-the-Art Production
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
              Featured Sound & Light Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            let features: string[] = [];
            try {
              features = JSON.parse(service.features);
            } catch {
              features = [];
            }

            return (
              <div
                key={service.id}
                className="group rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300"
              >
                {service.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent z-10" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-purple-300 border border-purple-500/30 z-20">
                      {service.category}
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      {features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase text-emerald-400 font-bold block">Details & Pricing</span>
                      <span className="text-xs font-semibold text-zinc-300">
                        WhatsApp / Call
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={createWhatsAppLink(
                          whatsapp,
                          `Hello ${djName}, I would like complete details and pricing for "${service.title}".`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-md shadow-emerald-950/30 transition-all"
                        title="WhatsApp for Details"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1 transition-all"
                        title="Call for Details"
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PACKAGES & PRICING */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Ambient Stage Lighting Background Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[400px] bg-gradient-to-b from-purple-600/15 via-pink-600/10 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/10 blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-1/3 -left-20 w-80 h-80 bg-purple-500/10 blur-3xl -z-10 rounded-full" />

        {/* Header */}
        <div className="text-center space-y-4 mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>VIP Concert Audio & Lighting · 100% Guaranteed Setup</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading">
            Curated DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-400">Event Packages</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Battle-tested sound and intelligent lighting setups. Every package includes a professional sound engineer, on-site live setup, and 100% redundant backup hardware. Contact us directly on WhatsApp or call for full details.
          </p>
        </div>

        {/* 4-Pillar VIP Event Assurance Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">All-Inclusive Setups</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Setup & transport in radius</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm">
            <Volume2 className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">JBL & Pioneer Audio</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">High-definition punch</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm">
            <Zap className="w-4 h-4 text-pink-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">Redundant Backup</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Live spare consoles on site</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm">
            <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">Sound Engineer</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Live acoustics balancing</p>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch pt-2">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              whatsappNumber={whatsapp}
              phoneNumber={phone}
              djName={djName}
            />
          ))}
        </div>

        {/* Custom Rigs / Stadium Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 via-zinc-900/60 to-cyan-950/20 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Need A Bespoke Stadium Stage or Custom Effects?</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              We configure multi-tier line arrays, 40ft LED screens, CO2 cold cryo jets, low-lying dry ice fog, and pyrotechnics for multi-day weddings and festivals.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={waBookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/book"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors"
            >
              <span>Custom Inquiry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PORTFOLIO & MEDIA GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
              Live Atmosphere & Footage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
              Event Moments & Live Action
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300"
          >
            <span>Explore Full Gallery ({galleryItems.length}+ Media)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <GalleryLightbox items={galleryItems} />
      </section>


      {/* 9. FINAL HIGH-CONVERSION CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/40 p-8 sm:p-16 text-center space-y-6 shadow-2xl shadow-purple-950/80">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

          <span className="text-xs uppercase font-black tracking-widest px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Planning Your Next Event?
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Let&apos;s Make It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Legendary.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed">
            Dates during peak wedding and festival months book out weeks in advance. Check your date now or chat directly with DJ Mantu on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-950 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <span>Submit Booking Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={waBookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-2 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Now: {phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
