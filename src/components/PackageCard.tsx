import React from 'react';
import Link from 'next/link';
import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sliders,
  Crown,
  Flame,
  Zap,
  Phone,
} from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/SocialIcons';

export interface PackageData {
  id: string;
  name: string;
  slug: string;
  price: number;
  durationHours: number;
  description: string;
  features: string; // JSON string array
  equipment: string;
  suitableFor: string;
  isPopular?: boolean;
}

interface PackageCardProps {
  pkg: PackageData;
  whatsappNumber?: string;
  phoneNumber?: string;
  djName?: string;
}

export default function PackageCard({
  pkg,
  whatsappNumber = '+91 6372174006',
  phoneNumber = '+91 6372174006',
  djName = 'DJ Mantu',
}: PackageCardProps) {
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
  const waLink = createWhatsAppLink(
    whatsappNumber,
    `Hello ${djName}, I am interested in the "${pkg.name}" package. Please share complete package details and quotation.`
  );
  let featureList: string[] = [];
  try {
    featureList = JSON.parse(pkg.features);
  } catch {
    featureList = pkg.features.split('\n');
  }

  // Tier personality configuration
  const isWedding = pkg.name.toLowerCase().includes('royal') || pkg.name.toLowerCase().includes('wedding');
  const isArena = pkg.name.toLowerCase().includes('arena') || pkg.name.toLowerCase().includes('festival') || pkg.name.toLowerCase().includes('custom');
  const isPopular = Boolean(pkg.isPopular);

  let venueCategory = 'Private Celebrations';
  if (isPopular) venueCategory = 'Club & Sangeet Vibe';
  else if (isWedding) venueCategory = 'VIP Royal Weddings';
  else if (isArena) venueCategory = 'Arena & Mega Fests';
  else venueCategory = 'Intimate & Farmhouses';

  // Tier Theme styles
  const tierConfig = isPopular
    ? {
        cardClass:
          'border-2 border-purple-500/80 bg-gradient-to-b from-purple-950/40 via-zinc-900/95 to-zinc-950 shadow-[0_0_50px_-10px_rgba(168,85,247,0.35)] md:scale-[1.02] lg:-translate-y-2 z-10',
        badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        accentGlow: 'from-purple-500 via-pink-500 to-cyan-400',
        checkBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        icon: Flame,
        pillTag: venueCategory,
        ctaClass:
          'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold shadow-[0_8px_30px_rgba(192,38,211,0.4)] hover:shadow-[0_8px_35px_rgba(192,38,211,0.6)] hover:scale-[1.02]',
      }
    : isWedding
    ? {
        cardClass:
          'border border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-b from-amber-950/25 via-zinc-900/90 to-zinc-950 shadow-[0_0_40px_-15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_-10px_rgba(245,158,11,0.3)]',
        badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        accentGlow: 'from-amber-400 via-yellow-500 to-amber-600',
        checkBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        icon: Crown,
        pillTag: venueCategory,
        ctaClass:
          'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-black shadow-[0_6px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02]',
      }
    : isArena
    ? {
        cardClass:
          'border border-cyan-500/30 hover:border-cyan-500/60 bg-gradient-to-b from-cyan-950/25 via-zinc-900/90 to-zinc-950 shadow-[0_0_40px_-15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_45px_-10px_rgba(6,182,212,0.3)]',
        badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        accentGlow: 'from-cyan-400 via-teal-400 to-blue-500',
        checkBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        icon: Zap,
        pillTag: venueCategory,
        ctaClass:
          'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold shadow-[0_6px_25px_rgba(6,182,212,0.35)] hover:scale-[1.02]',
      }
    : {
        cardClass:
          'border border-white/10 hover:border-zinc-700 bg-gradient-to-b from-zinc-900/70 via-zinc-950/90 to-black backdrop-blur-xl hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.08)]',
        badgeClass: 'text-zinc-300 bg-zinc-800/80 border-zinc-700',
        accentGlow: 'from-zinc-200 to-zinc-400',
        checkBg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        icon: Sliders,
        pillTag: venueCategory,
        ctaClass:
          'bg-zinc-900 hover:bg-zinc-800 text-white font-bold border border-zinc-700 hover:border-zinc-500 hover:scale-[1.01]',
      };

  // Helper to highlight key high-end technical equipment in feature strings
  const renderFormattedFeature = (text: string) => {
    // Keywords to emphasize
    const highlightKeywords = [
      'Pioneer Pro DJ Console',
      'High-Output Touring SRX Tops',
      'High-Definition Audio Tops',
      'Dual 18" Subwoofers',
      '18" Powered Subwoofer',
      'Sharpy 10R Moving Head Beam Lights',
      'Sharpy Moving Head Lights',
      'Moving Head Beams',
      'Concert Line-Array Speaker System',
      'Festival Line Array Sound System',
      'Dry Ice Low-Lying Cloud Fog',
      'Large P3 High-Definition LED',
      'Cold Pyro Sparkular Fountains',
      'Cold Pyro Spark Machines',
      'CO2 Cryo Jet Cannons',
      'Multi-Color Laser',
      'Box Aluminum Truss Structure',
      'Stage Trussing',
      'Professional Emcee / Anchor',
      'Dedicated Sound Engineer',
    ];

    for (const kw of highlightKeywords) {
      if (text.includes(kw)) {
        const parts = text.split(kw);
        return (
          <>
            {parts[0]}
            <strong className="text-white font-semibold underline decoration-white/20 underline-offset-2">
              {kw}
            </strong>
            {parts[1]}
          </>
        );
      }
    }
    return text;
  };

  const TierIcon = tierConfig.icon;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 group ${tierConfig.cardClass}`}
    >
      {/* Most Popular Floating Badge (Single-line, non-breaking, centered) */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-[0_0_25px_rgba(217,70,239,0.55)] border border-white/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white shrink-0 animate-pulse" />
            <span>Most Popular Choice</span>
          </div>
        </div>
      )}

      <div>
        {/* Tier Category Pill & Icon */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-widest ${tierConfig.badgeClass}`}
          >
            <TierIcon className="w-3 h-3 shrink-0" />
            <span>{tierConfig.pillTag}</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono tracking-wider font-semibold">
            ALL-INCLUSIVE
          </span>
        </div>

        {/* Package Title & Short Description */}
        <div className="border-b border-white/[0.08] pb-5">
          <h3 className="text-2xl font-black text-white tracking-tight font-heading group-hover:text-white transition-colors">
            {pkg.name}
          </h3>
          <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2 min-h-8 leading-relaxed">
            {pkg.description}
          </p>

          {/* Details & Pricing Inquiry Block */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block mb-0.5">
              Pricing & Custom Quote
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                Contact for Details
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full setup, transport & sound engineer included</span>
            </div>
          </div>

          {/* Performance Duration */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-zinc-300 text-[10px] font-bold uppercase tracking-wider">Performance Duration</span>
              </div>
              <span className="text-white font-extrabold">{pkg.durationHours} Hours Live Set</span>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="pt-5 space-y-2.5">
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs text-zinc-200 leading-snug"
            >
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 mt-0.5 border ${tierConfig.checkBg}`}
              >
                <Check className="w-2.5 h-2.5 stroke-3" />
              </span>
              <span className="flex-1">{renderFormattedFeature(feature)}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Contact on WhatsApp or Call CTAs */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-2.5">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 hover:scale-[1.02] transition-all duration-300"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>Contact on WhatsApp</span>
        </a>

        <a
          href={`tel:${cleanPhone}`}
          className="w-full py-2.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-500 transition-all duration-300"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Call for Full Details</span>
        </a>

        <div className="flex items-center justify-between pt-1 px-1">
          <Link
            href={`/book?package=${encodeURIComponent(pkg.id)}`}
            className="text-[10px] text-zinc-400 hover:text-purple-300 underline underline-offset-4 flex items-center gap-1 transition-colors"
          >
            <span>Or submit inquiry form</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-[10px] text-zinc-500">Customizable</span>
        </div>
      </div>
    </div>
  );
}
