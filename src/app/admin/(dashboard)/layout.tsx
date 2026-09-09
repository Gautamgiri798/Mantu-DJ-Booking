import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Count pending bookings for live badge
  let pendingCount = 0;
  try {
    pendingCount = await prisma.booking.count({
      where: { status: 'PENDING' },
    });
  } catch (err) {
    console.error('Error fetching pending bookings count:', err);
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-100 flex flex-col md:flex-row">
      <AdminSidebar
        adminName={session.name}
        adminEmail={session.email}
        pendingCount={pendingCount}
      />
      <main className="flex-1 md:ml-64 p-4 sm:p-8 w-full">
        {children}
      </main>
    </div>
  );
}
