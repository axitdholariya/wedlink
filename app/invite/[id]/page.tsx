import React from 'react';
import { example, type Invite } from '@/app/shared';
import EditorialInvitation from '@/app/editorial-invitation';

// 1. Static Export (Vinext / Vercel) ke liye strictly required
export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'priya-arjun' }
  ];
}

// 2. Synchronous Server Component (Zero 500 errors on Static Export)
export default function InvitePage({ params }: { params: { id: string } }) {
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

  // Invitation data build
  const inviteData: Invite = {
    ...example,
    first,
    second,
    date: example.date || '2026-11-28',
  };

  // Direct 3D Editorial Invitation Render
  return <EditorialInvitation data={inviteData} />;
}
