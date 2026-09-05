import React from 'react';
import prisma from '@/lib/prisma';
import ServiceManagementClient, { AdminServiceItem } from '@/components/admin/ServiceManagementClient';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  const formattedServices: AdminServiceItem[] = services.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    category: s.category,
    description: s.description,
    priceStarting: s.priceStarting,
    features: s.features,
    imageUrl: s.imageUrl,
    isActive: s.isActive,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Catalog Control
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Service Management
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Add, edit, or toggle individual DJ and production equipment services.
        </p>
      </div>

      <ServiceManagementClient initialServices={formattedServices} />
    </div>
  );
}
