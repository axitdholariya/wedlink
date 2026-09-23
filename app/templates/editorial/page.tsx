'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function EditorialContent() {
  const searchParams = useSearchParams();

  // Default Fallback Data
  const [data, setData] = useState({
    bride: 'Krisha',
    groom: 'Axit',
    orderBrideFirst: true,
    weddingDate: '28 November 2026',
    weddingYear: '2026',
    venue: 'The Grand Courtyard, The Oberoi Udaivilas',
    tagline: 'The beginning of everything',
    isCustomized: false
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. Check URL Parameters first (Useful when link is shared on WhatsApp)
    const paramBride = searchParams.get('bride');
    const paramGroom = searchParams.get('groom');
    const paramDate = searchParams.get('date');
    const paramVenue = searchParams.get('venue');

    if (paramBride || paramGroom) {
      setData({
        bride: paramBride || 'Krisha',
        groom: paramGroom || 'Axit',
        orderBrideFirst: searchParams.get('order') !== 'groom',
        weddingDate: paramDate || '28 November 2026',
        weddingYear: (paramDate || '2026').slice(-4),
        venue: paramVenue || 'The Grand Courtyard, The Oberoi Udaivilas',
        tagline: searchParams.get('tagline') || 'The beginning of everything',
        isCustomized: true
      });
      return;
    }

    // 2. Fallback to LocalStorage (When testing locally from builder)
    const saved = localStorage.getItem('wedlink_data') || localStorage.getItem('wedlink_official_builder');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData({
          bride: parsed.bride || parsed.brideName || 'Krisha',
          groom: parsed.groom || parsed.groomName || 'Axit',
          orderBrideFirst: parsed.orderBrideFirst !== false,
          weddingDate: parsed.date || parsed.weddingDate || '28 November 2026',
          weddingYear: (parsed.date || parsed.weddingDate || '2026').slice(-4) || '2026',
          venue: parsed.venue || parsed.cityVenue || 'The Grand Courtyard, The Oberoi Udaivilas',
          tagline: parsed.tagline || 'The beginning of everything',
          isCustomized: true
        });
      } catch (e) {
        console.error('Error parsing stored wedding data', e);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#111317] text-white font-sans flex flex-col items-center">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl px-4 py-3 flex items-center justify-between text-xs tracking-wider text-neutral-400 border-b border-neutral-800">
        <Link href="/" className="hover:text-white transition flex items-center gap-1">
          ← Back to Wedlink
        </Link>
        <span className="uppercase tracking-widest text-[11px] font-serif text-amber-200/80">
          {data.isCustomized ? `${data.bride} & ${data.groom}'s Invitation` : 'THE EDITORIAL • SAMPLE INVITATION'}
        </span>
        <Link
          href="/personalize"
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1 rounded text-xs transition"
        >
          {data.isCustomized ? 'Edit Details' : 'Personalize ↗'}
        </Link>
      </header>

      {/* Mobile Invitation Wrapper */}
      <main className="w-full max-w-md min-h-[90vh] relative flex flex-col justify-between p-6 bg-cover bg-center overflow-hidden my-4 rounded-2xl shadow-2xl border border-neutral-800"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80')`
        }}
      >
        {/* Top Header Section */}
        <div className="flex justify-between items-start pt-2">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-neutral-300 uppercase font-light">Together With Our Families</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-300 font-serif tracking-widest">{data.weddingYear}</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-xs hover:bg-white/20 transition"
              title="Music Play/Pause"
            >
              {isPlaying ? '⏸' : '🎵'}
            </button>
          </div>
        </div>

        {/* Center / Couple Names Section */}
        <div className="my-auto py-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300 mb-6 font-light">
            You Are Invited To The Wedding Of
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-wide leading-tight">
            {data.orderBrideFirst ? (
              <>
                <div>{data.bride}</div>
                <div className="text-3xl font-serif italic font-normal text-amber-200/90 my-1">&amp; {data.groom}</div>
              </>
            ) : (
              <>
                <div>{data.groom}</div>
                <div className="text-3xl font-serif italic font-normal text-amber-200/90 my-1">&amp; {data.bride}</div>
              </>
            )}
          </h1>
        </div>

        {/* Bottom Details Section */}
        <div className="pt-6 border-t border-white/20 space-y-4">
          <div className="flex justify-between items-baseline text-xs text-neutral-200 tracking-wide font-light">
            <span className="font-serif text-sm text-white">{data.weddingDate}</span>
            <span className="text-right max-w-[200px] truncate">{data.venue}</span>
          </div>

          <div className="flex justify-between items-center text-[10px] text-neutral-400 tracking-widest uppercase pt-2">
            <span>{data.tagline}</span>
            <span className="text-sm animate-bounce">↓</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EditorialTemplatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317] text-white flex items-center justify-center">Loading Invitation...</div>}>
      <EditorialContent />
    </Suspense>
  );
}
