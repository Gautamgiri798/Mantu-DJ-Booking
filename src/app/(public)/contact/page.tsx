import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  Calendar,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Globe,
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export default async function ContactPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const phone = settingsMap['phone'] || '+91 9337828746';
  const whatsapp = settingsMap['whatsapp'] || '+91 9337828746';
  const address = settingsMap['address'] || 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216';
  const instagramUrl = settingsMap['instagram'] || 'https://www.instagram.com/awaraboy458/';
  const instagramHandle = instagramUrl.includes('instagram.com/')
    ? '@' + instagramUrl.split('instagram.com/')[1].replace(/\/$/, '')
    : '@awaraboy458';

  const waLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I would like to inquire about booking your DJ services for an upcoming event.`
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-14">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Let&apos;s Connect</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Contact & <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Bookings</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Have questions, want to check availability, or ready to book {djName} for your event? Reach out directly via WhatsApp, phone, or use our online booking form.
        </p>

        {/* Subtle Minimal Slogan Line */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="h-px w-12 sm:w-16 bg-white/[0.08]" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Music Brings People Together
          </span>
          <div className="h-px w-12 sm:w-16 bg-white/[0.08]" />
        </div>
      </div>

      {/* 2. Three Unified Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: WhatsApp */}
        <div className="group rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/40">
          <div className="space-y-4">
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Fast Reply</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <span className="text-[10.5px] uppercase font-extrabold tracking-widest text-emerald-400">
                Instant Chat
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                WhatsApp
              </h3>
              <div className="text-base sm:text-lg font-bold text-zinc-100 font-mono pt-1">
                {whatsapp}
              </div>
              <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                Get quick responses for dates, pricing, packages &amp; more.
              </p>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-6">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Card 2: Phone */}
        <div className="group rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-purple-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/40">
          <div className="space-y-4">
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center transition-transform group-hover:scale-105">
                <Phone className="w-5 h-5" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10.5px] font-bold text-purple-300 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <span className="text-[10.5px] uppercase font-extrabold tracking-widest text-purple-400">
                Direct Call
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Phone Line
              </h3>
              <div className="text-base sm:text-lg font-bold text-zinc-100 font-mono pt-1">
                {phone}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Available 10:00 AM – 10:00 PM IST</span>
              </div>
              <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                Speak directly with {djName} for bookings &amp; enquiries.
              </p>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-6">
            <a
              href={`tel:${phone}`}
              className="w-full py-2.5 px-4 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>Call {djName}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Card 3: Location */}
        <div className="group rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-purple-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/40">
          <div className="space-y-4">
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center transition-transform group-hover:scale-105">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-semibold text-zinc-300 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Our Base</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <span className="text-[10.5px] uppercase font-extrabold tracking-widest text-purple-400">
                Base Location
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Studio &amp; Warehouse
              </h3>
              <div className="flex items-start gap-2 text-xs text-zinc-300 pt-2 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1 leading-relaxed">
                <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Available across Western Odisha &amp; entire Odisha</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Full-Width Booking CTA Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
              Plan Ahead
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Have a Specific Date in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Check date availability instantly or send us your event details and we&apos;ll get back to you.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/availability"
            prefetch={true}
            className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>Check Availability</span>
          </Link>

          <Link
            href="/book"
            prefetch={true}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-purple-950/40 transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Book Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. Social Connect & Signature */}
      <div className="text-center space-y-4 pt-4 pb-2">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-1.5 sm:pr-4 rounded-2xl sm:rounded-full bg-zinc-900/60 border border-white/10 hover:border-pink-500/40 transition-all shadow-lg backdrop-blur-sm">
          <span className="text-xs sm:text-sm font-semibold text-zinc-300 pl-3.5 py-1">
            Follow {djName}:
          </span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-purple-500/15 hover:from-pink-500/25 hover:via-rose-500/25 hover:to-purple-500/25 border border-pink-500/30 hover:border-pink-500/50 text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-sm active:scale-95 group"
          >
            <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-white bg-clip-text text-transparent group-hover:text-white">
              {instagramHandle}
            </span>
          </a>
        </div>
        <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase font-semibold">
          Same Beats. More Memories.
        </p>
      </div>
    </div>
  );
}
