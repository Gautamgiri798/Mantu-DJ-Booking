'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Calendar, MapPin } from 'lucide-react';

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  eventDate?: string | null;
  location?: string | null;
  isFeatured?: boolean;
}

interface GalleryLightboxProps {
  items: GalleryItemData[];
  initialCategory?: string;
}

const CATEGORIES = ['All', 'Weddings', 'Receptions', 'Parties', 'Birthdays', 'Corporate'];

export default function GalleryLightbox({
  items,
  initialCategory = 'All',
}: GalleryLightboxProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          No photos found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer aspect-[4/3] transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 z-10" />

              {/* Badges and Zoom Icon */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                  {item.category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Content info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 z-20">
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-400">
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {item.location}
                    </span>
                  )}
                  {item.eventDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {item.eventDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black flex items-center justify-center">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {/* Caption Info */}
            <div className="p-4 sm:p-5 bg-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {activeItem.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {activeItem.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                {activeItem.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {activeItem.location}
                  </span>
                )}
                {activeItem.eventDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {activeItem.eventDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
