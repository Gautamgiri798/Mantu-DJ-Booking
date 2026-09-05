import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cacheFetch } from '@/lib/redis';

interface AvailabilityStatus {
  available: boolean;
  status: 'UNAVAILABLE' | 'TENTATIVE' | 'AVAILABLE';
  message: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // Expecting YYYY-MM-DD
    const eventType = searchParams.get('eventType');
    const location = searchParams.get('location');

    if (!date) {
      return NextResponse.json({ error: 'Date is required (YYYY-MM-DD)' }, { status: 400 });
    }

    // Cache availability status for 120 seconds per date
    const checkResult = await cacheFetch<AvailabilityStatus>(
      `availability:check:${date}`,
      async () => {
        // 1. Query availability record for this date
        const availability = await prisma.availability.findUnique({
          where: { date },
        });

        if (availability) {
          if (availability.status === 'BOOKED' || availability.status === 'BLOCKED') {
            return {
              available: false,
              status: 'UNAVAILABLE',
              message: 'Sorry, the DJ is already booked or unavailable on this date.',
            };
          }
          if (availability.status === 'PENDING') {
            return {
              available: true,
              status: 'TENTATIVE',
              message: 'Date is currently in high demand with pending inquiries, but still open to request!',
            };
          }
        }

        // 2. Also double-check bookings table directly for confirmed bookings
        const existingConfirmedBooking = await prisma.booking.findFirst({
          where: {
            dateString: date,
            status: { in: ['CONFIRMED', 'COMPLETED'] },
          },
        });

        if (existingConfirmedBooking) {
          return {
            available: false,
            status: 'UNAVAILABLE',
            message: 'Sorry, the DJ is already booked for this date.',
          };
        }

        return {
          available: true,
          status: 'AVAILABLE',
          message: 'Great news! DJ Mantu is currently available for this date.',
        };
      },
      120
    );

    return NextResponse.json({
      ...checkResult,
      date,
      eventType,
      location,
    });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json({ error: 'Failed to verify date availability' }, { status: 500 });
  }
}
