'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Loader2,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { EVENT_CATEGORIES, createWhatsAppLink } from '@/lib/utils';

interface AvailabilityCheckerProps {
  whatsapp?: string;
  defaultDate?: string;
  compact?: boolean;
}

export default function AvailabilityChecker({
  whatsapp = '+91 9337828746',
  defaultDate,
  compact = false,
}: AvailabilityCheckerProps) {
  // Default to a realistic upcoming date or tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(defaultDate || minDate);
  const [eventType, setEventType] = useState<string>('Royal Wedding / Reception');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    checked: boolean;
    available?: boolean;
    status?: string;
    message?: string;
  } | null>(null);

  const checkAvailability = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!date) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/availability/check?date=${encodeURIComponent(date)}&eventType=${encodeURIComponent(
          eventType
        )}&location=${encodeURIComponent(location)}`
      );
      const data = await res.json();
      setResult({
        checked: true,
        available: data.available,
        status: data.status,
        message: data.message,
      });
    } catch {
      setResult({
        checked: true,
        available: false,
        status: 'ERROR',
        message: 'Could not connect to availability server. Please reach out via WhatsApp.',
      });
    } finally {
      setLoading(false);
    }
  };

  const waAvailableLink = createWhatsAppLink(
    whatsapp,
    `Hello DJ Mantu, I checked your availability for ${eventType} on ${date} at ${location} and it is open! I would like to book.`
  );

  const waWaitlistLink = createWhatsAppLink(
    whatsapp,
    `Hi DJ Mantu, I saw that ${date} is currently booked for ${eventType} in ${location}. Do you have backup sound units or an opening on adjacent dates?`
  );

  return (
    <div className={`relative w-full ${compact ? 'max-w-xl mx-auto' : 'max-w-4xl mx-auto'}`}>
      {/* Outer Ambient Glow Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/25 via-fuchsia-600/20 to-cyan-600/25 blur-2xl rounded-3xl pointer-events-none -z-10" />

      {/* Main Luxury Glass Terminal Card */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] p-4 sm:p-8 overflow-hidden">
        {/* Top ambient highlight line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />


        <form onSubmit={checkAvailability} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* 1. Event Type Select */}
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Event Type</span>
              </label>
              <div className="relative">
                <select
                  value={eventType}
                  onChange={(e) => {
                    setEventType(e.target.value);
                    setResult(null);
                  }}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 focus:border-purple-500 focus:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 text-white font-medium text-base sm:text-sm transition-all cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] min-h-12"
                >
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-zinc-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* 2. Date Picker */}
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Select Event Date</span>
              </label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setResult(null);
                }}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 focus:border-purple-500 focus:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 text-white font-medium text-base sm:text-sm transition-all [color-scheme:dark] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] min-h-12"
              />
            </div>

            {/* 3. Event City / Location */}
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Host City / Venue</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. Jharsuguda"
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 focus:border-purple-500 focus:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 text-white font-medium text-base sm:text-sm transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] min-h-12"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 px-8 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-white whitespace-nowrap bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-400 shadow-[0_0_35px_rgba(217,70,239,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(217,70,239,0.85)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-white/25 overflow-hidden flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* Animated Sheen Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Checking Master Touring Calendar...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform shrink-0" />
                  <span>Check Real-Time Availability</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </>
              )}
            </button>

            {/* Reassurance Micro-Footer */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] text-zinc-500 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                100% Confidential
              </span>
              <span>•</span>
              <span>Direct Artist Confirmation</span>
              <span>•</span>
              <span>2026/2027 Bookings Open</span>
            </div>
          </div>
        </form>

      {/* Result Display */}
      {result && result.checked && (
        <div className="mt-6 pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
          {result.available ? (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-left space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      🟢 Currently Available
                    </span>
                    <span className="text-xs text-zinc-400">
                      {new Date(date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1.5">
                    Great! DJ Mantu is available for your {eventType} in {location}.
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    Dates fill up quickly during peak wedding seasons. Lock in your booking or request a custom quotation now.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href={`/book?date=${encodeURIComponent(date)}&eventType=${encodeURIComponent(
                    eventType
                  )}&city=${encodeURIComponent(location)}`}
                  className="w-full sm:w-auto flex-1 text-center py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  <span>Request Booking Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={waAvailableLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 text-center py-3 px-6 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-left space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      🔴 Unavailable
                    </span>
                    <span className="text-xs text-zinc-400">
                      {new Date(date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1.5">
                    Sorry, the DJ is already booked or reserved for this date.
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    To maintain the highest quality, DJ Mantu only takes one premier event per slot. You can check an alternate date or message us on WhatsApp for special arrangements or backup sound units.
                  </p>
                </div>
              </div>

              {/* Alternative CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl font-bold text-sm bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                >
                  Select Another Date
                </button>

                <a
                  href={waWaitlistLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 text-center py-3 px-6 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Inquire Backup / Adjacent Date</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
