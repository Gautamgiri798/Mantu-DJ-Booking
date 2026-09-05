import React from 'react';
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
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Enquiry Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Booking Requests & Events
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Review submissions, change confirmation statuses, track agreed pricing, and coordinate via WhatsApp.
        </p>
      </div>

      <BookingManagementTable initialBookings={formattedBookings} />
    </div>
  );
}
