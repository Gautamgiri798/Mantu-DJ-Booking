'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { WhatsAppIcon, WhatsAppBadge } from '@/components/SocialIcons';

interface FloatingWhatsAppProps {
  whatsapp?: string;
  djName?: string;
}

export default function FloatingWhatsApp({
  whatsapp = '+91 98610 98765',
  djName = 'DJ Mantu',
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(
    `Hello ${djName}, I am interested in checking your availability and booking packages for an upcoming event.`
  );

  const quickPrompts = [
    'Wedding / Reception DJ availability',
    'Birthday party DJ package price',
    'College fest / Corporate gala quote',
    'Sound & Lighting setup details',
  ];

  const handleSend = () => {
    const link = createWhatsAppLink(whatsapp, customMsg);
    window.open(link, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Mini Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-zinc-950/95 border border-emerald-500/30 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-900 via-emerald-950/80 to-zinc-900 p-4 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <WhatsAppBadge className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(37,211,102,0.4)]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-none">{djName} Official</h4>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Direct Artist Line
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-zinc-950/80 space-y-3.5 text-xs">
            <div className="bg-white/[0.04] p-3 rounded-2xl text-zinc-300 border border-white/10 shadow-inner">
              <p className="flex items-center gap-1 font-bold text-emerald-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Direct VIP Booking Concierge
              </p>
              Select a quick inquiry below or type a message to start an instant WhatsApp conversation with {djName}.
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Quick Inquiries:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setCustomMsg(`Hi ${djName}, I need details on: ${prompt}`)}
                    className="text-[11px] px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-500/40 border border-white/10 text-zinc-300 text-left transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="pt-1">
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                rows={3}
                placeholder="Type your event message..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/15 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none shadow-inner"
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSend}
              className="group relative w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Continue On WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-3">
        {/* Floating Desktop Tooltip / Label */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(37,211,102,0.2)] backdrop-blur-xl text-xs text-zinc-200 pointer-events-none select-none animate-in fade-in slide-in-from-right-3 duration-300">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-bold text-white tracking-wide">Chat on WhatsApp</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
          className="group relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.45),0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_14px_35px_rgba(37,211,102,0.65),0_0_30px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? (
            <div className="w-full h-full rounded-full bg-zinc-900 border border-emerald-500/40 flex items-center justify-center text-white shadow-inner">
              <X className="w-6 h-6 text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Subtle Ambient Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
              {/* The Exact Official Circular WhatsApp Logo */}
              <WhatsAppBadge className="w-full h-full relative z-10" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
