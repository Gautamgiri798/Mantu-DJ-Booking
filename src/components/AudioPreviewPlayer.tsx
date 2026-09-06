'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  genre: string;
  bpm: number;
}

const TRACKS: Track[] = [
  { id: '1', name: 'Bollywood Mainstage Drop', genre: 'BDM Club Mix', bpm: 128 },
  { id: '2', name: 'Royal Baraat Dhol Kick', genre: 'Punjabi EDM', bpm: 130 },
  { id: '3', name: 'Ibiza Sunset Groove', genre: 'Commercial House', bpm: 124 },
  { id: '4', name: 'Retro Rewind 90s Mashup', genre: 'Nostalgic Dance', bpm: 120 },
];

export default function AudioPreviewPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(0.5);

  // Web Audio synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playBeatStep = (ctx: AudioContext, step: number, track: Track) => {
    if (isMuted) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.4, now);
    masterGain.connect(ctx.destination);

    // 1. Kick on 0, 4, 8, 12 (4-on-the-floor)
    if (step % 4 === 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(track.id === '2' ? 160 : 140, now);
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.35);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    // 2. Snare / Clap on 4 and 12
    if (step % 8 === 4) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.2);
    }

    // 3. Synth Bass Arp notes
    const bassNotes = track.id === '1' ? [110, 130, 146, 164] : track.id === '2' ? [98, 123, 146, 174] : [130, 164, 196, 220];
    const freq = bassNotes[step % bassNotes.length];
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(freq, now);
    bassGain.gain.setValueAtTime(0.2, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    bassOsc.connect(bassGain);
    bassGain.connect(masterGain);
    bassOsc.start(now);
    bassOsc.stop(now + 0.12);
  };

  const startLoop = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stepRef.current = 0;
    const intervalMs = (60 / activeTrack.bpm / 4) * 1000;

    timerRef.current = window.setInterval(() => {
      if (audioCtxRef.current) {
        playBeatStep(audioCtxRef.current, stepRef.current, activeTrack);
        stepRef.current = (stepRef.current + 1) % 16;
      }
    }, intervalMs);
    setIsPlaying(true);
  };

  const stopLoop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopLoop();
    } else {
      startLoop();
    }
  };

  const switchTrack = (track: Track) => {
    setActiveTrack(track);
    if (isPlaying) {
      stopLoop();
      setTimeout(() => {
        startLoop();
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-pink-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Disc Info & Equalizer */}
        <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
          {/* Animated Turntable Icon */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause DJ mix preview' : 'Play DJ mix preview'}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-600/50 scale-105'
                : 'bg-zinc-800 hover:bg-zinc-700 text-purple-400 border border-zinc-700'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
            )}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-30" />
            )}
          </button>

          {/* Track Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3" /> Live Sound Preview
              </span>
              <span className="text-xs text-zinc-500">{activeTrack.bpm} BPM</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white mt-1 leading-tight truncate">
              {activeTrack.name}
            </h4>
            <p className="text-xs text-zinc-400 truncate">{activeTrack.genre} • DJ Mantu Signature Mix</p>
          </div>
        </div>

        {/* Center: Equalizer Visualizer */}
        <div className="flex items-end gap-1.5 h-8 px-4 py-1 bg-zinc-950/60 rounded-xl border border-zinc-800 self-center md:self-auto">
          <div className={`w-1.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full ${isPlaying ? 'animate-eq-1' : 'h-2'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full ${isPlaying ? 'animate-eq-2' : 'h-3'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full ${isPlaying ? 'animate-eq-3' : 'h-1.5'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full ${isPlaying ? 'animate-eq-4' : 'h-4'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-pink-500 to-cyan-400 rounded-full ${isPlaying ? 'animate-eq-5' : 'h-2.5'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-purple-400 to-purple-600 rounded-full ${isPlaying ? 'animate-eq-2' : 'h-2'}`} />
          <div className={`w-1.5 bg-gradient-to-t from-cyan-400 to-pink-500 rounded-full ${isPlaying ? 'animate-eq-4' : 'h-3'}`} />
        </div>

        {/* Right: Style Selector Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTrack(t)}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTrack.id === t.id
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/60 shadow-sm'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {t.name.split(' ')[0]}
            </button>
          ))}

          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 ml-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
