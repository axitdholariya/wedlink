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
}

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState<Tab>('essentials');
  const [template, setTemplate] = useState<TemplateKey>('garden-romance');

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
      name: 'Haldi & Mehndi Ceremony',
      date: '2026-11-27',
      time: '10:00 AM',
      venue: 'Poolside Lawn, The Oberoi Udaivilas',
      address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
    },
    {
      name: 'The Royal Wedding & Phere',
      date: '2026-11-28',
      time: '05:30 PM',
      venue: 'The Grand Courtyard, The Oberoi Udaivilas',
      address: 'Haridas Ji Ki Magri, Udaipur, Rajasthan',
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

  // Prepare active photos array according to layout
  const validUploadedPhotos = photos.filter(Boolean);
  const activePhotos =
    includeGallery && photoLayout !== 'skip'
      ? validUploadedPhotos.slice(0, Number(photoLayout))
      : [];

  // Active names based on display order
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
    // Pass single photo and full array for templates
    photo: activePhotos[0] || example.photo,
    photos: activePhotos.length > 0 ? activePhotos : [example.photo],
  };

  // Switch Template Component
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
        return <GardenRomance data={inviteData} />;
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D141E]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E8DFD5] bg-[#FAF7F2]/90 px-6 py-3.5 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-[#2D141E] hover:opacity-80"
        >
          <ArrowLeft size={15} /> Back to Wedlink
        </Link>
        <span className="font-serif text-sm font-semibold tracking-wider uppercase text-[#2D141E]">
          Wedlink · Invitation Builder
        </span>
        <button
          onClick={() => setActiveTab('review')}
          className="rounded-full bg-[#341822] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
        >
          Publish (₹1,499)
        </button>
      </header>

      {/* Main Grid: Left Form Builder, Right Sticky Phone Preview */}
      <main className="mx-auto grid max-w-[1550px] grid-cols-1 gap-8 p-4 lg:grid-cols-12 lg:p-8">
        {/* LEFT COLUMN: BUILDER TABS & FORM */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-medium tracking-tight">
              Your forever, in the details.
            </h1>
            <p className="mt-1 text-sm text-[#7A6B65]">
              A few little details. A beautifully personal invitation.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 flex overflow-x-auto border-b border-[#E8DFD5] pb-px">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`whitespace-nowrap px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === t.key
                    ? 'border-b-2 border-[#341822] text-[#341822]'
                    : 'text-[#8A7B75] hover:text-[#2D141E]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ESSENTIALS */}
          {activeTab === 'essentials' && (
            <div className="space-y-8 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A7B75]">
                  Your Design
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    { id: 'rose-letter', title: 'Rose Letter' },
                    { id: 'royal-courtyard', title: 'Royal Courtyard' },
                    { id: 'editorial', title: 'Editorial' },
                    { id: 'garden-romance', title: 'Garden Romance' },
                    { id: 'heritage', title: 'Heritage' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setTemplate(tpl.id as TemplateKey)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                        template === tpl.id
                          ? 'border-[#341822] bg-[#F7F2EB] text-[#341822] font-semibold'
                          : 'border-[#E8DFD5] hover:border-[#C4B5A5]'
                      }`}
                    >
                      <span>{tpl.title}</span>
                      {template === tpl.id && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A7B75]">
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
                      className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5A4B45]">Groom's Name</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="e.g. Arjun"
                      className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-[#5A4B45]">Name Display Order</label>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => setNameOrder('brideFirst')}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                        nameOrder === 'brideFirst'
                          ? 'border-[#341822] bg-[#341822] text-white'
                          : 'border-[#E8DFD5]'
                      }`}
                    >
                      Bride & Groom ({brideName} & {groomName})
                    </button>
                    <button
                      onClick={() => setNameOrder('groomFirst')}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                        nameOrder === 'groomFirst'
                          ? 'border-[#341822] bg-[#341822] text-white'
                          : 'border-[#E8DFD5]'
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
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Wedding Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Welcome Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A7B75]">
                  Celebration Schedule
                </h2>
                <button
                  onClick={() =>
                    setEvents([
                      ...events,
                      {
                        name: 'New Celebration',
                        date: date,
                        time: '07:00 PM',
                        venue: 'Venue Name',
                        address: 'City, State',
                      },
                    ])
                  }
                  className="flex items-center gap-1 text-xs font-semibold text-[#341822] hover:underline"
                >
                  <Plus size={14} /> Add Event
                </button>
              </div>

              {events.map((ev, i) => (
                <div key={i} className="rounded-xl border border-[#E8DFD5] p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#8A7B75]">Event 0{i + 1}</span>
                    {events.length > 1 && (
                      <button
                        onClick={() => setEvents(events.filter((_, idx) => idx !== i))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={ev.name}
                    onChange={(e) => {
                      const updated = [...events];
                      updated[i].name = e.target.value;
                      setEvents(updated);
                    }}
                    className="w-full rounded-lg border border-[#E8DFD5] p-2 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={ev.date}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[i].date = e.target.value;
                        setEvents(updated);
                      }}
                      className="rounded-lg border border-[#E8DFD5] p-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Time (e.g. 10:00 AM)"
                      value={ev.time}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[i].time = e.target.value;
                        setEvents(updated);
                      }}
                      className="rounded-lg border border-[#E8DFD5] p-2 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Venue"
                    value={ev.venue}
                    onChange={(e) => {
                      const updated = [...events];
                      updated[i].venue = e.target.value;
                      setEvents(updated);
                    }}
                    className="w-full rounded-lg border border-[#E8DFD5] p-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={ev.address}
                    onChange={(e) => {
                      const updated = [...events];
                      updated[i].address = e.target.value;
                      setEvents(updated);
                    }}
                    className="w-full rounded-lg border border-[#E8DFD5] p-2 text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: STORY */}
          {activeTab === 'story' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Our Story</label>
                <textarea
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none focus:border-[#341822]"
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

          {/* TAB 5: GALLERY (MULTIPLE PHOTOS) */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A7B75]">
                    Photo Layout
                  </h2>
                  <p className="text-xs text-[#8A7B75]">
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
                    onClick={() => setPhotoLayout(l.id as any)}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                      photoLayout === l.id
                        ? 'border-[#341822] bg-[#341822] text-white shadow-xs'
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
                  {.map((idx) => {
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
                            : 'border-[#D9CFC4] hover:border-[#341822]'
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
                                onClick={() => removePhoto(idx)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex h-32 flex-col items-center justify-center cursor-pointer">
                            <Camera size={22} className="text-[#8A7B75]" />
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
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs">
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Dress Code</label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Your Stay / Accommodation</label>
                <input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A4B45]">Gifts Policy</label>
                <input
                  type="text"
                  value={gifts}
                  onChange={(e) => setGifts(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8DFD5] px-3.5 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 7: REVIEW */}
          {activeTab === 'review' && (
            <div className="space-y-6 rounded-2xl border border-[#E8DFD5] bg-white p-6 shadow-xs text-center">
              <Sparkles size={36} className="mx-auto text-[#C9A24F]" />
              <h2 className="font-serif text-2xl font-semibold">Your Invitation is Ready!</h2>
              <p className="text-sm text-[#7A6B65] max-w-md mx-auto">
                Check the live preview on the right. Once satisfied, publish your invitation link
                to share on WhatsApp and Instagram.
              </p>
              <div className="pt-4">
                <button className="rounded-full bg-[#341822] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90">
                  🚀 Publish Your WedLink (₹1,499 / $39)
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => {
                const idx = tabs.findIndex((t) => t.key === activeTab);
                if (idx > 0) setActiveTab(tabs[idx - 1].key);
              }}
              disabled={activeTab === 'essentials'}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#8A7B75] hover:text-[#2D141E] disabled:opacity-40"
            >
              <ArrowLeft size={14} /> Previous
            </button>
            <button
              onClick={() => {
                const idx = tabs.findIndex((t) => t.key === activeTab);
                if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].key);
              }}
              disabled={activeTab === 'review'}
              className="flex items-center gap-1.5 rounded-xl bg-[#341822] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-90 disabled:opacity-40"
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
    </div>
  );
}
