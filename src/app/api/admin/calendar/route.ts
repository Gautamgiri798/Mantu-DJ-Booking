import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateAvailabilityCache } from '@/lib/data';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Calendar fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, date, reason, customerName, phone, eventType, venue, city, totalAmount } = body;

    if (!date) {
      return NextResponse.json({ error: 'Date is required (YYYY-MM-DD)' }, { status: 400 });
    }

    if (action === 'BLOCK') {
      // Manually block a date
      const record = await prisma.availability.upsert({
        where: { date },
        update: {
          status: 'BLOCKED',
          reason: reason || 'Blocked by Owner',
        },
        create: {
          date,
          status: 'BLOCKED',
          reason: reason || 'Blocked by Owner',
        },
      });
      await invalidateAvailabilityCache(date);
      return NextResponse.json({ success: true, record });
    }

    if (action === 'UNBLOCK') {
      // Unblock date
      await prisma.availability.deleteMany({
        where: { date },
      });
      await invalidateAvailabilityCache(date);
      return NextResponse.json({ success: true, message: 'Date unblocked and marked available' });
    }

    if (action === 'OFFLINE_BOOKING') {
      // Add offline phone/walk-in booking
      if (!customerName || !phone || !eventType) {
        return NextResponse.json(
          { error: 'Customer name, phone, and event type required for offline booking.' },
          { status: 400 }
        );
      }

      let customer = await prisma.customer.findFirst({
        where: { phone: phone.trim() },
      });
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            name: customerName.trim(),
            phone: phone.trim(),
            whatsapp: phone.trim(),
            notes: 'Offline / Direct Phone Booking',
          },
        });
      }

      const count = await prisma.booking.count();
      const bookingCode = `DJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

      const booking = await prisma.booking.create({
        data: {
          bookingCode,
          customerId: customer.id,
          eventType,
          eventDate: new Date(`${date}T19:00:00Z`),
          dateString: date,
          startTime: '19:00',
          endTime: '23:30',
          venue: venue ? venue.trim() : 'Client Venue',
          city: city ? city.trim() : '',
          totalAmount: totalAmount ? Number(totalAmount) : null,
          status: 'CONFIRMED',
          adminNotes: reason || 'Booked offline via direct call / WhatsApp',
        },
      });

      await prisma.availability.upsert({
        where: { date },
        update: {
          status: 'BOOKED',
          reason: `${eventType} - ${customer.name} (Direct)`,
          bookingId: booking.id,
        },
        create: {
          date,
          status: 'BOOKED',
          reason: `${eventType} - ${customer.name} (Direct)`,
          bookingId: booking.id,
        },
      });

      await invalidateAvailabilityCache(date);
      return NextResponse.json({ success: true, booking });
    }

    if (action === 'EDIT_BOOKING') {
      const {
        bookingId,
        date: originalDate,
        newDate,
        customerName,
        phone,
        whatsapp,
        eventType,
        venue,
        city,
        totalAmount,
        status,
        reason,
      } = body;

      if (!bookingId) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
      }

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { customer: true },
      });

      if (!booking) {
        return NextResponse.json({ error: 'Booking record not found' }, { status: 404 });
      }

      // Update customer info
      if (customerName || phone || whatsapp) {
        await prisma.customer.update({
          where: { id: booking.customerId },
          data: {
            name: customerName ? customerName.trim() : booking.customer.name,
            phone: phone ? phone.trim() : booking.customer.phone,
            whatsapp: whatsapp !== undefined ? (whatsapp ? whatsapp.trim() : null) : booking.customer.whatsapp,
          },
        });
      }

      const targetDate = newDate || originalDate || booking.dateString;
      const dateChanged = targetDate !== booking.dateString;

      // Update booking
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          eventType: eventType || booking.eventType,
          venue: venue !== undefined ? venue : booking.venue,
          city: city !== undefined ? city : booking.city,
          totalAmount:
            totalAmount !== undefined && totalAmount !== '' && !isNaN(Number(totalAmount))
              ? Number(totalAmount)
              : null,
          adminNotes: reason !== undefined ? reason : booking.adminNotes,
          status: status || booking.status,
          dateString: targetDate,
          eventDate: dateChanged ? new Date(`${targetDate}T19:00:00Z`) : booking.eventDate,
        },
        include: { customer: true },
      });

      // If date was changed, clean up old date lock
      if (dateChanged) {
        await prisma.availability.deleteMany({
          where: { bookingId: booking.id, date: booking.dateString },
        });
        await invalidateAvailabilityCache(booking.dateString);
      }

      // Update or remove availability on target date based on status
      if (status === 'CANCELLED' || status === 'REJECTED') {
        await prisma.availability.deleteMany({
          where: { bookingId: booking.id },
        });
      } else {
        await prisma.availability.upsert({
          where: { date: targetDate },
          update: {
            status: status === 'PENDING' ? 'PENDING' : 'BOOKED',
            reason: `${updatedBooking.eventType} - ${updatedBooking.customer.name}`,
            bookingId: booking.id,
          },
          create: {
            date: targetDate,
            status: status === 'PENDING' ? 'PENDING' : 'BOOKED',
            reason: `${updatedBooking.eventType} - ${updatedBooking.customer.name}`,
            bookingId: booking.id,
          },
        });
      }

      await invalidateAvailabilityCache(targetDate);
      return NextResponse.json({ success: true, booking: updatedBooking });
    }

    if (action === 'DELETE_BOOKING') {
      const { bookingId, date: targetDate } = body;
      if (!bookingId) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
      }

      await prisma.availability.deleteMany({
        where: { bookingId },
      });

      await prisma.booking.delete({
        where: { id: bookingId },
      });

      if (targetDate) {
        await invalidateAvailabilityCache(targetDate);
      }

      return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Calendar action error:', error);
    return NextResponse.json({ error: 'Failed to perform calendar action' }, { status: 500 });
  }
}
