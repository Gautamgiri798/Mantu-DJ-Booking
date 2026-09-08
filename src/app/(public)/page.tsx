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
  CheckCircle,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  RoyalWeddingIcon,
  WeddingRingsIcon,
  BirthdayCakeIcon,
  GraduationCapIcon,
  BaraatProcessionIcon,
  AnniversaryMilestoneIcon,
} from '@/components/ServiceIcons';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import GalleryLightbox from '@/components/GalleryLightbox';
import { createWhatsAppLink } from '@/lib/utils';
import {
  getWebsiteSettingsMap,
  getCachedGallery,
} from '@/lib/data';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { SPECIALIZED_SERVICES, SERVICE_ICONS } from '@/lib/services-data';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch cached dynamic content (Redis with in-memory fallback)
  const [galleryItems, settingsMap] = await Promise.all([
    getCachedGallery(9),
    getWebsiteSettingsMap(),
  ]);

  const featuredServices = SPECIALIZED_SERVICES.slice(0, 6);

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const tagline = settingsMap['tagline'] || "Rourkela's Premier DJ & Event Sound Specialist";
  const heroTitle = settingsMap['hero_title'] || 'Turn Every Moment Into An Unforgettable Memory';
  const heroSubtitle = settingsMap['hero_subtitle'] || 'Concert sound engineering, intelligent moving beam lights, and cinematic dry ice low fog tailored for Weddings, Sangeets & Mega Events in Rourkela and across Western Odisha.';
  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const phone = settingsMap['phone'] || '+91 6372174006';
  const address = settingsMap['address'] || 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216';

  const waBookingLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I visited your website and would like to check availability and packages for an upcoming event.`
  );

  const eventCategories = [
    {
      name: 'Royal Weddings',
      tag: 'Baraat & Phere',
      desc: 'Bespoke bridal entry soundtracks, ceremonial acoustic clarity, and high-energy baraat dance sets.',
      highlights: ['Bridal Entry Sync', 'Mandap Acoustics', 'Dry Ice Low Fog'],
      icon: RoyalWeddingIcon,
      slug: 'wedding',
    },
    {
      name: 'Receptions & Sangeet',
      tag: 'Grand Couple Entry',
      desc: 'Precision choreography audio sync, ladkiwale vs ladkewale battles, and late-night afterparty mixes.',
      highlights: ['Choreography Cues', 'Family Dance Battles', 'Stage Beams'],
      icon: WeddingRingsIcon,
      slug: 'wedding',
    },
    {
      name: 'Birthday & Private Bashes',
      tag: 'Club Night Vibe',
      desc: 'Thumping bass, dynamic moving heads, and trending multi-genre tracks tailored for your crew.',
      highlights: ['Club Sound Rig', 'Bass Boost', 'Laser Strobe FX'],
      icon: BirthdayCakeIcon,
      slug: 'party',
    },
    {
      name: 'College Festivals',
      tag: 'Open Air Rave',
      desc: 'Arena-grade line array trussing, festival-style drops, Sambalpuri EDM, and electrifying crowd energy.',
      highlights: ['Line Array Power', 'Sambalpuri EDM', 'CO2 Jet Blast'],
      icon: GraduationCapIcon,
      slug: 'college',
    },
    {
      name: 'Baraat & Roadshows',
      tag: 'High-Decibel Mobile Sound',
      desc: 'Heavy-duty mobile sound truck, wireless roaming console, and thunderous non-stop procession rhythms.',
      highlights: ['Mobile Vehicle Rig', 'Wireless Console', 'Street Strobes'],
      icon: BaraatProcessionIcon,
      slug: 'baraat-dj',
    },
    {
      name: 'Anniversary Parties',
      tag: 'Retro to Modern',
      desc: 'Sophisticated acoustics blending timeless golden oldies with modern Bollywood and dancefloor classics.',
      highlights: ['Golden Era Hits', 'Ambient Warmth', 'Speech Audio'],
      icon: AnniversaryMilestoneIcon,
      slug: 'party',
    },
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

          {/* Trust & Credentials Neon Bar */}
          <div className="relative pt-6 flex items-center justify-center w-full">
            {/* Multi-color Ambient Underglow */}
            <div className="absolute inset-0 max-w-3xl mx-auto h-16 bg-gradient-to-r from-purple-600/15 via-pink-600/10 to-cyan-600/15 blur-3xl rounded-full pointer-events-none" />

            {/* Neon Glassmorphic Capsule */}
            <div className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl sm:rounded-full bg-zinc-950/80 border border-purple-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_60px_rgba(147,51,234,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <div className="grid grid-cols-2 lg:flex items-center justify-between p-2 sm:px-5 sm:py-3 text-xs gap-1">
                {/* 1. Location with Live Indicator */}
                <div className="flex items-center gap-2 px-3 py-2 justify-center lg:justify-start">
                  <span className="flex h-2 w-2 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="font-bold text-white tracking-wide">
                    {address.split(',')[0] || 'Jharsuguda'}
                  </span>
                  <span className="text-zinc-400 font-medium text-[11px]">· Pan-Odisha</span>
                </div>

                {/* 2. Star Rating with Yellow Stars */}
                <div className="flex items-center gap-2 px-3 py-2 justify-center lg:justify-start">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">4.9</span>
                  <span className="text-zinc-500 font-bold text-[11px]">/5</span>
                </div>

                {/* 3. Experience with Glowing Badge */}
                <div className="flex items-center gap-2 px-3 py-2 justify-center lg:justify-start">
                  <div className="w-7 h-7 rounded-full bg-purple-500/15 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">10+ Years</span>
                  <span className="text-zinc-400 font-medium text-[11px]">650+ Events</span>
                </div>

                {/* 4. Live Animated Equalizer & Touring Badge */}
                <div className="flex items-center gap-2.5 px-3 py-2 justify-center lg:justify-start">
                  {/* Animated Equalizer Bars */}
                  <div className="flex items-end gap-[2px] h-5">
                    <span className="w-[3px] bg-gradient-to-t from-pink-500 to-fuchsia-400 rounded-full animate-[equalize_0.8s_ease-in-out_infinite_alternate]" style={{ height: '60%' }} />
                    <span className="w-[3px] bg-gradient-to-t from-pink-500 to-fuchsia-400 rounded-full animate-[equalize_0.6s_ease-in-out_infinite_alternate_0.2s]" style={{ height: '100%' }} />
                    <span className="w-[3px] bg-gradient-to-t from-pink-500 to-fuchsia-400 rounded-full animate-[equalize_0.7s_ease-in-out_infinite_alternate_0.4s]" style={{ height: '40%' }} />
                    <span className="w-[3px] bg-gradient-to-t from-pink-500 to-fuchsia-400 rounded-full animate-[equalize_0.9s_ease-in-out_infinite_alternate_0.1s]" style={{ height: '80%' }} />
                    <span className="w-[3px] bg-gradient-to-t from-pink-500 to-fuchsia-400 rounded-full animate-[equalize_0.5s_ease-in-out_infinite_alternate_0.3s]" style={{ height: '55%' }} />
                  </div>

                  {/* Touring & Pioneer Neon Badge */}
                  <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/40 text-[11px] font-bold text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.25)] tracking-wide">
                    Touring & Pioneer
                  </span>

                  <span className="text-zinc-400 font-medium text-[11px]">Acoustics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div className="text-center space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Every Occasion Covered</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Tailored Experiences For{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Every Celebration
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From high-voltage wedding baraats and sangeet showdowns to college festivals and private bashes, sound and music are engineered specifically for your crowd.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {eventCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/services#${cat.slug}`}
                className="group relative rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/[0.08] hover:border-purple-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20 shadow-black/40 overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Header Row: Icon & Tag Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-500/15 group-hover:border-purple-500/40 group-hover:text-purple-300 shadow-sm">
                      <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/15 transition-colors">
                      {cat.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Feature Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.highlights.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center text-[10.5px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 group transition-colors"
          >
            <span>View All Services (14 Categories)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => {
            const Icon = SERVICE_ICONS[service.id];

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
                    {Icon && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-purple-300 z-20">
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[10px] font-bold text-pink-300 uppercase tracking-wider shrink-0">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">
                        What&apos;s Included:
                      </span>
                      {service.features.slice(0, 3).map((f, i) => (
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
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-950/30 transition-all hover:scale-105"
                        title="WhatsApp for Details"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-500 flex items-center gap-1.5 transition-all hover:scale-105"
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
