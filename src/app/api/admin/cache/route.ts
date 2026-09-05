import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getCacheStatus, cacheDel } from '@/lib/redis';
import {
  invalidateSettingsCache,
  invalidateServicesCache,
  invalidatePackagesCache,
  invalidateGalleryCache,
  invalidateVideosCache,
  invalidateReviewsCache,
  invalidateAvailabilityCache,
} from '@/lib/data';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const status = await getCacheStatus();
  return NextResponse.json({
    status: 'ok',
    cache: status,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'CLEAR_ALL';

    if (action === 'CLEAR_SETTINGS') {
      await invalidateSettingsCache();
    } else if (action === 'CLEAR_SERVICES') {
      await invalidateServicesCache();
    } else if (action === 'CLEAR_PACKAGES') {
      await invalidatePackagesCache();
    } else if (action === 'CLEAR_GALLERY') {
      await invalidateGalleryCache();
    } else if (action === 'CLEAR_VIDEOS') {
      await invalidateVideosCache();
    } else if (action === 'CLEAR_REVIEWS') {
      await invalidateReviewsCache();
    } else if (action === 'CLEAR_AVAILABILITY') {
      await invalidateAvailabilityCache();
    } else {
      // CLEAR_ALL
      await Promise.all([
        invalidateSettingsCache(),
        invalidateServicesCache(),
        invalidatePackagesCache(),
        invalidateGalleryCache(),
        invalidateVideosCache(),
        invalidateReviewsCache(),
        invalidateAvailabilityCache(),
        cacheDel('*'),
      ]);
    }

    const updatedStatus = await getCacheStatus();
    return NextResponse.json({
      success: true,
      message: `Cache successfully purged (${action})`,
      cache: updatedStatus,
    });
  } catch (error) {
    console.error('Cache purge error:', error);
    return NextResponse.json({ error: 'Failed to purge cache' }, { status: 500 });
  }
}
