'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Heart,
  Plus,
  Trash2,
  Upload,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
  X,
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Tag,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { example, type Invite } from '@/app/shared';

// Import All 5 Templates
import EditorialInvitation from '@/app/editorial-invitation';
import GardenRomance from '@/app/garden-romance';
import HeritageInvitation from '@/app/heritage-invitation';
import RoseLetter from '@/app/rose-letter';
import RoyalCourtyard from '@/app/royal-courtyard';

type Tab =
  | 'essentials'
  | 'invitation'
  | 'events'
  | 'story'
  | 'gallery'
  | 'info'
  | 'review';

type TemplateKey =
  | 'rose-letter'
  | 'royal-courtyard'
  | 'editorial'
  | 'garden-romance'
  | 'heritage';

interface WeddingEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string;
}

// Preset Indian Ceremonies with smart default timings
const PRESET_EVENTS = [
  { name: 'Haldi & Kumkum Ceremony', defaultTime: '10:00 AM', emoji: '🌼' },
  { name: 'Mehndi & High Tea', defaultTime: '04:00 PM', emoji: '🌿' },
  { name: 'Sangeet & Cocktail Night', defaultTime: '07:30 PM', emoji: '💃' },
  { name: 'Mandva / Mameru Ritual', defaultTime: '09:30 AM', emoji: '🪔' },
  { name: 'Baraat & Grand Welcome', defaultTime: '04:30 PM', emoji: '🥁' },
  { name: 'The Royal Wedding & Phere', defaultTime: '06:15 PM', emoji: '💍' },
  { name: 'Grand Reception Gala', defaultTime: '08:00 PM', emoji: '🥂' },
];

// Available Promo Codes (Free test passes + Discounts)
const PROMO_CODES: Record<
  string,
  { discount: number; type: 'percent' | 'flat'; label: string }
