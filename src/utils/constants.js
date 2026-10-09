export const ADMIN_NAME = 'Admin';
export const HALL_NAME = 'Elite Hall';
export const APP_NAME = 'Elite Hall Booking System';

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

export const PAYMENT_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  REFUNDED: 'Refunded',
  FAILED: 'Failed',
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// 8-Stage Booking Lifecycle Stages
export const LIFECYCLE_STAGES = [
  { step: 1, key: 'requested', label: 'Booking Requested', desc: 'Reservation inquiry submitted by client' },
  { step: 2, key: 'pending', label: 'Pending Approval', desc: 'Awaiting venue manager review' },
  { step: 3, key: 'approved', label: 'Approved', desc: 'Reservation approved by Admin' },
  { step: 4, key: 'payment_pending', label: 'Payment Pending', desc: 'Payment checkout link active' },
  { step: 5, key: 'payment_completed', label: 'Payment Completed', desc: 'Payment received & verified' },
  { step: 6, key: 'event_upcoming', label: 'Event Upcoming', desc: 'Hall prepped & venue team ready' },
  { step: 7, key: 'checked_in', label: 'Checked In', desc: 'Client & guests scanned at gate' },
  { step: 8, key: 'completed', label: 'Event Completed', desc: 'Event successfully concluded' }
];

// 12 100% Distinct & Unique Event Categories
export const HALL_CATEGORIES = [
  {
    id: 'cat-marriage',
    title: 'Marriage Hall',
    slug: 'marriage-hall',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    description: 'Grand royal wedding hall with ornate mandap setups, luxury chandeliers, and spacious dining.',
    capacity: '500 - 1500 Guests',
    priceStarting: 35000,
    tag: 'Weddings & Marriages'
  },
  {
    id: 'cat-baby-shower',
    title: 'Baby Shower Hall',
    slug: 'baby-shower-hall',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    description: 'Charming, pastel-themed intimate celebration venue designed for baby shower ceremonies.',
    capacity: '100 - 300 Guests',
    priceStarting: 14000,
    tag: 'Family & Blessing'
  },
  {
    id: 'cat-birthday',
    title: 'Birthday Party Hall',
    slug: 'birthday-party-hall',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
    description: 'Vibrant celebration space with LED mood lighting, DJ sound setup, and party decorations.',
    capacity: '150 - 400 Guests',
    priceStarting: 16000,
    tag: 'Parties & Milestones'
  },
  {
    id: 'cat-graduation',
    title: 'Graduation Hall',
    slug: 'graduation-hall',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    description: 'Spacious auditorium-style hall with stage, podium, and HD presentation systems for convocations.',
    capacity: '400 - 1000 Guests',
    priceStarting: 22000,
    tag: 'Academic & Honor'
  },
  {
    id: 'cat-corporate',
    title: 'Corporate Event Hall',
    slug: 'corporate-event-hall',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    description: 'Professional convention center equipped for product launches, summits, and annual meets.',
    capacity: '300 - 800 Guests',
    priceStarting: 28000,
    tag: 'Business & Summits'
  },
  {
    id: 'cat-engagement',
    title: 'Engagement Hall',
    slug: 'engagement-hall',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant floral ring ceremony hall with luxury seating and specialized photo backdrop setups.',
    capacity: '200 - 500 Guests',
    priceStarting: 18000,
    tag: 'Pre-Wedding Ceremonies'
  },
  {
    id: 'cat-reception',
    title: 'Reception Hall',
    slug: 'reception-hall',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800',
    description: 'Opulent banquet ballroom for grand evening wedding receptions and formal dinner galas.',
    capacity: '500 - 1200 Guests',
    priceStarting: 30000,
    tag: 'Grand Galas'
  },
  {
    id: 'cat-anniversary',
    title: 'Anniversary Hall',
    slug: 'anniversary-hall',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800',
    description: 'Sophisticated warm-lit banquet suite for romantic milestone anniversary celebrations.',
    capacity: '150 - 350 Guests',
    priceStarting: 17000,
    tag: 'Milestone Celebrations'
  },
  {
    id: 'cat-naming-ceremony',
    title: 'Naming Ceremony Hall',
    slug: 'naming-ceremony-hall',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    description: 'Warm traditional hall for Namakaran and traditional baby naming ceremonies.',
    capacity: '100 - 300 Guests',
    priceStarting: 15000,
    tag: 'Traditional Rituals'
  },
  {
    id: 'cat-party-celebration',
    title: 'Party & Celebration Hall',
    slug: 'party-celebration-hall',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    description: 'High-energy celebration space with dance floor, surround sound, and bar counter space.',
    capacity: '200 - 600 Guests',
    priceStarting: 20000,
    tag: 'Social Events'
  },
  {
    id: 'cat-seminar-conference',
    title: 'Seminar & Conference Hall',
    slug: 'seminar-conference-hall',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    description: 'Tiered acoustic conference hall with dual projection screens and wireless microphone arrays.',
    capacity: '250 - 500 Guests',
    priceStarting: 24000,
    tag: 'Conferences & Tech'
  },
  {
    id: 'cat-meeting-workshop',
    title: 'Meeting & Workshop Hall',
    slug: 'meeting-workshop-hall',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    description: 'Interactive workshop room with flexible seating, high-speed Wi-Fi, and smart whiteboard tech.',
    capacity: '50 - 200 Guests',
    priceStarting: 12000,
    tag: 'Workshops & Training'
  }
];

