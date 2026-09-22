'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Heart, Calendar, MapPin, Users, Camera, Upload, 
  Trash2, CheckCircle2, Sparkles, Music, MessageSquare, Info, 
  Check, X, HelpCircle, Feather, Crown, Compass, BookOpen
} from 'lucide-react';

// 5 Master Signature Templates
const TEMPLATES_LIST = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', tag: 'Palace Pillars & Festive Shehnai', motif: '🏰' },
  { id: 'rose-letter', name: 'The Rose Letter', tag: 'Wax Seal & Handcrafted Parchment', motif: '💌' },
  { id: 'heritage', name: 'Heritage Rajputana', tag: 'Traditional Shlokas & Regal Borders', motif: '🪔' },
  { id: 'garden-romance', name: 'Garden Romance', tag: 'Botanical Florals & Ivory Whispers', motif: '🌿' },
  { id: 'editorial', name: 'The Editorial', tag: 'Contemporary Vogue Minimalist', motif: '✨' },
];

const EVENT_CHIPS = [
  { id: 'mehendi', name: 'Mehendi & Henna', emoji: '🌿' },
  { id: 'haldi', name: 'Haldi Sunshine', emoji: '🌼' },
  { id: 'sangeet', name: 'Sangeet & Dance', emoji: '🎵' },
  { id: 'cocktail', name: 'Cocktail Gala', emoji: '🥂' },
  { id: 'pheras', name: 'Sacred Pheras', emoji: '🔥' },
  { id: 'reception', name: 'Grand Reception', emoji: '👑' },
  { id: 'engagement', name: 'Ring Ceremony', emoji: '💍' },
  { id: 'afterparty', name: 'Midnight Soirée', emoji: '✨' },
];

