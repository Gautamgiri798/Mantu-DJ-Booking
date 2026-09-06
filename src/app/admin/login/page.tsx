'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Disc3, Lock, Mail, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface LoginResponse {
  success?: boolean;
  error?: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@djmantu.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      let data: LoginResponse | null = null;
      try {
        data = (await res.json()) as LoginResponse;
      } catch {
        // Non-JSON response
      }

      if (res.ok && data?.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data?.error || `Login failed (${res.status}). Please check your credentials.`);
        setLoading(false);
      }
    } catch {
      setError('An unexpected network error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-[2px] mx-auto shadow-lg shadow-purple-900/40">
            <div className="w-full h-full bg-[#08080C] rounded-[14px] flex items-center justify-center">
              <Disc3 className="w-7 h-7 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">DJ Owner Portal</h1>
          <p className="text-xs text-zinc-400">
            Manage bookings, calendar dates, packages & enquiries
          </p>
        </div>

        {/* Quick Credentials Info Badge */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-purple-300">Default Admin Credentials:</strong>
            Email: <code className="text-white">admin@djmantu.com</code> | Pass: <code className="text-white">admin123</code>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@djmantu.com"
                className="w-full pl-10 pr-4 py-3 min-h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-base sm:text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-4" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 min-h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-base sm:text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-4" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 min-h-12 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
