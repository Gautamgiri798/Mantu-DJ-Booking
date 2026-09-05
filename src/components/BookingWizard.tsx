'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Calendar,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { EVENT_CATEGORIES, formatCurrency, createWhatsAppLink } from '@/lib/utils';
import { PackageData } from '@/components/PackageCard';

interface BookingWizardProps {
  packages: PackageData[];
  whatsappNumber?: string;
  djName?: string;
}

const AVAILABLE_SERVICES = [
  { id: 'dj_performance', label: 'Pro DJ Live Performance' },
  { id: 'club_sound', label: 'Heavy Bass Sound System (JBL/RCF)' },
  { id: 'moving_heads', label: 'Sharpy Moving Head Beam Lights' },
  { id: 'dry_ice_fog', label: 'Dry Ice Low-Lying Cloud Fog (Couple Entry)' },
  { id: 'cold_pyro', label: 'Cold Pyro Sparkular Fountains (Indoor safe)' },
  { id: 'led_wall', label: 'P3 High-Res LED Backdrop Wall' },
  { id: 'wireless_mics', label: 'Shure Cordless Wireless Microphones' },
  { id: 'live_anchor', label: 'Live Emcee / Anchor for Crowd Games' },
];

const BUDGET_TIERS = [
  '₹15,000 – ₹25,000 (Party / Small Gathering)',
  '₹25,000 – ₹45,000 (Club Vibe / Reception)',
  '₹45,000 – ₹75,000 (Royal Wedding / Sangeet)',
  '₹75,000+ (Grand Arena Festival)',
  'Custom Budget / Need Consultation',
];