export default function WedlinkBuilder() {
  const [activeTab, setActiveTab] = useState<'ESSENTIALS' | 'INVITATION' | 'EVENTS' | 'STORY' | 'GALLERY' | 'INFO' | 'RSVP' | 'MUSIC'>('ESSENTIALS');
  const [template, setTemplate] = useState('royal-courtyard');
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved just now');

  // Unified State for All 5 Templates
  const [data, setData] = useState({
    // Essentials
    brideName: 'Aanya',
    groomName: 'Kabir',
    orderBrideFirst: true,
    weddingDate: '2026-12-18',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur, Rajasthan',
    whatsappNumber: '+91 9876543210',
    hashtag: '#KabirFoundHisAanya',
    showCountdown: true,

    // Formal Invitation & Lineage
    showInvitation: true,
    blessing: 'Under the divine grace of the Almighty and with the love of our ancestors',
    brideFather: 'Dr. Vikramaditya Singhania',
    brideMother: 'Mrs. Suniti Singhania',
    groomFather: 'Thakur Ranveer Singh Rathore',
    groomMother: 'Mrs. Yashodhara Rathore',
    orderParentsBrideFirst: true,

    // Events List
    selectedEvents: ['haldi', 'sangeet', 'pheras', 'reception'],
    eventsList: [
      { id: 'haldi', name: 'Haldi & Phoolon Ki Holi', date: '16 Dec 2026', time: '10:30 AM', venue: 'Lakefront Amphitheatre', dress: 'Marigold Yellow & Florals' },
      { id: 'sangeet', name: 'Sangeet & Musical Evening', date: '17 Dec 2026', time: '07:00 PM', venue: 'The Grand Mewar Pavilion', dress: 'Midnight Velvet & Shimmer' },
      { id: 'pheras', name: 'Vedic Pheras & Wedding Vows', date: '18 Dec 2026', time: '05:30 PM', venue: 'Sunset Island Mandap', dress: 'Regal Traditional Indian' },
      { id: 'reception', name: 'The Grand Royal Banquet', date: '18 Dec 2026', time: '08:30 PM', venue: 'Crystal Palace Courtyard', dress: 'Black Tie / Evening Glamour' },
    ],

    // Story / Quiz
    showStory: true,
    storyMode: 'QUIZ',
    q1: 'Introduced by childhood families over chai in Jaipur',
    q2: 'Adventurers who find peace in starry mountain trails',
    writtenStory: 'Two distinct journeys united by shared laughter, heartfelt conversations, and timeless blessings. We invite you to be part of our most treasured day.',

    // Gallery
    showGallery: true,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600',
    ],

    // Guest Experience Info
    showInfo: true,
    dressCode: 'Royal Indian Ethnics and Modern Evening Elegance.',
    parking: 'Chauffeured valet parking at the royal entrance.',
    stayInfo: 'Special room reservations arranged. Quote booking code: WEDLINK2026',
    mapsUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',

    // RSVP
    rsvpType: 'WHATSAPP',
    rsvpHeading: 'Celebrate With Us',
    rsvpSubtext: 'Your warmth, laughter, and blessings will complete our auspicious celebrations.',
    rsvpButtonText: 'Confirm Your Presence',

    // Audio
    enableMusic: true,
    songName: 'Soulful Shehnai & Classical Sitar Symphony',
  });

  // LocalStorage Persist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedlink_official_builder');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(prev => ({ ...prev, ...parsed }));
          if (parsed.template) setTemplate(parsed.template);
        } catch (e) {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedlink_official_builder', JSON.stringify({ ...data, template }));
      setSaveStatus('Saved just now');
    }
  }, [data, template]);

  const handleTextChange = (field: string, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
    setSaveStatus('Saving...');
  };

  const toggleEventChip = (chipId: string) => {
    setData(prev => {
      const exists = prev.selectedEvents.includes(chipId);
      const updated = exists 
        ? prev.selectedEvents.filter(id => id !== chipId)
        : [...prev.selectedEvents, chipId];
      return { ...prev, selectedEvents: updated };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => {
          const photos = [...prev.galleryPhotos];
          photos[index] = reader.result as string;
          return { ...prev, galleryPhotos: photos };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const coupleHeadline = data.orderBrideFirst 
    ? `${data.brideName} & ${data.groomName}` 
    : `${data.groomName} & ${data.brideName}`;

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] flex flex-col font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2]">
      
      {/* Google Fonts Preload */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        
        .font-brand-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-brand-body {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 1. TOP HEADER (BRAND WINE & OFFICIAL LINK LOGO) */}
      <header className="h-16 bg-[#541D36] text-[#FFF9F2] px-6 flex items-center justify-between z-30 shrink-0 shadow-md border-b border-[#B68A50]/20">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 group">
            {/* The Official Ribbon 'W' Logo */}
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#B68A50]/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 85" fill="none" className="w-full h-full text-[#FFF9F2]">
                <path 
                  d="M12 25 C18 10, 32 10, 38 30 L45 55 C48 65, 52 65, 55 55 L62 30 C68 10, 82 10, 88 25 C94 40, 85 62, 70 75 C60 84, 52 84, 48 78 C44 72, 45 62, 48 50 C42 62, 35 75, 26 75 C14 75, 6 50, 12 25 Z" 
                  fill="currentColor" 
                  opacity="0.95"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-brand-heading text-2xl font-bold tracking-wide leading-none text-[#FFF9F2]">
                Wedlink
              </span>
              <span className="text-[9px] tracking-widest text-[#E8C9CD] font-medium uppercase font-brand-body mt-0.5">
                Your story. One beautiful link.
              </span>
            </div>
          </a>

          <div className="h-4 w-px bg-white/20 hidden sm:block ml-2" />

          <span className="text-[11px] text-[#E8C9CD] flex items-center gap-1.5 font-medium font-brand-body">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            {saveStatus}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold font-brand-body">
          <button 
            type="button" 
            onClick={() => alert('Changes saved to your live microsite session!')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF9F2] border border-white/20 transition-all uppercase tracking-wider text-[11px]"
          >
            Save Draft
          </button>
          <button 
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 text-[11px] shadow-sm"
          >
            Preview <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-16">
        
        {/* LEFT COLUMN: CUSTOMIZATION DASHBOARD (48% Width) */}
        <div className="w-full lg:w-[48%] bg-white border-r border-[#B68A50]/20 flex flex-col overflow-y-auto">
          
          {/* Active Template Bar */}
          <div className="p-4 bg-[#FFF9F2] border-b border-[#B68A50]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A6B72]">Active Design</span>
              <span className="text-xs font-bold text-[#541D36] uppercase tracking-wider flex items-center gap-1.5">
                <span>{TEMPLATES_LIST.find(t => t.id === template)?.motif}</span>
                {TEMPLATES_LIST.find(t => t.id === template)?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTemplateModalOpen(true)}
              className="px-3.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase border border-[#541D36] text-[#541D36] hover:bg-[#541D36] hover:text-[#FFF9F2] transition-all cursor-pointer"
            >
              Change Design
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-[#FAF4ED] border-b border-[#B68A50]/20 px-4 pt-3">
            <div className="flex flex-wrap gap-2 text-[11px] font-bold tracking-widest uppercase border-b border-[#B68A50]/15 pb-2">
              {(['ESSENTIALS', 'INVITATION', 'EVENTS', 'STORY', 'GALLERY'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 px-2.5 transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'text-[#541D36] border-b-2 border-[#541D36] font-black' 
                      : 'text-[#7A6B72] hover:text-[#241C24]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-4 text-[11px] font-bold tracking-widest uppercase py-2">
              {(['INFO', 'RSVP', 'MUSIC'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 px-2.5 transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'text-[#541D36] border-b-2 border-[#541D36] font-black' 
                      : 'text-[#7A6B72] hover:text-[#241C24]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TAB FORMS */}
          <div className="p-6 sm:p-8 space-y-6">

            {/* TAB 1: ESSENTIALS */}
            {activeTab === 'ESSENTIALS' && (
              <div className="space-y-6">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Heart size={20} className="text-[#B68A50]" /> The Couple & Celebration
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Bride&apos;s Name</label>
                      <input 
                        type="text" 
                        value={data.brideName} 
                        onChange={e => handleTextChange('brideName', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Groom&apos;s Name</label>
                      <input 
                        type="text" 
                        value={data.groomName} 
                        onChange={e => handleTextChange('groomName', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72]">Name Display Order</span>
                      <span className="text-sm font-bold text-[#241C24]">
                        {data.orderBrideFirst ? `${data.brideName} & ${data.groomName}` : `${data.groomName} & ${data.brideName}`}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleTextChange('orderBrideFirst', !data.orderBrideFirst)}
                      className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-[#541D36] text-[#541D36] rounded-md hover:bg-[#541D36] hover:text-[#FFF9F2] transition-all"
                    >
                      Switch
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Wedding Date</label>
                      <input 
                        type="date" 
                        value={data.weddingDate} 
                        onChange={e => handleTextChange('weddingDate', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">City / State</label>
                      <input 
                        type="text" 
                        value={data.venueCity} 
                        onChange={e => handleTextChange('venueCity', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Main Venue Name</label>
                    <input 
                      type="text" 
                      value={data.venueName} 
                      onChange={e => handleTextChange('venueName', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Wedding Hashtag</label>
                      <input 
                        type="text" 
                        value={data.hashtag} 
                        onChange={e => handleTextChange('hashtag', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">WhatsApp Contact</label>
                      <input 
                        type="text" 
                        value={data.whatsappNumber} 
                        onChange={e => handleTextChange('whatsappNumber', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVITATION */}
            {activeTab === 'INVITATION' && (
              <div className="space-y-6">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Sparkles size={20} className="text-[#B68A50]" /> Sacred Blessings & Family Lineage
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Opening Invocation / Blessing</label>
                    <textarea 
                      rows={2}
                      value={data.blessing} 
                      onChange={e => handleTextChange('blessing', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Bride&apos;s Father</label>
                      <input 
                        type="text" 
                        value={data.brideFather} 
                        onChange={e => handleTextChange('brideFather', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Bride&apos;s Mother</label>
                      <input 
                        type="text" 
                        value={data.brideMother} 
                        onChange={e => handleTextChange('brideMother', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Groom&apos;s Father</label>
                      <input 
                        type="text" 
                        value={data.groomFather} 
                        onChange={e => handleTextChange('groomFather', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Groom&apos;s Mother</label>
                      <input 
                        type="text" 
                        value={data.groomMother} 
                        onChange={e => handleTextChange('groomMother', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EVENTS */}
            {activeTab === 'EVENTS' && (
              <div className="space-y-6">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Calendar size={20} className="text-[#B68A50]" /> Celebrations & Itinerary
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {EVENT_CHIPS.map(chip => {
                    const isSelected = data.selectedEvents.includes(chip.id);
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => toggleEventChip(chip.id)}
                        className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#541D36] bg-[#541D36]/10 font-bold text-[#541D36]' 
                            : 'border-[#B68A50]/30 bg-white text-[#7A6B72] hover:bg-[#FFF9F2]'
                        }`}
                      >
                        <span className="text-xs flex items-center gap-1.5">
                          <span>{chip.emoji}</span> {chip.name}
                        </span>
                        {isSelected ? <Check size={14} className="text-[#541D36]" /> : <span className="w-2.5 h-2.5 rounded-full border border-[#B68A50]/40" />}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#B68A50]/20">
                  {data.eventsList.map((ev, idx) => (
                    <div key={ev.id} className="p-4 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#541D36]">{ev.name}</span>
                        <span className="text-xs text-[#7A6B72]">{ev.date} · {ev.time}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input 
                          type="text" 
                          value={ev.venue} 
                          placeholder="Venue" 
                          className="bg-white border border-[#B68A50]/30 p-2 rounded-md focus:border-[#541D36] focus:outline-none"
                          onChange={e => {
                            const updated = [...data.eventsList];
                            updated[idx].venue = e.target.value;
                            handleTextChange('eventsList', updated);
                          }}
                        />
                        <input 
                          type="text" 
                          value={ev.dress} 
                          placeholder="Dress Code" 
                          className="bg-white border border-[#B68A50]/30 p-2 rounded-md focus:border-[#541D36] focus:outline-none"
                          onChange={e => {
                            const updated = [...data.eventsList];
                            updated[idx].dress = e.target.value;
                            handleTextChange('eventsList', updated);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STORY */}
            {activeTab === 'STORY' && (
              <div className="space-y-4">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Heart size={20} className="text-[#B68A50]" /> The Story
                </h3>
                <textarea 
                  rows={4}
                  value={data.writtenStory}
                  onChange={e => handleTextChange('writtenStory', e.target.value)}
                  className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-3 text-sm focus:outline-none focus:border-[#541D36]"
                />
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'GALLERY' && (
              <div className="space-y-4">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Camera size={20} className="text-[#B68A50]" /> Visual Moments
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.galleryPhotos.map((url, i) => (
                    <div key={i} className="border border-[#B68A50]/30 rounded-lg p-2.5 bg-[#FFF9F2] text-center space-y-2">
                      <div className="h-28 rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Moment ${i+1}`} className="w-full h-full object-cover" />
                      </div>
                      <label className="block py-1 rounded bg-white border border-[#B68A50]/30 text-[11px] font-bold uppercase text-[#541D36] cursor-pointer hover:bg-[#FFF9F2]">
                        Replace Photo {i + 1}
                        <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, i)} className="hidden" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: INFO */}
            {activeTab === 'INFO' && (
              <div className="space-y-4">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Info size={20} className="text-[#B68A50]" /> Guest Logistics
                </h3>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Attire & Dress Code</label>
                  <input type="text" value={data.dressCode} onChange={e => handleTextChange('dressCode', e.target.value)} className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Hotel Stay & Special Code</label>
                  <input type="text" value={data.stayInfo} onChange={e => handleTextChange('stayInfo', e.target.value)} className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-2.5 text-sm" />
                </div>
              </div>
            )}

            {/* TAB 7: RSVP */}
            {activeTab === 'RSVP' && (
              <div className="space-y-4">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <MessageSquare size={20} className="text-[#B68A50]" /> Guest RSVP
                </h3>
                <input type="text" value={data.rsvpHeading} onChange={e => handleTextChange('rsvpHeading', e.target.value)} className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-2.5 text-sm" />
                <textarea rows={2} value={data.rsvpSubtext} onChange={e => handleTextChange('rsvpSubtext', e.target.value)} className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-2.5 text-sm" />
              </div>
            )}

            {/* TAB 8: MUSIC */}
            {activeTab === 'MUSIC' && (
              <div className="space-y-4">
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Music size={20} className="text-[#B68A50]" /> Background Melody
                </h3>
                <input type="text" value={data.songName} onChange={e => handleTextChange('songName', e.target.value)} className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg p-2.5 text-sm" />
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC 5-TEMPLATE IPHONE PREVIEW (52% Width) */}
        <div className="w-full lg:w-[52%] bg-[#FAF4ED] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="w-full max-w-[340px] sm:max-w-[360px] flex items-center justify-between mb-3 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A6B72] font-brand-body">
              {TEMPLATES_LIST.find(t => t.id === template)?.name}
            </span>
            <span className="text-[10px] text-[#541D36] font-semibold bg-white/80 px-2.5 py-0.5 rounded-full border border-[#B68A50]/30 font-brand-body">
              Live Phone Preview
            </span>
          </div>

          {/* FIXED IPHONE CHASSIS (Fixed Height - Never Stretches Down) */}
          <div className="relative w-[340px] sm:w-[360px] h-[700px] max-h-[calc(100vh-140px)] bg-[#1A181B] rounded-[50px] p-3.5 border-[4px] border-[#2D2A2E] shadow-2xl shrink-0 flex flex-col">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end pr-2.5">
              <div className="w-2 h-2 bg-[#252830] rounded-full border border-white/20" />
            </div>

            {/* INNER SCREEN CONTAINER (SCROLL HAPPENS ONLY INSIDE HERE) */}
            <div className="relative w-full flex-1 rounded-[40px] overflow-y-auto overflow-x-hidden bg-[#FFF9F2] text-[#241C24] p-5 pt-7 text-center scrollbar-none flex flex-col">
              
              {/* ============================================== */}
              {/* TEMPLATE 1: THE ROYAL COURTYARD                */}
              {/* ============================================== */}
              {template === 'royal-courtyard' && (
                <div className="space-y-4">
                  <div className="pt-3 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#541D36]/10 flex items-center justify-center text-2xl mb-1 border border-[#B68A50]/30">🏰</div>
                    <p className="font-brand-heading italic text-2xl font-bold text-[#541D36]">{coupleHeadline}</p>
                    <p className="text-[10px] tracking-widest text-[#B68A50] font-bold uppercase mt-0.5">{data.hashtag}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#B68A50]/20 shadow-xs">
                    <p className="font-brand-heading italic text-xs text-[#7A6B72] leading-relaxed">&ldquo;{data.blessing}&rdquo;</p>
                    <div className="pt-2 mt-2 border-t border-[#B68A50]/15 text-[11px] text-[#7A6B72]">
                      <p className="font-semibold text-[#241C24]">Daughter of {data.brideFather} & {data.brideMother}</p>
                      <p className="font-brand-heading italic text-[#B68A50] my-0.5">&</p>
                      <p className="font-semibold text-[#241C24]">Son of {data.groomFather} & {data.groomMother}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#541D36] text-[#FFF9F2]">
                    <span className="text-[10px] uppercase tracking-widest text-[#E8C9CD] font-bold">The Royal Wedding Date</span>
                    <h4 className="font-brand-heading text-2xl font-bold mt-0.5">{data.weddingDate}</h4>
                    <p className="text-[11px] text-[#E8C9CD]">{data.venueName}, {data.venueCity}</p>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* TEMPLATE 2: THE ROSE LETTER (WAX SEAL)         */}
              {/* ============================================== */}
              {template === 'rose-letter' && (
                <div className="space-y-4">
                  <div className="pt-3 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#E8C9CD]/30 border border-[#E8C9CD] flex items-center justify-center text-xl mb-1 shadow-sm">💌</div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B68A50] font-bold">A Wedding Sealed With Love</span>
                    <p className="font-brand-heading italic text-2xl font-bold text-[#541D36] mt-1">{coupleHeadline}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8C9CD] text-left">
                    <p className="text-[11px] font-brand-heading italic text-[#541D36] leading-relaxed">&ldquo;{data.writtenStory}&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FFF9F2] border-2 border-dashed border-[#B68A50]">
                    <span className="text-[10px] uppercase font-bold text-[#541D36]">Save The Date</span>
                    <h4 className="font-brand-heading text-2xl font-bold text-[#541D36]">{data.weddingDate}</h4>
                    <p className="text-[11px] text-[#7A6B72]">{data.venueCity}</p>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* TEMPLATE 3: HERITAGE RAJPUTANA                 */}
              {/* ============================================== */}
              {template === 'heritage' && (
                <div className="space-y-4">
                  <div className="pt-3 flex flex-col items-center">
                    <span className="text-sm text-[#B68A50] font-bold">|| श्री गणेशाय नमः ||</span>
                    <div className="w-12 h-12 rounded-full bg-[#541D36] text-[#FFF9F2] flex items-center justify-center text-2xl my-2 border-2 border-[#B68A50]">🪔</div>
                    <p className="font-brand-heading text-2xl font-bold text-[#541D36]">{coupleHeadline}</p>
                    <p className="text-[10px] tracking-widest text-[#B68A50] font-bold uppercase">{data.hashtag}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border-2 border-[#B68A50]/40 text-center">
                    <p className="text-[11px] text-[#7A6B72] font-semibold">With the sacred blessings of our elders</p>
                    <p className="text-xs font-bold text-[#241C24] mt-1">Smt. & Shri {data.brideFather}</p>
                    <p className="text-xs font-bold text-[#241C24]">Smt. & Shri {data.groomFather}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#541D36] text-[#FFF9F2] border border-[#B68A50]">
                    <span className="text-[10px] uppercase tracking-widest text-[#B68A50] font-bold">शुभ विवाह</span>
                    <h4 className="font-brand-heading text-2xl font-bold">{data.weddingDate}</h4>
                    <p className="text-xs text-[#E8C9CD]">{data.venueName}</p>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* TEMPLATE 4: GARDEN ROMANCE                     */}
              {/* ============================================== */}
              {template === 'garden-romance' && (
                <div className="space-y-4">
                  <div className="pt-3 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl mb-1">🌿</div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A6B72]">Together With Our Families</span>
                    <p className="font-brand-heading italic text-3xl font-normal text-[#241C24] mt-1">{coupleHeadline}</p>
                    <p className="text-[10px] text-[#B68A50] font-bold mt-0.5">{data.hashtag}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#B68A50]/20">
                    <p className="font-brand-heading italic text-xs text-[#7A6B72]">&ldquo;{data.blessing}&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#541D36] text-[#FFF9F2]">
                    <span className="text-[10px] uppercase tracking-widest text-[#E8C9CD]">Celebrating Love</span>
                    <h4 className="font-brand-heading text-2xl font-bold mt-0.5">{data.weddingDate}</h4>
                    <p className="text-[11px] text-[#E8C9CD]">{data.venueName}</p>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* TEMPLATE 5: THE EDITORIAL (VOGUE MINIMALIST)   */}
              {/* ============================================== */}
              {template === 'editorial' && (
                <div className="space-y-4">
                  <div className="pt-3 flex flex-col items-center border-b border-[#241C24]/15 pb-4">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-[#241C24] font-bold">THE WEDDING ISSUE · VOL. I</span>
                    <h3 className="font-brand-heading text-3xl font-bold tracking-tight text-[#241C24] mt-1 uppercase">{coupleHeadline}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-[#B68A50] font-bold mt-1">{data.venueCity} · {data.weddingDate}</p>
                  </div>
                  <div className="p-4 bg-white border border-[#241C24]/20 text-left">
                    <span className="text-[9px] uppercase font-bold text-[#7A6B72] block mb-1">THE CELEBRATION</span>
                    <p className="font-brand-heading italic text-xs text-[#241C24] leading-relaxed">&ldquo;{data.writtenStory}&rdquo;</p>
                  </div>
                  <div className="p-4 bg-[#241C24] text-[#FFF9F2]">
                    <span className="text-[9px] uppercase tracking-widest text-[#B68A50] font-bold">SAVE THE DATE</span>
                    <h4 className="font-brand-heading text-2xl font-bold">{data.weddingDate}</h4>
                    <p className="text-xs text-neutral-300">{data.venueName}</p>
                  </div>
                </div>
              )}

              {/* SHARED CELEBRATIONS SECTION (ALL TEMPLATES) */}
              <div className="my-4 text-left">
                <h5 className="font-brand-heading italic text-lg text-[#541D36] text-center mb-3">Celebrations & Timings</h5>
                <div className="space-y-2">
                  {data.eventsList.filter(ev => data.selectedEvents.includes(ev.id)).map(ev => (
                    <div key={ev.id} className="p-3 bg-white rounded-lg border border-[#B68A50]/20 shadow-xs text-xs">
                      <div className="flex justify-between font-bold text-[#541D36]">
                        <span>{ev.name}</span>
                        <span className="text-[#B68A50]">{ev.time}</span>
                      </div>
                      <p className="text-[10px] text-[#7A6B72] mt-0.5">{ev.venue} · Dress: {ev.dress}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RSVP ACTION BUTTON */}
              <div className="mt-4 pt-3 border-t border-[#B68A50]/20 shrink-0">
                <button 
                  type="button" 
                  className="w-full py-3 rounded-lg bg-[#541D36] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#682443] transition-all"
                >
                  {data.rsvpType === 'WHATSAPP' ? '💬 RSVP via WhatsApp' : data.rsvpButtonText}
                </button>
              </div>

            </div>

            {/* Bottom Home Indicator */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

      </div>

      {/* 3. BOTTOM STICKY ACTION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#541D36] text-[#FFF9F2] px-6 sm:px-12 flex items-center justify-between z-40 border-t border-[#B68A50]/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#B68A50]/40 flex items-center justify-center text-lg">
            {TEMPLATES_LIST.find(t => t.id === template)?.motif}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {TEMPLATES_LIST.find(t => t.id === template)?.name}
            </span>
            <button 
              type="button" 
              onClick={() => setTemplateModalOpen(true)}
              className="text-[10px] text-[#E8C9CD] underline uppercase tracking-wider font-semibold cursor-pointer hover:text-white"
            >
              Change Template
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <div className="text-lg font-bold text-white font-mono">
            ₹1,499 <span className="text-xs font-normal text-[#E8C9CD]">one-time</span>
          </div>
          <p className="text-[10px] text-[#E8C9CD]">Personal dashboard · Mobile optimised · WhatsApp sharing</p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="px-8 py-2.5 rounded-lg bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all cursor-pointer"
          >
            Publish
          </button>
        </div>
      </footer>

      {/* 4. TEMPLATE SELECTOR MODAL */}
      {templateModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFF9F2] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#B68A50]/30 text-[#241C24]">
            <div className="flex justify-between items-center border-b border-[#B68A50]/20 pb-3">
              <h4 className="font-brand-heading italic text-2xl text-[#541D36]">Select Invitation Design</h4>
              <button onClick={() => setTemplateModalOpen(false)} className="text-[#7A6B72] hover:text-[#541D36]">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
              {TEMPLATES_LIST.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { setTemplate(t.id); setTemplateModalOpen(false); }}
                  className={`w-full p-4 rounded-xl text-left border flex justify-between items-center transition-all cursor-pointer ${
                    template === t.id ? 'border-[#541D36] bg-[#541D36]/10 font-bold' : 'border-[#B68A50]/20 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.motif}</span>
                    <div>
                      <span className="block font-bold text-sm text-[#241C24]">{t.name}</span>
                      <span className="text-xs text-[#7A6B72]">{t.tag}</span>
                    </div>
                  </div>
                  {template === t.id && <CheckCircle2 size={18} className="text-[#541D36]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. PUBLISH MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFF9F2] rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-[#B68A50]/30 text-[#241C24]">
            <div className="w-14 h-14 rounded-full bg-[#541D36]/10 text-[#541D36] mx-auto flex items-center justify-center">
              <Sparkles size={28} className="text-[#541D36]" />
            </div>
            <h4 className="font-brand-heading italic text-3xl text-[#541D36]">Publish Your WedLink</h4>
            <p className="text-xs text-[#7A6B72] leading-relaxed">
              Your personalized wedding microsite is ready. Connect your custom domain or share your instant link on WhatsApp.
            </p>
            <div className="p-4 bg-white rounded-xl border border-[#B68A50]/20 font-mono text-lg font-bold text-[#541D36]">
              ₹1,499 <span className="text-xs font-normal text-[#7A6B72]">/ lifetime hosting</span>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`WedLink microsite generated successfully with ${TEMPLATES_LIST.find(t => t.id === template)?.name}!`);
                setPublishModalOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-[#541D36] hover:bg-[#682443] text-[#FFF9F2] font-bold text-xs uppercase tracking-widest shadow-md transition-all"
            >
              Launch Live Website (₹1,499)
            </button>
            <button
              type="button"
              onClick={() => setPublishModalOpen(false)}
              className="text-xs text-[#7A6B72] underline block mx-auto hover:text-[#541D36]"
            >
              Cancel & Continue Editing
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Help Button */}
      <a 
        href={`https://wa.me/919876543210?text=Hi%20WedLink,%20I%20need%20assistance%20with%20my%20wedding%20invitation`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-xl hover:opacity-90 cursor-pointer"
      >
        <HelpCircle size={16} /> NEED HELP?
      </a>
    </div>
  );
}
