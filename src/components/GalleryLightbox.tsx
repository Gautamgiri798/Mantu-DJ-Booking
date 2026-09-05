'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ZoomIn,
  Calendar,
  MapPin,
  Play,
  Film,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  mediaType?: 'IMAGE' | 'VIDEO' | string;
  videoUrl?: string | null;
  eventDate?: string | null;
  location?: string | null;
  isFeatured?: boolean;
}

interface GalleryLightboxProps {
  items: GalleryItemData[];
  initialCategory?: string;
}

const CATEGORIES = ['All', 'Weddings', 'Receptions', 'Parties', 'Birthdays', 'Corporate'];

function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return null;
}

export default function GalleryLightbox({
  items,
  initialCategory = 'All',
}: GalleryLightboxProps) {
  const [selectedMediaType, setSelectedMediaType] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [fitMode, setFitMode] = useState<'fit' | 'fill'>('fill');

  const filteredItems = items.filter((item) => {
    const itemType = (item.mediaType || 'IMAGE').toUpperCase();
    const matchesType =
      selectedMediaType === 'ALL' ||
      (selectedMediaType === 'IMAGE' && itemType === 'IMAGE') ||
      (selectedMediaType === 'VIDEO' && itemType === 'VIDEO');

    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesType && matchesCategory;
  });

  const currentIndex = activeItem
    ? filteredItems.findIndex((i) => i.id === activeItem.id)
    : -1;

  const openItem = (item: GalleryItemData) => {
    setIsImageLoading(true);
    setActiveItem(item);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredItems.length <= 1) return;
    const prevIndex = currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1;
    setIsImageLoading(true);
    setActiveItem(filteredItems[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredItems.length <= 1) return;
    const nextIndex = currentIndex >= filteredItems.length - 1 ? 0 : currentIndex + 1;
    setIsImageLoading(true);
    setActiveItem(filteredItems[nextIndex]);
  };

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, currentIndex, filteredItems]);

  // Preload adjacent images when lightbox is open
  useEffect(() => {
    if (!activeItem || typeof window === 'undefined' || filteredItems.length <= 1) return;

    const nextIdx = (currentIndex + 1) % filteredItems.length;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;

    const nextItem = filteredItems[nextIdx];
    const prevItem = filteredItems[prevIdx];

    if (nextItem && (!nextItem.mediaType || nextItem.mediaType === 'IMAGE')) {
      const img = new window.Image();
      img.src = nextItem.imageUrl;
    }
    if (prevItem && (!prevItem.mediaType || prevItem.mediaType === 'IMAGE')) {
      const img = new window.Image();
      img.src = prevItem.imageUrl;
    }
  }, [activeItem, currentIndex, filteredItems]);

  const ytEmbedUrl = activeItem?.videoUrl ? getYouTubeEmbedUrl(activeItem.videoUrl) : null;
  const isVideoItem = activeItem && activeItem.mediaType?.toUpperCase() === 'VIDEO';

  return (
    <div>
      {/* Media Type & Category Filters */}
      <div className="space-y-4 mb-10">
        {/* Media Type Segmented Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setSelectedMediaType('ALL')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedMediaType === 'ALL'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Media ({items.length})</span>
            </button>
            <button
              onClick={() => setSelectedMediaType('IMAGE')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedMediaType === 'IMAGE'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos ({items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() !== 'VIDEO').length})</span>
            </button>
            <button
              onClick={() => setSelectedMediaType('VIDEO')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedMediaType === 'VIDEO'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos ({items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() === 'VIDEO').length})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-white border border-purple-500/50 shadow-sm'
                    : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl glass-panel border border-white/5 space-y-2">
          <p className="text-base font-semibold text-zinc-300">No media found in this filter.</p>
          <p className="text-xs text-zinc-500">Try selecting &quot;All Media&quot; or another event category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isVideo = (item.mediaType || 'IMAGE').toUpperCase() === 'VIDEO';

            return (
              <div
                key={item.id}
                onClick={() => openItem(item)}
                onMouseEnter={() => {
                  // Preload high-res image into browser cache on hover
                  if (typeof window !== 'undefined' && item.imageUrl) {
                    const preloadImg = new window.Image();
                    preloadImg.src = item.imageUrl;
                  }
                }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer aspect-[4/3] transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/25"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 z-10" />

                {/* Video Play Button Overlay if item is video */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-2xl shadow-purple-950/80 group-hover:scale-115 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Top Badges and Zoom/Action Icon */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                      {item.category}
                    </span>
                    {isVideo && (
                      <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md bg-pink-950/90 text-pink-300 border border-pink-500/40 backdrop-blur-sm">
                        <Film className="w-3 h-3" />
                        Video
                      </span>
                    )}
                  </div>

                  <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {isVideo ? <Play className="w-4 h-4 fill-current translate-x-0.5" /> : <ZoomIn className="w-4 h-4" />}
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
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 select-none"
        >
          {/* Navigation: Previous Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous Media"
              className="absolute left-2 sm:left-6 z-40 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation: Next Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next Media"
              className="absolute right-2 sm:right-6 z-40 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative ${
              isVideoItem || fitMode === 'fill'
                ? 'max-w-5xl w-full'
                : 'w-fit max-w-[92vw] sm:max-w-4xl min-w-[320px] sm:min-w-[420px] mx-auto'
            } max-h-[92vh] flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl transition-all duration-300`}
          >
            {/* Action Buttons: Fit/Fill Toggle & Close */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              {!isVideoItem && (
                <button
                  onClick={() => setFitMode((prev) => (prev === 'fill' ? 'fit' : 'fill'))}
                  aria-label={fitMode === 'fill' ? 'Fit photo' : 'Fill frame'}
                  title={fitMode === 'fill' ? 'Fit photo (Show uncropped)' : 'Fill frame (Full width)'}
                  className="w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 shadow-xl backdrop-blur-md cursor-pointer"
                >
                  {fitMode === 'fill' ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={() => setActiveItem(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 shadow-xl backdrop-blur-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Box */}
            {isVideoItem ? (
              <div className="relative w-full aspect-video max-h-[70vh] bg-black flex items-center justify-center">
                {ytEmbedUrl ? (
                  <iframe
                    src={ytEmbedUrl}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : activeItem.videoUrl ? (
                  <video
                    src={activeItem.videoUrl}
                    controls
                    autoPlay
                    poster={activeItem.imageUrl}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8 text-zinc-400">
                    <p>No playable video source found.</p>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`relative flex items-center justify-center overflow-hidden bg-zinc-950 ${
                  fitMode === 'fill'
                    ? 'w-full h-[60vh] sm:h-[72vh]'
                    : 'w-full max-h-[70vh] sm:max-h-[75vh]'
                }`}
              >
                {/* Ambient glowing backdrop blur so any background space has soft glowing image colors instead of blank space */}
                <img
                  src={activeItem.imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-125 pointer-events-none select-none"
                />

                {/* Visual Loading Indicator while loading image */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-black/80 backdrop-blur-xs">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="text-xs font-semibold text-zinc-400">
                      Loading photo...
                    </span>
                  </div>
                )}

                {/* Photo Display */}
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => setIsImageLoading(false)}
                  onClick={() => setFitMode((prev) => (prev === 'fill' ? 'fit' : 'fill'))}
                  title={fitMode === 'fill' ? 'Click to switch to fit photo' : 'Click to fill frame'}
                  className={`relative z-10 cursor-pointer transition-all duration-200 select-none ${
                    fitMode === 'fill'
                      ? 'w-full h-full object-cover object-center'
                      : 'max-h-[65vh] sm:max-h-[74vh] w-auto max-w-[90vw] object-contain block'
                  } ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
            )}

            {/* Caption Info */}
            <div className="p-4 sm:p-5 bg-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {activeItem.category}
                  </span>
                  {isVideoItem && (
                    <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      <Film className="w-3 h-3" />
                      Video
                    </span>
                  )}
                  {filteredItems.length > 1 && (
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {currentIndex + 1} / {filteredItems.length}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {activeItem.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
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
                {activeItem.videoUrl && (
                  <a
                    href={activeItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    <span>Watch Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
