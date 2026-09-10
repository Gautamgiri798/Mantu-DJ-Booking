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
    const {
      id,
      customerName,
      phone,
      whatsapp,
      eventType,
      dateString,
      eventDate,
      startTime,
      endTime,
      venue,
      city,
      status,
      adminNotes,
      customerNotes,
      totalAmount,
    } = body;

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

    // Update customer details if provided
    if (customerName || phone || whatsapp !== undefined) {
      await prisma.customer.update({
        where: { id: existing.customerId },
        data: {
          name: customerName !== undefined ? customerName.trim() : existing.customer.name,
          phone: phone !== undefined ? phone.trim() : existing.customer.phone,
          whatsapp: whatsapp !== undefined ? (whatsapp ? whatsapp.trim() : null) : existing.customer.whatsapp,
        },
      });
    }

    const targetDate = dateString || (typeof eventDate === 'string' && eventDate.includes('-') ? eventDate.split('T')[0] : existing.dateString);
    const dateChanged = targetDate !== existing.dateString;

    // If date changed, remove old availability record and invalidate old cache
    if (dateChanged) {
      await prisma.availability.deleteMany({
        where: { bookingId: existing.id, date: existing.dateString },
      });
      await invalidateAvailabilityCache(existing.dateString);
    }

    // Update the booking
    const updated = await prisma.booking.update({
      where: { id },
      data: {
        eventType: eventType !== undefined ? eventType : existing.eventType,
        venue: venue !== undefined ? venue.trim() : existing.venue,
        city: city !== undefined ? city.trim() : existing.city,
        startTime: startTime !== undefined ? startTime : existing.startTime,
        endTime: endTime !== undefined ? endTime : existing.endTime,
        dateString: targetDate,
        eventDate: dateChanged ? new Date(`${targetDate}T${startTime || existing.startTime || '19:00'}:00Z`) : existing.eventDate,
        status: status || existing.status,
        adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
        customerNotes: customerNotes !== undefined ? customerNotes : existing.customerNotes,
        totalAmount:
          totalAmount !== undefined && totalAmount !== null && totalAmount !== '' && !isNaN(Number(totalAmount))
            ? Number(totalAmount)
            : totalAmount === null || totalAmount === ''
            ? null
            : existing.totalAmount,
      },
      include: {
        customer: true,
        package: true,
      },
    });

    // Synchronize availability calendar status for target date
    const effectiveStatus = status || existing.status;
    if (effectiveStatus === 'CONFIRMED' || effectiveStatus === 'COMPLETED') {
      await prisma.availability.upsert({
        where: { date: targetDate },
        update: {
          status: 'BOOKED',
          reason: `Confirmed: ${updated.eventType} (${updated.customer.name})`,
          bookingId: existing.id,
        },
        create: {
          date: targetDate,
          status: 'BOOKED',
          reason: `Confirmed: ${updated.eventType} (${updated.customer.name})`,
          bookingId: existing.id,
        },
      });
    } else if (effectiveStatus === 'CANCELLED' || effectiveStatus === 'REJECTED') {
      await prisma.availability.deleteMany({
        where: { bookingId: existing.id },
      });
    } else if (effectiveStatus === 'PENDING' || effectiveStatus === 'CONTACTED') {
      await prisma.availability.upsert({
        where: { date: targetDate },
        update: {
          status: 'PENDING',
          reason: `Pending Booking: ${existing.bookingCode}`,
          bookingId: existing.id,
        },
        create: {
          date: targetDate,
          status: 'PENDING',
          reason: `Pending Booking: ${existing.bookingCode}`,
          bookingId: existing.id,
        },
      });
    }

    // Invalidate availability cache for this date
    await invalidateAvailabilityCache(targetDate);

    const formatted = {
      ...updated,
      eventDate: updated.eventDate.toISOString(),
      createdAt: updated.createdAt.toISOString(),
    };

    return NextResponse.json({ success: true, booking: formatted });
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
