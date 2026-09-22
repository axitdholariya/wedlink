import React from 'react';
import { example, type Invite } from '@/app/shared';
import EditorialInvitation from '@/app/editorial-invitation';

// 1. Static Export (Vinext / Vercel Build) ke liye strictly required
export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'priya-arjun' }
  ];
}

const DEFAULT_EVENTS = [
  {
    name: 'Sangeet & Cocktail Night',
    date: '2026-11-27',
    time: '07:30 PM',
    venue: 'Poolside Lawn, The Oberoi Udaivilas',
    address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
    mapUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
  },
  {
    name: 'The Royal Wedding & Phere',
    date: '2026-11-28',
    time: '05:30 PM',
    venue: 'The Grand Courtyard, The Oberoi Udaivilas',
    address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
    mapUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
  },
];

// 2. Safe Synchronous Page Component
export default function InvitePage({ params }: { params?: { id?: string } }) {
  const id = params?.id || 'demo';

  // URL slug se couple ka naam parse karna (e.g. "priya-arjun" -> Priya & Arjun)
  let first = 'Priya';
  let second = 'Arjun';

  if (id && id !== 'demo' && id.includes('-')) {
    const parts = id.split('-');
    if (parts.length >= 2) {
      first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      second = parts.charAt(0).toUpperCase() + parts.slice(1);
    }
  }

  // 100% Complete & Crash-Proof Invitation Data
  const inviteData: Invite = {
    ...example,
    first,
    second,
    date: '2026-11-28',
    events: example?.events && example.events.length > 0 ? example.events : DEFAULT_EVENTS,
    photo:
      example?.photo ||
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
    story: 'In every lifetime, it would be you. Two paths crossed, and a forever began.',
    message: 'Together with our families, we invite you to celebrate our wedding day.',
    firstFamily: 'Together with the Sharma family',
    secondFamily: 'Together with the Kapoor family',
    dressCode: 'Royal Traditional Indian Elegance',
    accommodation: 'Special room blocks negotiated at The Oberoi Udaivilas. Code: WEDLINK2026',
    gifts: 'Your presence and blessings are our greatest gift.',
    timezone: 'Asia/Kolkata',
  };

  // 3. Direct Render of Editorial 3D Invitation
  return <EditorialInvitation data={inviteData} />;
}
