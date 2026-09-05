import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { invalidatePackagesCache } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const packages = await prisma.package.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ packages });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, price, durationHours, description, features, equipment, suitableFor, isPopular, isActive } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const pkg = await prisma.package.create({
      data: {
        name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        price: Number(price),
        durationHours: Number(durationHours) || 4,
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : features || '[]',
        equipment: equipment || 'Standard DJ Console & Audio Gear',
        suitableFor: suitableFor || 'Events & Celebrations',
        isPopular: !!isPopular,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    await invalidatePackagesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, package: pkg });
  } catch (error) {
    console.error('Create package error:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, name, price, durationHours, description, features, equipment, suitableFor, isPopular, isActive } = body;

    const updated = await prisma.package.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        durationHours: Number(durationHours),
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        equipment,
        suitableFor,
        isPopular,
        isActive,
      },
    });

    await invalidatePackagesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, package: updated });
  } catch (error) {
    console.error('Update package error:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.package.delete({ where: { id } });
    await invalidatePackagesCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    console.error('Delete package error:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
