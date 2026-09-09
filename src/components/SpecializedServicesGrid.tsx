'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Search,
  Flame,
  Check,
  Phone,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';
import {
  DJTurntableIcon,
  WeddingRingsIcon,
  DiscoClubIcon,
  GraduationCapIcon,
  ConcertStageIcon,
} from '@/components/ServiceIcons';

import {
  SpecializedServiceItem,
  SPECIALIZED_SERVICES,
  SERVICE_ICONS,
} from '@/lib/services-data';

const ICONS = SERVICE_ICONS;
export { SPECIALIZED_SERVICES, SERVICE_ICONS };
export type { SpecializedServiceItem };

const CATEGORIES = [
  { key: 'All', label: 'All Specialties', icon: DJTurntableIcon },
  { key: 'Weddings & Baraat', label: 'Weddings & Baraat', icon: WeddingRingsIcon },
  { key: 'Parties & Nightlife', label: 'Parties & Nightlife', icon: DiscoClubIcon },
  { key: 'College & Corporate', label: 'College & Corporate', icon: GraduationCapIcon },
  { key: 'Live & Production', label: 'Concerts & Stage', icon: ConcertStageIcon },
] as const;

interface Props {
  whatsapp: string;
  phone?: string;
  djName: string;
}

export default function SpecializedServicesGrid({
  whatsapp,
  phone = '+91 9337828746',
  djName,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return SPECIALIZED_SERVICES.filter((svc) => {
      const matchesCategory =
        selectedCategory === 'All' || svc.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.cleanTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.badge.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl glass-panel border border-white/10 bg-[#0d0d16]/80 backdrop-blur-xl">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/60 scale-[1.02]'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-white scale-110' : 'text-zinc-400'}`} />
                <span>{cat.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = ICONS[service.id] || DJTurntableIcon;
          const waMessage = `Hello ${djName}, I am interested in booking your "${service.cleanTitle}" service. Could you please share the availability and package details?`;
          const waLink = createWhatsAppLink(whatsapp, waMessage);

          return (
            <div
              key={service.id}
              id={service.id}
              className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#0d0d16]/90 border border-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle Ambient Hover Top Glow */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Body */}
              <div className="space-y-4">
                {/* Header Row: Luxury Icon, Title, Category & Featured Tag */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-inner shrink-0 ${service.iconBg}`}
                    >
                      <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                        {service.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {service.popular && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[10px] font-bold uppercase tracking-wider shrink-0 backdrop-blur-md">
                      <Flame className="w-3 h-3 text-pink-400" />
                      <span>Signature</span>
                    </span>
                  )}
                </div>

                {/* Vibe Badge & Tagline */}
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/10 text-zinc-300 mb-2">
                    {service.badge}
                  </span>
                  <p className="text-xs font-semibold text-zinc-200 leading-relaxed">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-zinc-400 block">
                    Signature Inclusions:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-xs text-zinc-300"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </span>
                        <span className="font-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom CTAs: 3-Button Symmetrical Luxury Layout */}
              <div className="pt-5 mt-5 border-t border-white/[0.06] grid grid-cols-3 gap-1.5 sm:gap-2">
                {/* 1. Primary Action: Vibrant Luxury Emerald WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-1.5 sm:px-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_24px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
                  title="Inquire on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span>WhatsApp</span>
                </a>

                {/* 2. Direct Voice Call: Luxury Cyan Glass */}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="h-11 px-1.5 sm:px-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-sm cursor-pointer"
                  title={`Call ${djName}`}
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span>Call Now</span>
                </a>

                {/* 3. Secondary Action: Frosted Luxury Glass Date Verifier */}
                <Link
                  href={`/availability?eventType=${encodeURIComponent(service.cleanTitle)}`}
                  className="h-11 px-1.5 sm:px-2 rounded-xl bg-white/[0.04] hover:bg-purple-600/15 text-zinc-300 hover:text-white border border-white/10 hover:border-purple-500/40 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-sm cursor-pointer"
                  title="Check Date Availability"
                >
                  <CalendarCheck className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                  <span>Check Date</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 rounded-2xl glass-panel border border-white/10">
          <p className="text-zinc-400 text-sm">
            No specialties found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-bold text-purple-400 hover:underline"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
}
