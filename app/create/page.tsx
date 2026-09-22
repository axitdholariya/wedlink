'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, MapPin, Calendar, Clock, Heart, Sparkles, Send } from 'lucide-react';

export default function RoyalCourtyardTemplate() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Default Wedding Data (Fallback agar builder se data na mile)
  const [weddingData, setWeddingData] = useState({
    brideName: 'Aanya',
    groomName: 'Kabir',
    orderBrideFirst: true,
    weddingDate: '2026-12-18',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur, Rajasthan',
    whatsappNumber: '+91 9876543210',
    hashtag: '#KabirFoundHisAanya',
    showCountdown: true,
    showInvitation: true,
    blessing: 'Under the divine grace of the Almighty and with the love of our ancestors',
    brideFather: 'Dr. Vikramaditya Singhania',
    brideMother: 'Mrs. Suniti Singhania',
    groomFather: 'Thakur Ranveer Singh Rathore',
    groomMother: 'Mrs. Yashodhara Rathore',
    orderParentsBrideFirst: true,
    selectedEvents: ['haldi', 'sangeet', 'pheras', 'reception'],
    eventsList: [
      { id: 'haldi', name: 'Haldi & Phoolon Ki Holi', date: '16 Dec 2026', time: '10:30 AM', venue: 'Lakefront Amphitheatre', dress: 'Marigold Yellow & Florals' },
      { id: 'sangeet', name: 'Sangeet & Musical Evening', date: '17 Dec 2026', time: '07:00 PM', venue: 'The Grand Mewar Pavilion', dress: 'Midnight Velvet & Shimmer' },
      { id: 'pheras', name: 'Vedic Pheras & Wedding Vows', date: '18 Dec 2026', time: '05:30 PM', venue: 'Sunset Island Mandap', dress: 'Regal Traditional Indian' },
      { id: 'reception', name: 'The Grand Royal Banquet', date: '18 Dec 2026', time: '08:30 PM', venue: 'Crystal Palace Courtyard', dress: 'Black Tie / Evening Glamour' },
    ],
    dressCode: 'Royal Indian Ethnics and Modern Evening Elegance.',
    stayInfo: 'Special room reservations arranged. Booking code: WEDLINK2026',
    songName: 'Soulful Shehnai & Classical Sitar Symphony',
  });

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  // 2. AUTO-SYNC FROM BUILDER (Preview click hote hi yahan bina payment ke saara data load hoga)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedlink_official_builder') || 
                    localStorage.getItem('wedlink_shaadipath_builder') ||
                    localStorage.getItem('wedlink_preview_data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setWeddingData(prev => ({ 
            ...prev, 
            ...parsed,
            // Agar eventsList custom aaye to safely merge karein
            eventsList: parsed.eventsList && parsed.eventsList.length > 0 ? parsed.eventsList : prev.eventsList,
            selectedEvents: parsed.eventsList && parsed.eventsList.length > 0 
              ? parsed.eventsList.map((e: any, idx: number) => e.id || `ev-${idx}`) 
              : prev.selectedEvents
          }));
        } catch (e) {
          console.error('Error loading builder data in preview', e);
        }
      }
    }
  }, []);

  // 3. BACKGROUND AUDIO CONTROLLER
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 4. DYNAMIC COUNTDOWN TIMER
  useEffect(() => {
    const target = new Date(weddingData.weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
          minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
          seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0'),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingData.weddingDate]);

  const coupleTitle = weddingData.orderBrideFirst 
    ? `${weddingData.brideName} & ${weddingData.groomName}` 
    : `${weddingData.groomName} & ${weddingData.brideName}`;

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] font-['Manrope',sans-serif] flex justify-center selection:bg-[#541D36] selection:text-[#FFF9F2]">
      
      {/* Brand Kit Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* AUDIO ELEMENT (Shehnai & Sitar) */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-traditional-background-music-112194.mp3" 
        preload="auto"
      />

      {/* MOBILE CONSTRAINED CONTAINER */}
      <main className="w-full max-w-[480px] bg-[#FFF9F2] min-h-screen relative shadow-2xl overflow-x-hidden pb-12 border-x border-[#B68A50]/20">
        
        {/* ============================================================== */}
        {/* TOP PREVIEW BAR (Shows only in preview mode)                   */}
        {/* ============================================================== */}
        <div className="sticky top-0 z-40 bg-[#541D36] text-[#FFF9F2] px-4 py-2 border-b border-[#B68A50]/40 flex justify-between items-center text-xs shadow-md">
          <span className="flex items-center gap-1.5 text-[#B68A50] font-bold text-[11px] tracking-wide">
            <Sparkles size={14} className="text-[#D8B67D]" /> Live Preview Mode
          </span>
          <button
            type="button"
            onClick={() => {
              // User jab ready ho tabhi payment ya publish route trigger hoga
              const checkoutUrl = `/api/payments/checkout?template=royal-courtyard`;
              window.location.href = checkoutUrl;
            }}
            className="px-3.5 py-1 rounded-full bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold text-[10px] uppercase tracking-wider shadow transition duration-200"
          >
            Publish (₹1,499) ↗
          </button>
        </div>

        {/* ============================================================== */}
        {/* A. 3D ROYAL SLIDING CURTAIN / ENVELOPE OPENING                  */}
        {/* ============================================================== */}
        {!isOpened && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 max-w-[480px] mx-auto transition-all duration-700">
            <div className="w-full h-full bg-[#541D36] flex flex-col items-center justify-center p-6 text-center text-[#FFF9F2] relative border-4 border-[#B68A50]/40 shadow-2xl">
              
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-[#B68A50] flex items-center justify-center text-4xl mb-4 shadow-xl animate-pulse">
                🏰
              </div>
              
              <span className="text-xs uppercase tracking-[0.3em] text-[#B68A50] font-bold">The Royal Invitation</span>
              <h1 className="font-brand-heading italic text-4xl font-bold mt-2 text-[#FFF9F2]">{coupleTitle}</h1>
              <p className="text-xs text-[#E8C9CD] tracking-widest uppercase mt-1">{weddingData.venueCity}</p>
              
              <button
                type="button"
                onClick={() => { setIsOpened(true); setIsPlaying(true); }}
                className="mt-8 px-8 py-3.5 rounded-full bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold text-xs uppercase tracking-[0.25em] shadow-2xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Sparkles size={16} /> Tap to Open Invitation
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* B. FLOATING MUSIC TOGGLE BUTTON                                */}
        {/* ============================================================== */}
        <div className="fixed top-12 right-5 z-40">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-[#541D36] border border-[#B68A50] text-[#FFF9F2] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            title={isPlaying ? "Pause Music" : "Play Shehnai Music"}
          >
            {isPlaying ? <Volume2 size={18} className="text-[#B68A50] animate-pulse" /> : <VolumeX size={18} className="text-[#E8C9CD]" />}
          </button>
        </div>

        {/* ============================================================== */}
        {/* 1. HERO SECTION                                                */}
        {/* ============================================================== */}
        <section className="pt-10 pb-8 px-6 text-center bg-gradient-to-b from-[#541D36] via-[#652342] to-[#FFF9F2] text-[#FFF9F2]">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#B68A50] font-bold block mb-1">
            Save The Date
          </span>
          <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F2]">
            {weddingData.brideName}
          </h2>
          <span className="font-brand-heading italic text-3xl text-[#B68A50] my-1 block">&</span>
          <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F2]">
            {weddingData.groomName}
          </h2>
          
          <p className="text-[11px] tracking-widest text-[#E8C9CD] font-bold uppercase mt-3">
            {weddingData.hashtag}
          </p>

          {/* Countdown Clock */}
          {weddingData.showCountdown && (
            <div className="mt-6 p-4 rounded-2xl bg-[#541D36]/95 border border-[#B68A50]/40 shadow-xl max-w-xs mx-auto">
              <span className="text-[9px] uppercase tracking-widest text-[#B68A50] font-bold block mb-2">Countdown To Auspicious Day</span>
              <div className="flex justify-center items-center gap-3 text-sm font-mono font-bold text-white">
                <div className="flex flex-col"><span className="text-xl text-[#FFF9F2]">{timeLeft.days}</span><span className="text-[9px] font-normal text-[#E8C9CD]">DAYS</span></div>
                <span className="text-[#B68A50]">:</span>
                <div className="flex flex-col"><span className="text-xl text-[#FFF9F2]">{timeLeft.hours}</span><span className="text-[9px] font-normal text-[#E8C9CD]">HOURS</span></div>
                <span className="text-[#B68A50]">:</span>
                <div className="flex flex-col"><span className="text-xl text-[#FFF9F2]">{timeLeft.minutes}</span><span className="text-[9px] font-normal text-[#E8C9CD]">MINS</span></div>
                <span className="text-[#B68A50]">:</span>
                <div className="flex flex-col"><span className="text-xl text-[#FFF9F2]">{timeLeft.seconds}</span><span className="text-[9px] font-normal text-[#E8C9CD]">SECS</span></div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================== */}
        {/* 2. SACRED BLESSINGS & FAMILY LINEAGE                           */}
        {/* ============================================================== */}
        {weddingData.showInvitation && (
          <section className="py-8 px-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-[#B68A50]/30 shadow-md space-y-4">
              <span className="text-2xl">🙏</span>
              <p className="font-brand-heading italic text-sm text-[#7A6B72] leading-relaxed">
                &ldquo;{weddingData.blessing}&rdquo;
              </p>
              
              <div className="pt-4 border-t border-[#B68A50]/20 space-y-2 text-xs">
                {weddingData.orderParentsBrideFirst ? (
                  <>
                    <div>
                      <span className="text-[10px] text-[#7A6B72] uppercase font-bold tracking-wider block">Bride&apos;s Parents</span>
                      <p className="font-semibold text-[#241C24]">{weddingData.brideMother} & {weddingData.brideFather}</p>
                    </div>
                    <span className="font-brand-heading italic text-[#B68A50] block">&</span>
                    <div>
                      <span className="text-[10px] text-[#7A6B72] uppercase font-bold tracking-wider block">Groom&apos;s Parents</span>
                      <p className="font-semibold text-[#241C24]">{weddingData.groomMother} & {weddingData.groomFather}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-[10px] text-[#7A6B72] uppercase font-bold tracking-wider block">Groom&apos;s Parents</span>
                      <p className="font-semibold text-[#241C24]">{weddingData.groomMother} & {weddingData.groomFather}</p>
                    </div>
                    <span className="font-brand-heading italic text-[#B68A50] block">&</span>
                    <div>
                      <span className="text-[10px] text-[#7A6B72] uppercase font-bold tracking-wider block">Bride&apos;s Parents</span>
                      <p className="font-semibold text-[#241C24]">{weddingData.brideMother} & {weddingData.brideFather}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* 3. MULTI-EVENT CELEBRATIONS & TIMINGS                         */}
        {/* ============================================================== */}
        <section className="py-6 px-6">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B68A50] font-bold">Schedule of Celebrations</span>
            <h3 className="font-brand-heading italic text-3xl font-bold text-[#541D36] mt-1">Wedding Festivities</h3>
          </div>

          {/* Interactive Event Cards */}
          <div className="space-y-4">
            {weddingData.eventsList
              .filter(ev => weddingData.selectedEvents.includes(ev.id) || !ev.id)
              .map((ev, i) => (
              <div key={ev.id || i} className="p-5 rounded-2xl bg-white border border-[#B68A50]/25 shadow-sm space-y-2 hover:shadow-md transition duration-200">
                <div className="flex justify-between items-baseline border-b border-[#B68A50]/15 pb-2">
                  <h4 className="font-brand-heading text-xl font-bold text-[#541D36]">{ev.name}</h4>
                  <span className="text-xs font-bold text-[#B68A50] flex items-center gap-1">
                    <Clock size={12} /> {ev.time}
                  </span>
                </div>
                
                <div className="text-xs text-[#7A6B72] space-y-1 pt-1">
                  <p className="flex items-center gap-1.5"><Calendar size={13} className="text-[#541D36]" /> {ev.date}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={13} className="text-[#541D36]" /> {ev.venue}</p>
                  <p className="text-[11px] text-[#241C24] font-medium pt-1">
                    <strong className="text-[#541D36]">Attire:</strong> {ev.dress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. VENUE GPS DIRECTIONS & LOGISTICS                            */}
        {/* ============================================================== */}
        <section className="py-6 px-6 text-center">
          <div className="p-6 rounded-2xl bg-[#541D36] text-[#FFF9F2] shadow-xl space-y-3 border border-[#B68A50]/30">
            <span className="text-[10px] uppercase tracking-widest text-[#E8C9CD] font-bold">Location & Venue</span>
            <h4 className="font-brand-heading text-2xl font-bold text-[#FFF9F2]">{weddingData.venueName}</h4>
            <p className="text-xs text-[#E8C9CD]">{weddingData.venueCity}</p>
            
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(weddingData.venueName + ' ' + weddingData.venueCity)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-6 py-2.5 rounded-full bg-[#B68A50] text-[#541D36] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#c99a5e] transition-all"
            >
              <MapPin size={14} /> Open in Google Maps
            </a>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. GUEST RSVP BUTTON                                           */}
        {/* ============================================================== */}
        <section className="py-6 px-6 text-center">
          <a
            href={`https://wa.me/${weddingData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi!%20We%20are%20delighted%20to%20RSVP%20for%20${encodeURIComponent(coupleTitle)}'s%20wedding!`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-xl bg-[#541D36] hover:bg-[#682443] text-[#FFF9F2] font-bold text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <Send size={15} /> Confirm RSVP via WhatsApp
          </a>
          <p className="text-[10px] text-[#7A6B72] mt-2">Instant headcount delivery to the couple</p>
        </section>

        {/* Footer Monogram */}
        <footer className="pt-8 pb-4 text-center border-t border-[#B68A50]/20 text-[11px] text-[#7A6B72]">
          <span className="font-brand-heading text-lg font-bold text-[#541D36] block">Wedlink</span>
          <p className="text-[9px] tracking-widest text-[#B68A50] uppercase mt-0.5">Your story. One beautiful link.</p>
        </footer>

      </main>
    </div>
  );
}
