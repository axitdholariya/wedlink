'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowUpRight, Heart, Calendar, MapPin, Users, Camera, Upload, 
  Trash2, CheckCircle2, Sparkles, Music, MessageSquare, Info, Sliders, Eye, 
  RefreshCw, Check, Clock, ShieldCheck, X, ChevronRight, HelpCircle
} from 'lucide-react';

const TEMPLATES_LIST = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', tag: '3D Palace Doors & Shehnai' },
  { id: 'rose-letter', name: 'The Rose Letter', tag: 'Wax Seal & Scratch Card' },
  { id: 'heritage', name: 'Heritage Rajputana', tag: 'Traditional Royal & Shlokas' },
  { id: 'garden-romance', name: 'Garden Romance', tag: 'Botanical Floral Aesthetics' },
  { id: 'editorial', name: 'The Editorial', tag: 'Vogue Modern Magazine' },
];

const EVENT_CHIPS = [
  { id: 'mehendi', name: 'Mehendi', emoji: '🌿' },
  { id: 'haldi', name: 'Haldi', emoji: '🌼' },
  { id: 'sagan', name: 'Sagan', emoji: '🥥' },
  { id: 'cocktail', name: 'Cocktail', emoji: '🥂' },
  { id: 'sangeet', name: 'Sangeet', emoji: '🎵' },
  { id: 'tilak', name: 'Tilak', emoji: '🔴' },
  { id: 'engagement', name: 'Engagement', emoji: '💍' },
  { id: 'baraat', name: 'Baraat', emoji: '🐎' },
  { id: 'shaadi', name: 'Shaadi', emoji: '🌸' },
  { id: 'pheras', name: 'Pheras', emoji: '🔥' },
  { id: 'reception', name: 'Reception', emoji: '👑' },
  { id: 'vidaai', name: 'Vidaai', emoji: '🕊️' },
];

