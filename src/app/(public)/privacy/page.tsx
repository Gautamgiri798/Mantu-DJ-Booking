import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  BellRing,
  Camera,
  Cookie,
  UserCheck,
  Phone,
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection | DJ Mantu',
  description:
    'Our commitment to safeguarding your personal data, WhatsApp contact information, and event privacy when booking DJ Mantu for private weddings and celebrations.',
};

export default async function PrivacyPolicyPage() {
  const settingsMap = await getWebsiteSettingsMap();
  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const phone = settingsMap['phone'] || '+91 9337828746';
  const whatsapp = settingsMap['whatsapp'] || '+91 9337828746';

  const waPrivacyLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I have a privacy inquiry regarding my event details and media.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumb / Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 text-center sm:text-left border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Client Confidentiality Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          At {djName}, we respect your personal privacy. We ensure that your contact details, event schedule, and private celebration media remain strictly protected.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-2">
          <span>Effective Date: September 2026</span>
          <span>•</span>
          <span>Compliance with Information Technology Act (India)</span>
        </div>
      </div>

      {/* Privacy Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <EyeOff className="w-4 h-4 text-rose-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Zero Data Selling</span>
          <span className="text-[11px] text-zinc-400 block">We never sell client numbers to vendors</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <Lock className="w-4 h-4 text-purple-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Secure Database</span>
          <span className="text-[11px] text-zinc-400 block">Encrypted server & private database</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <BellRing className="w-4 h-4 text-amber-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Zero Spam Policy</span>
          <span className="text-[11px] text-zinc-400 block">Only essential booking communications</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <Camera className="w-4 h-4 text-cyan-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Media Discretion</span>
          <span className="text-[11px] text-zinc-400 block">Opt-out anytime for private events</span>
        </div>
      </div>

      {/* Main Privacy Policy Sections */}
      <div className="space-y-8 text-zinc-300 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              01
            </span>
            <h2 className="text-lg font-bold text-white">Information We Collect</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              When you interact with our website, inquire about availability, or book a live DJ package, we collect the necessary details to process your event reservation:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Contact Information:</strong> Your full name, mobile phone number, WhatsApp number, and optional email address.</li>
              <li><strong>Event Specifications:</strong> Date of the event, venue address, city, preferred performance timings, and celebration type (Wedding, Reception, Birthday, Sangeet, Corporate, etc.).</li>
              <li><strong>Musical Preferences:</strong> Entry song choices, song requests, and specific sound or lighting requirements provided during consultation.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              02
            </span>
            <h2 className="text-lg font-bold text-white">How We Use Your Information</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              All information collected is used exclusively for event execution and customer service:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li>To confirm calendar availability and prevent double-booking on your chosen date.</li>
              <li>To calculate transparent package quotes and generate your official booking dossier.</li>
              <li>To communicate directly with you via call or WhatsApp regarding logistics, sound check timing, and playlist coordination.</li>
              <li>We <strong>never</strong> sell, license, lease, or share your contact number with third-party advertisers, telemarketers, or external service bureaus.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              03
            </span>
            <h2 className="text-lg font-bold text-white">WhatsApp & SMS Direct Communication</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              When you submit a booking request or initiate a WhatsApp chat via our floating widget, you grant consent to receive direct event updates, contract receipts, and coordination messages from our official business number (<strong>{phone}</strong>).
            </p>
            <p className="text-xs text-zinc-400">
              You may request to pause WhatsApp messages or switch communication channels at any time by simply informing us during the chat.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              04
            </span>
            <h2 className="text-lg font-bold text-white">Event Photography, Videography & Portfolio Media</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              As professional live performance artists, we occasionally capture short crowd clips, moving light atmospheres, and stage setups to showcase in our live website portfolio.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Private VIP Celebrations:</strong> If you prefer that no footage from your private wedding or family gathering be published, simply notify {djName} prior to the event. We strictly respect client confidentiality.</li>
              <li><strong>Takedown Requests:</strong> If a photo or video featuring you or your family appears on our public gallery and you would like it removed, send a quick message to <strong>{phone}</strong> and it will be taken down within 24 hours.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              05
            </span>
            <h2 className="text-lg font-bold text-white">Cookies & Website Analytics</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              Our website uses only functional, privacy-friendly cookies necessary for application performance (such as preserving your dark theme preferences and maintaining secure admin dashboard sessions). We do not employ third-party ad-tracking pixels or cross-site tracking beacons.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              06
            </span>
            <h2 className="text-lg font-bold text-white">Data Retention & Your Rights</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              You maintain full ownership and control over your personal records:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li>You may request a copy of your booking dossier on file at any time.</li>
              <li>Following the conclusion of your event, you can request that your customer record and contact details be permanently purged from our database.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Support & Privacy Contact Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-emerald-950/30 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Have a Privacy Question?</span>
          </div>
          <h3 className="text-xl font-bold text-white">Need to update your contact details or request data removal?</h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Contact {djName} directly for immediate assistance regarding client confidentiality.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Now</span>
          </a>
          <a
            href={waPrivacyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-950/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
