import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidateServicesCache } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, category, description, priceStarting, features, imageUrl, isActive } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const service = await prisma.service.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        category: category || 'Party',
        description,
        priceStarting: priceStarting ? Number(priceStarting) : null,
        features: Array.isArray(features) ? JSON.stringify(features) : features || '[]',
        imageUrl: imageUrl || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    await invalidateServicesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, title, category, description, priceStarting, features, imageUrl, isActive } = body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title,
        category,
        description,
        priceStarting: priceStarting ? Number(priceStarting) : null,
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        imageUrl,
        isActive,
      },
    });

    await invalidateServicesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    await invalidateServicesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
