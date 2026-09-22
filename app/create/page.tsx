'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Check, ImagePlus, LockKeyhole, Plus, Trash2,
  Monitor, Smartphone
} from 'lucide-react';
import { Brand, example, Invitation, templates, type Invite } from '../shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PRESET_EVENTS = [
  'Mehendi', 'Haldi', 'Sagan', 'Cocktail', 'Sangeet',
  'Tilak', 'Engagement', 'Baraat', 'Shaadi', 'Pheras', 'Reception', 'Vidaai'
];

const PRESET_INFO_CARDS = [
  { id: 'dressCode', label: 'Dress Code', defaultVal: 'Ethnic Indian attire — sarees, lehengas, sherwanis.' },
  { id: 'parking', label: 'Parking', defaultVal: 'Complimentary valet parking available at the venue.' },
  { id: 'hashtag', label: 'Wedding Hashtag', defaultVal: '#YourWeddingHashtag — tag all your photos & reels!' },
  { id: 'venue', label: 'Venue', defaultVal: 'Venue address and directions.' },
  { id: 'giftRegistry', label: 'Gift Registry', defaultVal: 'Your presence & blessings are our greatest gift.' },
  { id: 'stayOptions', label: 'Stay Options', defaultVal: 'Special room blocks reserved for guests.' },
  { id: 'food', label: 'Food', defaultVal: 'Pure vegetarian & multi-cuisine royal feast.' },
  { id: 'weather', label: 'Weather', defaultVal: 'Pleasant evening with mild breeze.' }
];

