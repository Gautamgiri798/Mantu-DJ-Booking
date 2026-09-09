import React from 'react';
import { MessageSquare } from 'lucide-react';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 10;

export default async function AvailabilityPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const whatsapp = settingsMap['whatsapp'] || '+91 9337828746';
  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  const waWaitlistLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I am on your website checking date availability and want to enquire about specific festival/wedding dates.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
          Live Booking Calendar
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Check Date Availability
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Verify if DJ Mantu is open for your celebration date in real time. We strictly adhere to a <strong>single premier event per date policy</strong> to guarantee 100% focus and top quality on your big night.
        </p>
      </div>

      {/* Main Interactive Checker */}
      <div className="max-w-4xl mx-auto">
        <AvailabilityChecker whatsapp={whatsapp} />
      </div>

      {/* Policy & Privacy Assurance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-xs sm:text-sm">
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
            🟢
          </div>
          <h3 className="font-bold text-white text-base">Single-Event Dedication</h3>
          <p className="text-zinc-400 leading-relaxed">
            When you book DJ Mantu, you get his personal presence, dedication, and custom programming from sound check to the final track.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
            🔒
          </div>
          <h3 className="font-bold text-white text-base">Complete Privacy Guard</h3>
          <p className="text-zinc-400 leading-relaxed">
            Booked dates show as unavailable without revealing any customer names, personal phone numbers, or private venue secrets.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
            ⚡
          </div>
          <h3 className="font-bold text-white text-base">Fast WhatsApp Confirmation</h3>
          <p className="text-zinc-400 leading-relaxed">
            Once you find an available date, submitting the booking form locks in your priority slot instantly on WhatsApp.
          </p>
        </div>
      </div>

      {/* Backup Inquiry CTA */}
      <div className="p-8 rounded-3xl glass-panel border border-zinc-800 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-white">
          Is your preferred date showing as unavailable?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Reach out on WhatsApp directly. For certain daytime events or multi-rig requirements, we may arrange early or late slots.
        </p>
        <div className="pt-2">
          <a
            href={waWaitlistLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp for Waitlist</span>
          </a>
        </div>
      </div>
    </div>
  );
}
