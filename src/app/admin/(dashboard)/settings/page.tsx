import React from 'react';
import prisma from '@/lib/prisma';
import WebsiteSettingsClient from '@/components/admin/WebsiteSettingsClient';
import { ExternalLink, Sliders } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.websiteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-purple-400" />
              <span>CMS & Brand Control</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Real-Time Public Sync</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Website Content & Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Customize your stage name, hero headlines, direct WhatsApp line, tour areas, and artist biography without editing any code.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* Main CMS Form Client */}
      <WebsiteSettingsClient initialSettings={settingsMap} />
    </div>
  );
}
