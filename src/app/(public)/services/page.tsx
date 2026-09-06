import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  ArrowRight,
  CalendarCheck,
  Phone,
} from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { getCachedServices, getWebsiteSettingsMap } from '@/lib/data';

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, settingsMap] = await Promise.all([
    getCachedServices(),
    getWebsiteSettingsMap(),
  ]);

  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const phone = settingsMap['phone'] || '+91 6372174006';
  const djName = settingsMap['dj_name'] || 'DJ Mantu';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
          Tailored Event Solutions
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Professional DJ & Production Services
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          From intimate birthday bashes to stadium-sized college festivals and royal wedding baraats, we provide comprehensive sound, light, and visual production.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((service, idx) => {
          let features: string[] = [];
          try {
            features = JSON.parse(service.features);
          } catch {
            features = [];
          }

          const isEven = idx % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.slug}
              className={`rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 flex flex-col ${
                isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-8 sm:gap-12 hover:border-purple-500/30 transition-all duration-300`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden relative shadow-2xl">
                <Image
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7'}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-900/90 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/40 backdrop-blur-md z-20">
                  {service.category}
                </span>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-5 text-left">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {service.title}
                  </h2>
                  <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-400 block">
                    What&apos;s Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-emerald-400 font-bold block">Details & Pricing</span>
                    <span className="text-base sm:text-lg font-extrabold text-white">
                      Contact for Full Details
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <a
                      href={createWhatsAppLink(
                        whatsapp,
                        `Hello ${djName}, I would like complete details and pricing for "${service.title}".`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 min-h-11 transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp for Details</span>
                    </a>

                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 min-h-11 transition-all"
                    >
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <span>Call for Details</span>
                    </a>

                    <Link
                      href={`/availability?eventType=${encodeURIComponent(service.title)}`}
                      className="px-3.5 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-medium flex items-center justify-center gap-1.5 min-h-11 transition-all"
                    >
                      <CalendarCheck className="w-4 h-4 text-purple-400" />
                      <span className="hidden sm:inline">Check Date</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Setup Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/40 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Need a Custom Combination or Arena Sound?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          We configure custom setups for large auditoriums, outdoor stadiums, and multi-day destination weddings.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950 transition-all hover:scale-105"
          >
            <span>Request Custom Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
