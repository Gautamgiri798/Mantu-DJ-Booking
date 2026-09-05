import React from 'react';
import prisma from '@/lib/prisma';
import AdminCalendarView, { CalendarAvailabilityRecord } from '@/components/admin/AdminCalendarView';

export const dynamic = 'force-dynamic';

export default async function AdminCalendarPage() {
  const availability = await prisma.availability.findMany({
    include: {
      booking: {
        include: {
          customer: true,
        },
      },
    },
    orderBy: { date: 'asc' },
  });

  const formattedRecords: CalendarAvailabilityRecord[] = availability.map((a) => ({
    id: a.id,
    date: a.date,
    status: a.status,
    reason: a.reason,
    booking: a.booking
      ? {
          id: a.booking.id,
          bookingCode: a.booking.bookingCode,
          eventType: a.booking.eventType,
          venue: a.booking.venue,
          totalAmount: a.booking.totalAmount,
          customer: {
            name: a.booking.customer.name,
            phone: a.booking.customer.phone,
            whatsapp: a.booking.customer.whatsapp,
          },
        }
      : null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
          Availability Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Schedule & Event Calendar
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          View monthly event density, manually block dates for personal leave or maintenance, and log direct offline bookings.
        </p>
      </div>

      <AdminCalendarView initialRecords={formattedRecords} />
    </div>
  );
}
