'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, MessageSquare, Trash2, Search, AlertTriangle, Loader2, CheckCircle2, UserX } from 'lucide-react';
import { formatDate, createWhatsAppLink, formatCurrency } from '@/lib/utils';

export interface AdminCustomerBooking {
  id: string;
  eventType: string;
  eventDate: string | Date;
  dateString: string;
  status: string;
  venue?: string | null;
  city?: string | null;
  totalAmount?: number | null;
}

export interface AdminCustomerItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  whatsapp?: string | null;
  notes?: string | null;
  createdAt: string | Date;
  bookings: AdminCustomerBooking[];
}

interface Props {
  initialCustomers: AdminCustomerItem[];
}

export default function CustomerManagementClient({ initialCustomers }: Props) {
  const router = useRouter();
  const [customers, setCustomers] = useState<AdminCustomerItem[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'ALL' | 'ACTIVE' | 'ZERO_BOOKINGS'>('ALL');

  // Delete modal state
  const [customerToDelete, setCustomerToDelete] = useState<AdminCustomerItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDelete = async () => {
    if (!customerToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/customers?id=${customerToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete customer');
      }

      setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete.id));
      showToast(`Deleted ${customerToDelete.name} successfully`, 'success');
      setCustomerToDelete(null);
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete customer';
      showToast(errorMsg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter and search logic
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.whatsapp && c.whatsapp.includes(searchQuery)) ||
      (c.notes && c.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterTab === 'ACTIVE') {
      return c.bookings.length > 0;
    }
    if (filterTab === 'ZERO_BOOKINGS') {
      return c.bookings.length === 0;
    }
    return true;
  });

  const zeroBookingsCount = customers.filter((c) => c.bookings.length === 0).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl border text-sm font-semibold transition-all animate-in fade-in slide-in-from-bottom-5 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 backdrop-blur-md'
              : 'bg-red-950/90 border-red-500/50 text-red-200 backdrop-blur-md'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs & Total Counter */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterTab === 'ALL'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All ({customers.length})
          </button>
          <button
            onClick={() => setFilterTab('ACTIVE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterTab === 'ACTIVE'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            With Bookings ({customers.length - zeroBookingsCount})
          </button>
          <button
            onClick={() => setFilterTab('ZERO_BOOKINGS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterTab === 'ZERO_BOOKINGS'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            0 Bookings ({zeroBookingsCount})
          </button>
        </div>
      </div>

      {/* Grid of Customers */}
      {filteredCustomers.length === 0 ? (
        <div className="py-16 text-center rounded-3xl glass-panel border border-white/10 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <UserX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Customers Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {searchQuery
              ? `No customer matches "${searchQuery}". Try searching by a different name or number.`
              : 'There are no customers matching this filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((c) => {
            const totalSpent = c.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
            const lastBooking = c.bookings[0];
            const waNumber = c.whatsapp || c.phone;
            const waLink = createWhatsAppLink(
              waNumber,
              `Hello ${c.name}, hope you are doing well! From DJ Mantu.`
            );

            return (
              <div
                key={c.id}
                className="rounded-3xl glass-panel border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all shadow-xl relative group"
              >
                <div>
                  {/* Header with Name, Badge & Actions */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{c.name}</h3>
                      <div className="flex items-center gap-1.5 flex-wrap mt-1">
                        {c.bookings.length > 1 ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Repeat Host 🌟
                          </span>
                        ) : c.bookings.length === 1 ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Customer
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            No Active Bookings
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/40 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      {/* Manual Delete Button */}
                      <button
                        onClick={() => setCustomerToDelete(c)}
                        className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-800/30 hover:border-red-500/50 transition-colors"
                        title="Delete customer permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1.5 pt-3 text-xs text-zinc-400">
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <a
                        href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                        className="hover:text-white transition-colors"
                      >
                        {c.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <a
                        href={createWhatsAppLink(
                          c.whatsapp || c.phone,
                          `Hello ${c.name}, DJ Mantu here.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        WhatsApp Chat
                      </a>
                    </p>
                  </div>

                  {/* Booking History Snippet */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 text-xs">
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] mb-2">
                      <span>Events: {c.bookings.length}</span>
                      {totalSpent > 0 && (
                        <span className="text-zinc-300 font-bold">
                          Spend: {formatCurrency(totalSpent)}
                        </span>
                      )}
                    </div>

                    {lastBooking ? (
                      <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                          Last Celebration:
                        </span>
                        <p className="font-semibold text-white truncate">
                          {lastBooking.eventType}
                          {lastBooking.city
                            ? ` • ${lastBooking.city}`
                            : lastBooking.venue
                            ? ` • ${lastBooking.venue}`
                            : ''}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {formatDate(lastBooking.eventDate)} ({lastBooking.status})
                        </p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-zinc-500 italic">No bookings recorded yet.</p>
                    )}

                    {c.notes && (
                      <p className="text-[11px] text-purple-300 italic mt-2">
                        &ldquo;{c.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-500 flex items-center justify-between">
                  <span>Client since {formatDate(c.createdAt)}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCustomerToDelete(c)}
                      className="text-red-400/80 hover:text-red-300 font-medium transition-colors"
                    >
                      Delete Client
                    </button>
                    <a
                      href={`tel:${c.phone}`}
                      className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Call Client
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {customerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Customer Record</h3>
                <p className="text-xs text-zinc-400">This action cannot be undone.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Name:</span>
                <span className="font-bold text-white">{customerToDelete.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Phone:</span>
                <span className="text-zinc-300">{customerToDelete.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Associated Bookings:</span>
                <span
                  className={`font-semibold ${
                    customerToDelete.bookings.length > 0 ? 'text-amber-400' : 'text-zinc-400'
                  }`}
                >
                  {customerToDelete.bookings.length} event(s)
                </span>
              </div>
            </div>

            {customerToDelete.bookings.length > 0 ? (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200/90 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> This client has {customerToDelete.bookings.length} booking(s).
                  Deleting this customer will permanently delete those bookings and release any booked
                  calendar dates.
                </p>
              </div>
            ) : (
              <p className="text-xs text-zinc-400">
                This client has 0 active bookings. It will be removed permanently from your CRM.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setCustomerToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
