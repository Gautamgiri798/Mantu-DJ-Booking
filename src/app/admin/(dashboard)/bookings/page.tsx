import React from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import prisma from '@/lib/prisma';
import BookingManagementTable, { AdminBookingItem } from '@/components/admin/BookingManagementTable';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: true,
      package: true,
    },
    orderBy: { eventDate: 'desc' },
  });

  const formattedBookings: AdminBookingItem[] = bookings.map((b) => ({
    id: b.id,
    bookingCode: b.bookingCode,
    eventType: b.eventType,
    eventDate: b.eventDate.toISOString(),
    dateString: b.dateString,
    startTime: b.startTime,
    endTime: b.endTime,
    venue: b.venue,
    city: b.city,
    guestCount: b.guestCount,
    budgetRange: b.budgetRange,
    status: b.status,
    totalAmount: b.totalAmount,
    customerNotes: b.customerNotes,
    adminNotes: b.adminNotes,
    services: b.services,
    createdAt: b.createdAt.toISOString(),
    customer: {
      id: b.customer.id,
      name: b.customer.name,
      phone: b.customer.phone,
      email: b.customer.email,
      whatsapp: b.customer.whatsapp,
      notes: b.customer.notes,
    },
    package: b.package
      ? {
          id: b.package.id,
          name: b.package.name,
          price: b.package.price,
        }
      : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-full">
              Enquiry Management
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Live Database Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Booking Requests & Events
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Review submissions, change confirmation statuses, track agreed pricing, and coordinate with clients via WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/calendar"
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors shadow-sm"
          >
            <CalendarDays className="w-3.5 h-3.5 text-purple-400" />
            <span>Open Calendar</span>
          </Link>
        </div>
      </div>

      <BookingManagementTable initialBookings={formattedBookings} />
    </div>
  );
}
