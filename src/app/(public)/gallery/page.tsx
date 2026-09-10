import React from 'react';
import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import GalleryLightbox from '@/components/GalleryLightbox';
import { getCachedGallery } from '@/lib/data';

import type { GalleryItem } from '@prisma/client';

export const revalidate = 60;

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];
  try {
    galleryItems = await getCachedGallery();
  } catch (error) {
    console.error('Failed to load gallery items:', error);
    galleryItems = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Visual Memories
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Event Portfolio & Gallery
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Explore actual event setups, bridal entries, festival dance floors, and concert lighting captured across hundreds of unforgettable celebrations.
        </p>
      </div>

      {/* Lightbox Gallery Component */}
      <GalleryLightbox items={galleryItems} />

      {/* CTA Box */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Like what you see for your upcoming celebration?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Verify if your celebration date is open on our live schedule.
        </p>
        <div className="pt-2">
          <Link
            href="/availability"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Check Date Availability</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
