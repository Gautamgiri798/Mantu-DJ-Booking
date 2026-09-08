import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  AlertCircle,
  CalendarDays,
  Plus,
  ArrowRight,
  MessageSquare,
  Sparkles,
  TrendingUp,
  MapPin,
  ExternalLink,
  Layers,
  Phone,
  Radio,
  Image as ImageIcon,
  ShieldCheck,
  Disc3,
  ChevronRight,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { formatCurrency, formatDate, createWhatsAppLink } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function getInitials(name: string): string {
  if (!name) return 'DJ';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_GRADIENTS = [
  'from-purple-600/30 to-pink-600/30 border-purple-500/40 text-purple-200',
  'from-cyan-600/30 to-blue-600/30 border-cyan-500/40 text-cyan-200',
  'from-amber-600/30 to-orange-600/30 border-amber-500/40 text-amber-200',
  'from-emerald-600/30 to-teal-600/30 border-emerald-500/40 text-emerald-200',
  'from-fuchsia-600/30 to-rose-600/30 border-fuchsia-500/40 text-fuchsia-200',
];

function getAvatarStyle(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

function getEventDateParts(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  const weekday = d.toLocaleDateString('en-IN', { weekday: 'short' });
  return { day, month, weekday };
}

export default async function AdminDashboardPage() {
  const [
    pendingCount,
    confirmedCount,
    totalBookings,
    upcomingBookings,
    recentBookings,
    settings,
    confirmedRevenueObj,
    serviceCount,
  ] = await Promise.all([
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count(),
    prisma.booking.findMany({
      where: {
        eventDate: { gte: new Date() },
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
      include: { customer: true, package: true },
      orderBy: { eventDate: 'asc' },
      take: 5,
    }),
    prisma.booking.findMany({
      include: { customer: true, package: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.websiteSetting.findMany(),
    prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'CONFIRMED' },
    }),
    prisma.service.count({ where: { isActive: true } }),
  ]);

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const totalRevenue = confirmedRevenueObj._sum.totalAmount || 0;

  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-8">
      {/* Executive Welcome Hero Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden glass-panel border border-white/10 bg-gradient-to-r from-purple-950/40 via-zinc-950/80 to-[#08080C] shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3 text-purple-300" />
                <span>Control Center</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Booking Engine Live</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">
                {todayFormatted}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="gradient-text">{djName}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed">
              Your real-time headquarters for tour dates, client requests, calendar locks, and live WhatsApp coordination.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-all shadow-sm"
              title="Open public website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Live Site</span>
            </a>

            <Link
              href="/admin/calendar"
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-all shadow-sm"
            >
              <CalendarDays className="w-4 h-4 text-purple-400" />
              <span>Calendar</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:opacity-95 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-purple-950/50 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>All Bookings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Executive KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Pending Requests */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-zinc-950/80 to-transparent space-y-3 shadow-xl relative overflow-hidden group hover:border-amber-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <span>Action Needed</span>
              {pendingCount > 0 && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              )}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">{pendingCount}</p>
            <p className="text-[11px] text-amber-200/80 font-medium mt-0.5">
              {pendingCount > 0 ? 'Pending confirmation' : 'Zero backlog • All clear'}
            </p>
          </div>
          <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] text-zinc-400">
            <span>Requires quote</span>
            <Link
              href="/admin/bookings"
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Review</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-zinc-950/80 to-transparent space-y-3 shadow-xl relative overflow-hidden group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-extrabold uppercase tracking-wider">
              Confirmed Shows
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">{confirmedCount}</p>
            <p className="text-[11px] text-emerald-300/80 font-medium mt-0.5">Locked on master calendar</p>
          </div>
          <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] text-zinc-400">
            <span>Dates blocked</span>
            <Link
              href="/admin/calendar"
              className="text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
            >
              <span>View Dates</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-purple-500/30 bg-gradient-to-br from-purple-500/[0.08] via-zinc-950/80 to-transparent space-y-3 shadow-xl relative overflow-hidden group hover:border-purple-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-300 font-extrabold uppercase tracking-wider">
              Upcoming Gigs
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">{upcomingBookings.length}</p>
            <p className="text-[11px] text-purple-200/80 font-medium mt-0.5">Scheduled performances</p>
          </div>
          <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px] text-zinc-400">
            <span>Next 30 days</span>
            <Link
              href="/admin/bookings"
              className="text-purple-300 hover:text-purple-200 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Schedule</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Lifetime Enquiries & Revenue */}
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.08] via-zinc-950/80 to-transparent space-y-3 shadow-xl relative overflow-hidden group hover:border-cyan-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan-300 font-extrabold uppercase tracking-wider">
              Pipeline & Leads
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {totalRevenue > 0 ? formatCurrency(totalRevenue) : totalBookings}
            </p>
            <p className="text-[11px] text-cyan-300/80 font-medium mt-0.5">
              {totalRevenue > 0 ? `${totalBookings} Total Inquiries` : 'Lifetime inquiries logged'}
            </p>
          </div>
          <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] text-zinc-400">
            <span>{serviceCount} Live Services</span>
            <span className="text-cyan-300 font-bold">100% Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Enquiries Queue & Upcoming Show Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Recent Enquiries Queue (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 space-y-5 shadow-2xl bg-zinc-950/70">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">Recent Booking Requests</h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                  {recentBookings.length} latest
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Fresh website submissions requiring coordination</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-800/40 hover:bg-purple-900/40 transition-colors"
            >
              <span>View Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <Disc3 className="w-8 h-8 mx-auto text-zinc-600 animate-spin" style={{ animationDuration: '8s' }} />
              <p className="text-xs font-semibold text-zinc-400">No booking submissions yet.</p>
              <p className="text-[11px] text-zinc-600">New website bookings will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => {
                const waNumber = b.customer.whatsapp || b.customer.phone;
                const waLink = createWhatsAppLink(
                  waNumber,
                  `Hello ${b.customer.name}, DJ Mantu here regarding your booking request (${b.bookingCode}) for ${b.eventType} on ${b.dateString}...`
                );

                const isPending = b.status === 'PENDING';
                const isConfirmed = b.status === 'CONFIRMED';
                const avatarStyle = getAvatarStyle(b.customer.name);

                return (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-md group"
                  >
                    {/* Host Avatar & Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br border flex items-center justify-center font-black text-xs shrink-0 shadow-md ${avatarStyle}`}
                      >
                        {getInitials(b.customer.name)}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {b.customer.name}
                          </span>
                          <span className="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 font-bold">
                            {b.bookingCode}
                          </span>
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                              isPending
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                                : isConfirmed
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPending ? 'bg-amber-400 animate-pulse' : isConfirmed ? 'bg-emerald-400' : 'bg-zinc-400'
                              }`}
                            />
                            <span>{b.status}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
                          <span className="font-semibold text-zinc-200">{b.eventType}</span>
                          <span>•</span>
                          <span className="text-zinc-300">{formatDate(b.eventDate)} ({b.startTime})</span>
                          <span>•</span>
                          <span className="text-cyan-400 truncate max-w-[200px]">📍 {b.venue}, {b.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 hover:text-white border border-emerald-700/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                      <Link
                        href="/admin/bookings"
                        className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-bold border border-white/10 transition-all shadow-md active:scale-95"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Schedule & Calendar Timeline (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 space-y-5 shadow-2xl bg-zinc-950/70 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-purple-400" />
                  <span>Upcoming Shows</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">Next scheduled performances</p>
              </div>
              <Link
                href="/admin/calendar"
                className="text-xs text-purple-400 hover:text-purple-300 font-bold"
              >
                Calendar →
              </Link>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 space-y-2">
                <CalendarDays className="w-8 h-8 mx-auto text-zinc-600" />
                <p className="text-xs font-semibold text-zinc-400">No upcoming gigs confirmed.</p>
                <p className="text-[11px] text-zinc-600">Pending inquiries will show here once confirmed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((ev) => {
                  const dateParts = getEventDateParts(ev.eventDate);
                  const isConfirmed = ev.status === 'CONFIRMED';
                  const waNumber = ev.customer.whatsapp || ev.customer.phone;
                  const waLink = createWhatsAppLink(
                    waNumber,
                    `Hello ${ev.customer.name}, DJ Mantu checking in regarding our upcoming gig on ${ev.dateString} at ${ev.venue}...`
                  );

                  return (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all flex items-center gap-3.5 group shadow-md"
                    >
                      {/* Date Badge Tile */}
                      <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-purple-950/80 to-zinc-900 border border-purple-500/30 flex flex-col items-center justify-center shrink-0 shadow-inner">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-300">
                          {dateParts.month}
                        </span>
                        <span className="text-lg font-black text-white leading-none mt-0.5">
                          {dateParts.day}
                        </span>
                        <span className="text-[8px] text-zinc-400 font-medium mt-0.5">
                          {dateParts.weekday}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                            {ev.eventType}
                          </span>
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                              isConfirmed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {ev.status}
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-400 truncate">
                          📍 {ev.venue}, {ev.city}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                          <span className="truncate">Host: {ev.customer.name}</span>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                            title="WhatsApp client"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Chat</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Hub Navigation Strip */}
          <div className="pt-4 border-t border-white/5 mt-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-2">
              Quick Portals
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/services"
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-white/15 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Services</span>
              </Link>
              <Link
                href="/admin/gallery"
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-white/15 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