export default function Create() {
  const [data, setData] = useState<Invite>({
    ...example,
    first: '',
    second: '',
    date: '',
    photo: undefined,
    story: '',
    message: '',
    timezone: 'Asia/Kolkata',
    orderBrideFirst: true,
    whatsapp: '',
    hashtag: '',
    mainVenue: '',
    showCountdown: true,
    showInvitation: true,
    openingBlessing: 'With the blessings of the divine and the love of our families',
    brideFather: '',
    brideMother: '',
    groomFather: '',
    groomMother: '',
    parentsBrideFirst: true,
    includeGrandparents: false,
    showStory: true,
    storyMode: 'tags',
    meetWay: '',
    coupleVibe: '',
    morningVibe: '',
    loveDescription: '',
    customHashtag: '',
    extraTags: '',
    showGallery: true,
    galleryLayout: '2',
    galleryPhotos: [],
    showInfo: true,
    activeInfoCards: ['dressCode', 'parking', 'hashtag', 'venue'],
    infoCards: {
      dressCode: { value: 'Ethnic Indian attire — sarees, lehengas, sherwanis.' },
      parking: { value: 'Complimentary valet parking available at the venue.' },
      hashtag: { value: '#YourWeddingHashtag — tag all your photos & reels!' },
      venue: { value: 'Venue address and directions.', mapsUrl: '' },
      giftRegistry: { value: 'Your presence & blessings are our greatest gift.' },
      stayOptions: { value: 'Special room blocks reserved for guests.' },
      food: { value: 'Pure vegetarian & multi-cuisine royal feast.' },
      weather: { value: 'Pleasant evening with mild breeze.' }
    },
    events: [
      { name: 'Mehendi', date: '', time: '14:00', venue: '', address: '', oneLiner: 'An afternoon of henna artistry, folk music, and marigolds.', mapsUrl: '' },
      { name: 'Haldi', date: '', time: '10:00', venue: '', address: '', oneLiner: 'Golden hues, saffron paste, and laughter filling the morning air.', mapsUrl: '' },
      { name: 'Shaadi', date: '', time: '17:00', venue: '', address: '', oneLiner: 'Seven vows, one lifetime — the ceremony that begins forever.', mapsUrl: '' },
      { name: 'Reception', date: '', time: '19:30', venue: '', address: '', oneLiner: 'A grand evening of dinner, music, and celebrations.', mapsUrl: '' }
    ]
  });

  const [step, setStep] = useState('essentials');
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [config, setConfig] = useState({ checkoutReady: false, price: '' });
  const [wide, setWide] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const t = p.get('template');
    if (templates.some(x => x.id === t)) setData(d => ({ ...d, template: t! }));
    fetch('/api/config').then(r => r.json() as Promise<{ checkoutReady: boolean; price: string }>).then(setConfig).catch(() => {});
    const id = p.get('draft');
    if (id) {
      setBusy(true);
      fetch('/api/drafts/' + encodeURIComponent(id)).then(async r => {
        const d = await responseData(r);
        if (!r.ok) throw Error(d.error);
        if (d.status === 'paid') { location.href = '/invite/' + id; return; }
        setData(d.data);
        setDraft(id);
        setNotice('Your private draft is restored. If you make changes, save them as a new draft before checkout.');
      }).catch(e => setError(e.message)).finally(() => setBusy(false));
    }
    return () => { objectUrls.current.forEach(u => URL.revokeObjectURL(u)); };
  }, []);

  function change(key: keyof Invite, value: any) {
    setData(d => ({ ...d, [key]: value }));
    setDraft('');
    setNotice('');
    setError('');
  }

  function updateEvent(index: number, key: string, value: string) {
    change('events', data.events.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  function togglePresetEvent(name: string) {
    const exists = data.events.some(e => e.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      if (data.events.length > 1) {
        change('events', data.events.filter(e => e.name.toLowerCase() !== name.toLowerCase()));
      }
    } else {
      change('events', [...data.events, { name, date: data.date, time: '17:00', venue: data.mainVenue || '', address: '', oneLiner: '', mapsUrl: '' }]);
    }
  }

  function toggleInfoCard(id: string) {
    const active = data.activeInfoCards || [];
    if (active.includes(id)) {
      change('activeInfoCards', active.filter(x => x !== id));
    } else {
      change('activeInfoCards', [...active, id]);
    }
  }

  function updateInfoCard(id: string, field: 'value' | 'mapsUrl', val: string) {
    const prev = data.infoCards || {};
    const curr = prev[id] || { value: '' };
    change('infoCards', {
      ...prev,
      [id]: { ...curr, [field]: val }
    });
  }

  async function uploadSlot(f: File | undefined, index: number) {
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type) || f.size > 5 * 1024 * 1024) {
      setError('Choose a JPG, PNG or WebP photo under 5 MB.');
      return;
    }
    try {
      const bitmap = await createImageBitmap(f);
      const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw Error('Photo processing unavailable.');
      ctx.fillStyle = '#fff9f2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(b => (b ? resolve(b) : reject(Error('Photo could not be processed.'))), 'image/jpeg', 0.82)
      );
      if (blob.size > 900000) throw Error('Please choose a simpler or smaller photo.');
      const optimized = new File([blob], `photo_${index + 1}.jpg`, { type: 'image/jpeg' });
      const newUrl = URL.createObjectURL(optimized);
      objectUrls.current.push(newUrl);

      setFiles(prev => {
        const arr = [...prev];
        arr[index] = optimized;
        return arr;
      });

      const currentPhotos = [...(data.galleryPhotos || [])];
      currentPhotos[index] = newUrl;
      for (let i = 0; i < index; i++) {
        if (!currentPhotos[i]) currentPhotos[i] = '';
      }

      setData(d => ({
        ...d,
        galleryPhotos: currentPhotos,
        photo: currentPhotos.find(Boolean) || newUrl
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'This photo could not be opened.');
    }
  }

  function removeSlot(index: number) {
    const currentPhotos = [...(data.galleryPhotos || [])];
    currentPhotos[index] = '';
    setFiles(prev => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
    setData(d => ({
      ...d,
      galleryPhotos: currentPhotos,
      photo: currentPhotos.find(Boolean) || undefined
    }));
  }

  async function responseData(r: Response) {
    if (!r.headers.get('content-type')?.includes('application/json')) {
      throw Error(r.status === 413 ? 'Your photo is too large.' : 'The service is temporarily unavailable.');
    }
    return (await r.json()) as { id: string; status: string; data: Invite; error: string; url: string };
  }

  async function save() {
    setError('');
    setNotice('');
    if (!data.first.trim() || !data.second.trim() || !data.date) {
      setStep('essentials');
      setError('Add both bride and groom names and your wedding date first.');
      return;
    }
    if (data.events.some(e => !e.name.trim() || !e.date || !e.time || !e.venue.trim())) {
      setStep('events');
      setError('Add a name, date, time and venue for every event.');
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.set('data', JSON.stringify(data));
      files.forEach((fileItem, idx) => {
        if (fileItem) form.append(`photo_${idx}`, fileItem);
      });
      if (files[0]) form.set('photo', files[0]);

      const r = await fetch('/api/drafts', { method: 'POST', body: form });
      const d = await responseData(r);
      if (!r.ok) throw Error(d.error);
      setDraft(d.id);
      history.replaceState(null, '', '/create?draft=' + d.id);
      setStep('review');
      setNotice('Your private draft is saved.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function checkout() {
    if (!draft) return;
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: draft })
      });
      const d = await responseData(r);
      if (!r.ok) throw Error(d.error);
      location.href = d.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout unavailable.');
      setBusy(false);
    }
  }

  const activeLayout = data.galleryLayout || '2';
  const slotCount = activeLayout === '1' ? 1 : activeLayout === '2' ? 2 : activeLayout === '4' ? 4 : 0;

  return (
    <>
      {/* ========================================================= */}
      {/* 100% CLICKABLE HEADER BAR WITH FORCED HIGH Z-INDEX        */}
      {/* ========================================================= */}
      <header
        className="builder-nav"
        style={{
          position: 'relative',
          zIndex: 9999,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* 1. CLICKABLE LOGO */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          title="Go to Homepage"
        >
          <Brand />
        </a>

        {/* 2. CLICKABLE BACK TO COLLECTION */}
        <a
          href="/#collection"
          className="text-button"
          onClick={(e) => { e.preventDefault(); window.location.href = '/#collection'; }}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          title="Back to collection"
        >
          <ArrowLeft size={16} />
          <span>Back to collection</span>
        </a>

        {/* 3. CLICKABLE PRIVATE UNTIL YOU PUBLISH (OPENS MODAL / JUMPS TO REVIEW) */}
        <button
          type="button"
          className="private-label"
          onClick={() => setShowPrivacyModal(true)}
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.85)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '12px'
          }}
          title="Click to view privacy status"
        >
          <LockKeyhole size={14} style={{ color: '#8C6228' }} />
          <span>Private until you publish</span>
        </button>
      </header>

      {/* PRIVACY POPUP MODAL */}
      {showPrivacyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 32px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#B68A50' }}>
              <LockKeyhole size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1E26', marginBottom: '8px' }}>
              Your Draft is 100% Private
            </h3>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
              आपकी शादी की जानकारी और फ़ोटो पूरी तरह सुरक्षित हैं। जब तक आप <strong>"Publish"</strong> बटन दबाकर अपनी वेबसाइट लाइव नहीं करते, तब तक यह किसी भी बाहरी व्यक्ति या सर्च इंजन को दिखाई नहीं देगी।
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                style={{ flex: 1, padding: '10px', borderRadius: '12px', background: '#F3F4F6', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => { setShowPrivacyModal(false); setStep('review'); }}
                style={{ flex: 1, padding: '10px', borderRadius: '12px', background: '#541D36', color: '#FFF', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
              >
                Go to Publish 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="builder">
        <div className="editor" id="invitation-details">
          <span className="eyebrow">MAKE IT MEANINGFUL. MAKE IT YOURS.</span>
          <h1>Your forever,<br /><em>in the details.</em></h1>
          <p className="editor-intro">A few little details. A beautifully personal invitation.</p>
          <a className="mobile-preview-link text-button" href="#invitation-preview">
            See your invitation <Smartphone size={17} />
          </a>

          <Tabs value={step} onValueChange={setStep}>
            <TabsList className="editor-tabs overflow-x-auto flex whitespace-nowrap">
              <TabsTrigger value="essentials">Essentials</TabsTrigger>
              <TabsTrigger value="invitation">Invitation</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>

            <form ref={formRef} onSubmit={e => { e.preventDefault(); save(); }}>
              
              {/* TAB 1: ESSENTIALS */}
              <TabsContent value="essentials">
                <fieldset>
                  <legend>Your design</legend>
                  <RadioGroup value={data.template} onValueChange={v => change('template', v)} className="design-options">
                    {templates.map(t => (
                      <label key={t.id}>
                        <RadioGroupItem value={t.id} />
                        {t.name.replace('The ', '')}
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>

                <fieldset>
                  <legend>The Couple</legend>
                  <div className="form-row">
                    <label>
                      Bride’s name
                      <input required maxLength={60} value={data.first} onChange={e => change('first', e.target.value)} placeholder="e.g. Priya" autoComplete="given-name" />
                    </label>
                    <label>
                      Groom’s name
                      <input required maxLength={60} value={data.second} onChange={e => change('second', e.target.value)} placeholder="e.g. Arjun" autoComplete="family-name" />
                    </label>
                  </div>

                  <div className="form-row items-center justify-between mt-2 pt-1 border-t border-neutral-100">
                    <div>
                      <strong>Name Display Order:</strong>
                      <span className="ml-2 text-sm text-neutral-600">{data.orderBrideFirst ? 'Bride & Groom' : 'Groom & Bride'}</span>
                    </div>
                    <button type="button" className="text-button border px-3 py-1 rounded" onClick={() => change('orderBrideFirst', !data.orderBrideFirst)}>
                      SWITCH
                    </button>
                  </div>
                </fieldset>

                <fieldset className="mt-4">
                  <legend>Date & Venue</legend>
                  <div className="form-row">
                    <label>
                      Wedding date
                      <input required type="date" value={data.date} onInput={e => {
                        const val = e.currentTarget.value;
                        setData(d => ({ ...d, date: val, events: d.events.map((x, i) => i === 0 && !x.date ? { ...x, date: val } : x) }));
                        setDraft(''); setNotice(''); setError('');
                      }} />
                    </label>
                    <label>
                      Main Venue
                      <input maxLength={200} value={data.mainVenue || ''} onChange={e => change('mainVenue', e.target.value)} placeholder="e.g. Umaid Bhawan Palace, Jodhpur" />
                    </label>
                  </div>

                  <div className="form-row mt-2">
                    <label>
                      WhatsApp Number
                      <input type="tel" maxLength={20} value={data.whatsapp || ''} onChange={e => change('whatsapp', e.target.value)} placeholder="+91 98765 43210" />
                    </label>
                    <label>
                      Wedding Hashtag
                      <input maxLength={60} value={data.hashtag || ''} onChange={e => change('hashtag', e.target.value)} placeholder="#PriyaWedsArjun" />
                    </label>
                  </div>

                  <label className="checkbox-row flex items-center space-x-2 mt-3 cursor-pointer">
                    <input type="checkbox" checked={data.showCountdown ?? true} onChange={e => change('showCountdown', e.target.checked)} />
                    <div>
                      <strong>Show Countdown Timer</strong>
                      <p className="field-help text-xs">Display the days/hours countdown on your hero section</p>
                    </div>
                  </label>
                </fieldset>

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('invitation'); }}>
                  Next: Invitation Card <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 2: INVITATION */}
              <TabsContent value="invitation">
                <label className="checkbox-row flex items-center space-x-2 mb-4 cursor-pointer">
                  <input type="checkbox" checked={data.showInvitation ?? true} onChange={e => change('showInvitation', e.target.checked)} />
                  <div>
                    <strong>Show Invitation Section</strong>
                    <p className="field-help text-xs">Show formal family card on your wedding website</p>
                  </div>
                </label>

                {data.showInvitation !== false && (
                  <>
                    <label>
                      Opening Blessing
                      <textarea rows={2} maxLength={300} value={data.openingBlessing || ''} onChange={e => change('openingBlessing', e.target.value)} placeholder="With the blessings of the divine and the love of our families" />
                    </label>

                    <fieldset className="mt-4">
                      <legend>Bride’s Family</legend>
                      <div className="form-row">
                        <label>
                          Bride’s Father
                          <input maxLength={80} value={data.brideFather || ''} onChange={e => change('brideFather', e.target.value)} placeholder="Mr. Suresh Sharma" />
                        </label>
                        <label>
                          Bride’s Mother
                          <input maxLength={80} value={data.brideMother || ''} onChange={e => change('brideMother', e.target.value)} placeholder="Mrs. Anita Sharma" />
                        </label>
                      </div>
                    </fieldset>

                    <fieldset className="mt-4">
                      <legend>Groom’s Family</legend>
                      <div className="form-row">
                        <label>
                          Groom’s Father
                          <input maxLength={80} value={data.groomFather || ''} onChange={e => change('groomFather', e.target.value)} placeholder="Mr. Ramesh Kapoor" />
                        </label>
                        <label>
                          Groom’s Mother
                          <input maxLength={80} value={data.groomMother || ''} onChange={e => change('groomMother', e.target.value)} placeholder="Mrs. Sunita Kapoor" />
                        </label>
                      </div>
                    </fieldset>

                    <div className="form-row items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                      <div>
                        <strong>Parents Display Order:</strong>
                        <span className="ml-2 text-sm text-neutral-600">{data.parentsBrideFirst ? "Bride's family first" : "Groom's family first"}</span>
                      </div>
                      <button type="button" className="text-button border px-3 py-1 rounded" onClick={() => change('parentsBrideFirst', !data.parentsBrideFirst)}>
                        SWITCH
                      </button>
                    </div>

                    <label className="checkbox-row flex items-center space-x-2 mt-4 cursor-pointer">
                      <input type="checkbox" checked={data.includeGrandparents ?? false} onChange={e => change('includeGrandparents', e.target.checked)} />
                      <span>Include Grandparents’ Names</span>
                    </label>
                  </>
                )}

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('events'); }}>
                  Next: Celebration Events <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 3: EVENTS */}
              <TabsContent value="events">
                <div className="mb-4">
                  <strong>Choose Events</strong>
                  <p className="field-help text-xs">Select events to include. Each gets a detail card you can edit below.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {PRESET_EVENTS.map(name => {
                      const selected = data.events.some(e => e.name.toLowerCase() === name.toLowerCase());
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => togglePresetEvent(name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                            selected ? 'bg-amber-100 border-amber-600 text-amber-900 font-bold' : 'bg-neutral-50 border-neutral-300 text-neutral-700'
                          }`}
                        >
                          {name} {selected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {data.events.map((e, i) => (
                    <fieldset className="event-form border rounded-xl p-4 bg-white shadow-sm" key={i}>
                      <div className="flex items-center justify-between mb-3">
                        <legend className="font-bold text-sm">☰ {e.name || `Event ${i + 1}`}</legend>
                        {data.events.length > 1 && (
                          <button className="remove text-red-500 hover:text-red-700" type="button" onClick={() => change('events', data.events.filter((_, j) => j !== i))}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <label>
                        Function Name
                        <input required maxLength={100} value={e.name} onChange={x => updateEvent(i, 'name', x.target.value)} placeholder="Mehendi, Haldi, Shaadi..." />
                      </label>

                      <div className="form-row">
                        <label>
                          Date
                          <input required type="date" value={e.date} onInput={x => updateEvent(i, 'date', x.currentTarget.value)} />
                        </label>
                        <label>
                          Time
                          <input required type="time" value={e.time} onInput={x => updateEvent(i, 'time', x.currentTarget.value)} />
                        </label>
                      </div>

                      <label>
                        Venue
                        <input required maxLength={200} value={e.venue} onChange={x => updateEvent(i, 'venue', x.target.value)} placeholder="e.g. Garden Pavilion, The Oberoi" />
                      </label>

                      <label>
                        One-Liner (Poetic Note)
                        <textarea rows={2} maxLength={300} value={e.oneLiner || ''} onChange={x => updateEvent(i, 'oneLiner', x.target.value)} placeholder="Golden hues, saffron paste, and laughter filling the morning air." />
                      </label>

                      <label>
                        Google Maps Link (Optional)
                        <input type="url" value={e.mapsUrl || ''} onChange={x => updateEvent(i, 'mapsUrl', x.target.value)} placeholder="https://maps.google.com/..." />
                      </label>
                    </fieldset>
                  ))}
                </div>

                <button
                  className="text-button mt-4"
                  type="button"
                  onClick={() => change('events', [...data.events, { name: '', date: data.date, time: '18:00', venue: '', address: '', oneLiner: '', mapsUrl: '' }])}
                >
                  <Plus size={16} /> + Add Custom Event
                </button>

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('story'); }}>
                  Next: Story & Personality <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 4: STORY */}
              <TabsContent value="story">
                <label className="checkbox-row flex items-center space-x-2 mb-4 cursor-pointer">
                  <input type="checkbox" checked={data.showStory ?? true} onChange={e => change('showStory', e.target.checked)} />
                  <div>
                    <strong>Include this section</strong>
                    <p className="field-help text-xs">Show a written story or personality tags in the couple section</p>
                  </div>
                </label>

                {data.showStory !== false && (
                  <>
                    <div className="flex border rounded-lg overflow-hidden mb-5">
                      <button
                        type="button"
                        className={`flex-1 py-2 text-xs font-bold uppercase transition ${data.storyMode !== 'written' ? 'bg-amber-100 text-amber-900' : 'bg-white text-neutral-600'}`}
                        onClick={() => change('storyMode', 'tags')}
                      >
                        Personality Tags
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 text-xs font-bold uppercase transition ${data.storyMode === 'written' ? 'bg-amber-100 text-amber-900' : 'bg-white text-neutral-600'}`}
                        onClick={() => change('storyMode', 'written')}
                      >
                        Our Story
                      </button>
                    </div>

                    {data.storyMode !== 'written' ? (
                      <div className="space-y-4">
                        <p className="field-help text-xs">Answer these 4 questions — we will generate personality tags automatically.</p>

                        <fieldset className="p-3 border rounded-xl bg-neutral-50/50">
                          <legend className="text-xs font-bold">How did you two meet?</legend>
                          {['Through family / arranged', 'At work or college', 'Through common friends', 'A spontaneous moment'].map(opt => (
                            <label key={opt} className="flex items-center space-x-2 text-xs mt-1.5 cursor-pointer">
                              <input type="radio" name="meetWay" checked={data.meetWay === opt} onChange={() => change('meetWay', opt)} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </fieldset>

                        <fieldset className="p-3 border rounded-xl bg-neutral-50/50">
                          <legend className="text-xs font-bold">What best describes you together?</legend>
                          {['Foodies — always hunting the next meal', 'Wanderers — travel is our love language', 'Homebodies — cozy evenings are our thing', 'Social butterflies — we love a good party'].map(opt => (
                            <label key={opt} className="flex items-center space-x-2 text-xs mt-1.5 cursor-pointer">
                              <input type="radio" name="coupleVibe" checked={data.coupleVibe === opt} onChange={() => change('coupleVibe', opt)} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </fieldset>

                        <fieldset className="p-3 border rounded-xl bg-neutral-50/50">
                          <legend className="text-xs font-bold">Your perfect morning together?</legend>
                          {['Chai and long conversations', 'Sleeping in, no alarms', 'Morning run or yoga together', 'Spontaneous road trip start'].map(opt => (
                            <label key={opt} className="flex items-center space-x-2 text-xs mt-1.5 cursor-pointer">
                              <input type="radio" name="morningVibe" checked={data.morningVibe === opt} onChange={() => change('morningVibe', opt)} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </fieldset>

                        <fieldset className="p-3 border rounded-xl bg-neutral-50/50">
                          <legend className="text-xs font-bold">How would friends describe your love?</legend>
                          {['Hopeless romantics', 'Best friends who fell in love', 'Opposites who complete each other', 'Power couple'].map(opt => (
                            <label key={opt} className="flex items-center space-x-2 text-xs mt-1.5 cursor-pointer">
                              <input type="radio" name="loveDescription" checked={data.loveDescription === opt} onChange={() => change('loveDescription', opt)} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </fieldset>

                        <label>
                          Custom Hashtag (Overrides Main in Story)
                          <input maxLength={60} value={data.customHashtag || ''} onChange={e => change('customHashtag', e.target.value)} placeholder="#YourCustomHashtag" />
                        </label>

                        <label>
                          Extra Tags (Comma-Separated)
                          <input maxLength={200} value={data.extraTags || ''} onChange={e => change('extraTags', e.target.value)} placeholder="e.g. Chai lovers, Foodies, Sunset chasers" />
                        </label>
                      </div>
                    ) : (
                      <label>
                        Your story
                        <textarea rows={5} maxLength={4000} value={data.story} onChange={e => change('story', e.target.value)} placeholder="How you met. Your favourite memory. The beginning of your forever." />
                      </label>
                    )}
                  </>
                )}

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('gallery'); }}>
                  Next: Photo Gallery <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 5: GALLERY */}
              <TabsContent value="gallery">
                <label className="checkbox-row flex items-center space-x-2 mb-4 cursor-pointer">
                  <input type="checkbox" checked={data.showGallery ?? true} onChange={e => change('showGallery', e.target.checked)} />
                  <div>
                    <strong>Include Gallery section</strong>
                    <p className="field-help text-xs">Skip if you prefer no photos</p>
                  </div>
                </label>

                {data.showGallery !== false && (
                  <>
                    <strong className="text-xs uppercase tracking-wider text-neutral-600 block mb-2">Photo Layout</strong>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {[
                        { id: 'skip', label: '✕ Skip' },
                        { id: '1', label: '1 Photo' },
                        { id: '2', label: '2 Photos' },
                        { id: '4', label: '4 Photos' }
                      ].map(l => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => change('galleryLayout', l.id)}
                          className={`p-3 border rounded-xl text-xs text-center font-bold transition ${
                            activeLayout === l.id ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm' : 'border-neutral-200 bg-white text-neutral-700'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>

                    {slotCount > 0 && (
                      <div className={`grid ${slotCount === 1 ? 'grid-cols-1' : slotCount === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'} gap-3`}>
                        {Array.from({ length: slotCount }).map((_, idx) => {
                          const currentSrc = data.galleryPhotos?.[idx];
                          return (
                            <div key={idx} className="relative border-2 border-dashed border-amber-300 rounded-2xl p-4 bg-amber-50/30 flex flex-col items-center justify-center text-center min-h-[160px]">
                              {currentSrc ? (
                                <div className="w-full flex flex-col items-center">
                                  <img src={currentSrc} alt={`Photo ${idx + 1}`} className="w-full h-32 object-cover rounded-xl shadow-sm mb-2" />
                                  <div className="flex items-center justify-between w-full px-1">
                                    <span className="text-[11px] font-bold text-neutral-700">Photo {idx + 1}</span>
                                    <button
                                      type="button"
                                      className="text-red-600 text-xs font-medium hover:underline flex items-center space-x-1"
                                      onClick={() => removeSlot(idx)}
                                    >
                                      <Trash2 size={12} /> <span>Remove</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                                  <ImagePlus className="text-amber-700 mb-2" size={24} />
                                  <strong className="text-xs text-neutral-800">CLICK TO UPLOAD PHOTO {idx + 1}</strong>
                                  <span className="text-[10px] text-neutral-500 mt-1">JPG, PNG or WebP · Up to 5 MB</span>
                                  <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={e => uploadSlot(e.target.files?.[0], idx)} />
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('info'); }}>
                  Next: Things to Know <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 6: INFO */}
              <TabsContent value="info">
                <label className="checkbox-row flex items-center space-x-2 mb-4 cursor-pointer">
                  <input type="checkbox" checked={data.showInfo ?? true} onChange={e => change('showInfo', e.target.checked)} />
                  <div>
                    <strong>Show Things to Know Section</strong>
                    <p className="field-help text-xs">Helpful info cards for your guests</p>
                  </div>
                </label>

                {data.showInfo !== false && (
                  <>
                    <p className="field-help text-xs mb-3">Select info cards for guests. Click a selected card to edit its value.</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {PRESET_INFO_CARDS.map(c => {
                        const active = (data.activeInfoCards || []).includes(c.id);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => toggleInfoCard(c.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                              active ? 'bg-amber-100 border-amber-600 text-amber-900 font-bold' : 'bg-white border-neutral-300 text-neutral-700'
                            }`}
                          >
                            {c.label} {active && '✓'}
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-4">
                      {(data.activeInfoCards || []).map(cardId => {
                        const cardMeta = PRESET_INFO_CARDS.find(x => x.id === cardId);
                        const cardData = (data.infoCards && data.infoCards[cardId]) || { value: cardMeta?.defaultVal || '' };
                        return (
                          <div key={cardId} className="p-4 border rounded-xl bg-white shadow-sm">
                            <strong className="text-sm font-bold text-neutral-800">{cardMeta?.label || cardId}</strong>
                            <label className="mt-2 block">
                              Edit Value
                              <textarea
                                rows={2}
                                value={cardData.value}
                                onChange={e => updateInfoCard(cardId, 'value', e.target.value)}
                                className="w-full mt-1 p-2 border rounded text-xs"
                              />
                            </label>
                            {cardId === 'venue' && (
                              <label className="mt-2 block">
                                Google Maps Link (Optional)
                                <input
                                  type="url"
                                  value={cardData.mapsUrl || ''}
                                  onChange={e => updateInfoCard(cardId, 'mapsUrl', e.target.value)}
                                  placeholder="https://maps.google.com/..."
                                  className="w-full mt-1 p-2 border rounded text-xs"
                                />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('review'); }}>
                  Review your invitation <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 7: REVIEW */}
              <TabsContent value="review">
                <div className="review-card">
                  <span className="eyebrow">YOUR INVITATION</span>
                  <h2>{data.first || 'Bride'} & {data.second || 'Groom'}</h2>
                  <p>{templates.find(t => t.id === data.template)?.name} · {data.events.length} event{data.events.length !== 1 ? 's' : ''}</p>
                  <ul>
                    <li><Check size={16} /> Personalized wedding website</li>
                    <li><Check size={16} /> Your photo, story & celebration details</li>
                    <li><Check size={16} /> Location links for your guests</li>
                    <li><Check size={16} /> Automatic publishing after confirmed payment</li>
                  </ul>
                  {config.price && <strong className="price">{config.price}</strong>}
                </div>

                <p className="field-help">Check the full preview before saving. Published details and photos will be visible to anyone with your invitation link.</p>

                <button className="button full" type="button" disabled={busy} onClick={save}>
                  {busy ? 'Saving…' : draft ? 'Save another private draft' : 'Save private draft'} <LockKeyhole size={16} />
                </button>

                {draft && (
                  <div className="checkout-box">
                    {config.checkoutReady ? (
                      <button className="button full" type="button" disabled={busy} onClick={checkout}>
                        Continue to payment <ArrowRight size={17} />
                      </button>
                    ) : (
                      <>
                        <strong>Checkout opens soon</strong>
                        <p>You can personalize and save your invitation now. Payment and publishing are not available yet.</p>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>

            </form>
          </Tabs>

          {error && <p className="form-error" role="alert">{error}</p>}
          {notice && <p className="form-notice" role="status">{notice}</p>}
          <p className="privacy-note"><LockKeyhole size={13} /> Saved drafts can be reopened in this browser. Your preview is private.</p>
        </div>

        {/* LIVE PREVIEW ASIDE */}
        <aside className="live-preview" id="invitation-preview">
          <div className="preview-toolbar">
            <span>YOUR INVITATION, COMING TO LIFE</span>
            <a className="mobile-edit-link" href="#invitation-details">Back to details</a>
            <div>
              <button aria-label="Narrow preview" aria-pressed={!wide} onClick={() => setWide(false)}>
                <Smartphone size={17} />
              </button>
              <button aria-label="Wide preview" aria-pressed={wide} onClick={() => setWide(true)}>
                <Monitor size={17} />
              </button>
            </div>
          </div>
          <div className={'preview-device ' + (wide ? 'wide' : '')}>
            <Invitation data={data} />
          </div>
          <p className="preview-hint">Live preview · Updates as you type</p>
        </aside>
      </main>
    </>
  );
}
