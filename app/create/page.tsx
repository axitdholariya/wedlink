'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Check, ImagePlus, LockKeyhole, Plus, Trash2,
  Monitor, Smartphone, Sparkles, Heart, Camera, Info, HelpCircle
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
    galleryLayout: '4',
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
  const [file, setFile] = useState<File | null>(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [config, setConfig] = useState({ checkoutReady: false, price: '' });
  const [wide, setWide] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const objectUrl = useRef('');

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
    return () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); };
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

  async function upload(f: File | undefined) {
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
      const optimized = new File([blob], 'couple.jpg', { type: 'image/jpeg' });
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = URL.createObjectURL(optimized);
      setFile(optimized);
      change('photo', objectUrl.current);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'This photo could not be opened. Try another JPG or PNG.');
    }
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
      if (file) form.set('photo', file);
      else if (data.photo?.startsWith('/api/photo/')) {
        const photo = await fetch(data.photo);
        if (!photo.ok) throw Error('Your saved photo could not be loaded.');
        form.set('photo', await photo.blob(), 'couple.jpg');
      }
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

  return (
    <>
      <header className="builder-nav">
        <Link href="/"><Brand /></Link>
        <Link className="text-button" href="/#collection">
          <ArrowLeft size={16} /> Back to collection
        </Link>
        <span className="private-label"><LockKeyhole size={14} /> Private until you publish</span>
      </header>

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
              
              {/* TAB 1: ESSENTIALS (ShaadiPath Essentials) */}
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

              {/* TAB 2: INVITATION (ShaadiPath Invitation Card) */}
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

              {/* TAB 3: EVENTS (ShaadiPath Celebration Events) */}
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

              {/* TAB 4: STORY (ShaadiPath Personality Tags & Our Story) */}
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

              {/* TAB 5: GALLERY (ShaadiPath Photo Gallery) */}
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
                    <div className="grid grid-cols-4 gap-2 mb-5">
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
                            (data.galleryLayout || '4') === l.id ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm' : 'border-neutral-200 bg-white text-neutral-700'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>

                    {data.galleryLayout !== 'skip' && (
                      <div className="space-y-3">
                        <label className="upload block p-6 border-2 border-dashed border-amber-300 rounded-2xl text-center bg-amber-50/40 cursor-pointer">
                          <ImagePlus className="mx-auto text-amber-700" size={28} />
                          <strong className="block mt-2 text-sm">{file ? file.name : data.photo ? 'Change main couple photo' : 'Click to upload main couple photo'}</strong>
                          <span className="text-xs text-neutral-500">Choose JPG, PNG or WebP · up to 5 MB</span>
                          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => upload(e.target.files?.[0])} />
                        </label>
                        {data.photo && (
                          <button className="text-button text-xs text-red-600" type="button" onClick={() => { change('photo', undefined); setFile(null); }}>
                            Remove photo
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}

                <button className="button full mt-6" type="button" onClick={() => { if (formRef.current?.reportValidity()) setStep('info'); }}>
                  Next: Things to Know <ArrowRight size={17} />
                </button>
              </TabsContent>

              {/* TAB 6: INFO (ShaadiPath Things to Know) */}
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
