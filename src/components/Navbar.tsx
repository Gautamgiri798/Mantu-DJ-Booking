'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Disc3, Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/SocialIcons';

interface NavbarProps {
  phone?: string;
  whatsapp?: string;
  djName?: string;
}

export default function Navbar({
  phone = '+91 6372174006',
  whatsapp = '+91 6372174006',
  djName = 'DJ MANTU',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Intelligent prefetching: Prime all primary navbar routes immediately into client cache
  useEffect(() => {
    const keyRoutes = ['/', '/about', '/services', '/gallery', '/availability', '/contact', '/book'];
    keyRoutes.forEach((route) => {
      try {
        router.prefetch(route);
      } catch {
        // Safe failover
      }
    });
  }, [router]);

  const handleWarmup = (href: string) => {
    try {
      router.prefetch(href);
    } catch {
      // Safe failover
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/availability', label: 'Check Date' },
    { href: '/contact', label: 'Contact' },
  ];

  const waLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I am interested in booking your DJ services for an upcoming event.`
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            prefetch={true}
            onMouseEnter={() => handleWarmup('/')}
            onTouchStart={() => handleWarmup('/')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-white/12 to-white/[0.02] p-[1px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-all duration-300">
              <div className="w-full h-full bg-[#0a0a10] rounded-[11px] flex items-center justify-center border border-white/[0.06] group-hover:border-violet-500/40 transition-colors">
                <Disc3 className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-[0.12em] text-white group-hover:text-violet-200 transition-colors leading-tight">
                {djName}
              </span>
              <span className="text-[9px] tracking-[0.24em] text-zinc-400 group-hover:text-zinc-300 uppercase font-semibold transition-colors mt-0.5">
                Event Acoustics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Floating Glass Capsule) */}
          <nav className="hidden lg:flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-zinc-950/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isAvailability = link.href === '/availability';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onMouseEnter={() => handleWarmup(link.href)}
                  onTouchStart={() => handleWarmup(link.href)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all duration-200 relative inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-[0_2px_12px_rgba(124,58,237,0.35),inset_0_1px_0_rgba(255,255,255,0.22)]'
                      : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isAvailability && (
                    <span className="relative flex h-1.5 w-1.5 shrink-0 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/book"
              prefetch={true}
              onMouseEnter={() => handleWarmup('/book')}
              onTouchStart={() => handleWarmup('/book')}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border border-violet-400/30 shadow-[0_2px_16px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_4px_22px_rgba(124,58,237,0.45)] transition-all duration-200 active:scale-[0.98]"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-violet-200" />
              <span>Book Event</span>
            </Link>

            {/* Quick Contact Mini-Capsule */}
            <div className="flex items-center p-1 rounded-full bg-zinc-950/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <a
                href={`tel:${phone}`}
                aria-label="Call DJ"
                title="Call DJ"
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <div className="w-[1px] h-3.5 bg-white/[0.08] mx-0.5" />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp DJ"
                title="WhatsApp DJ"
                className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/book"
              prefetch={true}
              onMouseEnter={() => handleWarmup('/book')}
              onTouchStart={() => handleWarmup('/book')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md active:scale-95 transition-transform border border-violet-400/30"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
              className="relative z-50 w-10 h-10 rounded-xl bg-zinc-900/80 border border-white/[0.08] text-zinc-200 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer touch-manipulation"
            >
              {isOpen ? <X className="w-5 h-5 pointer-events-none" /> : <Menu className="w-5 h-5 pointer-events-none" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {isOpen && (
        <>
          {/* Backdrop: Behind the header and drawer */}
          <div
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Drawer Menu: Elevated with z-50 */}
          <div className="lg:hidden relative z-50 bg-[#0c0c14]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onTouchStart={() => handleWarmup(link.href)}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between min-h-[44px] transition-colors ${
                      isActive
                        ? 'bg-violet-600/15 text-violet-300 border border-violet-500/30'
                        : 'text-zinc-200 hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.href === '/availability' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Check
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
              <Link
                href="/book"
                prefetch={true}
                onTouchStart={() => handleWarmup('/book')}
                onClick={() => setIsOpen(false)}
                className="w-full min-h-11 flex items-center justify-center rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-950/50 border border-violet-400/30 active:scale-98 transition-all"
              >
                Book Event Now
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-white/[0.08] text-zinc-200 min-h-[42px] active:bg-zinc-800"
                >
                  <Phone className="w-4 h-4 text-violet-400" />
                  <span>Call DJ</span>
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 min-h-[42px] active:bg-emerald-950/70"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}


