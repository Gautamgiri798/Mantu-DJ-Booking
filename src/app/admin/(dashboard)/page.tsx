import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Users,
  AlertCircle,
  CalendarDays,
  Plus,
  ArrowRight,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { formatCurrency, formatDate, createWhatsAppLink } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    pendingCount,
    confirmedCount,
    totalBookings,
    upcomingBookings,
    recentBookings,
    settings,
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
  ]);

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Welcome, {djName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Here is your live overview of bookings, calendar availability, and client enquiries.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/calendar"
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 border border-zinc-700"
          >
            <CalendarDays className="w-3.5 h-3.5 text-purple-400" />
            <span>Manage Calendar</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>All Bookings</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards (PRD Section 18) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Pending Requests */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase tracking-wider">
            <span>Pending Requests</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{pendingCount}</p>
          <p className="text-[11px] text-zinc-400">
            {pendingCount > 0 ? 'Requires your confirmation' : 'All caught up'}
          </p>
        </div>

        {/* Confirmed Bookings */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase tracking-wider">
            <span>Confirmed Bookings</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{confirmedCount}</p>
          <p className="text-[11px] text-zinc-400">Locked on calendar</p>
        </div>

        {/* Upcoming Events */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase tracking-wider">
            <span>Upcoming Events</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{upcomingBookings.length}</p>
          <p className="text-[11px] text-zinc-400">Scheduled ahead</p>
        </div>

        {/* Total Enquiries */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold uppercase tracking-wider">
            <span>Total Enquiries</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white">{totalBookings}</p>
          <p className="text-[11px] text-zinc-400">Lifetime inquiries logged</p>
        </div>
      </div>

      {/* Main Grid: Recent Bookings & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries Queue (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Booking Requests</h2>
              <p className="text-xs text-zinc-400">Latest website submissions</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>View Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-xs text-zinc-500 py-8 text-center">No bookings submitted yet.</p>
          ) : (
            <div className="divide-y divide-zinc-800/80">
              {recentBookings.map((b) => {
                const waLink = createWhatsAppLink(
                  b.customer.whatsapp || b.customer.phone,
                  `Hello ${b.customer.name}, regarding your DJ booking request (${b.bookingCode}) for ${b.eventType} on ${b.dateString}...`
                );

                return (
                  <div
                    key={b.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{b.customer.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {b.bookingCode}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : b.status === 'PENDING'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {b.eventType} • {formatDate(b.eventDate)} ({b.startTime}) • {b.venue}, {b.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                      <Link
                        href={`/admin/bookings?id=${b.id}`}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
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

        {/* Upcoming Schedule (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl glass-panel border border-white/10 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-purple-400" /> Upcoming Events
            </h2>
            <p className="text-xs text-zinc-400">Next scheduled performances</p>
          </div>

          {upcomingBookings.length === 0 ? (
            <p className="text-xs text-zinc-500 py-8 text-center">No upcoming events scheduled.</p>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{ev.eventType}</span>
                    <span className="text-[11px] font-semibold text-purple-300">
                      {formatDate(ev.eventDate)}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    📍 {ev.venue}, {ev.city}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[10px] text-zinc-500">
                    <span>Host: {ev.customer.name}</span>
                    <span className="text-emerald-400 font-bold">{ev.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
