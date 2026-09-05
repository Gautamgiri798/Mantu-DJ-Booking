import React from 'react';
import prisma from '@/lib/prisma';
import BookingWizard from '@/components/BookingWizard';
import { PackageData } from '@/components/PackageCard';
import { getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 10;

export default async function BookPage() {
  const [packages, settingsMap] = await Promise.all([
    prisma.package.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    getWebsiteSettingsMap(),
  ]);

  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  const packagesData: PackageData[] = packages.map((p) => ({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Direct Reservation
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Request Event Booking
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Lock in your celebration date with DJ Mantu. Fill out the event details below to receive an instant booking reservation code and quotation.
        </p>
      </div>

      <BookingWizard
        packages={packagesData}
        whatsappNumber={whatsapp}
        djName={djName}
      />
    </div>
  );
}
