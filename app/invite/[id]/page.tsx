import { example, type Invite } from '@/app/shared';

// Import All 5 Templates
import EditorialInvitation from '@/app/editorial-invitation';
import GardenRomance from '@/app/garden-romance';
import HeritageInvitation from '@/app/heritage-invitation';
import RoseLetter from '@/app/rose-letter';
import RoyalCourtyard from '@/app/royal-courtyard';

// 1. Static Export (Vercel Build) ke liye strictly required
export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'priya-arjun' }
  ];
}

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }> | { id: string };
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const resolvedParams = await params;
  const resolvedSearch = searchParams ? await searchParams : {};
  const id = resolvedParams?.id || 'demo';
  const selectedTemplate = (resolvedSearch?.template as string) || 'editorial';

  // URL slug se couple ka naam nikalna (e.g. "priya-arjun" -> Priya & Arjun)
  let first = 'Priya';
  let second = 'Arjun';

  if (id && id !== 'demo' && id.includes('-')) {
    const parts = id.split('-');
    if (parts.length >= 2) {
      first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      second = parts.charAt(0).toUpperCase() + parts.slice(1);
    }
  }

  // Invitation data build karna
  const inviteData: Invite = {
    ...example,
    first,
    second,
    date: example.date || '2026-11-28',
  };

  // Selected 3D Template ko direct render karna
  switch (selectedTemplate) {
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
