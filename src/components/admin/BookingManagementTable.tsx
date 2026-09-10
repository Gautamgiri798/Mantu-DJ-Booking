'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Eye,
  MessageSquare,
  Phone,
  CheckCircle2,
  Trash2,
  X,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Check,
  Copy,
  Music,
  ChevronDown,
  User,
} from 'lucide-react';
import { formatCurrency, formatDate, createWhatsAppLink, BOOKING_STATUSES, EVENT_CATEGORIES } from '@/lib/utils';

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

function getInitials(name: string): string {
  if (!name) return 'DJ';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Avatar color assignment based on name
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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Edit fields for drawer
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [whatsappInput, setWhatsappInput] = useState('');
  const [eventTypeInput, setEventTypeInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  const [venueInput, setVenueInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [customerNotesInput, setCustomerNotesInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [totalAmountInput, setTotalAmountInput] = useState('');

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const openDrawer = (b: AdminBookingItem) => {
    setActiveBooking(b);
    setCustomerNameInput(b.customer?.name || '');
    setPhoneInput(b.customer?.phone || '');
    setWhatsappInput(b.customer?.whatsapp || b.customer?.phone || '');
    setEventTypeInput(b.eventType || 'Wedding Reception');
    const dateVal =
      b.dateString ||
      (typeof b.eventDate === 'string'
        ? b.eventDate.split('T')[0]
        : new Date(b.eventDate).toISOString().split('T')[0]);
    setDateInput(dateVal);
    setStartTimeInput(b.startTime || '19:00');
    setEndTimeInput(b.endTime || '23:30');
    setVenueInput(b.venue || '');
    setCityInput(b.city || '');
    setCustomerNotesInput(b.customerNotes || '');
    setStatusInput(b.status || 'PENDING');
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
          customerName: customerNameInput,
          phone: phoneInput,
          whatsapp: whatsappInput,
          eventType: eventTypeInput,
          dateString: dateInput,
          startTime: startTimeInput,
          endTime: endTimeInput,
          venue: venueInput,
          city: cityInput,
          status: statusInput,
          adminNotes: adminNotesInput,
          customerNotes: customerNotesInput,
          totalAmount: totalAmountInput ? Number(totalAmountInput) : null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedBooking = data.booking || {
          ...activeBooking,
          eventType: eventTypeInput,
          dateString: dateInput,
          startTime: startTimeInput,
          endTime: endTimeInput,
          venue: venueInput,
          city: cityInput,
          status: statusInput,
          adminNotes: adminNotesInput,
          customerNotes: customerNotesInput,
          totalAmount: totalAmountInput ? Number(totalAmountInput) : null,
          customer: {
            ...activeBooking.customer,
            name: customerNameInput,
            phone: phoneInput,
            whatsapp: whatsappInput,
          },
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
        setSaveError(err.error || 'Failed to update booking.');
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

  // KPIs
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const confirmedRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED' && b.totalAmount)
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  // Filter & Search Logic
  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.customer.name.toLowerCase().includes(q) ||
      b.customer.phone.includes(q) ||
      b.bookingCode.toLowerCase().includes(q) ||
      b.venue.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.eventType.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Executive KPI Micro-Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Inquiries */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Total Enquiries
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white">{bookings.length}</p>
            <span className="text-[10px] text-zinc-500 block">All recorded dates</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Action Needed (Pending) */}
        <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.06] to-transparent flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block flex items-center gap-1.5">
              <span>Action Needed</span>
              {pendingCount > 0 && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              )}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white">{pendingCount}</p>
            <span className="text-[10px] text-amber-300/80 block">
              {pendingCount > 0 ? 'Pending confirmation' : 'Zero pending backlog'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmed Shows */}
        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.06] to-transparent flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
              Confirmed Shows
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white">{confirmedCount}</p>
            <span className="text-[10px] text-emerald-400/80 block">Locked on master calendar</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Locked Pipeline */}
        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] to-transparent flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block">
              Locked Pipeline
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {confirmedRevenue > 0 ? formatCurrency(confirmedRevenue) : '₹0'}
            </p>
            <span className="text-[10px] text-cyan-400/80 block">Confirmed contract value</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 p-3 rounded-2xl glass-panel border border-white/10 bg-zinc-950/60">
        {/* High-Tech Search Input */}
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search by client name, phone, booking ID, venue, or event type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3 text-zinc-500 hover:text-white transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs (Interactive Segmented Bar) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 scale-[1.02]'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
            }`}
          >
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                statusFilter === 'ALL' ? 'bg-black/30 text-white' : 'bg-black/50 text-zinc-400'
              }`}
            >
              {bookings.length}
            </span>
          </button>

          {BOOKING_STATUSES.map((s) => {
            const count = bookings.filter((b) => b.status === s.value).length;
            const isSelected = statusFilter === s.value;

            // Status indicator dot colors
            const dotColor =
              s.value === 'PENDING'
                ? 'bg-amber-400'
                : s.value === 'CONFIRMED'
                ? 'bg-emerald-400'
                : s.value === 'CONTACTED'
                ? 'bg-cyan-400'
                : s.value === 'COMPLETED'
                ? 'bg-purple-400'
                : 'bg-rose-400';

            return (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-800 text-white border border-purple-500/60 shadow-lg shadow-purple-950/40 scale-[1.02]'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                <span>{s.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    isSelected ? 'bg-black/40 text-purple-200' : 'bg-black/50 text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Cards View (md:hidden) */}
      <div className="md:hidden space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="rounded-3xl glass-panel border border-white/10 p-10 text-center text-zinc-500 text-xs space-y-2">
            <Search className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="font-semibold text-zinc-400">No bookings match your current criteria.</p>
            <p className="text-[11px] text-zinc-600">Try adjusting your search query or status filter.</p>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const waNumber = b.customer.whatsapp || b.customer.phone;
            const waLink = createWhatsAppLink(
              waNumber,
              `Hello ${b.customer.name}, DJ Mantu here regarding your booking (${b.bookingCode}) for ${b.eventType} on ${b.dateString}...`
            );

            const isPending = b.status === 'PENDING';
            const isConfirmed = b.status === 'CONFIRMED';
            const avatarStyle = getAvatarStyle(b.customer.name);

            return (
              <div
                key={b.id}
                onClick={() => openDrawer(b)}
                className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3.5 bg-gradient-to-b from-white/[0.03] to-transparent active:bg-white/5 transition-all cursor-pointer shadow-xl relative overflow-hidden"
              >
                {/* Top Host & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center font-black text-xs shrink-0 shadow-md ${avatarStyle}`}
                    >
                      {getInitials(b.customer.name)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">{b.customer.name}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                        <span className="font-mono text-purple-300 font-bold px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-[10px]">
                          {b.bookingCode}
                        </span>
                        <span>•</span>
                        <span className="truncate">{b.eventType}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${
                      isPending
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : isConfirmed
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
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

                {/* Schedule & Venue Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2.5 border-t border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      Date & Time
                    </span>
                    <span className="font-bold text-zinc-200 block">{formatDate(b.eventDate)}</span>
                    <span className="text-[11px] text-zinc-400">{b.startTime}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      Venue
                    </span>
                    <span className="font-bold text-zinc-200 block truncate">{b.venue}</span>
                    {b.city && <span className="text-[11px] text-cyan-400 font-semibold">{b.city}</span>}
                  </div>
                </div>

                {/* Scope & Quick Actions */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      Agreed Quote
                    </span>
                    <span className="font-extrabold text-white text-sm">
                      {b.totalAmount ? formatCurrency(b.totalAmount) : b.budgetRange || 'Pending Quote'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`tel:${b.customer.phone.replace(/[^0-9+]/g, '')}`}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 active:scale-95 transition-transform"
                      title="Call Host"
                    >
                      <Phone className="w-4 h-4 text-purple-400" />
                    </a>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 active:scale-95 transition-transform"
                      title="WhatsApp Host"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => openDrawer(b)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Main Desktop Executive Table (Hidden on Mobile, Visible on md+) */}
      <div className="hidden md:block rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-[#08080C]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/95 uppercase text-[10px] font-extrabold text-zinc-400 tracking-wider border-b border-white/10 backdrop-blur-md">
              <tr>
                <th className="py-4 px-5">Client / Booking ID</th>
                <th className="py-4 px-4">Event Type</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 px-4">Venue & City</th>
                <th className="py-4 px-4">Services & Quote</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-zinc-500">
                    <div className="space-y-3 max-w-md mx-auto px-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/50">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white text-base">No Booking Enquiries Yet</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Your booking database is clean and ready. When visitors submit event inquiries on your website, they will appear here instantly in real-time.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-zinc-500">
                    <div className="space-y-2 max-w-sm mx-auto">
                      <Search className="w-8 h-8 text-zinc-600 mx-auto" />
                      <p className="font-semibold text-zinc-400 text-sm">No bookings matched your filters.</p>
                      <p className="text-xs text-zinc-600">
                        Try searching by a different name, phone number, or switch the status filter tab.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const waNumber = b.customer.whatsapp || b.customer.phone;
                  const waLink = createWhatsAppLink(
                    waNumber,
                    `Hello ${b.customer.name}, DJ Mantu here regarding your booking (${b.bookingCode}) for ${b.eventType} on ${b.dateString}...`
                  );

                  const isPending = b.status === 'PENDING';
                  const isConfirmed = b.status === 'CONFIRMED';
                  const isContacted = b.status === 'CONTACTED';
                  const isCompleted = b.status === 'COMPLETED';

                  const avatarStyle = getAvatarStyle(b.customer.name);

                  return (
                    <tr
                      key={b.id}
                      onClick={() => openDrawer(b)}
                      className="group hover:bg-purple-950/20 hover:border-l-2 hover:border-l-purple-500 transition-all duration-150 cursor-pointer"
                    >
                      {/* Client / Booking ID */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-2xl bg-gradient-to-br border flex items-center justify-center font-black text-xs shrink-0 shadow-md ${avatarStyle}`}
                          >
                            {getInitials(b.customer.name)}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-white text-sm block group-hover:text-purple-300 transition-colors">
                              {b.customer.name}
                            </span>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                              <span className="font-mono text-purple-300 font-bold px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-[10px]">
                                {b.bookingCode}
                              </span>
                              <span>•</span>
                              <span className="font-mono text-zinc-400">{b.customer.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Event Type */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="font-bold text-zinc-100 block text-xs tracking-tight">
                            {b.eventType}
                          </span>
                          {b.city && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5">
                              <MapPin className="w-3 h-3 text-purple-400" />
                              <span>{b.city}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                            <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>{formatDate(b.eventDate)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                            <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                            <span>
                              {b.startTime} {b.endTime ? `- ${b.endTime}` : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Venue & City */}
                      <td className="py-4 px-4">
                        <div className="space-y-1 max-w-[200px]">
                          <span className="truncate block font-semibold text-zinc-200 text-xs">
                            {b.venue}
                          </span>
                          {b.city && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-800/40">
                              <MapPin className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                              <span>{b.city}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Services & Quote */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="font-black text-white block text-sm tracking-tight">
                            {b.totalAmount ? (
                              <span className="text-emerald-300">{formatCurrency(b.totalAmount)}</span>
                            ) : (
                              <span className="text-amber-300 font-bold text-xs px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40 inline-block">
                                {b.budgetRange || 'Pending Quote'}
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-zinc-400 block truncate max-w-[140px]">
                            {b.package ? b.package.name : b.services || 'Bespoke Production'}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            isPending
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                              : isConfirmed
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                              : isContacted
                              ? 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                              : isCompleted
                              ? 'bg-purple-500/15 text-purple-300 border-purple-500/40'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPending
                                ? 'bg-amber-400 animate-pulse'
                                : isConfirmed
                                ? 'bg-emerald-400'
                                : isContacted
                                ? 'bg-cyan-400'
                                : 'bg-zinc-400'
                            }`}
                          />
                          <span>{b.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-2 rounded-xl bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-800 hover:text-white transition-all shadow-md active:scale-95"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openDrawer(b)}
                            title="Review / Edit Booking"
                            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/10 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5 text-purple-400" />
                            <span>Review</span>
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

      {/* Luxury Booking Details Drawer */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="relative w-full max-w-full sm:max-w-xl h-full bg-[#0b0c12] border-l border-white/10 p-5 sm:p-7 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto space-y-5 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-purple-400">
                    <Sparkles className="w-3 h-3" />
                    Booking Dossier
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${
                      activeBooking.status === 'CONFIRMED'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : activeBooking.status === 'PENDING'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : activeBooking.status === 'COMPLETED'
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                        : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeBooking.status === 'CONFIRMED'
                          ? 'bg-emerald-400 animate-pulse'
                          : activeBooking.status === 'PENDING'
                          ? 'bg-amber-400 animate-pulse'
                          : 'bg-zinc-400'
                      }`}
                    />
                    {activeBooking.status}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pt-0.5">
                  <h3 className="text-2xl font-black text-white tracking-tight font-mono">
                    {activeBooking.bookingCode}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(activeBooking.bookingCode, 'code')}
                    className="p-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/5 transition-all active:scale-95"
                    title="Copy Booking ID"
                  >
                    {copiedField === 'code' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setActiveBooking(null)}
                className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all active:scale-95"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Client / Host Profile Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">
                  Client Profile
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">
                  Booked on {formatDate(activeBooking.createdAt)}
                </span>
              </div>

              {/* Quick Actions (Call & WhatsApp) */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${phoneInput.replace(/[^0-9+]/g, '')}`}
                  className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call Client</span>
                </a>
                <a
                  href={createWhatsAppLink(
                    whatsappInput || phoneInput,
                    `Hello ${customerNameInput || activeBooking.customer.name}, DJ Mantu here regarding your booking (${activeBooking.bookingCode}) for ${eventTypeInput} on ${dateInput}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Client Info Inputs */}
              <div className="space-y-3 pt-1 border-t border-white/5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-purple-400" />
                    <span>Client / Host Name</span>
                    <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerNameInput}
                    onChange={(e) => setCustomerNameInput(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-purple-400" />
                      <span>Phone Number</span>
                      <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-mono focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp Number</span>
                    </label>
                    <input
                      type="tel"
                      value={whatsappInput}
                      onChange={(e) => setWhatsappInput(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-mono focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Event Itinerary & Location Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/10 shadow-lg space-y-3.5">
              <span className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider block">
                Event Schedule & Venue
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Occasion / Event Type</span>
                  </label>
                  <div className="relative">
                    <select
                      value={eventTypeInput}
                      onChange={(e) => setEventTypeInput(e.target.value)}
                      className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer shadow-inner"
                    >
                      {Array.from(new Set([eventTypeInput, ...EVENT_CATEGORIES].filter(Boolean))).map((cat) => (
                        <option key={cat} value={cat} className="bg-zinc-900 text-white py-1">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-pink-400" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all [color-scheme:dark] shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Start Time</span>
                  </label>
                  <input
                    type="time"
                    value={startTimeInput}
                    onChange={(e) => setStartTimeInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all [color-scheme:dark] shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>End Time</span>
                  </label>
                  <input
                    type="time"
                    value={endTimeInput}
                    onChange={(e) => setEndTimeInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all [color-scheme:dark] shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Venue / Address</span>
                  </label>
                  <input
                    type="text"
                    value={venueInput}
                    onChange={(e) => setVenueInput(e.target.value)}
                    placeholder="e.g. Gandhi Chowk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>City / Town</span>
                  </label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="e.g. Brajrajnagar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* 3. Client Special Instructions Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/10 shadow-lg space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-purple-400" />
                <span>Client Entry & Music Instructions</span>
              </label>
              <textarea
                rows={2}
                value={customerNotesInput}
                onChange={(e) => setCustomerNotesInput(e.target.value)}
                placeholder="Client song preferences, specific entry times, sound notes..."
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none shadow-inner leading-relaxed"
              />
            </div>

            {/* Update Form (Status & Agreed Pricing) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 shadow-lg space-y-4">
              <span className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider block">
                Booking Administration & Pricing
              </span>

              {/* Status Switcher */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                  Update Confirmation Status
                </label>
                <div className="relative">
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-bold uppercase focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer shadow-inner"
                  >
                    {BOOKING_STATUSES.map((s) => (
                      <option key={s.value} value={s.value} className="bg-zinc-900 text-white py-1">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 pt-0.5">
                  <span className="text-amber-400">💡</span>
                  <span>
                    Marking as <strong className="text-emerald-400 font-semibold">CONFIRMED</strong> automatically locks this date on your public calendar.
                  </span>
                </p>
              </div>

              {/* Total Agreed Amount */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                  Agreed Contract Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={totalAmountInput}
                    onChange={(e) => setTotalAmountInput(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs font-mono font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Private Owner Notes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                  Private Owner Notes <span className="text-zinc-500 text-[10px] normal-case">(Internal Crew Only)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. ₹10k advance received via GPay. Crew arrival 4 PM. Line array sound required."
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700/80 hover:border-zinc-600 text-white text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none shadow-inner leading-relaxed"
                />
              </div>

              {saveError && (
                <div className="text-xs font-medium text-rose-400 bg-rose-950/40 border border-rose-800/50 px-3 py-2.5 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{saveError}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-950/50'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Updates...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white animate-in zoom-in-50 duration-200" />
                      <span>Saved Successfully!</span>
                    </>
                  ) : (
                    <span>Save All Changes</span>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(activeBooking.id)}
                  className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 border border-rose-500/20 active:scale-95 transition-all shadow-sm"
                  title="Delete booking dossier"
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
