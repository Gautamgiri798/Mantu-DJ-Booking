'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Eye,
  MessageSquare,
  Phone,
  CheckCircle,
  Trash2,
  X,
  Loader2,
} from 'lucide-react';
import { formatCurrency, formatDate, createWhatsAppLink, BOOKING_STATUSES } from '@/lib/utils';

export interface AdminBookingItem {
  id: string;
  bookingCode: string;
  eventType: string;
  eventDate: string | Date;
  dateString: string;
  startTime: string;
  endTime?: string | null;
  venue: string;
  city: string;
  guestCount?: number | null;
  budgetRange?: string | null;
  status: string;
  totalAmount?: number | null;
  customerNotes?: string | null;
  adminNotes?: string | null;
  services?: string | null;
  createdAt: string | Date;
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    whatsapp?: string | null;
    notes?: string | null;
  };
  package?: {
    id: string;
    name: string;
    price: number;
  } | null;
}

interface Props {
  initialBookings: AdminBookingItem[];
}

export default function BookingManagementTable({ initialBookings }: Props) {
  const router = useRouter();
  const [prevInitialBookings, setPrevInitialBookings] = useState(initialBookings);
  const [bookings, setBookings] = useState<AdminBookingItem[]>(initialBookings);

  if (prevInitialBookings !== initialBookings) {
    setPrevInitialBookings(initialBookings);
    setBookings(initialBookings);
  }

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeBooking, setActiveBooking] = useState<AdminBookingItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Edit fields for drawer
  const [statusInput, setStatusInput] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [totalAmountInput, setTotalAmountInput] = useState('');

  const openDrawer = (b: AdminBookingItem) => {
    setActiveBooking(b);
    setStatusInput(b.status);
    setAdminNotesInput(b.adminNotes || '');
    setTotalAmountInput(b.totalAmount ? String(b.totalAmount) : '');
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleUpdate = async () => {
    if (!activeBooking) return;
    setIsUpdating(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeBooking.id,
          status: statusInput,
          adminNotes: adminNotesInput,
          totalAmount: totalAmountInput ? Number(totalAmountInput) : null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedBooking = data.booking || {
          ...activeBooking,
          status: statusInput,
          adminNotes: adminNotesInput,
          totalAmount: totalAmountInput ? Number(totalAmountInput) : null,
        };

        setBookings((prev) =>
          prev.map((b) => (b.id === activeBooking.id ? { ...b, ...updatedBooking } : b))
        );
        setActiveBooking((prev) => (prev ? { ...prev, ...updatedBooking } : null));
        setSaveSuccess(true);
        router.refresh();

        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        const err = await res.json().catch(() => ({}));
        setSaveError(err.error || 'Failed to update booking status.');
      }
    } catch {
      setSaveError('Network error updating booking.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (activeBooking?.id === id) setActiveBooking(null);
        router.refresh();
      }
    } catch {
      alert('Failed to delete booking.');
    }
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.phone.includes(search) ||
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.venue.toLowerCase().includes(search.toLowerCase()) ||
      b.eventType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, phone, ID, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-purple-500"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All ({bookings.length})
          </button>
          {BOOKING_STATUSES.map((s) => {
            const count = bookings.filter((b) => b.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === s.value
                    ? 'bg-zinc-700 text-white border border-zinc-600'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {s.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 uppercase text-[10px] font-bold text-zinc-400 tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Booking ID / Host</th>
                <th className="py-3.5 px-4">Event Type</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Venue & City</th>
                <th className="py-3.5 px-4">Package / Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    No bookings found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const waNumber = b.customer.whatsapp || b.customer.phone;
                  const waLink = createWhatsAppLink(
                    waNumber,
                    `Hello ${b.customer.name}, DJ Mantu here regarding your booking (${b.bookingCode}) for ${b.eventType} on ${b.dateString}...`
                  );

                  const statusObj = BOOKING_STATUSES.find((s) => s.value === b.status);

                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => openDrawer(b)}
                    >
                      {/* Host & ID */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{b.customer.name}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-zinc-500 text-[11px]">
                          <span className="font-mono text-purple-300">{b.bookingCode}</span>
                          <span>• {b.customer.phone}</span>
                        </div>
                      </td>

                      {/* Event Type */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-zinc-200">{b.eventType}</span>
                        {b.guestCount && (
                          <span className="text-[10px] text-zinc-500 block">
                            ~{b.guestCount} guests
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-white block">
                          {formatDate(b.eventDate)}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {b.startTime} {b.endTime ? `- ${b.endTime}` : ''}
                        </span>
                      </td>

                      {/* Venue */}
                      <td className="py-3.5 px-4">
                        <span className="truncate max-w-[180px] block text-zinc-200">
                          {b.venue}
                        </span>
                        <span className="text-[10px] text-cyan-400">{b.city}</span>
                      </td>

                      {/* Package / Amount */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">
                          {b.totalAmount ? formatCurrency(b.totalAmount) : b.budgetRange || 'Pending Quote'}
                        </span>
                        <span className="text-[10px] text-zinc-500 truncate max-w-[120px] block">
                          {b.package ? b.package.name : 'Custom Setup'}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            statusObj?.color || 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      {/* Quick Actions */}
                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openDrawer(b)}
                            title="View / Edit details"
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details / Edit Drawer */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="relative w-full max-w-lg h-full bg-[#0d0d14] border-l border-zinc-800 p-6 sm:p-8 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-300">
            {/* Close */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
                  Booking Details
                </span>
                <h3 className="text-xl font-black text-white">{activeBooking.bookingCode}</h3>
              </div>
              <button
                onClick={() => setActiveBooking(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Host Details */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Host Contact
              </span>
              <h4 className="text-base font-bold text-white">{activeBooking.customer.name}</h4>
              <div className="flex items-center gap-4 text-xs text-zinc-300">
                <a
                  href={`tel:${activeBooking.customer.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 hover:text-purple-400 font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>{activeBooking.customer.phone}</span>
                </a>
                <a
                  href={createWhatsAppLink(
                    activeBooking.customer.whatsapp || activeBooking.customer.phone,
                    `Hello ${activeBooking.customer.name}, DJ Mantu here regarding your booking (${activeBooking.bookingCode}) for ${activeBooking.eventType} on ${activeBooking.dateString}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Event Specs */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Event Schedule & Venue
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-zinc-500 block">Type</span>
                  <span className="font-bold text-white">{activeBooking.eventType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Date</span>
                  <span className="font-bold text-white">{activeBooking.dateString}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Time</span>
                  <span className="font-medium text-zinc-300">
                    {activeBooking.startTime} - {activeBooking.endTime || 'Late'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Expected Guests</span>
                  <span className="font-medium text-zinc-300">
                    {activeBooking.guestCount || 'Not specified'}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-zinc-500 block">Venue</span>
                <span className="font-medium text-zinc-200">
                  {activeBooking.venue}, {activeBooking.city}
                </span>
              </div>
            </div>

            {/* Client Notes & Services */}
            {activeBooking.customerNotes && (
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs space-y-1">
                <span className="font-bold text-purple-300 uppercase tracking-wider block">
                  Customer Song / Entry Notes:
                </span>
                <p className="text-zinc-300 leading-relaxed italic">
                  &ldquo;{activeBooking.customerNotes}&rdquo;
                </p>
              </div>
            )}

            {/* Quick Status / Admin Edit Form */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Change Booking Status
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase focus:outline-none focus:border-purple-500"
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-zinc-500 mt-1">
                  * Marking as CONFIRMED automatically marks date as BOOKED on calendar.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Total Agreed Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25000"
                  value={totalAmountInput}
                  onChange={(e) => setTotalAmountInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Private Owner Notes (Internal Only)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. ₹10k advance received via GPay. Crew arrival 4 PM."
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {saveError && (
                <p className="text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-800/60 px-3 py-2 rounded-xl">
                  {saveError}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                    saveSuccess
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-white animate-in zoom-in-50 duration-200" />
                      <span>Saved Successfully!</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(activeBooking.id)}
                  className="p-3 rounded-xl bg-rose-950/40 text-rose-400 border border-rose-900/60 hover:bg-rose-900/60"
                  title="Delete booking"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
