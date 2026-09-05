'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, Sparkles, X, Loader2 } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/lib/utils';

export interface ReviewData {
  id: string;
  customerName: string;
  eventType: string;
  rating: number;
  comment: string;
  eventDate?: string | null;
}

interface TestimonialsSectionProps {
  initialReviews: ReviewData[];
}

export default function TestimonialsSection({ initialReviews }: TestimonialsSectionProps) {
  const [reviews] = useState<ReviewData[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    eventType: 'Wedding Reception',
    rating: 5,
    comment: '',
    eventDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          customerName: '',
          eventType: 'Wedding Reception',
          rating: 5,
          comment: '',
          eventDate: '',
        });
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{rev.customerName}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
                  <span className="text-purple-400 font-medium">{rev.eventType}</span>
                  {rev.eventDate && <span>• {rev.eventDate}</span>}
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Verified Event
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSubmitted(false);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/30 font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Were You at an Event with DJ Mantu? Leave a Review</span>
        </button>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full rounded-2xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Review Submitted!</h3>
                <p className="text-sm text-zinc-300">
                  Thank you for your feedback. To prevent spam, your review will be published shortly after verification by DJ Mantu.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" /> Share Your Event Experience
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Your genuine feedback helps future hosts plan their big night.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      {EVENT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 Outstanding)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 Great)</option>
                      <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">When Was The Event?</label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How was the music, sound quality, lighting, and dance floor energy?"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Review for Moderation</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
