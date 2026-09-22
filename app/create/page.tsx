'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowUpRight, Heart, Calendar, MapPin, Users, Camera, Upload, 
  Trash2, CheckCircle2, Sparkles, Music, MessageSquare, Info, Sliders, Eye, 
  RefreshCw, Check, Clock, ShieldCheck, X, ChevronRight, HelpCircle, Feather, Crown
} from 'lucide-react';

// Available Templates for Switching
const TEMPLATES_LIST = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', tag: '3D Palace Doors & Shehnai', motif: '🏰' },
  { id: 'rose-letter', name: 'The Rose Letter', tag: 'Wax Seal & Scratch Card', motif: '💌' },
  { id: 'heritage', name: 'Heritage Rajputana', tag: 'Traditional Royal & Shlokas', motif: '🪔' },
  { id: 'garden-romance', name: 'Garden Romance', tag: 'Botanical Floral Aesthetics', motif: '🌿' },
  { id: 'editorial', name: 'The Editorial', tag: 'Vogue Modern Magazine', motif: '✨' },
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

  // Master Unified State for Form & Live Preview
  const [data, setData] = useState({
    // Essentials
    brideName: 'Priya',
    groomName: 'Arjun',
    orderBrideFirst: true,
    weddingDate: '2026-11-29',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur',
    whatsappNumber: '+91 9876543210',
    hashtag: '#PriyaWedsArjun',
    showCountdown: true,

    // Invitation
    showInvitation: true,
    blessing: 'With the blessings of the divine and the love of our families',
    brideFather: 'Mr. Suresh Sharma',
    brideMother: 'Mrs. Anita Sharma',
    groomFather: 'Mr. Ramesh Kapoor',
    groomMother: 'Mrs. Sunita Kapoor',
    orderParentsBrideFirst: true,
    includeGrandparents: false,

    // Events
    selectedEvents: ['haldi', 'sangeet', 'shaadi', 'reception'],
    eventsList: [
      { id: 'haldi', name: 'Haldi Ceremony', date: '27 Nov 2026', time: '10:00 AM', venue: 'Poolside Lawn', dress: 'Sunshine Yellow' },
      { id: 'sangeet', name: 'Sangeet Gala', date: '28 Nov 2026', time: '07:30 PM', venue: 'Grand Amphitheatre', dress: 'Indo-Western Glamour' },
      { id: 'shaadi', name: 'Sacred Vedic Pheras', date: '29 Nov 2026', time: '06:00 PM', venue: 'Lake Promenade Mandap', dress: 'Royal Traditional' },
      { id: 'reception', name: 'Grand Royal Feast', date: '29 Nov 2026', time: '08:30 PM', venue: 'Palace Ballroom', dress: 'Black Tie Elegance' },
    ],

    // Story / Quiz
    showStory: true,
    storyMode: 'QUIZ', // 'QUIZ' or 'TEXT'
    q1: 'Through family / arranged',
    q2: 'Wanderers — travel is our love language',
    q3: 'Chai and long conversations',
    q4: 'Best friends who fell in love',
    writtenStory: 'From our first conversation over ginger chai to traveling across Rajasthan, we knew we found a forever partner in each other.',

    // Gallery
    showGallery: true,
    galleryLayout: 4,
    galleryPhotos: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600',
    ],

    // Info
    showInfo: true,
    dressCode: 'Ethnic Indian attire — sarees, lehengas & sherwanis with warm pastels.',
    parking: 'Complimentary valet parking available at palace gates.',
    stayInfo: 'Special room blocks booked at The Oberoi Udaivilas. Use Code: WEDLINK2026',
    mapsUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',

    // RSVP
    rsvpType: 'WHATSAPP', // 'WHATSAPP' or 'FORM'
    rsvpHeading: 'Will you join us?',
    rsvpSubtext: "We've saved a seat for you — at our table, in our hearts, and under the Udaipur sky.",
    rsvpButtonText: "Yes, I'll be there",

    // Music
    enableMusic: true,
    songName: 'Royal Shehnai & Sitar Melody',
  });

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedlink_shaadipath_builder') || localStorage.getItem('wedlink_official_builder');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(prev => ({ ...prev, ...parsed }));
          if (parsed.template) setTemplate(parsed.template);
        } catch (e) {}
      }
    }
  }, []);

  // Auto-save to local storage on any edit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const payload = JSON.stringify({ ...data, template });
      localStorage.setItem('wedlink_shaadipath_builder', payload);
      localStorage.setItem('wedlink_official_builder', payload);
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

  // ✅ FREE LIVE PREVIEW HANDLER (बिना पेमेंट के सीधे टेम्पलेट खोलेगा)
  const handleLivePreview = () => {
    if (typeof window !== 'undefined') {
      const payload = JSON.stringify({ ...data, template });
      localStorage.setItem('wedlink_shaadipath_builder', payload);
      localStorage.setItem('wedlink_official_builder', payload);
    }
    window.open(`/templates/${template}?preview=true`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] flex flex-col font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2]">
      
      {/* Google Fonts: Cormorant Garamond & Manrope */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. TOP HEADER */}
      <header className="h-16 bg-[#541D36] text-[#FFF9F2] px-6 flex items-center justify-between z-30 shrink-0 shadow-md border-b border-[#B68A50]/20">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#B68A50]/40 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
              🏰
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
            onClick={() => alert('ड्राफ्ट सफलतापूर्वक सेव हो गया है!')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF9F2] border border-white/20 transition-all uppercase tracking-wider text-[11px]"
          >
            Save Draft
          </button>
          
          {/* ✅ PREVIEW BUTTON (सीधे टेम्पलेट को नए टैब में खोलेगा) */}
          <button 
            type="button"
            onClick={handleLivePreview}
            className="px-4 py-2 rounded-lg bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 text-[11px] shadow-sm cursor-pointer hover:scale-105"
          >
            Preview <ArrowUpRight size={14} />
          </button>

          {/* ✅ SEPARATE PUBLISH BUTTON (पेमेंट सिर्फ यह दबाने पर खुलेगा) */}
          <button 
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#FFF9F2] border border-[#B68A50]/40 font-bold transition-all uppercase tracking-wider text-[11px] cursor-pointer"
          >
            Publish (₹1,499) 🚀
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT-VIEW BODY */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-16">
        
        {/* LEFT COLUMN: BUILDER FORMS & TABS (48% Width) */}
        <div className="w-full lg:w-[48%] bg-white border-r border-[#B68A50]/20 flex flex-col overflow-y-auto">
          
          {/* Active Template Bar with CHANGE button */}
          <div className="p-4 bg-[#FFF9F2] border-b border-[#B68A50]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A6B72]">Template:</span>
              <span className="text-xs font-bold text-[#541D36] uppercase tracking-wider flex items-center gap-1.5">
                <span>{TEMPLATES_LIST.find(t => t.id === template)?.motif || '🏰'}</span>
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

          {/* 8 Sub-Navigation Tabs */}
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
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Heart size={20} className="text-[#B68A50]" /> The Couple
                </h3>

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
                <h3 className="font-brand-heading italic text-2xl text-[#541D36] flex items-center gap-2">
                  <Sparkles size={20} className="text-[#B68A50]" /> Invitation Card
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FFF9F2] border border-[#B68A50]/30 rounded-lg">
