import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getWebsiteSettingsMap } from '@/lib/data';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const phone = settingsMap['phone'] || '+91 98610 98765';
  const whatsapp = settingsMap['whatsapp'] || '+91 9337828746';
  const email = settingsMap['email'] || 'bookings@djmantu.com';
  const address = settingsMap['address'] || 'Brajrajnagar, Jharsuguda, Odisha 768216';
  const serviceAreas =
    settingsMap['service_areas'] ||
    'Rourkela, Sundargarh, Sambalpur, Jharsuguda, Bhubaneswar, Cuttack & all western India';

  return (
    <>
      <Navbar djName={djName} phone={phone} whatsapp={whatsapp} />
      <main className="flex-1 pt-20">{children}</main>
      <FloatingWhatsApp whatsapp={whatsapp} djName={djName} />
      <Footer
        djName={djName}
        phone={phone}
        whatsapp={whatsapp}
        email={email}
        address={address}
        serviceAreas={serviceAreas}
      />
    </>
  );
}
