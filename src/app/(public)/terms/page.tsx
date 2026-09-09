import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  FileText,
  ShieldCheck,
  CalendarCheck,
  Zap,
  Volume2,
  AlertCircle,
  CreditCard,
  Clock,
  Phone,
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Terms of Booking & Performance Agreement | DJ Mantu',
  description:
    'Official booking terms, payment schedule, postponement policy, power requirements, and sound regulations for reserving DJ Mantu for weddings, receptions, and parties in Odisha.',
};

export default async function TermsOfBookingPage() {
  const settingsMap = await getWebsiteSettingsMap();
  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const phone = settingsMap['phone'] || '+91 9337828746';
  const whatsapp = settingsMap['whatsapp'] || '+91 9337828746';

  const waEnquiryLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I have a question regarding your booking terms and payment schedule.`
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-widest">
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>Official Performance Contract</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Terms of Booking & Performance Agreement
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Clear, transparent, and fair policies designed to guarantee a flawless, electrified entertainment experience for your celebration.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-2">
          <span>Last Updated: September 2026</span>
          <span>•</span>
          <span>Applicable Across Western Odisha & Pan-India</span>
        </div>
      </div>

      {/* Quick Guarantees Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <CalendarCheck className="w-4 h-4 text-emerald-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Guaranteed Date Lock</span>
          <span className="text-[11px] text-zinc-400 block">Date secured upon advance receipt</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <Zap className="w-4 h-4 text-amber-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Tested Arena Gear</span>
          <span className="text-[11px] text-zinc-400 block">Pro audio, sharpies & cold pyro</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <Volume2 className="w-4 h-4 text-cyan-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Tailored Playlist</span>
          <span className="text-[11px] text-zinc-400 block">Curated tracks & couple cues</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-purple-400 mx-auto sm:mx-0" />
          <span className="font-bold text-white text-xs block">Zero Hidden Fees</span>
          <span className="text-[11px] text-zinc-400 block">Transparent upfront pricing</span>
        </div>
      </div>

      {/* Main Terms Sections */}
      <div className="space-y-8 text-zinc-300 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              01
            </span>
            <h2 className="text-lg font-bold text-white">Booking Confirmation & Advance Token</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              To confirm and lock any event date on {djName}&apos;s schedule, an advance token deposit of <strong>20% to 30%</strong> of the agreed package price is required.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li>Dates are allotted strictly on a first-come, first-confirmed basis upon token receipt.</li>
              <li>Tentative inquiries or verbal date holds are valid for a maximum of 48 hours unless advance is confirmed.</li>
              <li>Once the advance payment is verified, the date is automatically locked on the public calendar as <strong>BOOKED</strong>, preventing overlapping bookings.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              02
            </span>
            <h2 className="text-lg font-bold text-white">Payment Terms & Final Settlement</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              Payments can be completed securely via <strong>UPI (GPay, PhonePe, Paytm), Bank Transfer (IMPS/NEFT), or Cash</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Advance Token:</strong> Paid at the time of booking confirmation.</li>
              <li><strong>Balance Settlement:</strong> The remaining contract balance must be cleared on the event date upon crew arrival and sound check completion before the start of the performance.</li>
              <li>Receipts or digital payment acknowledgments are furnished immediately upon transaction confirmation.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              03
            </span>
            <h2 className="text-lg font-bold text-white">Postponement & Cancellation Policy</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              We understand family timelines or banquet logistics may shift unexpectedly. Our postponement guidelines are structured to be as accommodating as possible:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Date Rescheduling:</strong> If communicated at least 14 days before the scheduled date, your advance token can be transferred to a new mutually available date within 6 months.</li>
              <li><strong>Cancellations:</strong> Advance tokens are non-refundable in the event of an outright cancellation, as the date is reserved exclusively for you and inquiries from other prospective clients are turned away.</li>
              <li><strong>Emergency Circumstances:</strong> In cases of unforeseen government lockdowns or extreme emergency, advance credit will remain valid for future event rebooking.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              04
            </span>
            <h2 className="text-lg font-bold text-white">Venue Access, Power & Technical Setup</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              To ensure pristine acoustic tuning, intelligent beam calibration, and zero audio distortion, the venue must satisfy basic technical prerequisites:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Setup Buffer:</strong> The technical crew requires venue access at least <strong>2.5 to 3 hours</strong> before the event start time for stage trussing, audio equalization, and lighting choreography.</li>
              <li><strong>Stable Electricity:</strong> A dedicated, stable power point (minimum 15A/32A depending on package scale) or a functional Diesel Generator (DG set) backup is required to safeguard pro audio electronics.</li>
              <li><strong>Weather Protection:</strong> For outdoor lawn or poolside setups, adequate overhead coverage (tent, waterproof canopy) must be arranged by the client in case of rain, excessive moisture, or direct sun exposure.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              05
            </span>
            <h2 className="text-lg font-bold text-white">Performance Timing & Sound Decibel Regulations</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              Standard event durations range from 4 to 6 hours as specified in your booking dossier.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong>Overtime Extensions:</strong> Additional performance hours beyond the booked slot can be extended upon mutual agreement at standard hourly rates, provided venue and administrative guidelines permit.</li>
              <li><strong>Statutory Noise Norms:</strong> Outdoor sound operations adhere strictly to local administration, municipal, and police guidelines (typically 10:00 PM outdoor curfew). Indoor banquet performances continue as permitted by hotel management.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              06
            </span>
            <h2 className="text-lg font-bold text-white">Guest Safety & Equipment Protection</h2>
          </div>
          <div className="space-y-2.5 pl-10">
            <p>
              Our priority is keeping the energy peak and the crowd dancing safely:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li>Beverages, open food, and liquids are strictly prohibited in the immediate DJ console and amplifier rack area.</li>
              <li>The host/client agrees to assist with crowd decorum around electrical cabling, stage speaker stands, and sensitive moving head fixtures.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Support & Inquiries Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-purple-950/40 border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Questions Regarding Contracts?</span>
          </div>
          <h3 className="text-xl font-bold text-white">Have a special venue requirement or custom package?</h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Reach out directly to {djName} for customized event riders or specific hotel banquet clearances.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>Call Now</span>
          </a>
          <a
            href={waEnquiryLink}
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
