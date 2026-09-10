import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateAvailabilityCache } from '@/lib/data';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const customers = await prisma.customer.findMany({
      include: {
        bookings: {
          orderBy: { eventDate: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ customers });
  } catch (error) {
    console.error('Error loading customers:', error);
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
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
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        bookings: {
          select: { id: true, dateString: true },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Release any calendar locks and clear availability caches for this customer's bookings
    for (const booking of customer.bookings) {
      await prisma.availability.deleteMany({
        where: { bookingId: booking.id },
      });
      if (booking.dateString) {
        await invalidateAvailabilityCache(booking.dateString);
      }
    }

    // Delete bookings (if any)
    if (customer.bookings.length > 0) {
      await prisma.booking.deleteMany({
        where: { customerId: id },
      });
    }

    // Delete the customer record
    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Customer ${customer.name} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
