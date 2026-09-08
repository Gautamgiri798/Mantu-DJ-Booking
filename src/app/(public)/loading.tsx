import React from 'react';

/**
 * Instant Route Loading Shell for Public Pages.
 * Allows Next.js App Router to instantly transition the view shell
 * without blocking navigation threads.
 */
export default function PublicLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-pulse pointer-events-none">
      {/* Header Skeleton */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="h-6 w-32 mx-auto rounded-full bg-white/[0.06] border border-white/[0.08]" />
        <div className="h-10 sm:h-14 w-3/4 mx-auto rounded-2xl bg-white/[0.07]" />
        <div className="h-4 w-5/6 mx-auto rounded-lg bg-white/[0.04]" />
      </div>

      {/* Content Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-zinc-950/60 border border-white/[0.06] space-y-4 h-64 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06]" />
              <div className="h-5 w-2/3 rounded-lg bg-white/[0.08]" />
              <div className="h-4 w-full rounded-md bg-white/[0.04]" />
              <div className="h-4 w-4/5 rounded-md bg-white/[0.04]" />
            </div>
            <div className="h-9 w-28 rounded-full bg-white/[0.05]" />
          </div>
        ))}
      </div>
    </div>
  );
}
