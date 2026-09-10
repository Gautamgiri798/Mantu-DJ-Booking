import React from 'react';
import Link from 'next/link';
import { Disc3, Phone, MapPin, MessageSquare, Lock } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/SocialIcons';
import { createWhatsAppLink } from '@/lib/utils';

interface FooterProps {
  djName?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export default function Footer({
  djName = 'DJ Mantu',
  tagline = "Brajrajnagar's Premium DJ & Event Sound Specialist",
  phone = '+91 9337828746',
  whatsapp = '+91 9337828746',
  address = 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216',
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const waLink = createWhatsAppLink(whatsapp, `Hello ${djName}, I want to enquire about DJ booking.`);

  return (
    <footer className="bg-[#050508] border-t border-zinc-800/80 pt-16 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#08080C] rounded-[10px] flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-wider text-white block leading-none">
                  {djName}
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-cyan-400 block mt-0.5">
                  {tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              Western Odisha’s premier open-format DJ and live event sound specialist. Specializing in high-energy Bollywood Dance Music (BDM), signature Sambalpuri beats, royal weddings, sangeets, and arena concert experiences.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/awaraboy458/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">
                  About the DJ
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-purple-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-purple-400 transition-colors">
                  Event Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                  Contact & Bookings
                </Link>
              </li>
              <li>
                <Link href="/availability" className="text-emerald-400 hover:underline">
                  Check Date Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Service Areas */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
            <p className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </p>
            <p className="flex items-start gap-2.5">
              <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp: {whatsapp}
              </a>
            </p>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} {djName}. All Rights Reserved. Crafted for unforgettable celebrations.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">
              Terms of Booking
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-zinc-500 hover:text-purple-400 transition-colors group"
            >
              <Lock className="w-3.5 h-3.5 group-hover:text-purple-400" />
              <span>DJ Owner Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
