import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import NavigationProgressBar from '@/components/NavigationProgressBar';
import { getWebsiteSettingsMap } from '@/lib/data';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsMap = await getWebsiteSettingsMap();

  const djName = settingsMap['dj_name'] || 'DJ Mantu';
  const tagline = settingsMap['tagline'] || "Rourkela's Premier DJ & Event Sound Specialist";
  const phone = settingsMap['phone'] || '+91 6372174006';
  const whatsapp = settingsMap['whatsapp'] || '+91 6372174006';
  const address = settingsMap['address'] || 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216';

  return (
    <>
      <Suspense fallback={null}>
        <NavigationProgressBar />
      </Suspense>
      <Navbar djName={djName} phone={phone} whatsapp={whatsapp} />
      <main className="flex-1 pt-20">{children}</main>
      <FloatingWhatsApp whatsapp={whatsapp} djName={djName} />
      <Footer
        djName={djName}
        tagline={tagline}
        phone={phone}
        whatsapp={whatsapp}
        address={address}
      />
    </>
  );
}

