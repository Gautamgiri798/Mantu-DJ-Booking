'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle, XCircle, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface AdminReviewItem {
  id: string;
  customerName: string;
  eventType: string;
  rating: number;
  comment: string;
  eventDate?: string | null;
  isPublished: boolean;
  createdAt: string | Date;
}

interface Props {
  initialReviews: AdminReviewItem[];
}

export default function ReviewModerationClient({ initialReviews }: Props) {
  const router = useRouter();
  const [reviews, setReviews] = useState<AdminReviewItem[]>(initialReviews);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !currentStatus }),
      });

      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isPublished: !currentStatus } : r))
        );
        router.refresh();
      }
    } catch {
      alert('Failed to update review moderation status');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        router.refresh();
      }
    } catch {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Submitted Testimonials ({reviews.length})</h2>
          <p className="text-xs text-zinc-400">
            Moderate customer reviews. Only published reviews appear on the public website.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`p-5 sm:p-6 rounded-3xl glass-panel border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              r.isPublished ? 'border-emerald-500/30' : 'border-amber-500/40 bg-amber-950/10'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">{r.customerName}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {r.eventType}
                </span>
                <span
                  className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                    r.isPublished
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {r.isPublished ? 'Published Live' : 'Pending Moderation'}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{r.comment}&rdquo;
              </p>

              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                {r.eventDate && <span>Event: {r.eventDate}</span>}
                <span>• Submitted: {formatDate(r.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleTogglePublish(r.id, r.isPublished)}
                disabled={loadingId === r.id}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  r.isPublished
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {loadingId === r.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : r.isPublished ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Unpublish</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve & Publish</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(r.id)}
                className="p-2 rounded-xl bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-800/40"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
