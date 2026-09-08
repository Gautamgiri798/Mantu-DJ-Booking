'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  CheckCircle2,
  Loader2,
  Sparkles,
  Globe,
  Phone,
  MapPin,
  Disc3,
  Award,
  FileText,
  MessageSquare,
  Check,
} from 'lucide-react';
import { InstagramIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';

interface Props {
  initialSettings: Record<string, string>;
}

export default function WebsiteSettingsClient({ initialSettings }: Props) {
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
    setHasUnsavedChanges(true);
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
        setHasUnsavedChanges(false);
        router.refresh();

        setTimeout(() => {
          setSavedSuccess(false);
        }, 4000);
      } else {
        alert('Failed to save settings');
      }
    } catch {
      alert('Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  const djName = settings['dj_name'] || 'DJ Mantu';
  const tagline = settings['tagline'] || "Rourkela's Premier DJ & Event Sound Specialist";
  const heroTitle = settings['hero_title'] || 'Turn Every Moment Into An Unforgettable Memory';
  const whatsappNum = settings['whatsapp'] || '+91 6372174006';

  const testWaLink = createWhatsAppLink(
    whatsappNum,
    `Hello ${djName}, testing the direct booking line from website settings!`
  );

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      {/* Sticky Top Notification & Quick Save Toolbar */}
      <div className="sticky top-4 z-40 p-4 rounded-2xl glass-panel border border-white/15 bg-zinc-950/90 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Settings saved! Your public website is updated in real time.</span>
            </div>
          ) : hasUnsavedChanges ? (
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold animate-in fade-in duration-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span>You have unsaved changes in your website configuration.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All website content is synchronized with live production.</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all shrink-0 ${
            hasUnsavedChanges
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-purple-950/50 scale-[1.02] hover:opacity-95'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/10'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* 1. DJ Brand & Identity Card */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">DJ Brand & Stage Identity</h3>
              <p className="text-xs text-zinc-400">Main artist moniker and positioning tagline</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-950/50 border border-purple-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Public Branding
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Stage / Business Name <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              value={settings['dj_name'] || ''}
              onChange={(e) => handleChange('dj_name', e.target.value)}
              placeholder="e.g. DJ Mantu"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
            />
            <span className="text-[10px] text-zinc-500 block">
              Displays across navbar, footer, booking forms, and invoices.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Official Brand Tagline
            </label>
            <input
              type="text"
              value={settings['tagline'] || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="e.g. Rourkela's Premier DJ & Event Sound Specialist"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
            />
            <span className="text-[10px] text-zinc-500 block">
              Sub-heading shown under logo and meta descriptions.
            </span>
          </div>
        </div>

        {/* Live Brand Preview Hologram */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-purple-500/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <span className="font-black text-white text-sm block">{djName}</span>
              <span className="text-purple-300 text-xs font-medium block">{tagline}</span>
            </div>
          </div>
          <span className="text-[9px] uppercase font-bold text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            Live Preview
          </span>
        </div>
      </div>

      {/* 2. Homepage Hero Section Copy */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Homepage Hero Headline</h3>
              <p className="text-xs text-zinc-400">The first text visitors see when landing on your site</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-pink-300 bg-pink-950/50 border border-pink-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Primary Pitch
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={settings['hero_title'] || ''}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="e.g. Turn Every Moment Into An Unforgettable Memory"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Hero Subtitle / Production Highlights
            </label>
            <textarea
              rows={3}
              value={settings['hero_subtitle'] || ''}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="e.g. Electrifying live DJ performances, arena-grade JBL sound..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>

          {/* Hero Typography Preview Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-950 to-black border border-white/10 space-y-1.5">
            <span className="text-[9px] uppercase font-bold tracking-wider text-pink-400 block">
              Rendered Preview on Landing Page:
            </span>
            <p className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              {heroTitle}
            </p>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {settings['hero_subtitle'] || 'Electrifying sound and performance setup.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Direct Contact & WhatsApp Channels */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Direct Booking & WhatsApp Channels</h3>
              <p className="text-xs text-zinc-400">Phone numbers linked to floating buttons and quick call links</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Direct Conversions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block flex items-center justify-between">
              <span>WhatsApp Booking Number</span>
              <a
                href={testWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                title="Test WhatsApp connection"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Test Chat</span>
              </a>
            </label>
            <input
              type="text"
              value={settings['whatsapp'] || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+91 6372174006"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            <span className="text-[10px] text-zinc-500 block">
              Powers floating WhatsApp widget and enquiry redirects.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Calling Phone Number
            </label>
            <input
              type="text"
              value={settings['phone'] || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 6372174006"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            <span className="text-[10px] text-zinc-500 block">
              Used in header &ldquo;Call Now&rdquo; and click-to-call links.
            </span>
          </div>
        </div>
      </div>

      {/* 4. Career & Experience Metric Badges */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Experience & Credibility Stats</h3>
              <p className="text-xs text-zinc-400">Counters highlighted on homepage and about sections</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/50 border border-amber-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Social Proof
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">Years Experience</label>
            <input
              type="text"
              value={settings['experience_years'] || ''}
              onChange={(e) => handleChange('experience_years', e.target.value)}
              placeholder="e.g. 10+"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">Shows Completed</label>
            <input
              type="text"
              value={settings['events_completed'] || ''}
              onChange={(e) => handleChange('events_completed', e.target.value)}
              placeholder="e.g. 650+"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">Happy Clients / Guests</label>
            <input
              type="text"
              value={settings['happy_clients'] || ''}
              onChange={(e) => handleChange('happy_clients', e.target.value)}
              placeholder="e.g. 1,200+"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 5. Base Studio & Service Regions */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Studio HQ & Touring Coverage</h3>
              <p className="text-xs text-zinc-400">Headquarters location and active cities you travel to</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Tour Logistics
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Studio / Base Physical Address
            </label>
            <input
              type="text"
              value={settings['address'] || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. Brajrajnagar, Jharsuguda, Odisha, Pin - 768216"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Service Cities & Regional Reach (Comma-Separated)
            </label>
            <input
              type="text"
              value={settings['service_areas'] || ''}
              onChange={(e) => handleChange('service_areas', e.target.value)}
              placeholder="e.g. Jharsuguda, Brajrajnagar, Sambalpur, Rourkela, Bhubaneswar, Cuttack..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 6. Social Media Profiles */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Social Media Profile</h3>
              <p className="text-xs text-zinc-400">Official Instagram channel linked in the site footer</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-rose-300 bg-rose-950/50 border border-rose-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Social Link
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-zinc-300 flex items-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram Profile URL</span>
          </label>
          <input
            type="url"
            value={settings['instagram'] || ''}
            onChange={(e) => handleChange('instagram', e.target.value)}
            placeholder="https://instagram.com/awaraboy458"
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-inner"
          />
          <span className="text-[10px] text-zinc-500 block">
            Directly connected to the Instagram icon in your website footer.
          </span>
        </div>
      </div>

      {/* 7. Artist Biography & Booking Notice */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 bg-zinc-950/70 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">About Page Biography & Seasonal Notice</h3>
              <p className="text-xs text-zinc-400">Long-form artist background, specialties, and booking guidelines</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-950/50 border border-purple-800/40 px-2.5 py-0.5 rounded-full hidden sm:inline">
            Storytelling
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              DJ Story & Career Background
            </label>
            <textarea
              rows={8}
              value={settings['about_bio'] || ''}
              onChange={(e) => handleChange('about_bio', e.target.value)}
              placeholder="Tell your story... (supports **bold** for gradient highlights)"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all leading-relaxed resize-y min-h-40 shadow-inner"
            />
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              💡 <strong>Highlight Tip:</strong> Wrap words in <code className="text-purple-300 font-mono bg-black/60 px-1.5 py-0.5 rounded border border-white/10">**bold**</code> for neon gradient styling on the public About page.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300 block">
              Booking Advice / Peak Season Notice
            </label>
            <input
              type="text"
              value={settings['booking_notice'] || ''}
              onChange={(e) => handleChange('booking_notice', e.target.value)}
              placeholder="e.g. Advance booking recommended 3-4 weeks prior during wedding seasons."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Save Button (Bottom of form) */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto min-h-12 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-950 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Live Website Settings...</span>
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
