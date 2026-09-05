import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateAvailabilityCache } from '@/lib/data';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    include: { customer: true, package: true },
    orderBy: { eventDate: 'desc' },
  });

  return NextResponse.json({ bookings });
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, adminNotes, totalAmount, venue, city } = body;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const existing = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update the booking
    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: status || existing.status,
        adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
        totalAmount: totalAmount !== undefined ? (totalAmount ? Number(totalAmount) : null) : existing.totalAmount,
        venue: venue || existing.venue,
        city: city || existing.city,
      },
    });

    // Synchronize availability calendar status
    if (status) {
      if (status === 'CONFIRMED') {
        await prisma.availability.upsert({
          where: { date: existing.dateString },
          update: {
            status: 'BOOKED',
            reason: `Confirmed: ${existing.eventType} (${existing.customer.name})`,
            bookingId: existing.id,
          },
          create: {
            date: existing.dateString,
            status: 'BOOKED',
            reason: `Confirmed: ${existing.eventType} (${existing.customer.name})`,
            bookingId: existing.id,
          },
        });
      } else if (status === 'CANCELLED' || status === 'REJECTED') {
        await prisma.availability.deleteMany({
          where: {
            date: existing.dateString,
            bookingId: existing.id,
          },
        });
      } else if (status === 'PENDING') {
        await prisma.availability.upsert({
          where: { date: existing.dateString },
          update: {
            status: 'PENDING',
            reason: `Pending Booking: ${existing.bookingCode}`,
            bookingId: existing.id,
          },
          create: {
            date: existing.dateString,
            status: 'PENDING',
            reason: `Pending Booking: ${existing.bookingCode}`,
            bookingId: existing.id,
          },
        });
      }
    }

    // Invalidate availability cache for this date
    await invalidateAvailabilityCache(existing.dateString);

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (existing) {
      // Remove any linked availability lock
      await prisma.availability.deleteMany({
        where: { bookingId: id },
      });
      await prisma.booking.delete({ where: { id } });
      await invalidateAvailabilityCache(existing.dateString);
    }

    return NextResponse.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
