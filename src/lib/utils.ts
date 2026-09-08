import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStringOrDate: string | Date | null | undefined): string {
  if (!dateStringOrDate) return 'N/A';
  const d = new Date(dateStringOrDate);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function createWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // Default to 91 if 10 digits
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
}

export const EVENT_CATEGORIES = [
  'Party DJ',
  'Reception / Wedding DJ',
  'Birthday DJ',
  'College / Farewell DJ',
  'Club / Night Party DJ',
  'Corporate Event DJ',
  'Sangeet DJ',
  'Wedding DJ',
  'Anniversary DJ',
  'Private Party DJ',
  'Festival / Cultural Event DJ',
  'DJ + Live Performer',
  'DJ + Sound & Lighting',
  'Baraat DJ',
  'Wedding',
  'Reception',
  'Private Celebration',
] as const;

export const BOOKING_STATUSES = [
  { value: 'PENDING', label: 'Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { value: 'COMPLETED', label: 'Completed', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40' },
] as const;
