import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Music,
  Speaker,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export default async function AboutPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const bio = settingsMap['about_bio'] || '';
  const serviceAreas = settingsMap['service_areas'] || 'Rourkela, Sundargarh, Sambalpur, Jharsuguda, Bhubaneswar, Cuttack';

  const genres = [
    { title: 'Bollywood Dance Music (BDM)', desc: 'From high-tempo wedding anthems to peak-hour club remixes.' },
    { title: 'Punjabi EDM & Dhol Mixes', desc: 'Chest-thumping basslines and energetic tracks that blow the roof off baraats.' },
    { title: 'Commercial & Progressive House', desc: 'Uplifting melodies, build-ups, and stadium-worthy drops.' },
    { title: '90s & 2000s Retro Classics', desc: 'Timeless multi-generational nostalgia for family receptions.' },
    { title: 'Regional Odia & Sambalpuri Hits', desc: 'Local festival and cultural favorites guaranteed to make everyone groove.' },
    { title: 'Hip-Hop & Urban Club Grooves', desc: 'Smooth transitions, hype tracks, and modern party rhythms.' },
  ];

  const equipmentHighlights = [
    { title: 'Original JBL & RCF Line Arrays', desc: 'Pristine vocal clarity and stadium dispersion without ear fatigue.' },
    { title: 'Dual 18" Subwoofers', desc: 'Earth-shaking low frequencies you physically feel on the dance floor.' },
    { title: 'Sharpy 10R Beam Moving Heads', desc: 'Computerized DMX light shows slicing through haze for concert vibes.' },
    { title: 'Dry Ice Low-Lying Cloud Fog', desc: '100% pure white ground hugging fog for fairy-tale bridal entries.' },
    { title: 'Cold Pyro Sparkulars', desc: 'Indoor-safe, non-hazardous, smokeless cold firework fountain bursts.' },
    { title: 'Pioneer Pro DJ Console', desc: 'Flawless zero-latency mixing, scratching, and live remix layering.' },
  ];

  const whyChooseUs = [
    { title: 'Crowd-Reading Mastery', desc: 'Every set is custom-crafted in real time by observing guest energy, age demographics, and mood.' },
    { title: 'Zero Equipment Failure', desc: 'Dual backup audio mixers, spare amplifiers, and voltage stabilizers come standard with every gig.' },
    { title: 'Punctual & Disciplined Setup', desc: 'Sound checks completed at least 90 minutes before guest arrival so everything is seamless.' },
    { title: 'Transparent All-Inclusive Pricing', desc: 'No hidden transportation charges or surprise cables fees. What we quote is what you pay.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. HERO / BIO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet The Artist</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Behind The Decks: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              {djName}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-zinc-800 text-center">
            <div className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 block">10+</span>
              <span className="text-xs text-zinc-400 mt-0.5 block">Years Behind Console</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-pink-400 block">650+</span>
              <span className="text-xs text-zinc-400 mt-0.5 block">Events Completed</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">100%</span>
              <span className="text-xs text-zinc-400 mt-0.5 block">Dancefloor Guarantee</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 min-h-12 active:scale-98 transition-all"
            >
              <span>Book DJ Mantu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/availability"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-12 active:bg-zinc-800 transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-purple-400" />
              <span>Check Available Dates</span>
            </Link>
          </div>
        </div>

        {/* Right Photo Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 aspect-[4/5] shadow-2xl shadow-purple-950/60">
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
              alt="DJ Mantu Performance"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent opacity-80 z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 block">
                Official Headliner
              </span>
              <h3 className="text-xl font-black text-white mt-1">DJ Mantu</h3>
              <p className="text-xs text-zinc-300 mt-0.5">Rourkela • Sundargarh • Odisha</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MUSIC GENRES */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
            Sound Palette
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Music Genres & Specialties
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            A master of multi-genre open format mixing, effortlessly transitioning between diverse musical styles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((g, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-pink-500/30 transition-all space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white pt-1">{g.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROFESSIONAL EQUIPMENT */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
            Concert Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Professional Equipment Quality
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            We invest heavily in top-tier sound, lighting, and stage atmospheric equipment to ensure pristine audio and zero distortion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentHighlights.map((eq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center justify-center">
                <Speaker className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white pt-1">{eq.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{eq.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            The DJ Mantu Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Why Event Hosts Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyChooseUs.map((w, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{w.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICE AREAS */}
      <section className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Service Locations & Travel</h2>
        <p className="max-w-2xl mx-auto text-sm text-zinc-300 leading-relaxed">
          Based primarily in <strong className="text-white">Rourkela, Odisha</strong>, we regularly travel with our complete mobile sound & lighting rigs across:
        </p>
        <div className="pt-2 text-sm font-semibold text-purple-300">
          {serviceAreas}
        </div>
        <div className="pt-6">
          <Link
            href="/availability"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <span>Check Date for Your City</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