export default function ShaadiPathBuilder() {
  const [activeTab, setActiveTab] = useState<'ESSENTIALS' | 'INVITATION' | 'EVENTS' | 'STORY' | 'GALLERY' | 'INFO' | 'RSVP' | 'MUSIC'>('ESSENTIALS');
  const [template, setTemplate] = useState('royal-courtyard');
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved just now');

  const [data, setData] = useState({
    brideName: 'Priya',
    groomName: 'Arjun',
    orderBrideFirst: true,
    weddingDate: '2026-11-29',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur',
    whatsappNumber: '+91 9876543210',
    hashtag: '#PriyaWedsArjun',
    showCountdown: true,

    showInvitation: true,
    blessing: 'With the blessings of the divine and the love of our families',
    brideFather: 'Mr. Suresh Sharma',
    brideMother: 'Mrs. Anita Sharma',
    groomFather: 'Mr. Ramesh Kapoor',
    groomMother: 'Mrs. Sunita Kapoor',
    orderParentsBrideFirst: true,
    includeGrandparents: false,

    selectedEvents: ['haldi', 'sangeet', 'shaadi', 'reception'],
    eventsList: [
      { id: 'haldi', name: 'Haldi Ceremony', date: '27 Nov 2026', time: '10:00 AM', venue: 'Poolside Lawn', dress: 'Sunshine Yellow' },
      { id: 'sangeet', name: 'Sangeet Gala', date: '28 Nov 2026', time: '07:30 PM', venue: 'Grand Amphitheatre', dress: 'Indo-Western Glamour' },
      { id: 'shaadi', name: 'Sacred Vedic Pheras', date: '29 Nov 2026', time: '06:00 PM', venue: 'Lake Promenade Mandap', dress: 'Royal Traditional' },
      { id: 'reception', name: 'Grand Royal Feast', date: '29 Nov 2026', time: '08:30 PM', venue: 'Palace Ballroom', dress: 'Black Tie Elegance' },
    ],

    showStory: true,
    storyMode: 'QUIZ',
    q1: 'Through family / arranged',
    q2: 'Wanderers — travel is our love language',
    q3: 'Chai and long conversations',
    q4: 'Best friends who fell in love',
    writtenStory: 'From our first conversation over ginger chai to traveling across Rajasthan, we knew we found a forever partner in each other.',

    showGallery: true,
    galleryLayout: 4,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600',
    ],

    showInfo: true,
    dressCode: 'Ethnic Indian attire — sarees, lehengas & sherwanis with warm pastels.',
    parking: 'Complimentary valet parking available at palace gates.',
    stayInfo: 'Special room blocks booked at The Oberoi Udaivilas. Use Code: WEDLINK2026',
    mapsUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',

    rsvpType: 'WHATSAPP',
    rsvpHeading: 'Will you join us?',
    rsvpSubtext: "We've saved a seat for you — at our table, in our hearts, and under the Udaipur sky.",
    rsvpButtonText: "Yes, I'll be there",

    enableMusic: true,
    songName: 'Royal Shehnai & Sitar Melody',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedlink_shaadipath_builder');
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
      localStorage.setItem('wedlink_shaadipath_builder', JSON.stringify({ ...data, template }));
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

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] flex flex-col font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2]">
      
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

      {/* 1. TOP HEADER (BRAND WINE & OFFICIAL LOGO) */}
      <header className="h-16 bg-[#541D36] text-[#FFF9F2] px-6 flex items-center justify-between z-30 shrink-0 shadow-md border-b border-[#B68A50]/20">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 group">
            {/* Official Ribbon 'W' Brand Emblem */}
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
            onClick={() => alert('Draft automatically saved to this device!')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF9F2] border border-white/20 transition-all uppercase tracking-wider text-[11px]"
          >
            Save Draft
          </button>
          <a 
            href={`/templates/${template}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 text-[11px] shadow-sm"
          >
            Preview <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* 2. MAIN SPLIT-VIEW BODY */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-16">
        
        {/* LEFT COLUMN: BUILDER FORMS & TABS (48% Width) */}
        <div className="w-full lg:w-[48%] bg-white border-r border-[#B68A50]/20 flex flex-col overflow-y-auto">
          
          <div className="p-4 bg-[#FFF9F2] border-b border-[#B68A50]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A6B72]">Template</span>
              <span className="text-xs font-bold text-[#541D36] uppercase tracking-wider">
                {TEMPLATES_LIST.find(t => t.id === template)?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTemplateModalOpen(true)}
              className="px-3.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase border border-[#541D36] text-[#541D36] hover:bg-[#541D36] hover:text-[#FFF9F2] transition-all cursor-pointer"
            >
              Change
            </button>
          </div>

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

          {/* TAB CONTENTS */}
          <div className="p-6 sm:p-8 space-y-6">

            {/* TAB 1: ESSENTIALS */}
            {activeTab === 'ESSENTIALS' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Heart size={20} className="text-[#B68A50]" /> The Couple
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Bride&apos;s Name</label>
                    <input 
                      type="text" 
                      value={data.brideName} 
                      onChange={e => handleTextChange('brideName', e.target.value)}
                      placeholder="e.g. Priya"
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Groom&apos;s Name</label>
                    <input 
                      type="text" 
                      value={data.groomName} 
                      onChange={e => handleTextChange('groomName', e.target.value)}
                      placeholder="e.g. Arjun"
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72]">Name Display Order</span>
                      <span className="text-sm font-bold text-[#241C24]">
                        {data.orderBrideFirst ? "Bride & Groom (Priya & Arjun)" : "Groom & Bride (Arjun & Priya)"}
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
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Venue / City</label>
                      <input 
                        type="text" 
                        value={data.venueName} 
                        onChange={e => handleTextChange('venueName', e.target.value)}
                        placeholder="e.g. Umaid Bhawan Palace"
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={data.whatsappNumber} 
                      onChange={e => handleTextChange('whatsappNumber', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Wedding Hashtag</label>
                    <input 
                      type="text" 
                      value={data.hashtag} 
                      onChange={e => handleTextChange('hashtag', e.target.value)}
                      placeholder="#PriyaWedsArjun"
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-sm font-bold text-[#241C24]">Show Countdown Timer</span>
                      <span className="text-xs text-[#7A6B72]">Display the days/hours countdown on your hero section</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.showCountdown} 
                      onChange={e => handleTextChange('showCountdown', e.target.checked)}
                      className="w-5 h-5 accent-[#541D36]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVITATION */}
            {activeTab === 'INVITATION' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Sparkles size={20} className="text-[#B68A50]" /> Invitation Card
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-sm font-bold text-[#241C24]">Show Invitation Section</span>
                      <span className="text-xs text-[#7A6B72]">Hide the formal family card from your website</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.showInvitation} 
                      onChange={e => handleTextChange('showInvitation', e.target.checked)}
                      className="w-5 h-5 accent-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Opening Blessing / Shloka</label>
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

                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72]">Parents Display Order</span>
                      <span className="text-sm font-bold text-[#241C24]">
                        {data.orderParentsBrideFirst ? "Bride's family first" : "Groom's family first"}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleTextChange('orderParentsBrideFirst', !data.orderParentsBrideFirst)}
                      className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-[#541D36] text-[#541D36] rounded-md hover:bg-[#541D36] hover:text-[#FFF9F2] transition-all"
                    >
                      Switch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EVENTS */}
            {activeTab === 'EVENTS' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Calendar size={20} className="text-[#B68A50]" /> Celebration Events
                  </h3>
                  <p className="text-xs text-[#7A6B72] mt-1">Select events to include. Each gets an interactive detail card.</p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-3">Choose Events</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                          {isSelected ? <Check size={14} className="text-[#541D36]" /> : <span className="w-3 h-3 rounded-full border border-[#B68A50]/40" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#B68A50]/20">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72]">Event Details</label>
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

            {/* TAB 4: STORY & QUIZ */}
            {activeTab === 'STORY' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Heart size={20} className="text-[#B68A50]" /> Meet the Couple
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex rounded-lg border border-[#541D36] overflow-hidden text-xs font-bold uppercase">
                    <button
                      type="button"
                      onClick={() => handleTextChange('storyMode', 'QUIZ')}
                      className={`flex-1 py-2.5 transition-all ${data.storyMode === 'QUIZ' ? 'bg-[#541D36] text-[#FFF9F2]' : 'bg-white text-[#541D36]'}`}
                    >
                      Personality Tags (Quiz)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTextChange('storyMode', 'TEXT')}
                      className={`flex-1 py-2.5 transition-all ${data.storyMode === 'TEXT' ? 'bg-[#541D36] text-[#FFF9F2]' : 'bg-white text-[#541D36]'}`}
                    >
                      Our Story (Written)
                    </button>
                  </div>

                  {data.storyMode === 'QUIZ' ? (
                    <div className="space-y-4">
                      <p className="text-xs text-[#7A6B72]">Answer these questions — we will generate personality badges for your invite!</p>
                      
                      <div className="p-3 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg space-y-2">
                        <label className="text-xs font-bold text-[#241C24]">How did you two meet?</label>
                        {['Through family / arranged', 'At work or college', 'Through common friends', 'A spontaneous moment'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs text-[#7A6B72] cursor-pointer">
                            <input 
                              type="radio" 
                              name="q1" 
                              checked={data.q1 === opt} 
                              onChange={() => handleTextChange('q1', opt)} 
                              className="accent-[#541D36]"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>

                      <div className="p-3 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg space-y-2">
                        <label className="text-xs font-bold text-[#241C24]">What best describes you together?</label>
                        {['Foodies — always hunting the next meal', 'Wanderers — travel is our love language', 'Social butterflies — love a good party', 'Quiet homebodies'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs text-[#7A6B72] cursor-pointer">
                            <input 
                              type="radio" 
                              name="q2" 
                              checked={data.q2 === opt} 
                              onChange={() => handleTextChange('q2', opt)} 
                              className="accent-[#541D36]"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Your Story</label>
                      <textarea 
                        rows={4}
                        value={data.writtenStory}
                        onChange={e => handleTextChange('writtenStory', e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'GALLERY' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Camera size={20} className="text-[#B68A50]" /> Photo Gallery
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {data.galleryPhotos.map((url, i) => (
                      <div key={i} className="border border-[#B68A50]/30 rounded-lg p-2.5 bg-[#FFF9F2] text-center space-y-2">
                        <div className="h-32 rounded overflow-hidden bg-black/5 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                        <label className="block py-1 rounded bg-white border border-[#B68A50]/30 text-[11px] font-bold uppercase text-[#541D36] cursor-pointer hover:bg-[#FFF9F2]">
                          Upload Photo {i + 1}
                          <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, i)} className="hidden" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: INFO */}
            {activeTab === 'INFO' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Info size={20} className="text-[#B68A50]" /> Things to Know
                  </h3>
                  <p className="text-xs text-[#7A6B72] mt-1">Helpful logistics and cards for your out-of-town guests.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Dress Code</label>
                    <textarea 
                      rows={2} 
                      value={data.dressCode} 
                      onChange={e => handleTextChange('dressCode', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Parking & Valet</label>
                    <input 
                      type="text" 
                      value={data.parking} 
                      onChange={e => handleTextChange('parking', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Hotel Stay & Promo Codes</label>
                    <input 
                      type="text" 
                      value={data.stayInfo} 
                      onChange={e => handleTextChange('stayInfo', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Google Maps Direction URL</label>
                    <input 
                      type="url" 
                      value={data.mapsUrl} 
                      onChange={e => handleTextChange('mapsUrl', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: RSVP */}
            {activeTab === 'RSVP' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <MessageSquare size={20} className="text-[#B68A50]" /> RSVP Management
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleTextChange('rsvpType', 'WHATSAPP')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        data.rsvpType === 'WHATSAPP' ? 'border-[#541D36] bg-[#541D36]/10 font-bold' : 'border-[#B68A50]/30 bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#541D36]">💬 WhatsApp 1-Tap</span>
                      <span className="text-[10px] text-[#7A6B72]">Guest sends pre-filled WhatsApp message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTextChange('rsvpType', 'FORM')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        data.rsvpType === 'FORM' ? 'border-[#541D36] bg-[#541D36]/10 font-bold' : 'border-[#B68A50]/30 bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#541D36]">📋 Digital Form</span>
                      <span className="text-[10px] text-[#7A6B72]">Guests submit count & dietary options</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Section Heading</label>
                    <input 
                      type="text" 
                      value={data.rsvpHeading} 
                      onChange={e => handleTextChange('rsvpHeading', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Subtext / Personal Note</label>
                    <textarea 
                      rows={2} 
                      value={data.rsvpSubtext} 
                      onChange={e => handleTextChange('rsvpSubtext', e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: MUSIC */}
            {activeTab === 'MUSIC' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                    <Music size={20} className="text-[#B68A50]" /> Background Music
                  </h3>
                  <p className="text-xs text-[#7A6B72] mt-1">Guests will see a play/mute button on the wedding microsite.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
                    <div>
                      <span className="block text-sm font-bold text-[#241C24]">Enable Background Music</span>
                      <span className="text-xs text-[#7A6B72]">Plays soothing shehnai/instrumental melody</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.enableMusic} 
                      onChange={e => handleTextChange('enableMusic', e.target.checked)}
                      className="w-5 h-5 accent-[#541D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#7A6B72] mb-1">Song Display Name</label>
                    <input 
                      type="text" 
                      value={data.songName} 
                      onChange={e => handleTextChange('songName', e.target.value)}
                      placeholder="e.g. Royal Shehnai Melody"
                      className="w-full bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#541D36]"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME LIVE PHONE PREVIEW (52% Width - Fixed iPhone Frame) */}
        <div className="w-full lg:w-[52%] bg-[#FAF4ED] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Top Label */}
          <div className="w-full max-w-[340px] sm:max-w-[360px] flex items-center justify-between mb-3 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A6B72] font-brand-body">Live Phone Preview</span>
            <span className="text-[10px] text-[#541D36] font-semibold bg-white/80 px-2.5 py-0.5 rounded-full border border-[#B68A50]/30 font-brand-body">
              Updates in Real-Time
            </span>
          </div>

          {/* FIXED REALISTIC IPHONE MOCKUP FRAME (No Infinite Downward Stretch) */}
          <div className="relative w-[340px] sm:w-[360px] h-[700px] max-h-[calc(100vh-140px)] bg-[#1A181B] rounded-[50px] p-3.5 border-[4px] border-[#2D2A2E] shadow-2xl shrink-0 flex flex-col">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end pr-2.5">
              <div className="w-2 h-2 bg-[#252830] rounded-full border border-white/20" />
            </div>

            {/* Inner Screen Display (Scrolling strictly inside) */}
            <div className="relative w-full flex-1 rounded-[40px] overflow-y-auto overflow-x-hidden bg-[#FFF9F2] text-[#241C24] p-5 pt-7 text-center scrollbar-none flex flex-col">
              
              {/* Header Icon / Palace Art (Fixed Size Container) */}
              <div className="pt-3 flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#541D36]/10 flex items-center justify-center text-2xl mb-1 shadow-xs border border-[#B68A50]/20">
                  🏰
                </div>
                <p className="font-brand-heading italic text-2xl font-bold text-[#541D36] mt-1">
                  {data.orderBrideFirst ? `${data.brideName} weds ${data.groomName}` : `${data.groomName} weds ${data.brideName}`}
                </p>
                <p className="text-[10px] tracking-widest text-[#B68A50] font-bold uppercase mt-0.5 font-brand-body">
                  {data.hashtag}
                </p>
              </div>

              {/* Shloka & Blessing Card */}
              {data.showInvitation && (
                <div className="my-5 p-4 rounded-2xl bg-white border border-[#B68A50]/20 shadow-xs text-center space-y-2 shrink-0">
                  <span className="text-lg">🙏</span>
                  <p className="font-brand-heading italic text-xs text-[#7A6B72] leading-relaxed">
                    &ldquo;{data.blessing}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#B68A50]/15 text-[11px] text-[#7A6B72]">
                    {data.orderParentsBrideFirst ? (
                      <>
                        <p className="font-semibold text-[#241C24]">Daughter of {data.brideFather} & {data.brideMother}</p>
                        <p className="font-brand-heading italic my-0.5 text-xs text-[#B68A50]">&</p>
                        <p className="font-semibold text-[#241C24]">Son of {data.groomFather} & {data.groomMother}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-[#241C24]">Son of {data.groomFather} & {data.groomMother}</p>
                        <p className="font-brand-heading italic my-0.5 text-xs text-[#B68A50]">&</p>
                        <p className="font-semibold text-[#241C24]">Daughter of {data.brideFather} & {data.brideMother}</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Main Date & Countdown Card */}
              <div className="my-3 p-4 rounded-xl bg-[#541D36] text-[#FFF9F2] text-center shadow-md shrink-0">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C9CD] font-bold font-brand-body">The Wedding Date</span>
                <h4 className="font-brand-heading text-2xl font-bold mt-0.5 text-[#FFF9F2]">{data.weddingDate}</h4>
                <p className="text-[11px] text-[#E8C9CD] font-brand-body">{data.venueName}, {data.venueCity}</p>
                {data.showCountdown && (
                  <div className="mt-2 pt-2 border-t border-white/20 flex justify-center gap-3 text-xs font-mono font-bold text-white">
                    <span>259d</span> : <span>09h</span> : <span>44m</span> : <span>12s</span>
                  </div>
                )}
              </div>

              {/* Events Preview */}
              <div className="my-4 text-left shrink-0">
                <h5 className="font-brand-heading italic text-lg text-[#541D36] text-center mb-3">Our Celebrations</h5>
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

              {/* RSVP Button Inside Phone */}
              <div className="mt-4 pt-3 border-t border-[#B68A50]/20 shrink-0">
                <button 
                  type="button" 
                  className="w-full py-3 rounded-lg bg-[#541D36] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#682443] transition-all"
                >
                  {data.rsvpType === 'WHATSAPP' ? '💬 RSVP via WhatsApp' : data.rsvpButtonText}
                </button>
              </div>

            </div>

            {/* iPhone Bottom Home Indicator Bar */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

      </div>

      {/* 3. BOTTOM STICKY ACTION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#541D36] text-[#FFF9F2] px-6 sm:px-12 flex items-center justify-between z-40 border-t border-[#B68A50]/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 border border-[#B68A50]/40 flex items-center justify-center text-base">
            🏰
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

      {/* 4. CHANGE TEMPLATE MODAL */}
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
                  <div>
                    <span className="block font-bold text-sm text-[#241C24]">{t.name}</span>
                    <span className="text-xs text-[#7A6B72]">{t.tag}</span>
                  </div>
                  {template === t.id && <CheckCircle2 size={18} className="text-[#541D36]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. PUBLISH & CHECKOUT MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFF9F2] rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-[#B68A50]/30 text-[#241C24]">
            <div className="w-14 h-14 rounded-full bg-[#541D36]/10 text-[#541D36] mx-auto flex items-center justify-center">
              <Sparkles size={28} className="text-[#541D36]" />
            </div>
            <h4 className="font-brand-heading italic text-3xl text-[#541D36]">Publish Your Invitation</h4>
            <p className="text-xs text-[#7A6B72] leading-relaxed">
              Your personalized wedding microsite is ready! Click below to unlock your custom link and share it on WhatsApp.
            </p>
            <div className="p-4 bg-white rounded-xl border border-[#B68A50]/20 font-mono text-lg font-bold text-[#541D36]">
              ₹1,499 <span className="text-xs font-normal text-[#7A6B72]">/ lifetime hosting</span>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`Congratulations! Your invitation is ready. Live preview available at: /templates/${template}`);
                window.open(`/templates/${template}`, '_blank');
                setPublishModalOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-[#541D36] hover:bg-[#682443] text-[#FFF9F2] font-bold text-xs uppercase tracking-widest shadow-md transition-all"
            >
              Complete One-Time Payment (₹1,499)
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

      {/* Floating Need Help WhatsApp Button */}
      <a 
        href={`https://wa.me/919876543210?text=Hi%20WedLink,%20I%20need%20help%20with%20my%20wedding%20invitation`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-xl hover:opacity-90 cursor-pointer"
      >
        <HelpCircle size={16} /> NEED HELP?
      </a>
    </div>
  );
}
