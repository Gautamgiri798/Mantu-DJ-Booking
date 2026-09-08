import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DJ Mantu database...');

  // 1. Admin Account
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@djmantu.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: 'Mantu (DJ Mantu)' },
    create: {
      email: adminEmail,
      name: 'Mantu (DJ Mantu)',
      passwordHash,
      role: 'OWNER',
    },
  });
  console.log(`Admin account ready: ${adminEmail} (password configured via .env)`);

  // 2. Website Settings
  const settings = [
    { key: 'dj_name', value: 'DJ Mantu' },
    { key: 'tagline', value: "Rourkela's Premier DJ & Event Sound Specialist" },
    { key: 'hero_title', value: 'Turn Every Moment Into An Unforgettable Memory' },
    {
      key: 'hero_subtitle',
      value:
        'Electrifying live DJ performances, arena-grade JBL sound, intelligent moving beam lights, and cinematic low-lying dry ice fog for Weddings, Receptions, Sangeets & Grand Parties.',
    },
    { key: 'phone', value: '+91 6372174006' },
    { key: 'whatsapp', value: '+91 6372174006' },
    { key: 'address', value: 'Brajrajnagar, Jharsuguda, Odisha, Pin - 768216' },
    {
      key: 'service_areas',
      value: 'Jharsuguda, Brajrajnagar, Sambalpur, Rourkela, Sundargarh, Bhubaneswar, Cuttack & across Western Odisha and entire Odisha',
    },
    { key: 'experience_years', value: '10+' },
    { key: 'events_completed', value: '650+' },
    { key: 'happy_clients', value: '1,200+' },
    { key: 'instagram', value: 'https://www.instagram.com/awaraboy458/' },
    { key: 'youtube', value: 'https://youtube.com/@djmantu' },
    {
      key: 'about_bio',
      value:
        'With over a decade of dominating festival stages, luxury destination weddings, and club dancefloors, DJ Mantu is recognized as one of Western Odisha’s premier open-format DJs. Specializing in high-energy Bollywood Dance Music (BDM), signature Sambalpuri beats, Commercial House, and dynamic retro transitions, Mantu delivers an unmatched acoustic experience that keeps guests dancing until the early morning.',
    },
    { key: 'booking_notice', value: 'Advance booking recommended 3-4 weeks prior during wedding seasons.' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 3. Services (All 14 Specialized Services)
  await prisma.service.deleteMany({});
  const services = [
    {
      title: 'Party DJ',
      slug: 'party-dj',
      category: 'Party',
      description:
        'High-voltage live beatmixing engineered for house parties, poolside bashes, rooftop jams, and private celebrations.',
      priceStarting: 15000,
      features: JSON.stringify([
        'Live Seamless Beatmixing',
        'Curated High-Energy Playlists',
        'Club-Grade Punchy Bass',
        'Synchronized Dance Lights',
      ]),
      iconName: 'Disc',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      order: 1,
    },
    {
      title: 'Reception / Wedding DJ',
      slug: 'reception-wedding-dj',
      category: 'Wedding',
      description:
        'Grand entry sound cues, warm background music during dinner, followed by an explosive celebration for family and friends.',
      priceStarting: 25000,
      features: JSON.stringify([
        'Grand Couple Entry Cues',
        'Cinematic Low Fog Cloud FX',
        'Family & Youth Dance Fusion',
        'Crystal-Clear Speech Audio',
      ]),
      iconName: 'HeartHandshake',
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
      order: 2,
    },
    {
      title: 'Birthday DJ',
      slug: 'birthday-dj',
      category: 'Birthday',
      description:
        'From sweet sixteens to 50th golden jubilees, music and lighting calibrated with hype MCing and crowd favorites.',
      priceStarting: 15000,
      features: JSON.stringify([
        'Cake-Cutting Fanfares',
        'Age-Matched Curated Tracks',
        'Interactive Crowd MCing',
        'Vibrant Laser & LED Strobes',
      ]),
      iconName: 'Flame',
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      order: 3,
    },
    {
      title: 'College / Farewell DJ',
      slug: 'college-farewell-dj',
      category: 'College',
      description:
        'Full festival-grade sonic production for college annual fests, freshers socials, and emotional graduation farewells.',
      priceStarting: 25000,
      features: JSON.stringify([
        'Arena Sub-Bass Punch',
        'Festival EDM & Desi Bass Drops',
        'Atmospheric Smoke & Haze FX',
        'Non-Stop High BPM Set',
      ]),
      iconName: 'GraduationCap',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
      order: 4,
    },
    {
      title: 'Club / Night Party DJ',
      slug: 'club-night-party-dj',
      category: 'Club',
      description:
        'Seamless harmonic transitions, underground techno rhythms, and prime-time commercial anthems crafted for nightlife venues.',
      priceStarting: 20000,
      features: JSON.stringify([
        'Seamless Harmonic Mixing',
        'Tech House & Commercial Hits',
        'Pioneer Nexus Pro Console Setup',
        'Dynamic Sound Modulation',
      ]),
      iconName: 'Disc',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
      order: 5,
    },
    {
      title: 'Baraat DJ',
      slug: 'baraat-dj',
      category: 'Baraat',
      description:
        'Mobile vehicle sound systems, wireless consoles, and non-stop energetic Sambalpuri & Bollywood tracks keeping the groom’s procession dancing.',
      priceStarting: 30000,
      features: JSON.stringify([
        'Mobile Vehicle Sound Rig',
        'Chest-Thumping Subwoofers',
        'Wireless Microphones & Mixers',
        'High-Intensity Street Strobes',
      ]),
      iconName: 'Volume2',
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
      order: 6,
    },
    {
      title: 'Sangeet DJ',
      slug: 'sangeet-dj',
      category: 'Wedding',
      description:
        'Specialized music programming for choreographies, family dance face-offs, energetic Sambalpuri beats, and late-night afterparty.',
      priceStarting: 25000,
      features: JSON.stringify([
        'Choreography Rehearsal Support',
        'Bespoke Family Entry Cuts',
        'High-Octane Dhol Beats',
        'Seamless Dancefloor Transitions',
      ]),
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      order: 7,
    },
    {
      title: 'Wedding DJ',
      slug: 'wedding-dj',
      category: 'Wedding',
      description:
        'From sacred phere ambient soundscapes to energetic dinner celebrations, full multi-ceremony audio coverage.',
      priceStarting: 30000,
      features: JSON.stringify([
        'Mandap & Phere Sacred Chants',
        'Royal Varmala Entry Music',
        'Intelligent Dynamic Lighting',
        'Dedicated Sound Technician',
      ]),
      iconName: 'HeartHandshake',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      order: 8,
    },
    {
      title: 'Anniversary DJ',
      slug: 'anniversary-dj',
      category: 'Party',
      description:
        'Romantic couple spotlights, golden-era retro classics, 90s/2000s Bollywood nostalgic tracks, and lively family dance music.',
      priceStarting: 15000,
      features: JSON.stringify([
        'Golden Era & Retro Bollywood',
        'Romantic Slow Dance Cues',
        'Custom Slide-Show Music Curation',
        'Warm Acoustic Balancing',
      ]),
      iconName: 'Heart',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
      order: 9,
    },
    {
      title: 'Private Party DJ',
      slug: 'private-party-dj',
      category: 'Party',
      description:
        'Compact yet devastatingly punchy Pioneer setups for private villas, farmhouses, terrace lounges, and VIP intimate gatherings.',
      priceStarting: 18000,
      features: JSON.stringify([
        'Compact High-Punch Sound',
        'Vibrant Mood & Uplighting',
        'Exclusive Bespoke Playlist',
        'Low-Key Compact Footprint',
      ]),
      iconName: 'Flame',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
      order: 10,
    },
    {
      title: 'Festival / Cultural Event DJ',
      slug: 'festival-cultural-event-dj',
      category: 'Festival',
      description:
        'Large-scale sound staging for Dandiya/Garba nights, Holi color fests, Durga Puja celebrations, and cultural carnivals.',
      priceStarting: 35000,
      features: JSON.stringify([
        'Heavy Touring Line Arrays',
        'Traditional & Synth Fusion',
        'Multi-Thousand Crowd Coverage',
        'High-Output Subwoofers',
      ]),
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
      order: 11,
    },
    {
      title: 'DJ + Live Performer',
      slug: 'dj-live-performer',
      category: 'Live',
      description:
        'Electrifying hybrid showcase pairing DJ Mantu with live dhol players, saxophonists, percussionists, or vocalists.',
      priceStarting: 35000,
      features: JSON.stringify([
        'Live Dhol & Percussion Sync',
        'Live Instrument Sound Mixing',
        'Interactive Stage Showmanship',
        'Unmatched Visual & Audio Energy',
      ]),
      iconName: 'Mic',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
      order: 12,
    },
    {
      title: 'DJ + Sound & Lighting',
      slug: 'dj-sound-lighting',
      category: 'Production',
      description:
        'Turnkey arena production: touring line arrays, computerized beam moving heads, LED walls, aluminum trussing, and atmospheric FX.',
      priceStarting: 45000,
      features: JSON.stringify([
        'Touring-Grade Truss Staging',
        'Moving Head Beam Lights',
        'Concert Audio Engineering',
        'Low Fog & Cold Pyro Sparks',
      ]),
      iconName: 'Sliders',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      order: 13,
    },
    {
      title: 'Corporate Event DJ',
      slug: 'corporate-event-dj',
      category: 'Corporate',
      description:
        'Sophisticated ambient cocktail jazz and dinner lounge beats transitioning into a high-octane corporate annual gala party.',
      priceStarting: 25000,
      features: JSON.stringify([
        'Podium & Speech Clarity Audio',
        'Lounge Cocktail Background Sets',
        'High-Energy Team Dancefloor',
        'Zero-Feedback Wireless Mics',
      ]),
      iconName: 'Briefcase',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
      order: 14,
    },
  ];

  for (const s of services) {
    await prisma.service.create({
      data: s,
    });
  }

  // 4. Packages
  const packages = [
    {
      name: 'Essential Party',
      slug: 'essential-party',
      price: 15000,
      durationHours: 4,
      description:
        'The ideal compact setup for birthday bashes, anniversary gatherings, and intimate private celebrations.',
      features: JSON.stringify([
        'Professional DJ Performance (Up to 4 Hours)',
        'Pioneer Pro DJ Console Setup',
        '2x High-Output JBL SRX Tops (Crystal Audio)',
        '1x 18" Powered Subwoofer for solid punch',
        '4x RGB LED Wash Lights',
        '2x Cordless Wireless Microphones',
        'On-site Sound Engineer & Quick Setup',
      ]),
      equipment: '2x JBL Tops, 1x 18" Sub, Pioneer Console, 4x LED Par Cans, 2x Mics',
      suitableFor: 'Birthdays, Anniversaries, Private Farmhouses (Up to 150 Guests)',
      isPopular: false,
      order: 1,
    },
    {
      name: 'Premium Club Vibe',
      slug: 'premium-club-vibe',
      price: 25000,
      durationHours: 5,
      description:
        'Transform any hall, lawn, or banquet into a high-octane club night with heavy bass and moving head beam lights.',
      features: JSON.stringify([
        '5 Hours of Electrifying Open-Format DJ Performance',
        '4x High-Definition Audio Tops (JBL/RCF)',
        '2x Dual 18" Subwoofers for chest-thumping bass',
        '4x Sharpy 10R Moving Head Beam Lights',
        'High-density Fog / Haze Machine with strobe effect',
        '2x Shure Digital Wireless Microphones',
        'Customized Entry Track & Curated Playlist',
      ]),
      equipment: '4x Tops, 2x Dual 18" Bass Subs, 4x Moving Heads, Fog Machine, Truss T-Bars, Shure Mics',
      suitableFor: 'Receptions, Sangeet, College Festivals, Large Parties (Up to 400 Guests)',
      isPopular: true,
      order: 2,
    },
    {
      name: 'Royal Wedding Extravaganza',
      slug: 'royal-wedding-extravaganza',
      price: 45000,
      durationHours: 7,
      description:
        'The definitive VIP package for grand weddings and sangeets featuring arena sound, moving beams, and fairy-tale low fog.',
      features: JSON.stringify([
        'Full Evening DJ Set (Up to 7 Hours coverage)',
        'Concert Line-Array Speaker System + 4x 18" Mega Subwoofers',
        '8x Sharpy Moving Head Lights with custom DMX light show',
        'Dry Ice Low-Lying Cloud Fog Machine for Royal Couple Entry',
        '4x Cold Pyro Sparkular Fountains (Indoor/Outdoor safe)',
        'Heavy-duty Box Aluminum Truss Structure',
        'Dedicated Sound Engineer & Lighting Technician',
        'Custom Soundtracks for Bridal Entry & Ring Ceremony',
      ]),
      equipment: 'Concert Line Array, 4x Mega Subs, 8x Sharpy Beams, Dry Ice Low Fog, 4x Cold Pyro, Full Box Truss',
      suitableFor: 'Grand Weddings, Destination Celebrations, Mega Sangeets (500+ Guests)',
      isPopular: false,
      order: 3,
    },
    {
      name: 'Custom Arena / Mega Festival',
      slug: 'custom-arena-festival',
      price: 75000,
      durationHours: 8,
      description:
        'All-out stadium festival experience with massive P3 LED wall, laser show, live anchor, and concert line-array sound.',
      features: JSON.stringify([
        'Full Day / Multi-Segment DJ Performance',
        'Large P3 High-Definition LED Video Backdrop Wall',
        'Festival Line Array Sound System with Dual Amp Racks',
        '12x Moving Head Beams + Programmable Multi-Color Laser',
        'CO2 Cryo Jet Cannons & 6x Cold Pyro Spark Machines',
        'Professional Emcee / Anchor for crowd games and hosting',
        'Complete Stage Trussing & Power Distribution Management',
      ]),
      equipment: 'P3 LED Wall, Festival Line Array, 12x Sharpy Beams, Lasers, CO2 Jets, 6x Cold Pyro, Live Anchor',
      suitableFor: 'Corporate Annual Meets, College Fests, Mega Concerts (1,000+ Attendees)',
      isPopular: false,
      order: 4,
    },
  ];

  for (const p of packages) {
    await prisma.package.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 5. Gallery Items
  const galleryItems = [
    {
      title: 'Electrifying Sangeet Night Dance Floor',
      category: 'Weddings',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-08-15',
      location: 'Mayfair World Cup Village, Rourkela',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Royal Couple Entry with Dry Ice Cloud Fog',
      category: 'Weddings',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-08-02',
      location: 'Hotel Radhika Regency, Rourkela',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'College Annual Fest Rave & EDM Night',
      category: 'Parties',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-07-28',
      location: 'NIT Rourkela Open Air Theatre',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Grand Wedding Reception Lighting & Setup',
      category: 'Receptions',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-07-12',
      location: 'Civic Centre Banquet, Rourkela',
      isFeatured: true,
      order: 4,
    },
    {
      title: 'Corporate Annual Gala & Awards Night',
      category: 'Corporate',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-06-25',
      location: 'SAIL Rourkela Steel Plant Club',
      isFeatured: true,
      order: 5,
    },
    {
      title: 'Intense Moving Head Light Beam Show',
      category: 'Parties',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-06-18',
      location: 'Panposh Farmhouse, Rourkela',
      isFeatured: true,
      order: 6,
    },
    {
      title: 'VIP 25th Silver Jubilee Anniversary Party',
      category: 'Birthdays',
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-05-30',
      location: 'Hotel The Central Park, Rourkela',
      isFeatured: false,
      order: 7,
    },
    {
      title: 'Pioneer DJ Console In Action',
      category: 'Parties',
      imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
      eventDate: '2026-05-14',
      location: 'Koel River Resort, Rourkela',
      isFeatured: false,
      order: 8,
    },
  ];

  await prisma.galleryItem.deleteMany({});
  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }

  // 6. Video Items
  const videoItems = [
    {
      title: 'Live Wedding Reception Sangeet Drop - Rourkela',
      eventType: 'Wedding Reception',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      duration: '3:45',
      order: 1,
    },
    {
      title: 'Massive Crowd Energy at NIT Fest EDM Night',
      eventType: 'College Fest',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      duration: '4:12',
      order: 2,
    },
    {
      title: 'Dry Ice Low Fog Cloud + Sparkular Entry Teaser',
      eventType: 'Bridal Entry',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      duration: '2:15',
      order: 3,
    },
  ];

  await prisma.videoItem.deleteMany({});
  for (const v of videoItems) {
    await prisma.videoItem.create({ data: v });
  }

  // 7. Verified Reviews
  const reviews = [
    {
      customerName: 'Rahul & Priya Verma',
      eventType: 'Wedding Reception',
      rating: 5,
      comment:
        'DJ Mantu made our wedding reception legendary! The sound quality was crystal clear and the dry ice low fog for our first dance looked straight out of a Bollywood fairytale. Every single guest was on their feet until 1 AM!',
      eventDate: 'August 2026',
      isPublished: true,
      order: 1,
    },
    {
      customerName: 'Amitesh Pattnaik',
      eventType: 'Sangeet Ceremony',
      rating: 5,
      comment:
        'Hands down the best DJ in Rourkela! His ability to read the crowd is incredible. He blended 90s classic Bollywood with high-tempo Punjabi beats that had both the elders and the youth going wild. Super professional setup and on-time sound check.',
      eventDate: 'July 2026',
      isPublished: true,
      order: 2,
    },
    {
      customerName: 'Dr. Sneha Mohanty',
      eventType: '30th Birthday Bash',
      rating: 5,
      comment:
        'Booked the Essential Party package for my birthday at a farmhouse. The bass was punchy, lighting created an instant nightclub atmosphere, and Mantu played all our favorite requested tracks. 10/10 recommend!',
      eventDate: 'June 2026',
      isPublished: true,
      order: 3,
    },
    {
      customerName: 'Vikramaditya Rao',
      eventType: 'Corporate Annual Gala',
      rating: 5,
      comment:
        'We hired DJ Mantu for our company’s annual celebration at Mayfair. Highly disciplined, respectful of corporate guidelines during early dinner hours, and transitioned into an electric dance celebration later on. Will book again every year.',
      eventDate: 'May 2026',
      isPublished: true,
      order: 4,
    },
  ];

  await prisma.review.deleteMany({});
  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  // 8. Sample Bookings & Availability Entries
  const existingCustomer = await prisma.customer.create({
    data: {
      name: 'Sunil Kumar Dash',
      phone: '+91 94370 11223',
      email: 'sunil.dash@gmail.com',
      whatsapp: '+91 94370 11223',
      notes: 'VIP client, referred by Mayfair banquet manager',
    },
  });

  const weddingPackage = await prisma.package.findFirst({ where: { slug: 'royal-wedding-extravaganza' } });
  const premiumPackage = await prisma.package.findFirst({ where: { slug: 'premium-club-vibe' } });

  // Confirmed booking for 2026-09-20 (matches PRD example: Reception 20 September 2026)
  const booking1 = await prisma.booking.create({
    data: {
      bookingCode: 'DJ-2026-001',
      customerId: existingCustomer.id,
      eventType: 'Reception',
      eventDate: new Date('2026-09-20T19:00:00Z'),
      dateString: '2026-09-20',
      startTime: '19:00',
      endTime: '23:30',
      venue: 'Hotel Radhika Regency Banquet',
      city: 'Rourkela',
      guestCount: 350,
      budgetRange: '₹30,000 - ₹45,000',
      status: 'CONFIRMED',
      packageId: weddingPackage?.id,
      services: JSON.stringify(['DJ Performance', 'Concert Sound System', 'Intelligent Moving Head Lights', 'Dry Ice Low Fog']),
      totalAmount: 45000,
      customerNotes: 'Need couple entry romantic track with dry ice fog at 8:15 PM sharp.',
      adminNotes: 'Advance ₹15,000 received via UPI. Sound check scheduled at 4:30 PM.',
    },
  });

  // Availability entries
  await prisma.availability.upsert({
    where: { date: '2026-09-20' },
    update: { status: 'BOOKED', reason: 'Wedding Reception - Sunil Dash', bookingId: booking1.id },
    create: { date: '2026-09-20', status: 'BOOKED', reason: 'Wedding Reception - Sunil Dash', bookingId: booking1.id },
  });

  // Pending booking for 2026-09-24 (matches PRD example: Amit Birthday)
  const customer2 = await prisma.customer.create({
    data: {
      name: 'Amit Sharma',
      phone: '+91 97780 44556',
      email: 'amit.sharma99@outlook.com',
      whatsapp: '+91 97780 44556',
      notes: 'New enquiry through website form',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      bookingCode: 'DJ-2026-002',
      customerId: customer2.id,
      eventType: 'Birthday Party',
      eventDate: new Date('2026-09-24T18:30:00Z'),
      dateString: '2026-09-24',
      startTime: '18:30',
      endTime: '22:30',
      venue: 'Koel View Club Lawn',
      city: 'Rourkela',
      guestCount: 120,
      budgetRange: '₹20,000 - ₹30,000',
      status: 'PENDING',
      packageId: premiumPackage?.id,
      services: JSON.stringify(['DJ Performance', 'Party Lighting', 'Fog Machine']),
      totalAmount: 25000,
      customerNotes: '25th Birthday celebration. Lots of Punjabi and 2010s club dance hits required.',
    },
  });

  await prisma.availability.upsert({
    where: { date: '2026-09-24' },
    update: { status: 'PENDING', reason: 'Enquiry Pending - Amit Sharma', bookingId: booking2.id },
    create: { date: '2026-09-24', status: 'PENDING', reason: 'Enquiry Pending - Amit Sharma', bookingId: booking2.id },
  });

  // Blocked date for 2026-10-02 (Gandhi Jayanti / Personal Maintenance)
  await prisma.availability.upsert({
    where: { date: '2026-10-02' },
    update: { status: 'BLOCKED', reason: 'Equipment Maintenance & Upgrades' },
    create: { date: '2026-10-02', status: 'BLOCKED', reason: 'Equipment Maintenance & Upgrades' },
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
