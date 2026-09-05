import React from 'react';
import prisma from '@/lib/prisma';
import WebsiteSettingsClient from '@/components/admin/WebsiteSettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.websiteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          CMS Control
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
          Website Content Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Update DJ name, hero taglines, phone, WhatsApp number, and bio without editing code.
        </p>
      </div>

      <WebsiteSettingsClient initialSettings={settingsMap} />
    </div>
  );
}
