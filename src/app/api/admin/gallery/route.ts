import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateGalleryCache } from '@/lib/data';

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
    const { title, category, imageUrl, eventDate, location } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || 'Weddings',
        imageUrl,
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
