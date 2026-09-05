import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCachedReviews } from '@/lib/data';

export async function GET() {
  try {
    const reviews = await getCachedReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, eventType, rating, comment, eventDate } = body;

    if (!customerName || !comment) {
      return NextResponse.json({ error: 'Name and review comment are required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        customerName: customerName.trim(),
        eventType: eventType || 'Party / Wedding',
        rating: Number(rating) || 5,
        comment: comment.trim(),
        eventDate: eventDate || new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        isPublished: false, // Must be moderated by admin per PRD Section 25
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your review has been submitted and will appear once verified by DJ Mantu.',
      review,
    });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
