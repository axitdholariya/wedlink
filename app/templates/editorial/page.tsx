'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EditorialInvitation from '@/app/editorial-invitation';
import { example } from '@/app/shared';

function EditorialPageContent() {
  const searchParams = useSearchParams();

  // 1. Initial State me aapka exact original data & stories
  const [data, setData] = useState({
    ...example,
    template: 'editorial',
    timezone: 'Asia/Kolkata',
    story:
      'It started with a conversation neither of us wanted to end. A few coffees became long walks. Long walks became little adventures. And somewhere between the everyday moments, we found our favourite place: together. Now we are choosing each other, for all the chapters still to come.',
    dressCode: 'Evening elegance. Wear something that makes you feel wonderful.',
    accommodation: 'Our families will be happy to help with nearby hotel recommendations.',
    gifts: 'Your company is our favourite gift. Come with your love and your dancing shoes.'
  });

  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // A. URL Parameters check karein (?bride=Krisha&groom=Axit)
    const paramBride = searchParams.get('bride');
    const paramGroom = searchParams.get('groom');
    const paramDate = searchParams.get('date');
    const paramVenue = searchParams.get('venue');

    if (paramBride || paramGroom) {
      setData(prev => ({
        ...prev,
        brideName: paramBride || prev.brideName,
        groomName: paramGroom || prev.groomName,
        bride: paramBride || prev.bride,
        groom: paramGroom || prev.groom,
        weddingDate: paramDate || prev.weddingDate,
        date: paramDate || prev.date,
        cityVenue: paramVenue || prev.cityVenue,
        venueName: paramVenue || prev.venueName,
        venue: paramVenue || prev.venue
      }));
      setIsCustom(true);
      return;
    }

    // B. LocalStorage check karein (Screen 1 / Builder me jo fill kiya tha)
    const saved =
      localStorage.getItem('wedlink_data') ||
      localStorage.getItem('wedlink_official_builder') ||
      localStorage.getItem('wedlink_shaadipath_builder') ||
      localStorage.getItem('wedlink_builder_data') ||
      localStorage.getItem('weddingData');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(prev => ({
          ...prev,
          ...parsed,
          brideName: parsed.brideName || parsed.bride || prev.brideName,
          groomName: parsed.groomName || parsed.groom || prev.groomName,
          bride: parsed.bride || parsed.brideName || prev.bride,
          groom: parsed.groom || parsed.groomName || prev.groom,
          weddingDate: parsed.weddingDate || parsed.date || prev.weddingDate,
          date: parsed.date || parsed.weddingDate || prev.date,
          cityVenue: parsed.cityVenue || parsed.venue || parsed.venueName || prev.cityVenue,
          venueName: parsed.venueName || parsed.venue || parsed.cityVenue || prev.venueName,
          venue: parsed.venue || parsed.cityVenue || parsed.venueName || prev.venue
        }));
        setIsCustom(true);
      } catch (e) {
        console.error('Error parsing stored wedding data:', e);
      }
    }
  }, [searchParams]);

  // Page Title Update
  useEffect(() => {
    const b = data.brideName || data.bride || 'Krisha';
    const g = data.groomName || data.groom || 'Axit';
    document.title = isCustom
      ? `${b} & ${g}'s Wedding Invitation | Wedlink`
      : 'The Editorial — Template 03 | Wedlink';
  }, [data, isCustom]);

  return (
    <>
      <header className="ed-demo-bar">
        <Link href="/#collection">
          <ArrowLeft size={15} /> Wedlink
        </Link>
        <span>
          {isCustom
            ? `${(data.brideName || data.bride || '').toUpperCase()} & ${(data.groomName || data.groom || '').toUpperCase()} · INVITATION`
            : 'TEMPLATE 03 · THE EDITORIAL · SAMPLE'}
        </span>
        <Link href="/create?template=editorial">
          {isCustom ? 'Personalize' : 'Make it yours'} <ArrowUpRight size={15} />
        </Link>
      </header>

      {/* Aapka exact original EditorialInvitation component (Poori Theme & Buttons safe hain) */}
      <EditorialInvitation data={data} />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EditorialPageContent />
    </Suspense>
  );
}
