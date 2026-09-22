'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowUpRight, Heart, Calendar, MapPin, Users, Camera, Upload, 
  Trash2, CheckCircle2, Sparkles, Music, MessageSquare, Info, Sliders, Eye, 
  RefreshCw, Check, Clock, ShieldCheck, X, ChevronRight, HelpCircle
} from 'lucide-react';

// Available Templates for Switching
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

  // Auto-save to local storage on any edit
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

  // Helper for Couple Names Display Order
  const primaryCoupleTitle = data.orderBrideFirst 
    ? `${data.brideName} & ${data.groomName}` 
    : `${data.groomName} & ${data.brideName}`;

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2D141E] flex flex-col font-sans selection:bg-[#5E2211] selection:text-white">
      {/* 1. TOP HEADER (EXACT SHAADIPATH STYLE) */}
      <header className="h-14 bg-[#5E2211] text-white px-6 flex items-center justify-between z-30 shrink-0 shadow-md">
        <div className="flex items-center gap-6">
          <a href="/" className="font-serif italic text-2xl font-bold tracking-tight text-white hover:opacity-90">
            WedLink
          </a>
          <span className="text-[11px] text-[#E5B5A1] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            {saveStatus}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <button 
            type="button" 
            onClick={() => alert('Draft automatically saved to this device!')}
            className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all uppercase tracking-wider"
          >
            Save Draft
          </button>
          <a 
            href={`/templates/${template}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded bg-[#3A140A] hover:bg-black/40 text-white border border-white/20 transition-all uppercase tracking-wider flex items-center gap-1"
          >
            Preview <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      {/* 2. MAIN SPLIT-VIEW BODY */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-16">
        
        {/* LEFT COLUMN: BUILDER FORMS & TABS (45% Width) */}
        <div className="w-full lg:w-[48%] bg-white border-r border-[#E2D8CE] flex flex-col overflow-y-auto">
          
          {/* Active Template Bar with CHANGE button */}
          <div className="p-4 bg-[#FBF9F6] border-b border-[#E8DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A70]">Template</span>
              <span className="text-xs font-bold text-[#5E2211] uppercase tracking-wider">
                {TEMPLATES_LIST.find(t => t.id === template)?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTemplateModalOpen(true)}
              className="px-3.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase border border-[#5E2211] text-[#5E2211] hover:bg-[#5E2211] hover:text-white transition-all cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* 8 Sub-Navigation Tabs (Two Rows Like Screenshot) */}
          <div className="bg-[#FAF7F2] border-b border-[#E8DFD5] px-4 pt-3">
            <div className="flex flex-wrap gap-2 text-[11px] font-bold tracking-widest uppercase border-b border-[#E8DFD5]/60 pb-2">
              {(['ESSENTIALS', 'INVITATION', 'EVENTS', 'STORY', 'GALLERY'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 px-2.5 transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'text-[#5E2211] border-b-2 border-[#5E2211] font-black' 
                      : 'text-[#8C7A70] hover:text-[#2D141E]'
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
                      ? 'text-[#5E2211] border-b-2 border-[#5E2211] font-black' 
                      : 'text-[#8C7A70] hover:text-[#2D141E]'
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
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Heart size={20} className="text-[#5E2211]" /> The Couple
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Bride&apos;s Name</label>
                    <input 
                      type="text" 
                      value={data.brideName} 
                      onChange={e => handleTextChange('brideName', e.target.value)}
                      placeholder="e.g. Priya"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Groom&apos;s Name</label>
                    <input 
                      type="text" 
                      value={data.groomName} 
                      onChange={e => handleTextChange('groomName', e.target.value)}
                      placeholder="e.g. Arjun"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#D8CFC4] rounded">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70]">Name Display Order</span>
                      <span className="text-sm font-bold text-[#2D141E]">
                        {data.orderBrideFirst ? "Bride & Groom (Priya & Arjun)" : "Groom & Bride (Arjun & Priya)"}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleTextChange('orderBrideFirst', !data.orderBrideFirst)}
                      className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-[#5E2211] text-[#5E2211] rounded hover:bg-[#5E2211] hover:text-white transition-all"
                    >
                      Switch
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Wedding Date</label>
                      <input 
                        type="date" 
                        value={data.weddingDate} 
                        onChange={e => handleTextChange('weddingDate', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Venue / City</label>
                      <input 
                        type="text" 
                        value={data.venueName} 
                        onChange={e => handleTextChange('venueName', e.target.value)}
                        placeholder="e.g. Umaid Bhawan Palace"
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={data.whatsappNumber} 
                      onChange={e => handleTextChange('whatsappNumber', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Wedding Hashtag</label>
                    <input 
                      type="text" 
                      value={data.hashtag} 
                      onChange={e => handleTextChange('hashtag', e.target.value)}
                      placeholder="#PriyaWedsArjun"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#D8CFC4] rounded">
                    <div>
                      <span className="block text-sm font-bold text-[#2D141E]">Show Countdown Timer</span>
                      <span className="text-xs text-[#8C7A70]">Display the days/hours countdown on your hero section</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.showCountdown} 
                      onChange={e => handleTextChange('showCountdown', e.target.checked)}
                      className="w-5 h-5 accent-[#5E2211]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVITATION */}
            {activeTab === 'INVITATION' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Sparkles size={20} className="text-[#5E2211]" /> Invitation Card
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#D8CFC4] rounded">
                    <div>
                      <span className="block text-sm font-bold text-[#2D141E]">Show Invitation Section</span>
                      <span className="text-xs text-[#8C7A70]">Hide the formal family card from your website</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.showInvitation} 
                      onChange={e => handleTextChange('showInvitation', e.target.checked)}
                      className="w-5 h-5 accent-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Opening Blessing / Shloka</label>
                    <textarea 
                      rows={2}
                      value={data.blessing} 
                      onChange={e => handleTextChange('blessing', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Bride&apos;s Father</label>
                      <input 
                        type="text" 
                        value={data.brideFather} 
                        onChange={e => handleTextChange('brideFather', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Bride&apos;s Mother</label>
                      <input 
                        type="text" 
                        value={data.brideMother} 
                        onChange={e => handleTextChange('brideMother', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Groom&apos;s Father</label>
                      <input 
                        type="text" 
                        value={data.groomFather} 
                        onChange={e => handleTextChange('groomFather', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Groom&apos;s Mother</label>
                      <input 
                        type="text" 
                        value={data.groomMother} 
                        onChange={e => handleTextChange('groomMother', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#D8CFC4] rounded">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70]">Parents Display Order</span>
                      <span className="text-sm font-bold text-[#2D141E]">
                        {data.orderParentsBrideFirst ? "Bride's family first" : "Groom's family first"}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleTextChange('orderParentsBrideFirst', !data.orderParentsBrideFirst)}
                      className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-[#5E2211] text-[#5E2211] rounded hover:bg-[#5E2211] hover:text-white transition-all"
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
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Calendar size={20} className="text-[#5E2211]" /> Celebration Events
                  </h3>
                  <p className="text-xs text-[#8C7A70] mt-1">Select events to include. Each gets an interactive detail card.</p>
                </div>

                {/* Event Chips Grid */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-3">Choose Events</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {EVENT_CHIPS.map(chip => {
                      const isSelected = data.selectedEvents.includes(chip.id);
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => toggleEventChip(chip.id)}
                          className={`p-2.5 rounded border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-[#5E2211] bg-[#5E2211]/10 font-bold text-[#5E2211]' 
                              : 'border-[#D8CFC4] bg-white text-[#6A5E62] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <span className="text-xs flex items-center gap-1.5">
                            <span>{chip.emoji}</span> {chip.name}
                          </span>
                          {isSelected ? <Check size={14} className="text-[#5E2211]" /> : <span className="w-3 h-3 rounded-full border border-[#D8CFC4]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Editable Event Cards */}
                <div className="space-y-3 pt-4 border-t border-[#E8DFD5]">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70]">Event Details</label>
                  {data.eventsList.map((ev, idx) => (
                    <div key={ev.id} className="p-4 bg-[#FAF8F5] border border-[#D8CFC4] rounded space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#5E2211]">{ev.name}</span>
                        <span className="text-xs text-[#8C7A70]">{ev.date} · {ev.time}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input 
                          type="text" 
                          value={ev.venue} 
                          placeholder="Venue" 
                          className="bg-white border border-[#D8CFC4] p-2 rounded"
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
                          className="bg-white border border-[#D8CFC4] p-2 rounded"
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
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Heart size={20} className="text-[#5E2211]" /> Meet the Couple
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex rounded border border-[#5E2211] overflow-hidden text-xs font-bold uppercase">
                    <button
                      type="button"
                      onClick={() => handleTextChange('storyMode', 'QUIZ')}
                      className={`flex-1 py-2.5 transition-all ${data.storyMode === 'QUIZ' ? 'bg-[#5E2211] text-white' : 'bg-white text-[#5E2211]'}`}
                    >
                      Personality Tags (Quiz)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTextChange('storyMode', 'TEXT')}
                      className={`flex-1 py-2.5 transition-all ${data.storyMode === 'TEXT' ? 'bg-[#5E2211] text-white' : 'bg-white text-[#5E2211]'}`}
                    >
                      Our Story (Written)
                    </button>
                  </div>

                  {data.storyMode === 'QUIZ' ? (
                    <div className="space-y-4">
                      <p className="text-xs text-[#8C7A70]">Answer these 4 questions — we will generate personality badges for your invite!</p>
                      
                      <div className="p-3 bg-[#FAF8F5] border border-[#D8CFC4] rounded space-y-2">
                        <label className="text-xs font-bold text-[#2D141E]">How did you two meet?</label>
                        {['Through family / arranged', 'At work or college', 'Through common friends', 'A spontaneous moment'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs text-[#6A5E62] cursor-pointer">
                            <input 
                              type="radio" 
                              name="q1" 
                              checked={data.q1 === opt} 
                              onChange={() => handleTextChange('q1', opt)} 
                              className="accent-[#5E2211]"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>

                      <div className="p-3 bg-[#FAF8F5] border border-[#D8CFC4] rounded space-y-2">
                        <label className="text-xs font-bold text-[#2D141E]">What best describes you together?</label>
                        {['Foodies — always hunting the next meal', 'Wanderers — travel is our love language', 'Social butterflies — love a good party', 'Quiet homebodies'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs text-[#6A5E62] cursor-pointer">
                            <input 
                              type="radio" 
                              name="q2" 
                              checked={data.q2 === opt} 
                              onChange={() => handleTextChange('q2', opt)} 
                              className="accent-[#5E2211]"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Your Story</label>
                      <textarea 
                        rows={4}
                        value={data.writtenStory}
                        onChange={e => handleTextChange('writtenStory', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
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
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Camera size={20} className="text-[#5E2211]" /> Photo Gallery
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {data.galleryPhotos.map((url, i) => (
                      <div key={i} className="border border-[#D8CFC4] rounded p-2.5 bg-[#FAF8F5] text-center space-y-2">
                        <div className="h-32 rounded overflow-hidden bg-black/5 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                        <label className="block py-1 rounded bg-white border border-[#D8CFC4] text-[11px] font-bold uppercase text-[#5E2211] cursor-pointer hover:bg-[#FAF8F5]">
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
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Info size={20} className="text-[#5E2211]" /> Things to Know
                  </h3>
                  <p className="text-xs text-[#8C7A70] mt-1">Helpful logistics and cards for your out-of-town guests.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Dress Code</label>
                    <textarea 
                      rows={2} 
                      value={data.dressCode} 
                      onChange={e => handleTextChange('dressCode', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Parking & Valet</label>
                    <input 
                      type="text" 
                      value={data.parking} 
                      onChange={e => handleTextChange('parking', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Hotel Stay & Promo Codes</label>
                    <input 
                      type="text" 
                      value={data.stayInfo} 
                      onChange={e => handleTextChange('stayInfo', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Google Maps Direction URL</label>
                    <input 
                      type="url" 
                      value={data.mapsUrl} 
                      onChange={e => handleTextChange('mapsUrl', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: RSVP */}
            {activeTab === 'RSVP' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <MessageSquare size={20} className="text-[#5E2211]" /> RSVP Management
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleTextChange('rsvpType', 'WHATSAPP')}
                      className={`p-3 rounded border text-left cursor-pointer transition-all ${
                        data.rsvpType === 'WHATSAPP' ? 'border-[#5E2211] bg-[#5E2211]/10 font-bold' : 'border-[#D8CFC4] bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#5E2211]">💬 WhatsApp 1-Tap</span>
                      <span className="text-[10px] text-[#8C7A70]">Guest sends pre-filled WhatsApp message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTextChange('rsvpType', 'FORM')}
                      className={`p-3 rounded border text-left cursor-pointer transition-all ${
                        data.rsvpType === 'FORM' ? 'border-[#5E2211] bg-[#5E2211]/10 font-bold' : 'border-[#D8CFC4] bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#5E2211]">📋 Digital Form</span>
                      <span className="text-[10px] text-[#8C7A70]">Guests submit count & dietary options</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Section Heading</label>
                    <input 
                      type="text" 
                      value={data.rsvpHeading} 
                      onChange={e => handleTextChange('rsvpHeading', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Subtext / Personal Note</label>
                    <textarea 
                      rows={2}
                      value={data.rsvpSubtext} 
                      onChange={e => handleTextChange('rsvpSubtext', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: MUSIC */}
            {activeTab === 'MUSIC' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif italic text-2xl text-[#2D141E] flex items-center gap-2">
                    <Music size={20} className="text-[#5E2211]" /> Background Music
                  </h3>
                  <p className="text-xs text-[#8C7A70] mt-1">Guests will see a play/mute button on the wedding microsite.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#D8CFC4] rounded">
                    <div>
                      <span className="block text-sm font-bold text-[#2D141E]">Enable Background Music</span>
                      <span className="text-xs text-[#8C7A70]">Plays soothing shehnai/instrumental melody</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={data.enableMusic} 
                      onChange={e => handleTextChange('enableMusic', e.target.checked)}
                      className="w-5 h-5 accent-[#5E2211]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8C7A70] mb-1">Song Display Name</label>
                    <input 
                      type="text" 
                      value={data.songName} 
                      onChange={e => handleTextChange('songName', e.target.value)}
                      placeholder="e.g. Royal Shehnai Melody"
                      className="w-full bg-[#FAF8F5] border border-[#D8CFC4] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5E2211]"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME LIVE PHONE PREVIEW (55% Width) */}
        <div className="w-full lg:w-[52%] bg-[#EAE2D7] p-4 sm:p-8 flex flex-col items-center justify-start overflow-y-auto relative">
          
          {/* Top Label */}
          <div className="w-full max-w-[340px] flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A70]">Live Phone Preview</span>
            <span className="text-[10px] text-[#5E2211] font-semibold bg-white/70 px-2 py-0.5 rounded-full border border-[#D8CFC4]">
              Updates in Real-Time
            </span>
          </div>

          {/* REALISTIC IPHONE MOCKUP FRAME */}
          <div className="relative w-[320px] sm:w-[340px] min-h-[660px] bg-[#1C1D21] rounded-[52px] p-3 border-[4px] border-[#31333B] shadow-2xl shrink-0">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-40 flex items-center justify-end pr-2">
              <div className="w-2.5 h-2.5 bg-[#252830] rounded-full border border-white/20" />
            </div>

            {/* Phone Screen Display (Dynamic Live Template Preview) */}
            <div className="w-full h-full rounded-[42px] overflow-y-auto bg-[#FAF7F2] text-[#2D141E] p-5 pt-8 text-center scrollbar-none">
              
              {/* Header Icon / Palace Art */}
              <div className="pt-4 flex flex-col items-center">
                <span className="text-3xl mb-1">🏰</span>
                <p className="font-serif italic text-2xl text-[#2D141E] mt-1">
                  {data.orderBrideFirst ? `${data.brideName} weds ${data.groomName}` : `${data.groomName} weds ${data.brideName}`}
                </p>
                <p className="text-[10px] tracking-widest text-[#5E2211] font-bold uppercase mt-1">
                  {data.hashtag}
                </p>
              </div>

              {/* Shloka & Blessing Card */}
              {data.showInvitation && (
                <div className="my-6 p-4 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs text-center space-y-2">
                  <span className="text-lg">🙏</span>
                  <p className="font-serif italic text-xs text-[#6A5E62] leading-relaxed">
                    &ldquo;{data.blessing}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#F0EAE1] text-[11px] text-[#8C7A70]">
                    {data.orderParentsBrideFirst ? (
                      <>
                        <p className="font-semibold text-[#2D141E]">Daughter of {data.brideFather} & {data.brideMother}</p>
                        <p className="font-serif italic my-0.5 text-xs">&</p>
                        <p className="font-semibold text-[#2D141E]">Son of {data.groomFather} & {data.groomMother}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-[#2D141E]">Son of {data.groomFather} & {data.groomMother}</p>
                        <p className="font-serif italic my-0.5 text-xs">&</p>
                        <p className="font-semibold text-[#2D141E]">Daughter of {data.brideFather} & {data.brideMother}</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Main Date & Countdown */}
              <div className="my-4 p-4 rounded-xl bg-[#5E2211] text-white text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#E5B5A1] font-bold">The Wedding Date</span>
                <h4 className="font-serif text-xl font-bold mt-0.5">{data.weddingDate}</h4>
                <p className="text-[11px] text-[#E5B5A1]">{data.venueName}, {data.venueCity}</p>
                {data.showCountdown && (
                  <div className="mt-2 pt-2 border-t border-white/20 flex justify-center gap-3 text-xs font-mono font-bold text-white">
                    <span>259d</span> : <span>09h</span> : <span>44m</span> : <span>12s</span>
                  </div>
                )}
              </div>

              {/* Events Preview */}
              <div className="my-5 text-left">
                <h5 className="font-serif italic text-base text-[#2D141E] text-center mb-3">Our Celebrations</h5>
                <div className="space-y-2">
                  {data.eventsList.filter(ev => data.selectedEvents.includes(ev.id)).map(ev => (
                    <div key={ev.id} className="p-3 bg-white rounded-lg border border-[#E8DFD5] shadow-xs text-xs">
                      <div className="flex justify-between font-bold text-[#5E2211]">
                        <span>{ev.name}</span>
                        <span>{ev.time}</span>
                      </div>
                      <p className="text-[10px] text-[#8C7A70] mt-0.5">{ev.venue} · Dress: {ev.dress}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RSVP Button */}
              <div className="mt-6 pt-4 border-t border-[#E8DFD5]">
                <button 
                  type="button" 
                  className="w-full py-3 rounded-lg bg-[#5E2211] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  {data.rsvpType === 'WHATSAPP' ? '💬 RSVP via WhatsApp' : data.rsvpButtonText}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM STICKY ACTION BAR (EXACT SHAADIPATH PRICING BAR) */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#3A140A] text-white px-6 sm:px-12 flex items-center justify-between z-40 border-t border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#5E2211] border border-[#E5B5A1]/40 flex items-center justify-center text-base">
            🏰
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {TEMPLATES_LIST.find(t => t.id === template)?.name}
            </span>
            <button 
              type="button" 
              onClick={() => setTemplateModalOpen(true)}
              className="text-[10px] text-[#E5B5A1] underline uppercase tracking-wider font-semibold cursor-pointer"
            >
              Change Template
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <div className="text-lg font-bold text-white font-mono">
            ₹1,499 <span className="text-xs font-normal text-[#E5B5A1]">one-time</span>
          </div>
          <p className="text-[10px] text-[#E5B5A1]">Personal dashboard · Mobile optimised · WhatsApp sharing</p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="px-8 py-2.5 rounded bg-[#5E2211] hover:bg-[#722A16] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg border border-[#E5B5A1]/30 transition-all cursor-pointer"
          >
            Publish
          </button>
        </div>
      </footer>

      {/* 4. CHANGE TEMPLATE MODAL */}
      {templateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#D8CFC4]">
            <div className="flex justify-between items-center border-b border-[#E8DFD5] pb-3">
              <h4 className="font-serif italic text-2xl text-[#2D141E]">Select Invitation Design</h4>
              <button onClick={() => setTemplateModalOpen(false)} className="text-[#8C7A70] hover:text-black">
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
                    template === t.id ? 'border-[#5E2211] bg-[#5E2211]/10 font-bold' : 'border-[#E8DFD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-sm text-[#2D141E]">{t.name}</span>
                    <span className="text-xs text-[#8C7A70]">{t.tag}</span>
                  </div>
                  {template === t.id && <CheckCircle2 size={18} className="text-[#5E2211]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. PUBLISH & CHECKOUT MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-[#D8CFC4]">
            <div className="w-14 h-14 rounded-full bg-[#5E2211]/10 text-[#5E2211] mx-auto flex items-center justify-center">
              <Sparkles size={28} />
            </div>
            <h4 className="font-serif italic text-3xl text-[#2D141E]">Publish Your Invitation</h4>
            <p className="text-xs text-[#6A5E62] leading-relaxed">
              Your personalized wedding microsite is ready! Click below to unlock your custom link and share it on WhatsApp.
            </p>
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8DFD5] font-mono text-lg font-bold text-[#5E2211]">
              ₹1,499 <span className="text-xs font-normal text-[#8C7A70]">/ lifetime hosting</span>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`Congratulations! Your invitation is ready. Live preview available at: /templates/${template}`);
                window.open(`/templates/${template}`, '_blank');
                setPublishModalOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-[#5E2211] hover:bg-[#722A16] text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              Complete One-Time Payment (₹1,499)
            </button>
            <button
              type="button"
              onClick={() => setPublishModalOpen(false)}
              className="text-xs text-[#8C7A70] underline block mx-auto"
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
