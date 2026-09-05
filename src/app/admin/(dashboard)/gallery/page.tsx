import React from 'react';
import prisma from '@/lib/prisma';
import GalleryManagementClient from '@/components/admin/GalleryManagementClient';
import { GalleryItemData } from '@/components/GalleryLightbox';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: 'asc' },
  });

  const formattedItems: GalleryItemData[] = items.map((i) => ({
    id: i.id,
    title: i.title,
    category: i.category,
    imageUrl: i.imageUrl,
    eventDate: i.eventDate,
    location: i.location,
    isFeatured: i.isFeatured,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Media Assets
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Gallery Management
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Upload event photos, categorize by weddings, parties, or corporate events, and curate your visual portfolio.
        </p>
      </div>

      <GalleryManagementClient initialItems={formattedItems} />
    </div>
  );
}
