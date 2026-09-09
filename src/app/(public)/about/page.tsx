import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Award,
  Flame,
  Radio,
  Zap,
  Sliders,
  Drum,
  Headphones,
  AudioLines,
  Volume2,
  Waves,
  Cloud,
  Laptop,
  ShieldCheck,
  Users,
  Clock,
  Gem,
  Compass,
  Truck,
  Building2,
  Globe,
} from 'lucide-react';
import { getWebsiteSettingsMap } from '@/lib/data';
import { ArtistLeadStory, ArtistSoundShowcase } from '@/components/ArtistBioDisplay';
import ArtistHeadlinerCard from '@/components/ArtistHeadlinerCard';

export const revalidate = 60;

// Curated authentic genres strictly derived from DJ Mantu's About bio
const soundPaletteGenres = [
  {
    title: 'Bollywood Dance Music (BDM)',
    category: 'Club & Sangeet Peak Hours',
    energy: 'Peak Voltage',
    bpm: '128 - 132 BPM',
    desc: 'High-voltage commercial Bollywood club anthems, festival drop edits, and crowd-rousing remixes engineered to ignite wedding dancefloors with non-stop momentum.',
    icon: Flame,
    color: 'text-pink-400',
    badgeBorder: 'border-pink-500/30',
    badgeBg: 'bg-pink-500/10',
    glow: 'from-pink-600/20 via-rose-600/10',
    hoverBorder: 'hover:border-pink-500/60',
    tags: ['Sangeet Finale', 'Drop Remixes', 'Crowd Hype'],
  },
  {
    title: 'Commercial House & Club EDM',
    category: 'Mainstage Arena Sound',
    energy: 'Stadium Euphoria',
    bpm: '126 - 130 BPM',
    desc: 'Electrifying progressive builds, uplifting vocal melodies, and stadium-worthy drops delivering a concert festival atmosphere that keeps crowds jumping in unison.',
    icon: Zap,
    color: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    glow: 'from-cyan-600/20 via-blue-600/10',
    hoverBorder: 'hover:border-cyan-500/60',
    tags: ['Progressive Drops', 'Bass House', 'Festival Anthems'],
  },
  {
    title: '90s & 2000s Retro Classics',
    category: 'Timeless Golden Era',
    energy: 'Nostalgic Sing-Along',
    bpm: 'Evergreen Tempo',
    desc: 'Soulful vintage dance hits, timeless evergreen Bollywood disco, and nostalgic melodies beloved across generations for elegant family celebrations.',
    icon: Radio,
    color: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    glow: 'from-amber-600/20 via-yellow-600/10',
    hoverBorder: 'hover:border-amber-500/60',
    tags: ['Evergreen Hits', 'Family Favorite', 'Sing-Along'],
  },
  {
    title: 'Sambalpuri Folk Grooves',
    category: 'Western Odisha Pride',
    energy: 'High-Decibel Heritage',
    bpm: 'Live Dholak Power',
    desc: 'Authentic western Odisha folk rhythms electrified with punchy modern sub-bass lines, live dholak percussion drops, and high-energy festive arrangements.',
    icon: Sparkles,
    color: 'text-purple-400',
    badgeBorder: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10',
    glow: 'from-purple-600/20 via-violet-600/10',
    hoverBorder: 'hover:border-purple-500/60',
    tags: ['Western Odisha', 'Dhol-Tasha Drops', 'Folk Modernized'],
  },
  {
    title: 'Odia Cultural Anthems',
    category: 'Statewide Celebrations',
    energy: 'Celebratory Spirit',
    bpm: 'Festive Swing',
    desc: 'Celebrated regional classics, modern festive anthems, and iconic Odia melodies guaranteed to unite families and guests in joyous cultural celebration.',
    icon: Award,
    color: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    glow: 'from-emerald-600/20 via-teal-600/10',
    hoverBorder: 'hover:border-emerald-500/60',
    tags: ['Cultural Heritage', 'Festive Mixes', 'All Generations'],
  },
  {
    title: 'Chhattisgarhi Beats & Folk',
    category: 'Central Belt Fusion',
    energy: 'Dancefloor Wildfire',
    bpm: 'Rapid Percussion',
    desc: 'Fast-paced regional dance anthems, infectious folk rhythms, and modern arrangements bridging western Odisha and central Indian traditions.',
    icon: Sliders,
    color: 'text-rose-400',
    badgeBorder: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10',
    glow: 'from-rose-600/20 via-pink-600/10',
    hoverBorder: 'hover:border-rose-500/60',
    tags: ['Fast Tempo', 'Folk Beats', 'Street Celebrations'],
  },
  {
    title: 'Nagpuri Street Rhythms',
    category: 'Baraat & Mobile Sound',
    energy: 'Thunderous Pulse',
    bpm: 'Street Bassline',
    desc: 'Thunderous acoustic street percussion and high-BPM party anthems engineered specifically for electrifying mobile sound Baraat trucks.',
    icon: Drum,
    color: 'text-orange-400',
    badgeBorder: 'border-orange-500/30',
    badgeBg: 'bg-orange-500/10',
    glow: 'from-orange-600/20 via-amber-600/10',
    hoverBorder: 'hover:border-orange-500/60',
    tags: ['Baraat Procession', 'Mobile Sound', 'High Bass Output'],
  },
  {
    title: 'Sadri & Cultural Fusion',
    category: 'Indigenous & Contemporary',
    energy: 'Deep Resonance',
    bpm: '808 Tribal Groove',
    desc: 'Indigenous tribal melodies layered with driving contemporary synthesizers, deep low-end bass, and immersive festival acoustic staging.',
    icon: Headphones,
    color: 'text-sky-400',
    badgeBorder: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/10',
    glow: 'from-sky-600/20 via-cyan-600/10',
    hoverBorder: 'hover:border-sky-500/60',
    tags: ['Tribal Fusion', '808 Basslines', 'Deep Roots'],
  },
];

