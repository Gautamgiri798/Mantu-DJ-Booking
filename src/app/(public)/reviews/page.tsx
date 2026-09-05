import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getCachedReviews } from '@/lib/data';

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getCachedReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-400">
          Client Feedback & Stories
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Verified Event Reviews
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Hear directly from couples, parents, corporate heads, and college committees who trusted DJ Mantu to turn their celebrations into legendary memories.
        </p>

        {/* Rating summary pill */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white font-bold text-base">4.9 / 5.0</span>
          <span className="text-zinc-500 text-sm">(150+ Verified Events in Eastern India)</span>
        </div>
      </div>

      {/* Testimonials Grid & Submission */}
      <TestimonialsSection initialReviews={reviews} />

      {/* Trust Guarantee Box */}
      <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 max-w-4xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">Our 100% Dancefloor Satisfaction Promise</h3>
        <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          We don’t just play random songs — we build energy, coordinate entry moments with light and fog, and read the crowd to ensure guests of all generations dance until the very end.
        </p>
        <div className="pt-2">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <span>Book Your Date Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
