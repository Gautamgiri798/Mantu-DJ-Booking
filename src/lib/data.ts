import { cache } from 'react';
import prisma from '@/lib/prisma';
import { cacheFetch, cacheDel } from '@/lib/redis';
import type { Service, Package, GalleryItem, VideoItem, Review } from '@prisma/client';

/**
 * 1-Hour TTL for static and catalog website content
 */
const DEFAULT_CATALOG_TTL = 3600;

/**
 * Cached settings loader:
 * - Uses Redis/Memory cache across server requests
 * - Also wrapped in React cache() for request-scoped deduplication
 */
export const getWebsiteSettingsMap = cache(async (): Promise<Record<string, string>> => {
  return cacheFetch<Record<string, string>>(
    'settings:map',
    async () => {
      try {
        const settings = await prisma.websiteSetting.findMany();
        return settings.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {} as Record<string, string>);
      } catch (error) {
        console.error('Failed to load website settings from DB:', error);
        return {};
      }
    },
    DEFAULT_CATALOG_TTL
  );
});

/**
 * Cached Active Services query
 */
export async function getCachedServices(limit?: number): Promise<Service[]> {
  const cacheKey = `services:active:${limit ?? 'all'}`;
  return cacheFetch<Service[]>(
    cacheKey,
    async () => {
      return prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        ...(limit ? { take: limit } : {}),
      });
    },
    DEFAULT_CATALOG_TTL
  );
}

/**
 * Cached Active Packages query
 */
export async function getCachedPackages(limit?: number): Promise<Package[]> {
  const cacheKey = `packages:active:${limit ?? 'all'}`;
  return cacheFetch<Package[]>(
    cacheKey,
    async () => {
      return prisma.package.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        ...(limit ? { take: limit } : {}),
      });
    },
    DEFAULT_CATALOG_TTL
  );
}

/**
 * Cached Gallery Items query
 */
export async function getCachedGallery(limit?: number, category?: string): Promise<GalleryItem[]> {
  const cacheKey = `gallery:${category ?? 'all'}:${limit ?? 'all'}`;
  return cacheFetch<GalleryItem[]>(
    cacheKey,
    async () => {
      return prisma.galleryItem.findMany({
        ...(category ? { where: { category } } : {}),
        orderBy: { order: 'asc' },
        ...(limit ? { take: limit } : {}),
      });
    },
    DEFAULT_CATALOG_TTL
  );
}

/**
 * Cached Video Showcase items query
 */
export async function getCachedVideos(limit?: number): Promise<VideoItem[]> {
  const cacheKey = `videos:all:${limit ?? 'all'}`;
  return cacheFetch<VideoItem[]>(
    cacheKey,
    async () => {
      return prisma.videoItem.findMany({
        orderBy: { order: 'asc' },
        ...(limit ? { take: limit } : {}),
      });
    },
    DEFAULT_CATALOG_TTL
  );
}

/**
 * Cached Verified Reviews query
 */
export async function getCachedReviews(limit?: number): Promise<Review[]> {
  const cacheKey = `reviews:published:${limit ?? 'all'}`;
  return cacheFetch<Review[]>(
    cacheKey,
    async () => {
      return prisma.review.findMany({
        where: { isPublished: true },
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        ...(limit ? { take: limit } : {}),
      });
    },
    DEFAULT_CATALOG_TTL
  );
}

/* =========================================================================
   Cache Invalidation Helpers (called by Admin mutations and Booking creation)
   ========================================================================= */

export async function invalidateSettingsCache(): Promise<void> {
  await cacheDel('settings:map');
  await cacheDel('settings:*');
}

export async function invalidateServicesCache(): Promise<void> {
  await cacheDel('services:*');
}

export async function invalidatePackagesCache(): Promise<void> {
  await cacheDel('packages:*');
}

export async function invalidateGalleryCache(): Promise<void> {
  await cacheDel('gallery:*');
}

export async function invalidateVideosCache(): Promise<void> {
  await cacheDel('videos:*');
}

export async function invalidateReviewsCache(): Promise<void> {
  await cacheDel('reviews:*');
}

export async function invalidateAvailabilityCache(date?: string): Promise<void> {
  if (date) {
    await cacheDel(`availability:check:${date}`);
  }
  await cacheDel('availability:*');
}
