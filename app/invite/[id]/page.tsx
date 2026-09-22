'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import RoyalCourtyard from '../../royal-courtyard';
import RoseLetter from '../../rose-letter';
import GardenRomance from '../../garden-romance';
import HeritageInvitation from '../../heritage-invitation';
import EditorialInvitation from '../../editorial-invitation';
import { example } from '@/app/shared';

export default function InvitePage() {
  const [data, setData] = useState({
    ...example,
    groomName: 'Aarav Sharma',
    brideName: 'Meera Kapoor',
    date: '2026-11-29',
    weddingDate: '2026-11-29',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur, Rajasthan',
    theme: 'royal-courtyard',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedlink_custom_invite');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(prev => ({
            ...prev,
            ...parsed,
            first: parsed.groomName?.split(' ')[0] || 'Aarav',
            second: parsed.brideName?.split(' ')[0] || 'Meera',
            date: parsed.weddingDate || '2026-11-29',
            status: 'active',
            isPaid: true,
            paid: true,
            published: true,
          }));
        } catch (e) {}
      }
    }
  }, []);

  const themeId = data.theme || 'royal-courtyard';

  return (
    <div className="relative min-h-screen bg-[#0A0D14]">
      {/* Clickable Luxury Top Bar */}
      <header 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999, pointerEvents: 'auto' }}
        className="flex items-center justify-between px-4 py-2.5 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 text-white text-xs font-sans shadow-lg"
      >
        <a 
          href="/" 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] font-medium transition-all cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to WedLink
        </a>
        <span className="hidden sm:inline font-serif tracking-widest text-[#D4AF37] text-[11px] uppercase">
          Live Personalized Invitation
        </span>
        <a 
          href="/create"
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black font-semibold uppercase tracking-wider text-[11px] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Edit Details <ArrowUpRight size={14} />
        </a>
      </header>

      {/* Render Selected Theme with Custom Data */}
      <div className="pt-12">
        {themeId === 'rose-letter' && <RoseLetter data={{ ...data, template: 'rose-letter', status: 'active', isPaid: true }} />}
        {themeId === 'garden-romance' && <GardenRomance data={{ ...data, template: 'garden-romance', status: 'active', isPaid: true }} />}
        {themeId === 'heritage' && <HeritageInvitation data={{ ...data, template: 'heritage', status: 'active', isPaid: true }} />}
        {themeId === 'editorial' && <EditorialInvitation data={{ ...data, template: 'editorial', status: 'active', isPaid: true }} />}
        {themeId === 'royal-courtyard' && <RoyalCourtyard data={{ ...data, template: 'royal', status: 'active', isPaid: true }} />}
      </div>
    </div>
  );
}
