'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CheckCircle, Loader2, Sparkles, Globe, Phone, Mail, MapPin } from 'lucide-react';

interface Props {
  initialSettings: Record<string, string>;
}

export default function WebsiteSettingsClient({ initialSettings }: Props) {
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        router.refresh();
      } else {
        alert('Failed to save settings');
      }
    } catch {
      alert('Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>
            Website settings saved successfully! Changes are immediately live across the public site.
          </span>
        </div>
      )}

      {/* Brand & Identity */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-400" /> DJ Brand & Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">DJ / Business Name</label>
            <input
              type="text"
              value={settings['dj_name'] || ''}
              onChange={(e) => handleChange('dj_name', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Brand Tagline</label>
            <input
              type="text"
              value={settings['tagline'] || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Hero Section Copy */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" /> Homepage Hero Copy
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Hero Main Title</label>
            <input
              type="text"
              value={settings['hero_title'] || ''}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Hero Subtitle / Description</label>
            <textarea
              rows={3}
              value={settings['hero_subtitle'] || ''}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact & WhatsApp */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-400" /> Direct Contact & WhatsApp Line
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">WhatsApp Booking Number</label>
            <input
              type="text"
              value={settings['whatsapp'] || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+91 6372174006"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Phone Number (Call)</label>
            <input
              type="text"
              value={settings['phone'] || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 6372174006"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Location & Areas */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" /> Base Studio & Service Regions
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Studio / Base Address</label>
            <input
              type="text"
              value={settings['address'] || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Brajrajnagar, Jharsuguda, Odisha, Pin - 768216"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Active Service Cities / Areas</label>
            <input
              type="text"
              value={settings['service_areas'] || ''}
              onChange={(e) => handleChange('service_areas', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 text-xs">
        <h3 className="text-base font-bold text-white">About Page Biography</h3>
        <div>
          <label className="font-semibold text-zinc-300 block mb-1">DJ Story & Experience</label>
          <textarea
            rows={5}
            value={settings['about_bio'] || ''}
            onChange={(e) => handleChange('about_bio', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-950 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Live Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
