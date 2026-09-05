import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  CalendarCheck,
  Disc3,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export default async function ContactPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const phone = settingsMap['phone'] || '+91 98610 98765';
  const whatsapp = settingsMap['whatsapp'] || '+91 98610 98765';
  const email = settingsMap['email'] || 'bookings@djmantu.com';
  const address = settingsMap['address'] || 'Civil Township, Rourkela, Odisha 769004';
  const serviceAreas =
    settingsMap['service_areas'] ||
    'Rourkela, Sundargarh, Sambalpur, Jharsuguda, Bhubaneswar, Cuttack & across Eastern India';

  const waLink = createWhatsAppLink(whatsapp, `Hello ${djName}, I would like to get in touch regarding an event.`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
          Direct Connect
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Get in Touch with {djName}
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Have questions about sound logistics, customized playlists, travel requirements, or package inclusions? Reach out directly via WhatsApp, phone, or email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Card */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl glass-panel border border-emerald-500/40 hover:border-emerald-500 transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Instant Chat
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">WhatsApp Booking Line</h3>
              <p className="text-xs text-zinc-400 mt-1">{whatsapp}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 mt-2">
                <span>Start Chat on WhatsApp</span>
                <span>→</span>
              </span>
            </div>
          </a>

          {/* Phone Call Card */}
          <a
            href={`tel:${phone}`}
            className="p-6 rounded-3xl glass-panel border border-purple-500/30 hover:border-purple-500 transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
                Direct Call
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Phone Line</h3>
              <p className="text-xs text-zinc-400 mt-1">{phone}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 mt-2">
                <span>Call Now for Direct Enquiries</span>
                <span>→</span>
              </span>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${email}`}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-pink-500/40 transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-pink-400 tracking-wider">
                Corporate & Contracts
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Email Inquiries</h3>
              <p className="text-xs text-zinc-400 mt-1">{email}</p>
            </div>
          </a>

          {/* Base Location */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h4 className="font-bold text-white text-sm">Base Studio & Inventory</h4>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{address}</p>
            <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
              <strong className="text-zinc-300 block mb-0.5">Service Areas:</strong>
              {serviceAreas}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Contact Action */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-white/10 p-8 sm:p-10 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Have An Upcoming Date in Mind?</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Check availability on our real-time calendar or submit an event booking request with your custom requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link
              href="/availability"
              className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-purple-500 transition-all text-left space-y-2 group"
            >
              <CalendarCheck className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-base">Check Date Availability</h4>
              <p className="text-xs text-zinc-400">
                Get an instant verification whether your event date is free or booked.
              </p>
              <span className="text-xs font-semibold text-purple-400 inline-block pt-1">
                Open live checker →
              </span>
            </Link>

            <Link
              href="/book"
              className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/40 hover:border-purple-500 transition-all text-left space-y-2 group"
            >
              <Disc3 className="w-8 h-8 text-pink-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-base">Book DJ Mantu</h4>
              <p className="text-xs text-zinc-400">
                Fill out the 4-step booking wizard to generate a reservation code.
              </p>
              <span className="text-xs font-semibold text-pink-400 inline-block pt-1">
                Start booking form →
              </span>
            </Link>
          </div>

          {/* Social Follow */}
          <div className="pt-6 border-t border-zinc-800">
            <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-3">
              Follow DJ Mantu On Social Media
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-semibold"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@djmantu_official</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-semibold"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>DJ Mantu Official YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