function BookingWizardContent({ packages, whatsappNumber = '+91 6372174006', djName = 'DJ Mantu' }: BookingWizardProps) {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedData, setConfirmedData] = useState<{
    bookingCode: string;
    customerName: string;
    eventDate: string;
    eventType: string;
    venue: string;
    city: string;
  } | null>(null);

  // Form State initialized directly with query params to avoid re-renders
  const [formData, setFormData] = useState(() => {
    const urlDate = searchParams.get('date');
    const urlType = searchParams.get('eventType');
    const urlCity = searchParams.get('city');
    const urlPkg = searchParams.get('package');

    return {
      name: '',
      phone: '',
      email: '',
      whatsapp: '',
      eventType: urlType || 'Wedding Reception',
      eventDate: urlDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      startTime: '19:00',
      endTime: '23:30',
      venue: '',
      city: urlCity || 'Rourkela',
      guestCount: '250',
      packageId: urlPkg || '',
      selectedServices: ['dj_performance', 'club_sound', 'moving_heads'],
      budgetRange: BUDGET_TIERS[1],
      customerNotes: '',
    };
  });

  const toggleService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== serviceId)
          : [...prev.selectedServices, serviceId],
      };
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        alert('Please provide your name and phone number.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.eventDate || !formData.venue.trim()) {
        alert('Please provide your event date and venue details.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: formData.selectedServices.map(
            (id) => AVAILABLE_SERVICES.find((s) => s.id === id)?.label || id
          ),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmedData({
          bookingCode: data.bookingCode,
          customerName: data.customerName,
          eventDate: data.eventDate,
          eventType: data.eventType,
          venue: data.venue,
          city: data.city,
        });

        // Trigger celebratory confetti!
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#8B5CF6', '#EC4899', '#22D3EE', '#F59E0B'],
          });
        } catch {
          // ignore if canvas-confetti fails in test environment
        }
      } else {
        alert(data.error || 'Failed to submit booking');
      }
    } catch {
      alert('An error occurred during submission. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  // If Confirmed
  if (confirmedData) {
    const waText = `Hello ${djName}, I just submitted a booking request on your website! 
Booking ID: ${confirmedData.bookingCode}
Event: ${confirmedData.eventType}
Date: ${confirmedData.eventDate}
Venue: ${confirmedData.venue}, ${confirmedData.city}
Please confirm availability and discuss next steps.`;

    const waLink = createWhatsAppLink(whatsappNumber, waText);

    return (
      <div className="max-w-2xl mx-auto rounded-3xl glass-panel border border-emerald-500/40 p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Booking Request Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
            🎉 You&apos;re One Step Closer to an Unforgettable Event!
          </h2>
          <p className="text-sm text-zinc-300 mt-2 max-w-md mx-auto">
            Your request has been routed directly to {djName}. Your official booking reservation tracking code is:
          </p>
        </div>

        {/* Booking Card */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-xs text-zinc-400">Booking Reference</span>
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {confirmedData.bookingCode}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-zinc-500 block">Host Name</span>
              <span className="font-semibold text-zinc-200">{confirmedData.customerName}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Event Type</span>
              <span className="font-semibold text-purple-300">{confirmedData.eventType}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Event Date</span>
              <span className="font-semibold text-zinc-200">{confirmedData.eventDate}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Location</span>
              <span className="font-semibold text-zinc-200">
                {confirmedData.venue}, {confirmedData.city}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Continue on WhatsApp with Booking ID</span>
          </a>

          <p className="text-xs text-zinc-400">
            {djName} will also reach out to you directly via phone / WhatsApp at{' '}
            <strong className="text-white">{formData.phone}</strong> within a few hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 shadow-2xl">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
          <span className={step >= 1 ? 'text-purple-400' : 'text-zinc-500'}>1. Contact</span>
          <span className={step >= 2 ? 'text-purple-400' : 'text-zinc-500'}>2. Event</span>
          <span className={step >= 3 ? 'text-purple-400' : 'text-zinc-500'}>3. Services</span>
          <span className={step >= 4 ? 'text-purple-400' : 'text-zinc-500'}>4. Review</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" /> Host Contact Information
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Where should DJ Mantu send quotes, booking contracts, and audio previews?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  WhatsApp Number (if different)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" /> Event Schedule & Location
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Tell us about the celebration venue, date, and timings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Event Type <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Event Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Venue Name & Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hotel Radhika Regency Banquet Hall"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">City / Region</label>
                <input
                  type="text"
                  placeholder="e.g. Rourkela"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Expected Guests</label>
                <input
                  type="number"
                  placeholder="e.g. 300"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Packages & Services */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Choose Package & Services
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Select a base package (optional) or customize your preferred gear & effects.
              </p>
            </div>

            {/* Base Package Selector */}
            {packages && packages.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Select Base Package (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, packageId: '' })}
                    className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                      !formData.packageId
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">Custom Setup Only</span>
                    <span className="text-[11px] text-zinc-500">Pick individual services below</span>
                  </div>

                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setFormData({ ...formData, packageId: pkg.id })}
                      className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                        formData.packageId === pkg.id
                          ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pkg.name}</span>
                        <span className="text-xs font-extrabold text-purple-300">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500 block mt-0.5">
                        {pkg.durationHours} hrs • {pkg.suitableFor.split('(')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Services Checkboxes */}
            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Included / Add-On Services
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVAILABLE_SERVICES.map((s) => {
                  const isChecked = formData.selectedServices.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-3 rounded-xl cursor-pointer border flex items-center gap-3 transition-all ${
                        isChecked
                          ? 'bg-purple-500/10 border-purple-500/50 text-white'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                          isChecked
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'border-zinc-700 bg-zinc-800'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>
                      <span className="text-xs font-medium">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Review */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" /> Budget & Special Requirements
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Final step: Tell us your approximate budget and any song or entry preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Expected Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {BUDGET_TIERS.map((tier) => (
                    <option key={tier} value={tier}>{tier}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Special Notes or Song Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Specific bridal entry track, groom baraat preferences, low fog timing, language preferences (Hindi, Punjabi, Odia, English)..."
                  value={formData.customerNotes}
                  onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Booking Summary Card */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs space-y-2">
                <span className="font-bold text-purple-300 uppercase tracking-wider block">
                  Quick Verification Summary:
                </span>
                <p className="text-zinc-300">
                  <strong>Host:</strong> {formData.name} ({formData.phone})
                </p>
                <p className="text-zinc-300">
                  <strong>Event:</strong> {formData.eventType} on <strong>{formData.eventDate}</strong> at{' '}
                  {formData.venue}, {formData.city} ({formData.guestCount} guests)
                </p>
                <p className="text-zinc-300">
                  <strong>Selected Services:</strong> {formData.selectedServices.length} items chosen
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-950"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-950/80 transition-all hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking Request</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function BookingWizard(props: BookingWizardProps) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-zinc-400">Loading booking wizard...</div>}>
      <BookingWizardContent {...props} />
    </Suspense>
  );
}
