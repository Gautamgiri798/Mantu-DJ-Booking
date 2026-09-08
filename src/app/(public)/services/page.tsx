import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getWebsiteSettingsMap } from '@/lib/data';
import SpecializedServicesGrid from '@/components/SpecializedServicesGrid';

export const revalidate = 60;

export default async function ServicesPage() {
  const settingsMap = await getWebsiteSettingsMap();

  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const phone = settingsMap['phone'] || '+91 6372174006';
  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Compact Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Tailored Event Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Professional DJ & Event Services
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Concert-grade sound engineering, intelligent moving beam lighting, and custom playlist curation for weddings, club nights, and festivals.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-medium self-start md:self-auto shrink-0 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>2026 / 2027 Bookings Open</span>
        </div>
      </div>

      {/* Interactive Service Directory with Filters & Instant Search */}
      <section id="specialized-services">
        <SpecializedServicesGrid whatsapp={whatsapp} phone={phone} djName={djName} />
      </section>

      {/* 3. Custom Setup Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/40 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Need a Custom Combination or Arena Sound?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          We configure custom setups for large auditoriums, outdoor stadiums, sports events, and multi-day destination weddings.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950 transition-all hover:scale-105"
          >
            <span>Request Custom Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
