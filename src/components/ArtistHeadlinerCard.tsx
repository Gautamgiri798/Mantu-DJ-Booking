'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BadgeCheck,
  Laptop,
  Volume2,
  Zap,
  Flame,
  MapPin,
  Music2,
  Play,
  Pause,
  AudioLines,
} from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';

interface ArtistHeadlinerCardProps {
  djName?: string;
  whatsapp?: string;
  phone?: string;
  location?: string;
  instagramUrl?: string;
  instagramHandle?: string;
}

export default function ArtistHeadlinerCard({
  djName = 'DJ Mantu',
  whatsapp = '+91 9337828746',
  location = 'Rourkela • Sundargarh • Odisha',
  instagramUrl = 'https://www.instagram.com/awaraboy458/',
  instagramHandle = '@awaraboy458',
}: ArtistHeadlinerCardProps) {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);

  const waLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I am viewing your profile card and would like to inquire about booking your DJ services for an event.`
  );

  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* 1. Multilayered Ambient Backstage Neon Glow */}
      <div className="absolute -inset-4 bg-linear-to-tr from-purple-600/35 via-pink-600/25 to-cyan-500/25 blur-3xl rounded-3xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-pink-600/20 blur-2xl rounded-full -z-10" />

      {/* 2. Main Luxury Holographic Card Frame */}
      <div className="relative rounded-3xl p-px bg-linear-to-b from-purple-500/50 via-pink-500/20 to-cyan-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden backdrop-blur-2xl">
        <div className="rounded-[23px] bg-[#090812]/95 overflow-hidden flex flex-col">

          {/* 3. Top Header Status Bar */}
          <div className="px-5 py-3 bg-white/3 border-b border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
            {/* Instagram Account Profile Link */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group/ig hover:opacity-90 transition-all"
              title={`Follow ${djName} on Instagram (${instagramHandle})`}
            >
              <div className="w-6 h-6 rounded-full bg-linear-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1.5px] shadow-sm flex items-center justify-center group-hover/ig:scale-110 transition-transform">
                <div className="w-full h-full bg-[#090812] rounded-full flex items-center justify-center">
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wide text-xs text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-300 to-pink-200 group-hover/ig:from-pink-200 group-hover/ig:to-white transition-colors">
                  {instagramHandle}
                </span>
                <span className="text-[10px] text-pink-400/80 font-bold group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </div>
            </a>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Tour 2026/27</span>
            </div>
          </div>

          {/* 4. High-Definition Concert Stage Portrait */}
          <div className="relative aspect-[4/3.4] w-full overflow-hidden bg-zinc-950">
            <Image
              src="/images/dj-mantu-live.jpg"
              alt={`${djName} Live at the Decks`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-linear-to-t from-[#090812] via-transparent to-black/20 opacity-80" />
            <div className="absolute inset-0 bg-radial-[circle_at_top] from-transparent via-transparent to-black/40" />

            {/* Top Left Stage Tag */}
            <div className="absolute top-3 left-3 z-10">
              <div className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Laptop className="w-3 h-3 text-cyan-400" />
                <span>Digital DJ Setup</span>
              </div>
            </div>

            {/* Live Audio Visualizer Overlay Bar */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 p-2 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-2.5 shadow-lg">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlayingTeaser(!isPlayingTeaser)}
                  className="w-6 h-6 rounded-lg bg-linear-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0 hover:scale-110 active:scale-95 transition-all shadow-md shadow-purple-900/40"
                  title="Simulate Audio Teaser"
                >
                  {isPlayingTeaser ? (
                    <Pause className="w-2.5 h-2.5 fill-white" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-1">
                    <Music2 className="w-3 h-3 text-pink-400" />
                    <span className="text-[10px] font-bold text-white tracking-wide">
                      Live Set Atmosphere
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono block leading-none">
                    {isPlayingTeaser ? 'NOW PLAYING • 130 BPM DROP' : '128 - 132 BPM • PEAK ENERGY'}
                  </span>
                </div>
              </div>

              {/* Modern Audio Wave Lines */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 shrink-0">
                <AudioLines className={`w-3.5 h-3.5 text-emerald-400 ${isPlayingTeaser ? 'animate-pulse' : ''}`} />
                <span className="text-[9px] font-mono font-bold text-emerald-400">HQ AUDIO</span>
              </div>
            </div>
          </div>

          {/* 5. Artist Console & Tech Specs Base Dock */}
          <div className="p-4 sm:p-5 space-y-3 bg-linear-to-b from-[#090812] to-[#0d0a17]">
            {/* Artist Title & Verified Seal */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-black text-white tracking-wide font-heading">
                    {djName}
                  </h3>
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                </div>
                <p className="text-[11px] font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-cyan-300">
                  Western Odisha&apos;s #1 Open-Format Headliner
                </p>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>{location}</span>
                </div>
              </div>

              <div className="text-right shrink-0 px-2 py-1 rounded-lg bg-white/4 border border-white/10">
                <span className="text-[8px] text-zinc-400 uppercase tracking-widest block font-medium">Stage Rank</span>
                <span className="text-[10px] font-black text-amber-300 block">TOP RATED</span>
              </div>
            </div>

            {/* Pro Production Hardware Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 flex items-center gap-2.5 hover:border-purple-500/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Laptop className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[9px] text-zinc-400 uppercase font-medium block">Console Rig</span>
                  <span className="text-xs font-bold text-zinc-200 truncate block">
                    Digital DJ Setup
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 flex items-center gap-2.5 hover:border-cyan-500/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[9px] text-zinc-400 uppercase font-medium block">Acoustics</span>
                  <span className="text-xs font-bold text-zinc-200 truncate block">VTX Line Array</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 flex items-center gap-2.5 hover:border-amber-500/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[9px] text-zinc-400 uppercase font-medium block">Light Show</span>
                  <span className="text-xs font-bold text-zinc-200 truncate block">Sharpy 10R Beam</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 flex items-center gap-2.5 hover:border-pink-500/30 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[9px] text-zinc-400 uppercase font-medium block">Atmospherics</span>
                  <span className="text-xs font-bold text-zinc-200 truncate block">Dry Ice & Sparkulars</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Consultation CTA Button */}
            <div className="pt-1">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-98 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat Direct On WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
