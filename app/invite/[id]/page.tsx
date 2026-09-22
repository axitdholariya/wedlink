'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { example, type Invite } from '@/app/shared';

// Import All 5 Templates
import EditorialInvitation from '@/app/editorial-invitation';
import GardenRomance from '@/app/garden-romance';
import HeritageInvitation from '@/app/heritage-invitation';
import RoseLetter from '@/app/rose-letter';
import RoyalCourtyard from '@/app/royal-courtyard';

function InviteContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = (params?.id as string) || '';
  const queryTemplate = searchParams.get('template');

  const [inviteData, setInviteData] = useState<Invite | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string>('editorial');

  useEffect(() => {
    // 1. Try to read customized data from localStorage
    let savedData: any = null;

    if (typeof window !== 'undefined') {
      try {
        const localById = localStorage.getItem(`wedlink_${id}`);
        const localLast = localStorage.getItem('wedlink_last_invite');

        if (localById) {
          savedData = JSON.parse(localById);
        } else if (localLast) {
          savedData = JSON.parse(localLast);
        }
      } catch (e) {
        console.error('Failed reading local invitation data', e);
      }
    }

    // 2. Fallback: Parse couple names from URL slug (e.g. "priya-arjun" -> Priya & Arjun)
    let parsedFirst = 'Priya';
    let parsedSecond = 'Arjun';

    if (id && id.includes('-')) {
      const parts = id.split('-');
      if (parts.length >= 2) {
        parsedFirst = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        parsedSecond = parts.charAt(0).toUpperCase() + parts.slice(1);
      }
    }

    // 3. Construct Final Display Data
    const finalData: Invite = {
      ...example,
      ...(savedData || {}),
      first: savedData?.first || parsedFirst,
      second: savedData?.second || parsedSecond,
      date: savedData?.date || example.date || '2026-11-28',
      photo: savedData?.photo || example.photo,
      photos: savedData?.photos || [example.photo],
      events: savedData?.events || example.events,
      story: savedData?.story || example.story,
      message: savedData?.message || example.message,
    };

    setInviteData(finalData);

    // 4. Set Selected Template
    const templateToUse =
      savedData?.template ||
      queryTemplate ||
      (dataHasTemplate(finalData) ? (finalData as any).template : 'editorial');

    setActiveTemplate(templateToUse);
  }, [id, queryTemplate]);

  function dataHasTemplate(data: any): boolean {
    return Boolean(data && data.template);
  }

  if (!inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D141E]">
        <div className="text-center font-serif">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24F] border-t-transparent" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#8A7B75]">
            Opening Your Wedding Invitation…
          </p>
        </div>
      </div>
    );
  }

  // Render the Actual Selected Template
  switch (activeTemplate) {
    case 'rose-letter':
      return <RoseLetter data={inviteData} invitationId={id} />;
    case 'royal-courtyard':
      return <RoyalCourtyard data={inviteData} />;
    case 'editorial':
      return <EditorialInvitation data={inviteData} />;
    case 'garden-romance':
      return <GardenRomance data={inviteData} />;
    case 'heritage':
      return <HeritageInvitation data={inviteData} />;
    default:
      return <EditorialInvitation data={inviteData} />;
  }
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#2D141E]">
          <div className="text-center font-serif text-sm uppercase tracking-[0.2em] text-[#8A7B75]">
            Loading WedLink…
          </div>
        </div>
      }
    >
      <InviteContent />
    </Suspense>
  );
}
