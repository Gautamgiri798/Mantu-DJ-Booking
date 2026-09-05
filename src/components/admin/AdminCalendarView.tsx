'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  Calendar as CalendarIcon,
  MessageSquare,
  User,
  Phone,
  Clock,
  X,
  Loader2,
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
  const [records, setRecords] = useState<CalendarAvailabilityRecord[]>(initialRecords);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

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
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
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

  // Block a Date
  const handleBlockDate = async (dateStr: string) => {
    const reason = prompt('Reason for blocking this date (e.g. Vacation, Maintenance, Personal)?', 'Maintenance / Unavailable');
    if (reason === null) return;

    setLoadingAction(true);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'BLOCK', date: dateStr, reason }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecords((prev) => [...prev.filter((r) => r.date !== dateStr), data.record]);
        router.refresh();
      }
    } catch {
      alert('Failed to block date');
    } finally {
      setLoadingAction(false);
    }
  };

  // Unblock a Date
  const handleUnblockDate = async (dateStr: string) => {
    if (!confirm(`Are you sure you want to unblock ${dateStr} and mark it available?`)) return;

    setLoadingAction(true);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UNBLOCK', date: dateStr }),
      });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.date !== dateStr));
        router.refresh();
      }
    } catch {
      alert('Failed to unblock date');
    } finally {
      setLoadingAction(false);
    }
  };

  // Submit Offline Booking
  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
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
        router.refresh();
        // re-fetch calendar
        const calRes = await fetch('/api/admin/calendar');
        if (calRes.ok) {
          const calData = await calRes.json();
          setRecords(calData.availability);
        }
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to save offline booking');
      }
    } catch {
      alert('Error creating booking');
    } finally {
      setLoadingAction(false);
    }
  };

  const selectedRecord = selectedDay ? getRecordForDay(selectedDay) : null;

  return (
    <div className="space-y-6">
      {/* Top Controls & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            Available
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            Pending
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            Booked
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-zinc-600" />
            Blocked
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-3xl glass-panel border border-white/10 p-4 sm:p-6 shadow-2xl">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells before day 1 */}
          {[...Array(firstDayIndex)].map((_, i) => (
            <div key={`empty-${i}`} className="h-24 sm:h-28 rounded-2xl bg-zinc-950/20 opacity-30" />
          ))}

          {/* Days in Month */}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNumber = i + 1;
            const dateStr = formatDayString(dayNumber);
            const record = getRecordForDay(dateStr);

            let status = 'AVAILABLE';
            let badgeBg = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
            let label = 'Available';

            if (record) {
              status = record.status;
              if (status === 'BOOKED') {
                badgeBg = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                label = record.booking ? record.booking.eventType : 'Booked';
              } else if (status === 'PENDING') {
                badgeBg = 'bg-amber-500/20 border-amber-500/50 text-amber-300';
                label = 'Pending';
              } else if (status === 'BLOCKED') {
                badgeBg = 'bg-zinc-800 border-zinc-700 text-zinc-400';
                label = 'Blocked';
              }
            }

            const isSelected = selectedDay === dateStr;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDay(dateStr)}
                className={`h-24 sm:h-28 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${badgeBg} ${
                  isSelected ? 'ring-2 ring-purple-400 scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black text-white">{dayNumber}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === 'BOOKED'
                        ? 'bg-rose-500'
                        : status === 'PENDING'
                        ? 'bg-amber-500'
                        : status === 'BLOCKED'
                        ? 'bg-zinc-600'
                        : 'bg-emerald-500'
                    }`}
                  />
                </div>

                <div className="text-[10px] font-semibold truncate leading-tight">
                  <span className="block truncate">{label}</span>
                  {record?.booking?.customer?.name && (
                    <span className="text-zinc-300 font-normal truncate block">
                      {record.booking.customer.name.split(' ')[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Action Drawer / Banner */}
      {selectedDay && (
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/40 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black text-purple-400 tracking-wider">
                  Selected Date:
                </span>
                <span className="text-base font-black text-white">
                  {new Date(selectedDay).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Status details */}
              <div className="mt-1 text-xs text-zinc-300">
                {selectedRecord ? (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">Status: {selectedRecord.status}</span>
                    {selectedRecord.reason && <span>• {selectedRecord.reason}</span>}
                    {selectedRecord.booking && (
                      <span className="text-purple-300">
                        • {selectedRecord.booking.eventType} ({selectedRecord.booking.customer.name})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-emerald-400 font-semibold">
                    🟢 Date is currently 100% open for booking.
                  </span>
                )}
              </div>
            </div>

            {/* Actions for this day */}
            <div className="flex flex-wrap items-center gap-2.5">
              {selectedRecord?.status === 'BLOCKED' ? (
                <button
                  onClick={() => handleUnblockDate(selectedDay)}
                  disabled={loadingAction}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Unblock Date</span>
                </button>
              ) : selectedRecord?.status === 'BOOKED' && selectedRecord.booking ? (
                <a
                  href={createWhatsAppLink(
                    selectedRecord.booking.customer.whatsapp || selectedRecord.booking.customer.phone,
                    `Hello ${selectedRecord.booking.customer.name}, DJ Mantu here regarding your upcoming event on ${selectedDay}...`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-900/60"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Host</span>
                </a>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setOfflineForm({
                        ...offlineForm,
                        date: selectedDay,
                      });
                      setIsOfflineModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Offline Booking</span>
                  </button>

                  <button
                    onClick={() => handleBlockDate(selectedDay)}
                    disabled={loadingAction}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-zinc-700"
                  >
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Block Date</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offline Booking Modal (PRD Section 20) */}
      {isOfflineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOfflineModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
                Direct / Phone Walk-in
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Record Offline Booking</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                For customers who booked directly via phone call or in-person.
              </p>
            </div>

            <form onSubmit={handleOfflineSubmit} className="space-y-3 text-left text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Event Date</label>
                <input
                  type="date"
                  required
                  value={offlineForm.date}
                  onChange={(e) => setOfflineForm({ ...offlineForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Customer / Host Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Agrawal"
                  value={offlineForm.customerName}
                  onChange={(e) => setOfflineForm({ ...offlineForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={offlineForm.phone}
                  onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Event Type</label>
                  <select
                    value={offlineForm.eventType}
                    onChange={(e) => setOfflineForm({ ...offlineForm, eventType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Sangeet">Sangeet</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="College Fest">College Fest</option>
                    <option value="Corporate Event">Corporate Event</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Agreed Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={offlineForm.totalAmount}
                    onChange={(e) => setOfflineForm({ ...offlineForm, totalAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Venue & City</label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Regency, Rourkela"
                  value={offlineForm.venue}
                  onChange={(e) => setOfflineForm({ ...offlineForm, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Notes / Advance Details</label>
                <input
                  type="text"
                  placeholder="e.g. Advance ₹10,000 received in cash"
                  value={offlineForm.reason}
                  onChange={(e) => setOfflineForm({ ...offlineForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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