> = {
  WEDVIP: { discount: 100, type: 'percent', label: '100% Admin Free Pass' },
  TESTFREE: { discount: 100, type: 'percent', label: '100% Free Testing Pass' },
  WEDLINK100: { discount: 100, type: 'percent', label: '100% Founder Pass' },
  WEDDING2026: { discount: 500, type: 'flat', label: '₹500 Wedding Special Discount' },
  EARLYBIRD: { discount: 300, type: 'flat', label: '₹300 Early Bird Offer' },
};

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState<Tab>('essentials');
  const [template, setTemplate] = useState<TemplateKey>('editorial');

  // Modal & Payment States
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [publishStep, setPublishStep] = useState<'checkout' | 'success'>('checkout');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    type: 'percent' | 'flat';
    label: string;
  } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState('');
  const [copied, setCopied] = useState(false);

  // Basic Info State
  const [brideName, setBrideName] = useState('Priya');
  const [groomName, setGroomName] = useState('Arjun');
  const [nameOrder, setNameOrder] = useState<'brideFirst' | 'groomFirst'>('brideFirst');

  // Date & Message State
  const [date, setDate] = useState('2026-11-28');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [message, setMessage] = useState(
    'Together with our families, we invite you to celebrate our wedding day.'
  );

  // Story & Family State
  const [story, setStory] = useState(
    'In every lifetime, it would be you. Two paths crossed, and a forever began.'
  );
  const [firstFamily, setFirstFamily] = useState('Together with the Sharma family');
  const [secondFamily, setSecondFamily] = useState('Together with the Kapoor family');

  // Events State
  const [events, setEvents] = useState<WeddingEvent[]>([
    {
      name: 'Sangeet & Cocktail Night',
      date: '2026-11-27',
      time: '07:30 PM',
      venue: 'Poolside Lawn, The Oberoi Udaivilas',
      address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
    },
    {
      name: 'The Royal Wedding & Phere',
      date: '2026-11-28',
      time: '05:30 PM',
      venue: 'The Grand Courtyard, The Oberoi Udaivilas',
      address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
    },
  ]);

  // Gallery State (1, 2, 4 Photos)
  const [includeGallery, setIncludeGallery] = useState(true);
  const [photoLayout, setPhotoLayout] = useState<'skip' | '1' | '2' | '4'>('4');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    '',
    '',
  ]);

  // Info State
  const [dressCode, setDressCode] = useState('Royal Traditional Indian Elegance');
  const [accommodation, setAccommodation] = useState(
    'Special room blocks negotiated at The Oberoi Udaivilas. Code: WEDLINK2026'
  );
  const [gifts, setGifts] = useState(
    'Your presence and blessings are our greatest gift.'
  );

  // File Upload Handler
  const handlePhotoUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const updated = [...photos];
      updated[index] = url;
      setPhotos(updated);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index: number) => {
    const updated = [...photos];
    updated[index] = '';
    setPhotos(updated);
  };

  // Quick Add Preset Event
  const addPresetEvent = (preset: (typeof PRESET_EVENTS)[0]) => {
    setEvents([
      ...events,
      {
        name: preset.name,
        date: date,
        time: preset.defaultTime,
        venue: events[0]?.venue || 'Venue Name',
        address: events[0]?.address || 'City, State',
        mapUrl: events[0]?.mapUrl || '',
      },
    ]);
  };

  const validUploadedPhotos = photos.filter(Boolean);
  const activePhotos =
    includeGallery && photoLayout !== 'skip'
      ? validUploadedPhotos.slice(0, Number(photoLayout))
      : [];

  const firstName = nameOrder === 'brideFirst' ? brideName : groomName;
  const secondName = nameOrder === 'brideFirst' ? groomName : brideName;

  // Build Invitation Data Payload
  const inviteData: Invite = {
    ...example,
    first: firstName || 'Bride',
    second: secondName || 'Groom',
    date: date,
    timezone: timezone,
    message: message,
    story: story,
    firstFamily: firstFamily,
    secondFamily: secondFamily,
    dressCode: dressCode,
    accommodation: accommodation,
    gifts: gifts,
    events: events,
    photo: activePhotos[0] || example.photo,
    photos: activePhotos.length > 0 ? activePhotos : [example.photo],
  };

  // Pricing Calculation
  const BASE_PRICE = 1499;
  let finalPrice = BASE_PRICE;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      finalPrice = Math.max(0, BASE_PRICE - (BASE_PRICE * appliedPromo.discount) / 100);
    } else {
      finalPrice = Math.max(0, BASE_PRICE - appliedPromo.discount);
    }
  }

  // Handle Promo Code Apply
  const applyPromoCode = () => {
    setPromoError('');
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...PROMO_CODES[cleanCode],
      });
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try WEDVIP for 100% free test access.');
    }
  };

  // Handle Publish / Payment Action
  const handlePublishProcess = async () => {
    setIsProcessing(true);

    // Create unique slug for invitation URL
    const cleanFirst = (firstName || 'couple').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanSecond = (secondName || 'wedding').toLowerCase().replace(/[^a-z0-9]/g, '');
    const slug = `${cleanFirst}-${cleanSecond}`;
    setGeneratedSlug(slug);

    // Seed / Save Data locally so /invite/[id] can read it immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wedlink_${slug}`, JSON.stringify(inviteData));
      localStorage.setItem('wedlink_last_invite', JSON.stringify({ slug, ...inviteData }));
    }

    // Call backend API if present
    try {
      await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, template, ...inviteData }),
      });
    } catch (err) {
      // Graceful fallback to client-side storage
      console.log('Saved locally to client storage.');
    }

    // If Free Promo (Price = 0), skip payment gateway
    if (finalPrice === 0) {
      setTimeout(() => {
        setIsProcessing(false);
        setPublishStep('success');
      }, 700);
      return;
    }

    // If Paid: Trigger Razorpay Checkout if loaded, or simulate demo payment
    if (typeof (window as any).Razorpay !== 'undefined') {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_demo',
        amount: finalPrice * 100,
        currency: 'INR',
        name: 'WedLink',
        description: `${firstName} & ${secondName} Wedding Invitation`,
        handler: function () {
          setIsProcessing(false);
          setPublishStep('success');
        },
        prefill: {
          name: `${firstName} ${secondName}`,
          email: 'hello@wedlink.co',
        },
        theme: { color: '#C9A24F' },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setIsProcessing(false);
    } else {
      // Demo Success Flow
      setTimeout(() => {
        setIsProcessing(false);
        setPublishStep('success');
      }, 1000);
    }
  };

  // Live URL Helper
  const liveUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/invite/${generatedSlug || 'wedding'}`
      : `https://wedlink.co/invite/${generatedSlug || 'wedding'}`;

  // WhatsApp Share Text
  const whatsappShareText = encodeURIComponent(
    `💍 With joyful hearts, ${firstName} & ${secondName} invite you to celebrate our wedding!\n\nTap the link below to open our interactive 3D wedding invitation:\n🔗 ${liveUrl}\n\nWe can't wait to celebrate with you!`
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderTemplate = () => {
    switch (template) {
      case 'rose-letter':
        return <RoseLetter data={inviteData} />;
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
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'essentials', label: 'Essentials' },
    { key: 'invitation', label: 'Invitation' },
    { key: 'events', label: 'Events' },
    { key: 'story', label: 'Story' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'info', label: 'Info' },
    { key: 'review', label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D141E] selection:bg-[#341822] selection:text-[#FAF7F2]">
      {/* 👑 ULTRA-LUXURY TOP HEADER */}
      <header
        style={{ position: 'sticky', top: 0, zIndex: 9999, pointerEvents: 'auto' }}
        className="flex items-center justify-between border-b border-[#E8DFD5]/90 bg-[#FAF7F2]/95 px-6 sm:px-10 py-3 backdrop-blur-md shadow-xs transition-all"
      >
        <Link
          href="/"
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          className="group flex items-center gap-2 rounded-full border border-[#D9CFC4] bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#2D141E] shadow-2xs transition-all hover:border-[#C9A24F] hover:bg-[#F3EDE2] hover:shadow-xs active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5 text-[#C9A24F]" />
          <span>Back to Wedlink</span>
        </Link>

        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-serif tracking-[0.25em] text-sm sm:text-base font-bold text-[#2D141E] uppercase">
            WED<span className="text-[#C9A24F]">LINK</span>
          </span>
          <span className="text-[9px] tracking-[0.22em] font-medium text-[#8A7B75] uppercase hidden sm:block">
            Bespoke 3D Invitation Studio
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            setPublishStep('checkout');
            setIsPublishOpen(true);
          }}
          style={{
            cursor: 'pointer',
            pointerEvents: 'auto',
            background: 'linear-gradient(135deg, #D4AF37 0%, #C9A24F 50%, #A87A24 100%)',
            boxShadow: '0 4px 16px rgba(201, 162, 79, 0.3)',
          }}
          className="group flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-95 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Publish (₹1,499)</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </header>

      {/* Main Grid: Left Form Builder, Right Sticky Phone Preview */}
      <main className="mx-auto grid max-w-[1550px] grid-cols-1 gap-8 p-4 lg:grid-cols-12 lg:p-8">
        {/* LEFT COLUMN: BUILDER TABS & FORM */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C9A24F] uppercase block mb-1">
              Personalize Your Celebration
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2D141E]">
              Your forever, in the details.
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#7A6B65]">
              A few thoughtful details. An extraordinary, living mobile invitation.
            </p>
          </div>

          {/* Luxury Tab Navigation */}
          <div className="mb-8 flex overflow-x-auto border-b border-[#E8DFD5] pb-px">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`whitespace-nowrap px-4 py-2.5 text-xs font-semibold tracking-wider transition-all cursor-pointer uppercase ${
                  activeTab === t.key
                    ? 'border-b-2 border-[#C9A24F] text-[#341822]'
                    : 'text-[#8A7B75] hover:text-[#2D141E]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ESSENTIALS */}
          {activeTab === 'essentials' && (
            <div className="space-y-8 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A7B75]">
                  Select 3D Template
                </h2>
                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { id: 'rose-letter', title: 'Rose Letter', desc: 'Blush Wax Seal · Scratch Heart' },
                    { id: 'royal-courtyard', title: 'Royal Courtyard', desc: 'Carved Palace Gates · Shehnai' },
                    { id: 'editorial', title: 'Editorial', desc: 'Vogue Minimalist · Vertical Scroll' },
                    { id: 'garden-romance', title: 'Garden Romance', desc: 'Botanical Bloom · 3D Fan Orbit' },
                    { id: 'heritage', title: 'Heritage', desc: 'Gold Royal Arch · Regal Blessings' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setTemplate(tpl.id as TemplateKey)}
                      className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                        template === tpl.id
                          ? 'border-[#C9A24F] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#E8DFD5] hover:border-[#C4B5A5] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-serif font-bold text-sm text-[#2D141E]">{tpl.title}</span>
                        {template === tpl.id && <Check size={16} className="text-[#C9A24F]" />}
                      </div>
                      <span className="text-[11px] text-[#8A7B75] mt-1">{tpl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#F0EAE1] pt-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A7B75]">
                  The Couple
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-[#5A4B45]">Bride's Name</label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      placeholder="e.g. Priya"
                      className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5A4B45]">Groom's Name</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="e.g. Arjun"
                      className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-[#5A4B45]">Name Display Order</label>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setNameOrder('brideFirst')}
                      className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                        nameOrder === 'brideFirst'
                          ? 'border-[#341822] bg-[#341822] text-white shadow-xs'
                          : 'border-[#E8DFD5] hover:border-[#C4B5A5]'
                      }`}
                    >
                      Bride & Groom ({brideName} & {groomName})
                    </button>
                    <button
                      type="button"
                      onClick={() => setNameOrder('groomFirst')}
                      className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                        nameOrder === 'groomFirst'
                          ? 'border-[#341822] bg-[#341822] text-white shadow-xs'
                          : 'border-[#E8DFD5] hover:border-[#C4B5A5]'
                      }`}
                    >
                      Groom & Bride ({groomName} & {brideName})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVITATION */}
          {activeTab === 'invitation' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Wedding Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Welcome Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS (WITH QUICK CEREMONY BUTTONS + MAPS LINK) */}
          {activeTab === 'events' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div className="rounded-xl border border-[#E8DFD5] bg-[#FAF7F2] p-4.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#341822]">
                    ⚡ Quick Add Ceremonies
                  </span>
                  <span className="text-[11px] font-medium text-[#C9A24F]">Tap to add instantly</span>
                </div>
                <p className="mt-1 text-xs text-[#7A6B65]">
                  Select common functions below to quickly add them to your itinerary:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESET_EVENTS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => addPresetEvent(preset)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D9CFC4] bg-white px-3.5 py-1.5 text-xs font-medium text-[#341822] shadow-2xs transition-all hover:border-[#C9A24F] hover:bg-[#F3EDE2] active:scale-95 cursor-pointer"
                    >
                      <span>{preset.emoji}</span>
                      <span>{preset.name}</span>
                      <Plus size={13} className="text-[#C9A24F]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A7B75]">
                  Celebration Schedule ({events.length} Events)
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setEvents([
                      ...events,
                      {
                        name: 'New Celebration',
                        date: date,
                        time: '07:00 PM',
                        venue: events[0]?.venue || 'Venue Name',
                        address: events[0]?.address || 'City, State',
                        mapUrl: '',
                      },
                    ])
                  }
                  className="flex items-center gap-1 text-xs font-semibold text-[#C9A24F] hover:underline cursor-pointer"
                >
                  <Plus size={14} /> Custom Event
                </button>
              </div>

              {events.map((ev, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#E8DFD5] bg-white p-4.5 space-y-3.5 shadow-2xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold tracking-wider text-[#8A7B75] uppercase">
                      Event 0{i + 1}
                    </span>
                    {events.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setEvents(events.filter((_, idx) => idx !== i))}
                        className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#7A6B65]">Ceremony Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sangeet & Cocktails"
                      value={ev.name}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[i].name = e.target.value;
                        setEvents(updated);
                      }}
                      className="mt-1 w-full rounded-lg border border-[#E8DFD5] p-2 text-sm outline-none focus:border-[#C9A24F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#7A6B65]">Date</label>
                      <input
                        type="date"
                        value={ev.date}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[i].date = e.target.value;
                          setEvents(updated);
                        }}
                        className="mt-1 w-full rounded-lg border border-[#E8DFD5] p-2 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#7A6B65]">Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 10:00 AM / 07:00 PM"
                        value={ev.time}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[i].time = e.target.value;
                          setEvents(updated);
                        }}
                        className="mt-1 w-full rounded-lg border border-[#E8DFD5] p-2 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#7A6B65]">Venue / Resort Name</label>
                    <input
                      type="text"
                      placeholder="Hotel / Resort Name"
                      value={ev.venue}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[i].venue = e.target.value;
                        setEvents(updated);
                      }}
                      className="mt-1 w-full rounded-lg border border-[#E8DFD5] p-2 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#7A6B65]">Address & City</label>
                    <input
                      type="text"
                      placeholder="Full street address and city"
                      value={ev.address}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[i].address = e.target.value;
                        setEvents(updated);
                      }}
                      className="mt-1 w-full rounded-lg border border-[#E8DFD5] p-2 text-sm outline-none"
                    />
                  </div>

                  {/* 📍 GOOGLE MAPS LINK INPUT */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-[#7A6B65]">
                        Google Maps Link (Location Pin)
                      </label>
                      <span className="text-[10px] text-[#A89A90]">Optional</span>
                    </div>
                    <div className="relative mt-1">
                      <input
                        type="url"
                        placeholder="https://maps.app.goo.gl/... or paste Google Maps URL"
                        value={ev.mapUrl || ''}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[i].mapUrl = e.target.value;
                          setEvents(updated);
                        }}
                        className="w-full rounded-lg border border-[#E8DFD5] pl-8 pr-3 py-2 text-sm outline-none focus:border-[#C9A24F]"
                      />
                      <MapPin
                        size={15}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#C9A24F]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: STORY */}
          {activeTab === 'story' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Our Story</label>
                <textarea
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#5A4B45]">Groom's Family Blessing</label>
                  <input
                    type="text"
                    value={firstFamily}
                    onChange={(e) => setFirstFamily(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5A4B45]">Bride's Family Blessing</label>
                  <input
                    type="text"
                    value={secondFamily}
                    onChange={(e) => setSecondFamily(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A7B75]">
                    Photo Layout
                  </h2>
                  <p className="text-xs text-[#8A7B75] mt-0.5">
                    Select how many photos you want to show in your invitation.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={includeGallery}
                    onChange={(e) => setIncludeGallery(e.target.checked)}
                    className="rounded text-[#341822]"
                  />
                  Include Gallery section
                </label>
              </div>

              {/* Layout Toggle Buttons */}
              <div className="flex gap-2">
                {[
                  { id: 'skip', label: '✕ Skip' },
                  { id: '1', label: '1 Photo' },
                  { id: '2', label: '2 Photos' },
                  { id: '4', label: '4 Photos' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setPhotoLayout(l.id as any)}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      photoLayout === l.id
                        ? 'border-[#C9A24F] bg-[#341822] text-white shadow-xs'
                        : 'border-[#E8DFD5] bg-white text-[#5A4B45] hover:border-[#C4B5A5]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Upload Slots */}
              {photoLayout !== 'skip' && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
                  {Array.from({ length: 4 }).map((_, idx) => {
                    const isAllowed = idx < Number(photoLayout);
                    const photoUrl = photos[idx];

                    return (
                      <div
                        key={idx}
                        className={`relative rounded-xl border-2 border-dashed p-3 text-center transition-all ${
                          !isAllowed
                            ? 'opacity-40 border-[#E8DFD5] bg-gray-50 pointer-events-none'
                            : photoUrl
                            ? 'border-solid border-[#C9A24F] bg-[#FAF7F2]'
                            : 'border-[#D9CFC4] hover:border-[#C9A24F]'
                        }`}
                      >
                        {photoUrl ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={photoUrl}
                              alt={`Photo ${idx + 1}`}
                              className="h-28 w-full rounded-lg object-cover"
                            />
                            <div className="mt-2 flex w-full justify-between items-center text-xs">
                              <span className="font-semibold text-[#5A4B45]">Photo {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex h-32 flex-col items-center justify-center cursor-pointer">
                            <Camera size={22} className="text-[#C9A24F]" />
                            <span className="mt-2 text-[11px] font-semibold text-[#8A7B75] uppercase">
                              Click to upload
                              <br />
                              Photo {idx + 1}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(idx, e)}
                            />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INFO */}
          {activeTab === 'info' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 sm:p-7 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Dress Code</label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Your Stay / Accommodation</label>
                <input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Gifts Policy</label>
                <input
                  type="text"
                  value={gifts}
                  onChange={(e) => setGifts(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24F]"
                />
              </div>
            </div>
          )}

          {/* TAB 7: REVIEW */}
          {activeTab === 'review' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-8 shadow-xs text-center">
              <Sparkles size={40} className="mx-auto text-[#C9A24F]" />
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2D141E]">
                Your Invitation is Ready!
              </h2>
              <p className="text-sm text-[#7A6B65] max-w-md mx-auto">
                Check the live preview on the right. When you're ready, activate and publish your link
                to share on WhatsApp, Instagram bio, and email.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPublishStep('checkout');
                    setIsPublishOpen(true);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #C9A24F 50%, #A87A24 100%)',
                    boxShadow: '0 4px 18px rgba(201, 162, 79, 0.35)',
                  }}
                  className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:opacity-95 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  🚀 Publish Your WedLink (₹1,499 / $39)
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                const idx = tabs.findIndex((t) => t.key === activeTab);
                if (idx > 0) setActiveTab(tabs[idx - 1].key);
              }}
              disabled={activeTab === 'essentials'}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#8A7B75] hover:text-[#2D141E] disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft size={14} /> Previous
            </button>
            <button
              type="button"
              onClick={() => {
                const idx = tabs.findIndex((t) => t.key === activeTab);
                if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].key);
              }}
              disabled={activeTab === 'review'}
              className="flex items-center gap-1.5 rounded-xl bg-[#341822] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90 disabled:opacity-40 cursor-pointer"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY LIVE MOBILE PREVIEW */}
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="sticky top-20 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="relative h-[780px] w-full max-w-[390px] overflow-hidden rounded-[44px] border-[10px] border-[#1C1816] bg-black shadow-2xl ring-1 ring-black/5">
              {/* Camera Dynamic Island */}
              <div className="absolute top-3 left-1/2 z-50 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />

              {/* Scrollable Live Invitation Screen */}
              <div className="h-full w-full overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
                {renderTemplate()}
              </div>
            </div>

            <span className="mt-3.5 text-xs font-medium text-[#8A7B75]">
              Live preview · Updates as you type
            </span>
          </div>
        </div>
      </main>

      {/* 🚀 COMPREHENSIVE PAYMENT & PUBLISH MODAL (WITH PROMO CODE & WHATSAPP SHARING) */}
      {isPublishOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#E8DFD5] bg-[#FAF7F2] p-6 sm:p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsPublishOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#8A7B75] shadow-xs hover:bg-[#F3EDE2] hover:text-[#2D141E] cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* STEP 1: CHECKOUT & PROMO CODE */}
            {publishStep === 'checkout' && (
              <>
                <Sparkles size={38} className="mx-auto text-[#C9A24F]" />
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D141E]">
                  Publish Your WedLink
                </h2>
                <p className="mt-1 text-xs text-[#7A6B65]">
                  {firstName} & {secondName}'s Wedding Invitation
                </p>

                {/* Order Summary Card */}
                <div className="mt-5 rounded-2xl border border-[#E8DFD5] bg-white p-5 text-left shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
                    <div>
                      <span className="font-semibold text-sm text-[#2D141E] block">
                        Template: {template.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[#7A6B65]">Lifetime Hosting & Domain</span>
                    </div>
                    <span className="rounded-full bg-[#EBF7EE] px-2.5 py-1 text-[11px] font-bold text-[#1E7E34]">
                      Active Forever
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2 text-xs text-[#5A4B45]">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#C9A24F]" />
                      <span>3D Interactive Unboxing & Shehnai/Music</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#C9A24F]" />
                      <span>Google Maps Location Routing for all {events.length} events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#C9A24F]" />
                      <span>Instant RSVP management with Google Sheets</span>
                    </div>
                  </div>

                  {/* PROMO CODE SECTION */}
                  <div className="mt-4 border-t border-[#F0EAE1] pt-3">
                    <label className="text-[11px] font-semibold text-[#7A6B65] uppercase tracking-wider block mb-1.5">
                      Have a Promo Code / VIP Pass?
                    </label>

                    {appliedPromo ? (
                      <div className="flex items-center justify-between rounded-xl bg-[#F4F9F4] border border-[#CDE5D1] px-3 py-2 text-xs text-[#1E7E34]">
                        <div className="flex items-center gap-1.5">
                          <Tag size={13} />
                          <span className="font-bold">{appliedPromo.code}</span>
                          <span>({appliedPromo.label})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter Code (e.g. WEDVIP)"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                            className="w-full rounded-xl border border-[#E8DFD5] pl-8 pr-3 py-2 text-xs uppercase outline-none focus:border-[#C9A24F]"
                          />
                          <Tag size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A7B75]" />
                        </div>
                        <button
                          type="button"
                          onClick={applyPromoCode}
                          className="rounded-xl border border-[#341822] bg-[#341822] px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {promoError && (
                      <span className="text-[11px] text-red-500 mt-1 block text-left">
                        {promoError}
                      </span>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-4 flex items-baseline justify-between border-t border-[#F0EAE1] pt-3">
                    <span className="text-xs font-semibold text-[#8A7B75]">Total Payable:</span>
                    <div className="text-right">
                      {appliedPromo && (
                        <span className="mr-2 text-xs text-[#8A7B75] line-through">₹1,499</span>
                      )}
                      <span className="font-serif text-2xl font-bold text-[#341822]">
                        {finalPrice === 0 ? 'FREE' : `₹${finalPrice}`}
                      </span>
                      {finalPrice > 0 && <span className="ml-1 text-xs text-[#8A7B75]">($39)</span>}
                    </div>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePublishProcess}
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #C9A24F 50%, #A87A24 100%)',
                      boxShadow: '0 4px 18px rgba(201, 162, 79, 0.35)',
                    }}
                    className="w-full rounded-2xl py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing
                      ? 'Publishing your invitation…'
                      : finalPrice === 0
                      ? 'Claim Free & Publish Link 🚀'
                      : `Pay ₹${finalPrice} & Get Live Link 🚀`}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6B65]">
                    <ShieldCheck size={13} className="text-[#1E7E34]" />
                    <span>Instant Live Delivery · 100% Secure & Verified</span>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: SUCCESS & SHARE VIA WHATSAPP / GMAIL */}
            {publishStep === 'success' && (
              <div className="py-2 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF7EE] text-[#1E7E34] shadow-xs">
                  <Check size={32} strokeWidth={2.5} />
                </div>

                <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-[#2D141E]">
                  Your WedLink is Live!
                </h2>
                <p className="mt-1 text-xs text-[#7A6B65]">
                  Congratulations! {firstName} & {secondName}'s invitation is now live worldwide.
                </p>

                {/* Live Link Box */}
                <div className="mt-5 rounded-2xl border border-[#C9A24F] bg-white p-4 shadow-xs text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7B75]">
                    Your Official Link
                  </span>
                  <div className="mt-1.5 flex items-center justify-between gap-2 rounded-xl bg-[#FAF7F2] p-2.5">
                    <span className="truncate text-xs font-semibold text-[#341822]">
                      {liveUrl}
                    </span>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 rounded-lg bg-[#341822] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 cursor-pointer shrink-0"
                    >
                      <Copy size={13} />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="mt-5 space-y-2.5">
                  {/* WhatsApp Share Button */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    <span>Share on WhatsApp</span>
                  </a>

                  {/* Gmail / Email Share Button */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Wedding Invitation: ${firstName} &${secondName}`
                    )}&body=${encodeURIComponent(
                      `Dear Family & Friends,\n\nWe invite you to celebrate our wedding!\nExperience our 3D invitation here: ${liveUrl}\n\nWarm regards,\n${firstName} &${secondName}`
                    )}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D9CFC4] bg-white py-3 text-xs sm:text-sm font-semibold text-[#2D141E] shadow-2xs hover:bg-[#F3EDE2] transition-all cursor-pointer"
                  >
                    <Mail size={16} className="text-[#C9A24F]" />
                    <span>Send via Email / Gmail</span>
                  </a>

                  {/* Open Live Site */}
                  <a
                    href={`/invite/${generatedSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 pt-2 text-xs font-bold text-[#C9A24F] hover:underline cursor-pointer"
                  >
                    <span>View Live Invitation</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
