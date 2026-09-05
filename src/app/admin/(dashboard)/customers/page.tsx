import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import prisma from '@/lib/prisma';
import { formatDate, createWhatsAppLink, formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      bookings: {
        orderBy: { eventDate: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Client Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Customer CRM & History
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Track past hosts, repeated clients, event counts, and direct communication logs.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-semibold">
          Total Clients: <span className="text-white font-bold">{customers.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => {
          const totalSpent = c.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
          const lastBooking = c.bookings[0];
          const waNumber = c.whatsapp || c.phone;
          const waLink = createWhatsAppLink(waNumber, `Hello ${c.name}, hope you are doing well! From DJ Mantu.`);

          return (
            <div
              key={c.id}
              className="rounded-3xl glass-panel border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{c.name}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 inline-block mt-1">
                      {c.bookings.length > 1 ? 'Repeat Host 🌟' : 'Customer'}
                    </span>
                  </div>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/40"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>

                {/* Contact info */}
                <div className="space-y-1.5 pt-3 text-xs text-zinc-400">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <a href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                      {c.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a
                      href={createWhatsAppLink(c.whatsapp || c.phone, `Hello ${c.name}, DJ Mantu here.`)}
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
                        {lastBooking.eventType} • {lastBooking.city}
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

              <div className="pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-500 flex items-center justify-between">
                <span>Client since {formatDate(c.createdAt)}</span>
                <a
                  href={`tel:${c.phone}`}
                  className="font-bold text-purple-400 hover:text-purple-300"
                >
                  Call Client
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
