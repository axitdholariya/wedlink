'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { example, type Invite } from '@/app/shared';
import EditorialInvitation from '@/app/editorial-invitation';

export default function InvitePage() {
  const params = useParams();
  const id = (params?.id as string) || 'priya-arjun';

  const [inviteData, setInviteData] = useState<Invite>({
    ...example,
    first: 'Priya',
    second: 'Arjun',
    date: '2026-11-28',
  });

  useEffect(() => {
    // 1. URL slug se naam nikalna
    let first = 'Priya';
    let second = 'Arjun';

    if (id && id.includes('-')) {
      const parts = id.split('-');
      if (parts.length >= 2) {
        first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        second = parts.charAt(0).toUpperCase() + parts.slice(1);
      }
    }

    // 2. Local storage se custom data lena (agar available ho)
    let saved: any = null;
    try {
      const local = localStorage.getItem(`wedlink_${id}`);
      if (local) saved = JSON.parse(local);
    } catch (e) {}

    setInviteData({
      ...example,
      ...(saved || {}),
      first: saved?.first || first,
      second: saved?.second || second,
      date: saved?.date || '2026-11-28',
    });
  }, [id]);

  return <EditorialInvitation data={inviteData} />;
}
