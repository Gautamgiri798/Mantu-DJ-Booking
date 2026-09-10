import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { invalidateAvailabilityCache } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      whatsapp,
      eventType,
      eventDate, // "YYYY-MM-DD"
      startTime,
      endTime,
      venue,
      city,
      guestCount,
      budgetRange,
      packageId,
      services, // string array
      customerNotes,
    } = body;

    if (!name || !phone || !eventType || !eventDate || !venue) {
      return NextResponse.json(
        { error: 'Name, phone, event type, date, and venue are required.' },
        { status: 400 }
      );
    }

    // Generate unique booking code: DJ-2026-XXX
    const year = new Date().getFullYear();
    const count = await prisma.booking.count();
    const bookingCode = `DJ-${year}-${String(count + 1).padStart(3, '0')}`;

    // Find or create customer by phone
    let customer = await prisma.customer.findFirst({
      where: { phone: phone.trim() },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          whatsapp: whatsapp ? whatsapp.trim() : phone.trim(),
        },
      });
    } else {
      // Update email/whatsapp if newly provided
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: name.trim(),
          email: email ? email.trim() : customer.email,
          whatsapp: whatsapp ? whatsapp.trim() : customer.whatsapp,
        },
      });
    }

    // Calculate total amount if package selected
    let totalAmount: number | null = null;
    if (packageId) {
      const selectedPkg = await prisma.package.findUnique({
        where: { id: packageId },
      });
      if (selectedPkg) {
        totalAmount = selectedPkg.price;
      }
    }

    // Parse event date
    const parsedDate = new Date(`${eventDate}T${startTime || '18:00'}:00Z`);

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        customerId: customer.id,
        eventType,
        eventDate: parsedDate,
        dateString: eventDate,
        startTime: startTime || '18:00',
        endTime: endTime || '23:30',
        venue: venue.trim(),
        city: city ? city.trim() : '',
        guestCount: guestCount ? Number(guestCount) : null,
        budgetRange: budgetRange || null,
        packageId: packageId || null,
        services: services && Array.isArray(services) ? JSON.stringify(services) : null,
        totalAmount,
        customerNotes: customerNotes ? customerNotes.trim() : null,
        status: 'PENDING',
      },
    });

    // Mark availability as PENDING for this date if not already booked
    const existingAvail = await prisma.availability.findUnique({
      where: { date: eventDate },
    });

    if (!existingAvail) {
      await prisma.availability.create({
        data: {
          date: eventDate,
          status: 'PENDING',
          reason: `Pending Booking: ${bookingCode} (${customer.name})`,
          bookingId: booking.id,
        },
      });
    }

    // Invalidate cached availability for this date and general availability cache
    await invalidateAvailabilityCache(eventDate);

    return NextResponse.json({
      success: true,
      bookingCode,
      bookingId: booking.id,
      customerName: customer.name,
      eventDate,
      eventType,
      venue,
      city: booking.city,
      message: 'Booking request received successfully! DJ Mantu will review and confirm shortly.',
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'Failed to submit booking request' }, { status: 500 });
  }
}
