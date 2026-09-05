import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateGalleryCache } from '@/lib/data';

function extractYouTubeThumbnail(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, category, imageUrl, eventDate, location, mediaType, videoUrl } = body;

    const isVideo = mediaType === 'VIDEO';

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let finalImageUrl = imageUrl?.trim();

    if (isVideo) {
      if (!videoUrl?.trim()) {
        return NextResponse.json({ error: 'Video URL is required for video items' }, { status: 400 });
      }

      if (!finalImageUrl) {
        const autoYtThumb = extractYouTubeThumbnail(videoUrl);
        finalImageUrl = autoYtThumb || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';
      }
    } else {
      if (!finalImageUrl) {
        return NextResponse.json({ error: 'Image URL is required for photo items' }, { status: 400 });
      }
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: title.trim(),
        category: category || 'Weddings',
        imageUrl: finalImageUrl,
        mediaType: isVideo ? 'VIDEO' : 'IMAGE',
        videoUrl: isVideo ? videoUrl?.trim() : null,
        eventDate: eventDate || null,
        location: location || 'Rourkela',
      },
    });

    await invalidateGalleryCache();
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.galleryItem.delete({ where: { id } });
    await invalidateGalleryCache();
    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
