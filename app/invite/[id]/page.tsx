import React from 'react';
import RoyalCourtyard from '../../royal-courtyard';
import RoseLetter from '../../rose-letter';
import GardenRomance from '../../garden-romance';
import HeritageInvitation from '../../heritage-invitation';
import EditorialInvitation from '../../editorial-invitation';

// Vercel static export ke liye required
export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'preview' },
    { id: 'royal-courtyard' },
    { id: 'rose-letter' },
    { id: 'garden-romance' },
    { id: 'heritage' },
    { id: 'editorial' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function InvitePage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || 'demo';

  // Dynamic theme switcher
  if (id === 'rose-letter') {
    return <RoseLetter />;
  }
  if (id === 'garden-romance') {
    return <GardenRomance />;
  }
  if (id === 'heritage') {
    return <HeritageInvitation />;
  }
  if (id === 'editorial') {
    return <EditorialInvitation />;
  }

  // Default flagship Royal Courtyard theme
  return <RoyalCourtyard />;
}
