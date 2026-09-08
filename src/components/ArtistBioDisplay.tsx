import React from 'react';
import {
  Disc3,
  Music,
  Sparkles,
  Flame,
  Zap,
  Radio,
  Sliders,
  Headphones,
  AudioLines,
} from 'lucide-react';

export interface ArtistBioDisplayProps {
  bio: string;
  djName?: string;
}

/**
 * Parses markdown bold text (**text**) into styled glowing JSX elements.
 */
export function renderFormattedText(text: string, highlightGradient = true) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const clean = part.slice(2, -2);
      if (highlightGradient) {
        return (
          <strong
            key={index}
            className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-pink-300 drop-shadow-sm"
          >
            {clean}
          </strong>
        );
      }
      return (
        <strong key={index} className="font-extrabold text-white">
          {clean}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

// Curated regional and contemporary genre pills with unique aesthetics
export const GENRE_CHIPS = [
  { name: 'Bollywood Dance Music (BDM)', icon: Music, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'bg-pink-500/10' },
  { name: 'Commercial & EDM House', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  { name: 'Retro & 90s/2000s Classics', icon: Radio, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  { name: 'Sambalpuri Folk Grooves', icon: Flame, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  { name: 'Odia Cultural Anthems', icon: Sparkles, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  { name: 'Chhattisgarhi Beats', icon: Disc3, color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
  { name: 'Nagpuri Street Rhythms', icon: Sliders, color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
  { name: 'Sadri & Cultural Fusion', icon: Headphones, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
];

/**
 * Lead story card designed to fit cleanly inside the Hero section alongside the Headliner Card.
 */
export function ArtistLeadStory({ bio, djName = 'DJ Mantu' }: ArtistBioDisplayProps) {
  const paragraphs = bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const leadParagraph = paragraphs[0] || '';

  return (
    <div className="relative group">
      {/* Subtle ambient backglow */}
      <div className="absolute -inset-1 bg-linear-to-r from-purple-600/20 via-pink-600/15 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 bg-linear-to-b from-white/4 to-black/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest font-extrabold text-purple-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span>The Journey & Pedigree</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono tracking-normal">{djName} Signature</span>
        </div>

        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
          {renderFormattedText(leadParagraph)}
        </p>

        {/* Quick performance arenas tags */}
        <div className="pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-medium text-zinc-300">
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            🎪 Festival Stages
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            💍 Destination Weddings
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            🔥 Club Nights
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            👑 VIP Celebrations
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Dedicated wide section for the Musical Blends, Stage Philosophy, and Showstopper Banner.
 */
export function ArtistSoundShowcase({ bio }: ArtistBioDisplayProps) {
  const paragraphs = bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sloganRegex = /One DJ\.?\s*Every Vibe\.?\s*Every Celebration\.?\s*An Experience to Remember\.?/i;
  const hasSlogan = paragraphs.some((p) => sloganRegex.test(p));

  const bodyParagraphs = paragraphs.slice(1).filter((p) => !sloganRegex.test(p));

  return (
    <div className="space-y-6">
      {/* Sound Palette & Regional Fusion Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/20 bg-linear-to-b from-purple-950/20 via-zinc-950/40 to-black/60 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-600 to-pink-600 p-px shadow-lg">
              <div className="w-full h-full bg-[#08080C] rounded-[15px] flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-300" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Signature Sets & Musical Blends
              </h3>
              <p className="text-xs text-zinc-400">
                Bridging contemporary festival beats with authentic regional heritage
              </p>
            </div>
          </div>

          {/* Live Concert Sound Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-purple-500/15 via-pink-500/15 to-cyan-500/15 border border-purple-500/30 backdrop-blur-md w-fit shrink-0 shadow-sm">
            <AudioLines className="w-4 h-4 text-pink-400" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-cyan-300">
              Live Concert Sound
            </span>
          </div>
        </div>

        {bodyParagraphs[0] && (
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {renderFormattedText(bodyParagraphs[0])}
          </p>
        )}

        {/* Visual Genre Chips Matrix */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          {GENRE_CHIPS.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className={`group px-3.5 py-2 rounded-xl text-xs font-semibold ${chip.bg} ${chip.border} border text-zinc-200 hover:text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-950/40 cursor-default`}
              >
                <Icon className={`w-3.5 h-3.5 ${chip.color} shrink-0 group-hover:rotate-12 transition-transform`} />
                <span>{chip.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Showstopper Slogan Banner */}
      {(hasSlogan || true) && (
        <div className="relative group overflow-hidden rounded-3xl p-px bg-linear-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-xl shadow-purple-950/50">
          <div className="relative rounded-[23px] bg-linear-to-r from-[#0a0814] via-[#120b1f] to-[#080b14] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-purple-600 via-pink-600 to-cyan-400 p-0.5 shrink-0 shadow-lg shadow-purple-900/50">
                <div className="w-full h-full bg-[#08080C] rounded-[14px] flex items-center justify-center">
                  <Disc3 className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>

              <div>
                <div className="text-sm sm:text-base font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-cyan-300">
                  One DJ • Every Vibe • Every Celebration
                </div>
                <div className="text-xs text-zinc-400 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>An Experience to Remember.</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 px-4 py-1.5 rounded-full bg-white/6 border border-white/10 text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Peak Crowd Energy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Backward-compatible default export.
 */
export default function ArtistBioDisplay(props: ArtistBioDisplayProps) {
  return (
    <div className="space-y-6">
      <ArtistLeadStory {...props} />
      <ArtistSoundShowcase {...props} />
    </div>
  );
}
