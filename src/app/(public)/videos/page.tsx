import React from 'react';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';
import { getCachedVideos } from '@/lib/data';

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await getCachedVideos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
          Live Atmosphere
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Performance Video Showcase
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Watch real event footage, explosive drops, dry ice bridal entries, and electrifying crowd reactions.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              <Image
                src={vid.thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'}
                alt={vid.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center z-10">
                <a
                  href={vid.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${vid.title}`}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </a>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 text-[11px] font-semibold text-zinc-300">
                {vid.platform === 'youtube' ? (
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                )}
                <span className="capitalize">{vid.platform}</span>
              </div>

              {vid.duration && (
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-zinc-300">
                  {vid.duration}
                </span>
              )}
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
                {vid.eventType}
              </span>
              <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                {vid.title}
              </h3>
              <div className="pt-3">
                <a
                  href={vid.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Watch Video On Platform</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