export const MOCK_HALLS = [
  {
    id: 'hall-1',
    name: 'Elite Hall - Grand Ballroom',
    slug: 'elite-hall-grand-ballroom',
    capacity: 1000,
    pricePerDay: 25000,
    pricePerHour: 3000,
    location: 'Tower A, 5th Floor, Main Central Avenue, City Center',
    description: 'The flagship Elite Hall Grand Ballroom boasts high ceilings, crystal chandeliers, state-of-the-art audiovisual setups, and flexible seating layouts perfect for grand weddings, galas, and corporate conventions.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 128,
    amenities: [
      'Central Air Conditioning',
      'Stage & Premium Lighting',
      'High-Speed Wi-Fi',
      'VIP Lounge & Green Room',
      'In-house Catering',
      'Valet Parking',
      'HD Projectors & Sound System',
      'Full Generator Backup'
    ],
    specs: {
      areaSqFt: 12000,
      parkingCapacity: 300,
      diningCapacity: 600,
      stageDimensions: '40ft x 20ft'
    },
    status: 'Available',
    featured: true
  },
  {
    id: 'hall-2',
    name: 'Elite Hall - Executive Suite',
    slug: 'elite-hall-executive-suite',
    capacity: 350,
    pricePerDay: 15000,
    pricePerHour: 2000,
    location: 'Tower B, 2nd Floor, Corporate Hub, Downtown',
    description: 'Sophisticated and modern, Elite Hall Executive Suite is tailored for corporate summits, product launches, executive seminars, and intimate celebrations with premium seating and smart tech integration.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 94,
    amenities: [
      'Smart Conference System',
      'High-Speed Wi-Fi',
      'Central AC',
      'Private Dining Area',
      'Video Conferencing',
      'Podium & Wireless Mics',
      'Dedicated Tech Support'
    ],
    specs: {
      areaSqFt: 5500,
      parkingCapacity: 120,
      diningCapacity: 200,
      stageDimensions: '24ft x 12ft'
    },
    status: 'Available',
    featured: true
  },
  {
    id: 'hall-3',
    name: 'Elite Hall - Royal Garden Pavilion',
    slug: 'elite-hall-royal-garden',
    capacity: 600,
    pricePerDay: 20000,
    pricePerHour: 2500,
    location: 'Garden Estate Sector 4, Lakeview Avenue',
    description: 'A breathtaking indoor-outdoor fusion experience at Elite Hall Royal Garden. Perfect for evening receptions, cocktail parties, birthday galas, and cultural events under ambient starry lighting.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 82,
    amenities: [
      'Open Air Lawns & Covered Hall',
      'Ambient Fairy Lighting',
      'DJ Sound System',
      'Custom Bar Counter',
      'Live Grill Counter Space',
      'Valet Parking',
      'Bridal Suite'
    ],
    specs: {
      areaSqFt: 8500,
      parkingCapacity: 200,
      diningCapacity: 400,
      stageDimensions: '30ft x 15ft'
    },
    status: 'Available',
    featured: true
  },
  ...HALL_CATEGORIES.map((cat, idx) => ({
    id: `hall-cat-${idx + 1}`,
    name: `Elite Hall - ${cat.title}`,
    slug: `elite-hall-${cat.slug}`,
    category: cat.title,
    capacity: parseInt(cat.capacity.split('-')[1] || '500', 10),
    pricePerDay: cat.priceStarting,
    pricePerHour: Math.round(cat.priceStarting / 8),
    location: `Tower ${String.fromCharCode(65 + (idx % 4))}, ${((idx % 5) + 1)}nd Floor, Elite Avenue, Metro City`,
    description: `${cat.description} Fully air-conditioned with luxury stage lighting, valet parking, and dedicated event management by Elite Hall Team.`,
    image: cat.image,
    images: [
      cat.image,
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8 + (idx % 3) * 0.1,
    reviewsCount: 45 + idx * 12,
    amenities: [
      'Central Air Conditioning',
      'Stage & Premium Lighting',
      'High-Speed Wi-Fi',
      'VIP Lounge & Green Room',
      'In-house Catering',
      'Valet Parking',
      'HD Projectors & Sound System',
      'Full Generator Backup'
    ],
    specs: {
      areaSqFt: 3500 + idx * 800,
      parkingCapacity: 100 + idx * 25,
      diningCapacity: 150 + idx * 40,
      stageDimensions: '30ft x 15ft'
    },
    status: 'Available',
    featured: false
  }))
];

export const MOCK_ADMIN_USER = {
  id: 'usr-admin-1',
  name: ADMIN_NAME,
  email: 'admin@elitehall.com',
  role: ROLES.ADMIN,
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  joinDate: '2023-01-15'
};
