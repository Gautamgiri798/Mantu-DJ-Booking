'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Lock,
  Unlock,
  Calendar as CalendarIcon,
  MessageSquare,
  Phone,
  Clock,
  X,
  Loader2,
  CheckCircle2,
  Sparkles,
  Music,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, createWhatsAppLink } from '@/lib/utils';

export interface CalendarAvailabilityRecord {
  id: string;
  date: string; // "YYYY-MM-DD"
  status: string; // AVAILABLE, PENDING, BOOKED, BLOCKED
  reason?: string | null;
  booking?: {
    id: string;
    bookingCode: string;
    eventType: string;
    venue: string;
    totalAmount?: number | null;
    customer: {
      name: string;
      phone: string;
      whatsapp?: string | null;
    };
  } | null;
}

interface Props {
  initialRecords: CalendarAvailabilityRecord[];
}

export default function AdminCalendarView({ initialRecords }: Props) {
  const router = useRouter();

  // Keep state synchronized with server props
  const [prevInitialRecords, setPrevInitialRecords] = useState(initialRecords);
  const [records, setRecords] = useState<CalendarAvailabilityRecord[]>(initialRecords);

  if (prevInitialRecords !== initialRecords) {
    setPrevInitialRecords(initialRecords);
    setRecords(initialRecords);
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Filter view: 'ALL' | 'BOOKED' | 'PENDING' | 'BLOCKED'
  const [filterType, setFilterType] = useState<'ALL' | 'BOOKED' | 'PENDING' | 'BLOCKED'>('ALL');

  // Offline Booking Modal State
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    date: '',
    customerName: '',
    phone: '',
    eventType: 'Wedding Reception',
    venue: '',
    totalAmount: '',
    reason: 'Booked via Direct Phone Call',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ...
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setSelectedDay(`${now.getFullYear()}-${mm}-${dd}`);
  };

  // Helper to format date string YYYY-MM-DD
  const formatDayString = (day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const getRecordForDay = (dateStr: string) => {
    return records.find((r) => r.date === dateStr);
  };

  // Monthly statistics
  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const currentMonthRecords = records.filter((r) => r.date.startsWith(currentMonthPrefix));
  const bookedCount = currentMonthRecords.filter((r) => r.status === 'BOOKED').length;
  const pendingCount = currentMonthRecords.filter((r) => r.status === 'PENDING').length;
  const blockedCount = currentMonthRecords.filter((r) => r.status === 'BLOCKED').length;
  const availableCount = Math.max(0, daysInMonth - bookedCount - blockedCount);
  const occupancyPercent = Math.round((bookedCount / daysInMonth) * 100);

  // Block a Date
  const handleBlockDate = async (dateStr: string) => {
    const reason = prompt(
      'Reason for blocking this date (e.g. Maintenance, Vacation, Equipment Servicing)?',
      'Personal Leave / Maintenance'
    );
    if (reason === null) return;

    setLoadingAction(true);
    setActionError(null);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'BLOCK', date: dateStr, reason }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecords((prev) => [...prev.filter((r) => r.date !== dateStr), data.record]);
        setActionSuccess(`Date ${dateStr} successfully blocked.`);
        setTimeout(() => setActionSuccess(null), 3000);
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.error || 'Failed to block date');
      }
    } catch {
      setActionError('Network error blocking date');
    } finally {
      setLoadingAction(false);
    }
  };

  // Unblock a Date
  const handleUnblockDate = async (dateStr: string) => {
    if (!confirm(`Are you sure you want to unblock ${dateStr} and mark it available?`)) return;

    setLoadingAction(true);
    setActionError(null);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UNBLOCK', date: dateStr }),
      });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.date !== dateStr));
        setActionSuccess(`Date ${dateStr} unblocked and open for booking.`);
        setTimeout(() => setActionSuccess(null), 3000);
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.error || 'Failed to unblock date');
      }
    } catch {
      setActionError('Network error unblocking date');
    } finally {
      setLoadingAction(false);
    }
  };

  // Submit Offline Booking
  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
    setActionError(null);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'OFFLINE_BOOKING',
          ...offlineForm,
        }),
      });

      if (res.ok) {
        setIsOfflineModalOpen(false);
        setActionSuccess(`Offline booking for ${offlineForm.date} created successfully!`);
        setTimeout(() => setActionSuccess(null), 3500);
        router.refresh();

        // re-fetch calendar
        const calRes = await fetch('/api/admin/calendar');
        if (calRes.ok) {
          const calData = await calRes.json();
          setRecords(calData.availability);
        }
      } else {
        const d = await res.json().catch(() => ({}));
        setActionError(d.error || 'Failed to save offline booking');
      }
    } catch {
      setActionError('Error creating booking');
    } finally {
      setLoadingAction(false);
    }
  };

  const selectedRecord = selectedDay ? getRecordForDay(selectedDay) : null;

  // Real today date string YYYY-MM-DD
  const realToday = new Date();
  const realTodayString = `${realToday.getFullYear()}-${String(realToday.getMonth() + 1).padStart(2, '0')}-${String(realToday.getDate()).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      {/* 1. Executive Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Confirmed Bookings */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-rose-500/20 hover:border-rose-500/40 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-rose-400">
              Confirmed Events
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{bookedCount}</span>
            <span className="text-xs text-zinc-400">events booked</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="font-semibold text-rose-300">{occupancyPercent}%</span>
            <span>month occupancy</span>
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-amber-500/20 hover:border-amber-500/40 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
              Pending Inquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{pendingCount}</span>
            <span className="text-xs text-zinc-400">tentative holds</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Awaiting client advance</div>
        </div>

        {/* Available Dates */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400">
              Open Dates
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{availableCount}</span>
            <span className="text-xs text-zinc-400">available days</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Open for online & offline booking</div>
        </div>

        {/* Blocked Dates */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-700/40 hover:border-zinc-600 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-600/10 rounded-full blur-2xl group-hover:bg-zinc-600/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Blocked / Leave
            </span>
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{blockedCount}</span>
            <span className="text-xs text-zinc-400">locked dates</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Unavailable for public requests</div>
        </div>
      </div>

      {/* Global Toast / Notification */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* 2. Top Navigation Bar */}
      <div className="rounded-3xl glass-panel border border-white/10 p-5 sm:p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Month Header & Stepper */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-inner">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {monthNames[month]} {year}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {bookedCount} booked • {pendingCount} pending • {availableCount} free days
              </p>
            </div>
          </div>

          {/* Steppers & Primary Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-xl bg-zinc-900/90 border border-zinc-800 p-1">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleToday}
                className="px-3 py-1 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setOfflineForm({
                  date: selectedDay || formatDayString(1),
                  customerName: '',
                  phone: '',
                  eventType: 'Wedding Reception',
                  venue: '',
                  totalAmount: '',
                  reason: 'Direct Phone Booking',
                });
                setIsOfflineModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span>Record Offline Booking</span>
            </button>
          </div>
        </div>

        {/* Legend Bar & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-zinc-800/60">
          {/* Status Indicators */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500" />
              <span className="font-medium text-zinc-300">Available Date</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500 animate-pulse" />
              <span className="font-medium text-zinc-300">Confirmed Booking</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-500" />
              <span className="font-medium text-zinc-300">Pending Hold</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <span className="font-medium text-zinc-300">Blocked / Leave</span>
            </span>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 text-[11px] font-semibold">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'ALL' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Days
            </button>
            <button
              onClick={() => setFilterType('BOOKED')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'BOOKED' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Booked ({bookedCount})
            </button>
            <button
              onClick={() => setFilterType('PENDING')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'PENDING' ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
          </div>
        </div>

        {/* 3. The Modern Calendar Grid */}
        <div className="space-y-2">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest py-1.5 sm:py-2">
            <span className="text-purple-400">Sun</span>
            <span className="text-zinc-400">Mon</span>
            <span className="text-zinc-400">Tue</span>
            <span className="text-zinc-400">Wed</span>
            <span className="text-zinc-400">Thu</span>
            <span className="text-zinc-400">Fri</span>
            <span className="text-cyan-400">Sat</span>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2.5">
            {/* Trailing days from previous month */}
            {[...Array(firstDayIndex)].map((_, i) => {
              const prevDayNum = daysInPrevMonth - firstDayIndex + 1 + i;
              return (
                <div
                  key={`prev-${i}`}
                  className="min-h-12 sm:min-h-[112px] p-1 sm:p-2.5 rounded-xl sm:rounded-2xl bg-zinc-950/30 border border-white/[0.02] text-zinc-700 select-none flex flex-col justify-between"
                >
                  <span className="text-[10px] sm:text-xs font-semibold text-zinc-600">{prevDayNum}</span>
                  <span className="hidden sm:inline text-[10px] text-zinc-700 italic">Prev</span>
                </div>
              );
            })}

            {/* Current month days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const dayNumber = i + 1;
              const dateStr = formatDayString(dayNumber);
              const record = getRecordForDay(dateStr);
              const isToday = dateStr === realTodayString;
              const isSelected = selectedDay === dateStr;

              let status = 'AVAILABLE';
              if (record) status = record.status;

              // Filter out if user selected specific filter tab
              const isFilteredOut =
                filterType !== 'ALL' &&
                (filterType === 'BOOKED'
                  ? status !== 'BOOKED'
                  : filterType === 'PENDING'
                  ? status !== 'PENDING'
                  : filterType === 'BLOCKED'
                  ? status !== 'BLOCKED'
                  : false);

              // Distinct, polished styles per status
              let containerStyle =
                'bg-zinc-900/30 hover:bg-zinc-900/80 border border-white/[0.05] hover:border-emerald-500/40 text-zinc-300';
              let statusDot = 'bg-emerald-500';

              if (status === 'BOOKED') {
                containerStyle =
                  'bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-zinc-900/60 border border-rose-500/40 hover:border-rose-400 shadow-lg shadow-rose-950/20';
                statusDot = 'bg-rose-500 animate-pulse';
              } else if (status === 'PENDING') {
                containerStyle =
                  'bg-gradient-to-br from-amber-950/40 via-yellow-950/20 to-zinc-900/60 border border-amber-500/40 hover:border-amber-400 shadow-md shadow-amber-950/20';
                statusDot = 'bg-amber-400 animate-pulse';
              } else if (status === 'BLOCKED') {
                containerStyle =
                  'bg-zinc-900/80 border border-zinc-700/60 text-zinc-400 hover:border-zinc-500';
                statusDot = 'bg-zinc-600';
              }

              if (isFilteredOut) {
                containerStyle += ' opacity-25 grayscale';
              }

              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDay(dateStr)}
                  className={`min-h-12 sm:min-h-[112px] p-1 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${containerStyle} ${
                    isSelected
                      ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-[#08080C] scale-[1.02] shadow-xl z-10'
                      : 'hover:scale-[1.015]'
                  }`}
                >
                  {/* Top Bar: Date Number & Status Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span
                        className={`text-[11px] sm:text-sm font-black ${
                          isToday
                            ? 'text-cyan-400'
                            : status === 'BOOKED'
                            ? 'text-white'
                            : status === 'PENDING'
                            ? 'text-amber-300'
                            : 'text-zinc-200'
                        }`}
                      >
                        {dayNumber}
                      </span>
                      {isToday && (
                        <span className="hidden sm:inline-block text-[8px] font-extrabold uppercase px-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Today
                        </span>
                      )}
                    </div>
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusDot}`} />
                  </div>

                  {/* Middle / Content Slot - hidden on small mobile, details shown in inspector below */}
                  <div className="space-y-1 hidden sm:block">
                    {status === 'BOOKED' ? (
                      <div className="space-y-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-rose-500/25 border border-rose-500/30 text-[10px] font-bold text-rose-200 truncate max-w-full">
                          {record?.booking ? record.booking.eventType : 'Booked'}
                        </span>
                        {record?.booking?.customer?.name && (
                          <span className="block text-[11px] font-semibold text-zinc-200 truncate">
                            {record.booking.customer.name.split(' ')[0]}
                          </span>
                        )}
                        {record?.booking?.venue && (
                          <span className="hidden sm:block text-[9px] text-zinc-400 truncate">
                            {record.booking.venue}
                          </span>
                        )}
                      </div>
                    ) : status === 'PENDING' ? (
                      <div className="space-y-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-amber-500/25 border border-amber-500/30 text-[10px] font-bold text-amber-200 truncate max-w-full">
                          Hold / Pending
                        </span>
                        {record?.booking?.customer?.name && (
                          <span className="block text-[11px] font-semibold text-zinc-200 truncate">
                            {record.booking.customer.name.split(' ')[0]}
                          </span>
                        )}
                        {record?.reason && !record?.booking && (
                          <span className="hidden sm:block text-[9px] text-amber-300/80 truncate">
                            {record.reason}
                          </span>
                        )}
                      </div>
                    ) : status === 'BLOCKED' ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] font-semibold text-zinc-400 truncate max-w-full">
                          <Lock className="w-2.5 h-2.5 text-zinc-400" />
                          <span className="truncate">{record?.reason || 'Blocked'}</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-emerald-400 font-medium">+ Manage</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Leading days from next month to keep clean complete grid */}
            {[...Array((7 - ((firstDayIndex + daysInMonth) % 7)) % 7)].map((_, i) => (
              <div
                key={`next-${i}`}
                className="min-h-[96px] sm:min-h-[112px] p-2.5 rounded-2xl bg-zinc-950/30 border border-white/[0.02] text-zinc-700 select-none flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-zinc-600">{i + 1}</span>
                <span className="text-[10px] text-zinc-700 italic">Next Month</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Selected Day Action Drawer / Control Panel */}
      {selectedDay && (
        <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-purple-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4">
            {/* Date Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
                  Selected Date
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {new Date(selectedDay).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h3>
              </div>

              {/* Status Info */}
              {selectedRecord?.status === 'BOOKED' ? (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">
                      Confirmed Booking
                    </span>
                    {selectedRecord.booking && (
                      <>
                        <span className="text-zinc-300 font-semibold">
                          Code: <span className="font-mono text-white">{selectedRecord.booking.bookingCode}</span>
                        </span>
                        <span>•</span>
                        <span className="text-zinc-300 font-semibold">
                          Host: <span className="text-white">{selectedRecord.booking.customer.name}</span>
                        </span>
                        <span>•</span>
                        <span className="text-zinc-300 font-semibold">
                          Venue: <span className="text-white">{selectedRecord.booking.venue}</span>
                        </span>
                        {selectedRecord.booking.totalAmount && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 font-bold">
                              {formatCurrency(selectedRecord.booking.totalAmount)}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : selectedRecord?.status === 'PENDING' ? (
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                      Pending Reservation Hold
                    </span>
                    {selectedRecord.booking && (
                      <span className="text-zinc-300">
                        Inquiry from <strong className="text-white">{selectedRecord.booking.customer.name}</strong> ({selectedRecord.booking.eventType})
                      </span>
                    )}
                    {selectedRecord.reason && !selectedRecord.booking && (
                      <span className="text-zinc-400">• {selectedRecord.reason}</span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-[11px]">
                    This date is temporarily marked tentative. You can confirm it via the booking table or clear it if the client cancelled.
                  </p>
                </div>
              ) : selectedRecord?.status === 'BLOCKED' ? (
                <div className="flex items-center gap-3 pt-1 text-xs text-zinc-300">
                  <span className="px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Locked / Blocked</span>
                  </span>
                  <span>Reason: <strong className="text-white">{selectedRecord.reason || 'No reason specified'}</strong></span>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Date is 100% available and ready for bookings.</span>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedDay(null)}
              className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-5 mt-4 border-t border-zinc-800/80">
            {selectedRecord?.status === 'BLOCKED' ? (
              <button
                onClick={() => handleUnblockDate(selectedDay)}
                disabled={loadingAction}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
              >
                {loadingAction ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
                <span>Unblock & Make Available</span>
              </button>
            ) : selectedRecord?.status === 'BOOKED' && selectedRecord.booking ? (
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={createWhatsAppLink(
                    selectedRecord.booking.customer.whatsapp || selectedRecord.booking.customer.phone,
                    `Hello ${selectedRecord.booking.customer.name}, DJ Mantu here regarding your upcoming event (${selectedRecord.booking.bookingCode}) on ${selectedDay}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedRecord.booking.customer.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-zinc-700"
                >
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>Call {selectedRecord.booking.customer.phone}</span>
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setOfflineForm({
                      ...offlineForm,
                      date: selectedDay,
                    });
                    setIsOfflineModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record Offline Booking</span>
                </button>

                <button
                  onClick={() => handleBlockDate(selectedDay)}
                  disabled={loadingAction}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-zinc-700 transition-colors"
                >
                  {loadingAction ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4 text-rose-400" />
                  )}
                  <span>Block This Date</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Offline Booking Modal */}
      {isOfflineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOfflineModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
                Direct / Phone Reservation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Record Offline Booking</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Locks the date on your public calendar and saves host contact info.
              </p>
            </div>

            <form onSubmit={handleOfflineSubmit} className="space-y-3.5 text-left text-xs">
              <div>
                <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  required
                  value={offlineForm.date}
                  onChange={(e) => setOfflineForm({ ...offlineForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Customer / Host Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={offlineForm.customerName}
                  onChange={(e) => setOfflineForm({ ...offlineForm, customerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9337828746"
                  value={offlineForm.phone}
                  onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                    Event Type
                  </label>
                  <select
                    value={offlineForm.eventType}
                    onChange={(e) => setOfflineForm({ ...offlineForm, eventType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Sangeet / Haldi">Sangeet / Haldi</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="College Fest">College Fest</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Private Bash">Private Bash</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                    Agreed Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={offlineForm.totalAmount}
                    onChange={(e) => setOfflineForm({ ...offlineForm, totalAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Venue & City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hotel Meghdoot, Jharsuguda"
                  value={offlineForm.venue}
                  onChange={(e) => setOfflineForm({ ...offlineForm, venue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                  Notes / Advance Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹10k advance received via UPI"
                  value={offlineForm.reason}
                  onChange={(e) => setOfflineForm({ ...offlineForm, reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all"
                >
                  {loadingAction ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Save & Lock Date</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
