import React from 'react';
import prisma from '@/lib/prisma';
import ReviewModerationClient, { AdminReviewItem } from '@/components/admin/ReviewModerationClient';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const formattedReviews: AdminReviewItem[] = reviews.map((r) => ({
    id: r.id,
    customerName: r.customerName,
    eventType: r.eventType,
    rating: r.rating,
    comment: r.comment,
    eventDate: r.eventDate,
    isPublished: r.isPublished,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-400">
          Trust & Reputation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Review Moderation
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Approve, unpublish, or delete customer reviews submitted via the public website.
        </p>
      </div>

      <ReviewModerationClient initialReviews={formattedReviews} />
    </div>
  );
}