export default async function AboutPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const bio = settingsMap['about_bio'] || '';
  const serviceAreas = settingsMap['service_areas'] || 'Rourkela, Sundargarh, Sambalpur, Jharsuguda, Bhubaneswar, Cuttack';

  const equipmentHighlights = [
    {
      title: 'Touring-Grade Line Array Systems',
      category: 'Acoustic Sound Reinforcement',
      spec: '135+ dB Headroom',
      badge: 'Zero Ear Fatigue',
      desc: 'Concert-calibrated professional line array modules delivering pristine vocal clarity and ultra-wide sound dispersion across large wedding banquets and outdoor arenas.',
      icon: Volume2,
      color: 'text-cyan-400',
      badgeBorder: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10',
      glow: 'from-cyan-600/20 via-blue-600/10',
      hoverBorder: 'hover:border-cyan-500/60',
      tags: ['Concert Line Arrays', 'Wide Dispersion', 'Crystal Clarity'],
    },
    {
      title: 'Dual 18" High-Displacement Subwoofers',
      category: 'Low-Frequency Impact',
      spec: '30Hz - 120Hz Range',
      badge: 'Earth-Shaking Sub-Bass',
      desc: 'Earth-shaking high-output dual 18-inch subwoofers tuned for physical bass impact you feel in your chest across the dance floor without distortion or muddy resonance.',
      icon: Waves,
      color: 'text-purple-400',
      badgeBorder: 'border-purple-500/30',
      badgeBg: 'bg-purple-500/10',
      glow: 'from-purple-600/20 via-violet-600/10',
      hoverBorder: 'hover:border-purple-500/60',
      tags: ['Dual 18" Sub-Bass', 'High Sound Pressure', 'Deep Lows'],
    },
    {
      title: 'Sharpy 10R Beam Moving Heads',
      category: 'Concert Stage Lighting',
      spec: 'DMX-512 Synchronized',
      badge: 'Intense 300W Prisms',
      desc: 'Computerized DMX intelligent moving heads slicing through stage haze with razor-sharp light beams, 16-facet rotating prisms, and color sweeps locked to the musical drops.',
      icon: Sparkles,
      color: 'text-amber-400',
      badgeBorder: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10',
      glow: 'from-amber-600/20 via-yellow-600/10',
      hoverBorder: 'hover:border-amber-500/60',
      tags: ['DMX Programmed', '16-Facet Prisms', 'Moving Beam Lights'],
    },
    {
      title: 'Dry Ice Low-Lying Cloud Fog',
      category: 'Stage Atmospherics',
      spec: 'Pure CO2 Cryogenic',
      badge: '100% Ground-Hugging',
      desc: '100% pure white ground-hugging low fog for dreamlike couple first dances and royal bridal entries. Leaves zero chemical haze, wetness, or residue behind.',
      icon: Cloud,
      color: 'text-sky-400',
      badgeBorder: 'border-sky-500/30',
      badgeBg: 'bg-sky-500/10',
      glow: 'from-sky-600/20 via-teal-600/10',
      hoverBorder: 'hover:border-sky-500/60',
      tags: ['Bridal Grand Entry', 'Pure Low Fog', 'No Residue'],
    },
    {
      title: 'Cold Pyro Indoor Sparkulars',
      category: 'Celebration Climax FX',
      spec: 'Indoor-Safe Cold Fire',
      badge: 'Smokeless & Odorless',
      desc: 'Electronic spark fountains generating dazzling 3-5 meter golden cold firework bursts that are completely smokeless, odorless, and 100% safe to touch.',
      icon: Flame,
      color: 'text-pink-400',
      badgeBorder: 'border-pink-500/30',
      badgeBg: 'bg-pink-500/10',
      glow: 'from-pink-600/20 via-rose-600/10',
      hoverBorder: 'hover:border-pink-500/60',
      tags: ['Non-Hazardous', 'Cold to Touch', 'Grand Entry Climax'],
    },
    {
      title: 'Digital DJ Performance Setup',
      category: 'Workstation & Console',
      spec: '24-Bit / 96kHz Digital',
      badge: 'Zero Latency Redundancy',
      desc: 'Studio-grade digital performance setup with zero-latency audio interfaces, pro mixing surfaces, and real-time live performance remix controls with dual system failover.',
      icon: Laptop,
      color: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10',
      glow: 'from-emerald-600/20 via-teal-600/10',
      hoverBorder: 'hover:border-emerald-500/60',
      tags: ['Digital Setup', 'Dual Backup Mixers', 'Flawless Uptime'],
    },
  ];

  const whyChooseUs = [
    {
      title: 'Crowd-Reading Mastery',
      category: 'Real-Time Floor Dynamic',
      spec: '100% Crowd Synchrony',
      badge: 'Dynamic Vibe Shift',
      desc: 'Every set is crafted live on-the-fly by reading floor energy, demographic shifts, and guest movement—effortlessly modulating tempo and genres before energy ever dips.',
      icon: Users,
      color: 'text-pink-400',
      badgeBorder: 'border-pink-500/30',
      badgeBg: 'bg-pink-500/10',
      glow: 'from-pink-600/20 via-rose-600/10',
      hoverBorder: 'hover:border-pink-500/60',
      highlights: ['Live BPM Modulation', 'All-Generation Appeal', 'Zero Dead Air'],
    },
    {
      title: 'Zero Equipment Failure',
      category: 'Stage Security Guarantee',
      spec: 'Triple Redundancy',
      badge: 'Fail-Safe Protection',
      desc: 'Dual independent backup audio mixers, spare touring amplifiers, digital sound processors, and heavy-duty voltage stabilizers come standard on every single event.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10',
      glow: 'from-emerald-600/20 via-teal-600/10',
      hoverBorder: 'hover:border-emerald-500/60',
      highlights: ['Dual Backup Mixers', 'Voltage Stabilizers', 'Isolated Audio Loops'],
    },
    {
      title: 'Punctual & Disciplined Setup',
      category: 'Stage Discipline Protocol',
      spec: '90-Min Early Soundcheck',
      badge: 'Punctuality Seal',
      desc: 'Truss rigging, acoustic room tuning, cable dressing, and soundchecks are strictly completed at least 90 minutes before your first guest arrives—ensuring pure elegance.',
      icon: Clock,
      color: 'text-amber-400',
      badgeBorder: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10',
      glow: 'from-amber-600/20 via-yellow-600/10',
      hoverBorder: 'hover:border-amber-500/60',
      highlights: ['90-Min Early Setup', 'Discreet Cable Dressing', 'Zero Guest Disruption'],
    },
    {
      title: 'Transparent All-Inclusive Pricing',
      category: 'Direct Artist Integrity',
      spec: 'Itemized Transparency',
      badge: 'Zero Hidden Fees',
      desc: 'Clear, upfront contracts with zero surprise transport fees, generator fuel surcharges, or extra cable charges. Dedicated sound engineering included throughout your event.',
      icon: Gem,
      color: 'text-cyan-400',
      badgeBorder: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10',
      glow: 'from-cyan-600/20 via-blue-600/10',
      hoverBorder: 'hover:border-cyan-500/60',
      highlights: ['All-Inclusive Quote', 'Dedicated Sound Tech', 'Direct Artist Booking'],
    },
  ];

  const touringHubs = [
    {
      title: 'Rourkela • Jharsuguda • Sundargarh',
      region: 'Primary Home Belt',
      badge: 'Local Fleet • Rapid Dispatch',
      desc: 'Immediate dispatch with local warehouse logistics, zero travel surcharge, and comprehensive mobile sound setups across the industrial steel & mining belt.',
      icon: Building2,
      color: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10',
      glow: 'from-emerald-600/20 via-teal-600/10',
      hoverBorder: 'hover:border-emerald-500/60',
      cities: ['Rourkela', 'Jharsuguda', 'Brajrajnagar', 'Sundargarh', 'Rajgangpur'],
    },
    {
      title: 'Sambalpur • Bargarh • Balangir',
      region: 'Western Odisha Cultural Belt',
      badge: 'Cultural Festivals & Baraats',
      desc: 'Regularly headlining high-decibel Baraat processions, grand wedding sangeets, and iconic cultural festivals along the Mahanadi river basin.',
      icon: Compass,
      color: 'text-purple-400',
      badgeBorder: 'border-purple-500/30',
      badgeBg: 'bg-purple-500/10',
      glow: 'from-purple-600/20 via-violet-600/10',
      hoverBorder: 'hover:border-purple-500/60',
      cities: ['Sambalpur', 'Bargarh', 'Balangir', 'Burla', 'Hirakud'],
    },
    {
      title: 'Bhubaneswar • Cuttack • Puri',
      region: 'State Capital & Coastal Odisha',
      badge: 'Luxury Destination Weddings',
      desc: 'Premium full-production setups for luxury destination weddings, beachside receptions, and 5-star hotel banquets across the golden triangle.',
      icon: Globe,
      color: 'text-cyan-400',
      badgeBorder: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10',
      glow: 'from-cyan-600/20 via-blue-600/10',
      hoverBorder: 'hover:border-cyan-500/60',
      cities: ['Bhubaneswar', 'Cuttack', 'Puri Coast', 'Chilika', 'Khordha'],
    },
    {
      title: 'Raipur • Bilaspur • Ranchi • Interstate',
      region: 'Interstate Tour Radius',
      badge: 'Full Heavy Rig Fleet',
      desc: 'Complete mobile sound truck with sound, stage trussing, and seasoned touring crew traveling to neighboring states for arena-scale celebrations.',
      icon: Truck,
      color: 'text-amber-400',
      badgeBorder: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10',
      glow: 'from-amber-600/20 via-yellow-600/10',
      hoverBorder: 'hover:border-amber-500/60',
      cities: ['Raipur', 'Bilaspur', 'Ranchi', 'Kolkata', 'Across India'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
      {/* 1. HERO / BIO SHOWCASE (FITS VIEWPORT) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Rich Bio Story Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Meet The Artist & Producer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08] font-heading">
              Behind The Decks: <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-300">
                {djName}
              </span>
            </h1>
          </div>

          {/* Lead Story Card */}
          <ArtistLeadStory bio={bio} djName={djName} />

          {/* Quick Metrics Bar (Fits on Screen) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
            <div className="p-3 sm:p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/40 hover:scale-[1.02] transition-all bg-linear-to-b from-white/3 to-transparent">
              <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-0.5">
                <Radio className="w-3.5 h-3.5" />
                <span className="text-xl sm:text-2xl font-black">10+</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium block leading-tight">Years Behind Console</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-pink-500/40 hover:scale-[1.02] transition-all bg-linear-to-b from-white/3 to-transparent">
              <div className="flex items-center justify-center gap-1.5 text-pink-400 mb-0.5">
                <Flame className="w-3.5 h-3.5" />
                <span className="text-xl sm:text-2xl font-black">650+</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium block leading-tight">Grand Events Rocked</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:scale-[1.02] transition-all bg-linear-to-b from-white/3 to-transparent">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-0.5">
                <Award className="w-3.5 h-3.5" />
                <span className="text-xl sm:text-2xl font-black">100%</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium block leading-tight">Dancefloor Guarantee</span>
            </div>
          </div>

          {/* Action CTAs (Fits on Screen) */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-2xl bg-linear-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 min-h-11 active:scale-98 transition-all hover:scale-[1.02]"
            >
              <span>Book {djName} For Your Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/availability"
              className="px-5 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-purple-500/40 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-11 active:bg-zinc-800 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-purple-400" />
              <span>Check Available Dates</span>
            </Link>
          </div>
        </div>

        {/* Right Concert Artist Headliner Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <ArtistHeadlinerCard
            djName={djName}
            whatsapp={settingsMap['whatsapp'] || '+91 9337828746'}
            location={settingsMap['address'] || 'Rourkela • Jharsuguda • Odisha'}
            instagramUrl={settingsMap['instagram'] || 'https://www.instagram.com/awaraboy458/'}
            instagramHandle={settingsMap['instagram_handle'] || '@awaraboy458'}
          />
        </div>
      </section>

      {/* 2. SIGNATURE SOUND & REGIONAL FUSION JOURNEY */}
      <section className="space-y-6">
        <ArtistSoundShowcase bio={bio} djName={djName} />
      </section>


      {/* 2. MUSIC GENRES & SPECIALTIES */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-pink-500/15 via-purple-500/15 to-cyan-500/15 border border-pink-500/30 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <AudioLines className="w-3.5 h-3.5 text-pink-400" />
            <span>Sound Palette • Multi-Genre Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Music Genres & Regional Specialties
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Curated directly from DJ Mantu&apos;s signature repertoire—effortlessly bridging high-voltage commercial festival beats with authentic regional heritage to ignite every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {soundPaletteGenres.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl p-px bg-linear-to-b from-white/10 via-white/5 to-transparent hover:from-purple-500/40 hover:via-pink-500/20 hover:to-cyan-500/30 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Ambient dynamic backglow on hover */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${g.glow} to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`relative h-full rounded-[23px] bg-[#090812]/90 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border ${g.badgeBorder} ${g.hoverBorder} transition-all duration-300`}
                >
                  {/* Top: Icon + BPM Pill */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div
                      className={`w-11 h-11 rounded-2xl ${g.badgeBg} border ${g.badgeBorder} flex items-center justify-center ${g.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full ${g.badgeBg} border ${g.badgeBorder} text-[10px] font-mono font-bold ${g.color}`}
                      >
                        {g.bpm}
                      </span>
                      <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
                        {g.energy}
                      </span>
                    </div>
                  </div>

                  {/* Body: Category, Title, Desc */}
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                      {g.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-pink-200 transition-all leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-zinc-300/85 leading-relaxed pt-1 font-normal">
                      {g.desc}
                    </p>
                  </div>

                  {/* Footer: Micro Feature Tags */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    {g.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/4 border border-white/5 text-[10px] font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROFESSIONAL EQUIPMENT QUALITY */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Concert Standard • Zero-Distortion Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Professional Equipment Quality
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We invest heavily in concert-calibrated sound reinforcement, synchronized intelligent lighting, and cinematic atmospheric hardware to guarantee pristine clarity with zero distortion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {equipmentHighlights.map((eq, i) => {
            const Icon = eq.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl p-px bg-linear-to-b from-white/10 via-white/5 to-transparent hover:from-cyan-500/40 hover:via-purple-500/20 hover:to-pink-500/30 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Ambient backglow on hover */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${eq.glow} to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`relative h-full rounded-[23px] bg-[#090812]/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between space-y-5 border ${eq.badgeBorder} ${eq.hoverBorder} transition-all duration-300`}
                >
                  {/* Top: Icon + Spec Telemetry Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${eq.badgeBg} border ${eq.badgeBorder} flex items-center justify-center ${eq.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full ${eq.badgeBg} border ${eq.badgeBorder} text-[10px] font-mono font-bold ${eq.color}`}
                      >
                        {eq.spec}
                      </span>
                      <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
                        {eq.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body: Category, Title, Description */}
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                      {eq.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:via-cyan-200 group-hover:to-pink-200 transition-all leading-snug">
                      {eq.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed pt-1 font-normal">
                      {eq.desc}
                    </p>
                  </div>

                  {/* Footer: Feature Tags */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    {eq.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/4 border border-white/10 text-[10px] font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHY EVENT HOSTS TRUST US */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-purple-500/15 via-pink-500/15 to-emerald-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>The DJ Mantu Standard • Uncompromised Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Event Hosts Trust Us
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            More than just music—we bring decade-tested discipline, redundant technical safeguards, and crowd-reading artistry to ensure your celebration is flawless from first track to last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {whyChooseUs.map((w, i) => {
            const Icon = w.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl p-px bg-linear-to-b from-white/10 via-white/5 to-transparent hover:from-purple-500/40 hover:via-pink-500/20 hover:to-cyan-500/30 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Ambient backglow on hover */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${w.glow} to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`relative h-full rounded-[23px] bg-[#090812]/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between space-y-5 border ${w.badgeBorder} ${w.hoverBorder} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${w.badgeBg} border ${w.badgeBorder} flex items-center justify-center ${w.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full ${w.badgeBg} border ${w.badgeBorder} text-[10px] font-mono font-bold ${w.color}`}
                      >
                        {w.spec}
                      </span>
                      <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
                        {w.badge}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                      {w.category}
                    </span>
                    <h3 className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-pink-200 transition-all leading-snug">
                      {w.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed pt-1 font-normal">
                      {w.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    {w.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/4 border border-white/10 text-[10px] font-medium text-zinc-300 flex items-center gap-1.5"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${w.color.replace('text-', 'bg-')}`} />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SERVICE LOCATIONS & TOURING HUB */}
      <section className="relative group overflow-hidden rounded-3xl p-px bg-linear-to-b from-purple-500/30 via-pink-500/20 to-cyan-500/30 shadow-2xl shadow-purple-950/40">
        <div className="relative rounded-[23px] bg-[#090812]/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Touring Radius • Eastern & Central India</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Service Locations & Travel Hubs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Based primarily in <strong className="text-white">Rourkela, Odisha</strong>, our complete mobile touring fleet with concert sound arrays, computer-controlled beams, and dedicated stage crew regularly travels across:
            </p>
          </div>

          {/* 4 Touring Hub Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {touringHubs.map((hub, hIdx) => {
              const HubIcon = hub.icon;
              return (
                <div
                  key={hIdx}
                  className={`p-5 sm:p-6 rounded-2xl bg-white/3 border ${hub.badgeBorder} ${hub.hoverBorder} transition-all space-y-3 hover:bg-white/5 group/hub`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${hub.badgeBg} border ${hub.badgeBorder} flex items-center justify-center ${hub.color} group-hover/hub:scale-110 transition-transform`}>
                        <HubIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                          {hub.region}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white">
                          {hub.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300/85 leading-relaxed">
                    {hub.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {hub.cities.map((city, cIdx) => (
                      <span
                        key={cIdx}
                        className={`px-2.5 py-0.5 rounded-md ${hub.badgeBg} border ${hub.badgeBorder} text-[10px] font-semibold ${hub.color}`}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* All Service Areas Pills Cloud */}
          <div className="pt-4 border-t border-white/10 space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
              Direct City Coverage List
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {serviceAreas.split(',').map((area, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-semibold hover:border-pink-500 hover:text-white transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 cursor-default"
                >
                  <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>{area.trim()}</span>
                </span>
              ))}
            </div>

            {/* Travel Guarantees Badge Bar */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-[11px] text-zinc-300">
              <div className="px-3 py-2 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Dedicated Mobile Fleet</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% On-Time Setup</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dual Power Regulators</span>
              </div>
            </div>

            {/* Availability CTA Button */}
            <div className="pt-4">
              <Link
                href="/availability"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-linear-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-purple-950/80 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Check Date Availability for Your City</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
