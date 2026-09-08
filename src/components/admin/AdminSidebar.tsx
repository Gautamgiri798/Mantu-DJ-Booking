'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck,
  Users,
  Layers,
  Image as ImageIcon,
  Settings,
  LogOut,
  Disc3,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  adminName: string;
  adminEmail: string;
  pendingCount?: number;
}

export default function AdminSidebar({
  adminName,
  adminEmail,
  pendingCount = 0,
}: AdminSidebarProps) {
  const cleanAdminName = (adminName || '').replace(/\bKumar\b\s*/gi, '').trim() || 'DJ Mantu';
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    {
      href: '/admin/bookings',
      label: 'Bookings',
      icon: CalendarCheck,
      badge: pendingCount > 0 ? `${pendingCount} new` : undefined,
    },
    { href: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/services', label: 'Services', icon: Layers },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/admin/settings', label: 'Website Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const navLinksContent = (
    <div className="flex flex-col justify-between h-full py-5 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] space-y-6">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-[#08080C] rounded-[10px] flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <span className="text-base font-extrabold text-white block leading-none">
                DJ Mantu
              </span>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Admin Console
              </span>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            title="View live site"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-white border border-purple-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="pt-4 border-t border-zinc-800 space-y-3">
        <div className="px-2">
          <p className="text-xs font-bold text-white truncate">{cleanAdminName}</p>
          <p className="text-[11px] text-zinc-500 truncate">{adminEmail}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 bg-[#0c0c12] border-r border-zinc-800/80 z-30">
        {navLinksContent}
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-[#0c0c12] border-b border-zinc-800 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <Disc3 className="w-5 h-5 text-purple-400" />
          <span className="font-extrabold text-sm text-white">DJ Mantu Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 top-[calc(3.5rem+env(safe-area-inset-top,0px))] bg-black/70 backdrop-blur-sm z-30 animate-in fade-in duration-200"
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-y-0 left-0 top-[calc(3.5rem+env(safe-area-inset-top,0px))] w-72 max-w-[85vw] bg-[#0c0c12] border-r border-zinc-800 z-40 overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom,0px))] animate-in slide-in-from-left duration-250 shadow-2xl">
            {navLinksContent}
          </div>
        </>
      )}
    </>
  );
}
