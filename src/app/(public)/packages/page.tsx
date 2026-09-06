import React from 'react';
import { HelpCircle, MessageSquare, Sparkles, ShieldCheck, Volume2, Zap, Sliders, Phone } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import { createWhatsAppLink } from '@/lib/utils';
import { getWebsiteSettingsMap, getCachedPackages } from '@/lib/data';

export const revalidate = 60;

export default async function PackagesPage() {
  const [packages, settingsMap] = await Promise.all([
    getCachedPackages(),
    getWebsiteSettingsMap(),
  ]);

  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const phone = settingsMap['phone'] || '+91 6372174006';
  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  const waQuoteLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I am reviewing your event packages on your website and would like full details and a custom quotation.`
  );

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Ambient Stage Lighting Background Glows */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-purple-600/15 via-pink-600/10 to-transparent blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-1/4 -right-20 w-80 h-80 bg-cyan-500/10 blur-3xl -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-cyan-500/15 border border-pink-500/30 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>VIP Concert Audio & Lighting · 100% Setup Guaranteed</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">
          Event DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-400">Packages</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Select from our battle-tested sound and lighting packages. All setups include concert audio engineering, dedicated lighting operators, 100% live hardware redundancy, and complete venue sound management. Contact on WhatsApp or call for full details.
        </p>
      </div>

      {/* 4-Pillar VIP Event Assurance Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
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

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
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

      {/* Package Comparison FAQ / Advice */}
      <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Need Guidance?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Which Package Is Right For Your Event?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
            <h4 className="font-bold text-purple-300 text-base">Intimate Celebrations (Up to 150 Guests)</h4>
            <p className="text-zinc-400 leading-relaxed">
              If you are hosting a birthday party, family anniversary, or small cocktail evening in a banquet hall or villa, the <strong>Essential Party</strong> delivers crisp audio and punchy bass without overpowering the room.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
            <h4 className="font-bold text-pink-300 text-base">Receptions & Sangeet (Up to 400 Guests)</h4>
            <p className="text-zinc-400 leading-relaxed">
              For high-energy wedding receptions or youth sangeets, choose the <strong>Premium Club Vibe</strong> with moving head beams and dual 18-inch subwoofers for chest-thumping bass.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
            <h4 className="font-bold text-cyan-300 text-base">Grand Royal Weddings (500+ Guests)</h4>
            <p className="text-zinc-400 leading-relaxed">
              For grand destination weddings, our <strong>Royal Wedding Extravaganza</strong> includes concert line arrays, dry ice cloud fog for couple entries, cold sparkular pyros, and trussing.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Need custom hours, extra microphones, or special entry effects?</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={waQuoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact on WhatsApp</span>
            </a>

            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call for Details</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
