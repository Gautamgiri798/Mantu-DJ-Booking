import React from 'react';
import prisma from '@/lib/prisma';
import PackageManagementClient from '@/components/admin/PackageManagementClient';
import { PackageData } from '@/components/PackageCard';

export const dynamic = 'force-dynamic';

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { order: 'asc' },
  });

  const formattedPackages: PackageData[] = packages.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    durationHours: p.durationHours,
    description: p.description,
    features: p.features,
    equipment: p.equipment,
    suitableFor: p.suitableFor,
    isPopular: p.isPopular,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
          Tier Configurations
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Package & Pricing Management
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Create, edit, or adjust pricing, duration, equipment inclusions, and promote best-selling packages.
        </p>
      </div>

      <PackageManagementClient initialPackages={formattedPackages} />
    </div>
  );
}
