import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/auth';

export async function POST() {
  await clearAdminSession();
  const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
  res.cookies.delete('dj_mantu_admin_session');
  return res;
}
