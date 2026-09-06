import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08080C',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'DJ Mantu | Premier Wedding, Reception & Event DJ in Rourkela',
  description:
    'Turn every moment into an unforgettable memory. High-energy live DJ sets, arena sound systems, intelligent beam lighting, and dry ice low fog for Weddings, Receptions & Parties in Rourkela and Eastern India.',
  keywords: [
    'DJ in Rourkela',
    'Wedding DJ in Rourkela',
    'Reception DJ in Rourkela',
    'Party DJ in Rourkela',
    'Birthday DJ in Rourkela',
    'Best DJ in Rourkela',
    'DJ booking Rourkela',
    'DJ Mantu',
    'Event Sound System Rourkela',
  ],
  metadataBase: new URL('http://localhost:3000'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DJ Mantu',
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'DJ Mantu | Premier Event DJ in Rourkela',
    description:
      'Turn every moment into an unforgettable memory. High-energy live DJ sets and concert sound for weddings, receptions, and parties.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'DJ Mantu Official',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#08080C] text-white" suppressHydrationWarning>
      <head>
        {/* JSON-LD LocalBusiness & EntertainmentBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EntertainmentBusiness',
              name: 'DJ Mantu',
              image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
              '@id': 'http://localhost:3000',
              url: 'http://localhost:3000',
              telephone: '+916372174006',
              priceRange: '₹15,000 - ₹75,000',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Brajrajnagar',
                addressLocality: 'Jharsuguda',
                addressRegion: 'Odisha',
                postalCode: '768216',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 22.2604,
                longitude: 84.8536,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '23:00',
              },
              sameAs: [
                'https://instagram.com/djmantu_official',
                'https://youtube.com/@djmantu',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#08080C] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-purple-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
