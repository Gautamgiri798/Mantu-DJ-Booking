'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/videos', label: 'Videos' },
    { href: '/availability', label: 'Check Date' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  const waLink = createWhatsAppLink(
    whatsapp,
    `Hello ${djName}, I am interested in booking your DJ services for an upcoming event.`
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-900/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#08080C] rounded-[10px] flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
                {djName}
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 uppercase font-bold -mt-1">
                Event Acoustics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/40">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/80 to-pink-600/80 shadow-md shadow-purple-950'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.href === '/availability' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/book"
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-950 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Event</span>
            </Link>

            <a
              href={`tel:${phone}`}
              aria-label="Call DJ"
              className="p-2.5 rounded-xl glass-panel border border-white/10 text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp DJ"
              className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/book"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl glass-panel text-zinc-200 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 mt-2 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.href === '/availability' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Check
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950"
            >
              Book Event Now
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200"
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <span>Call DJ</span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-emerald-950/40 border border-emerald-800/40 text-emerald-300"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
