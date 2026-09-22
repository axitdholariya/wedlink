'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Heart, Calendar, MapPin, Users, Camera, Upload, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

const THEMES = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', desc: '3D Palace Gate, Shehnai Music & Auspicious Ganesha', tag: 'Royal' },
  { id: 'rose-letter', name: 'The Rose Letter', desc: '3D Envelope Unboxing, Golden Wax Seal & Scratch Card', tag: 'Romantic' },
  { id: 'heritage', name: 'Heritage Rajputana', desc: 'Traditional Rajputana Grandeur, Sacred Shlokas & Jharokha', tag: 'Heritage' },
  { id: 'garden-romance', name: 'Garden Romance', desc: 'Botanical Floral Aesthetics, Pastel Sage Green & Timeline', tag: 'Floral' },
  { id: 'editorial', name: 'The Editorial', desc: 'Vogue-Inspired Typography, Monochrome Portraits & Chic Vibe', tag: 'Modern' },
];

export default function CreatePage() {
  const [theme, setTheme] = useState('royal-courtyard');
  const [formData, setFormData] = useState({
    groomName: 'Aarav Sharma',
    brideName: 'Meera Kapoor',
    weddingDate: '2026-11-29',
    weddingTime: '06:00 PM',
    venueName: 'The Oberoi Udaivilas',
    venueCity: 'Udaipur, Rajasthan',
    mapsUrl: 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
    tagline: 'With full hearts and joyous blessings, we invite you to celebrate our union.',
    firstFamily: 'Blessings of Sharma Family',
    secondFamily: 'Blessings of Kapoor Family',
    dressCode: 'Royal Traditional Indian Elegance',
    hotelInfo: 'Special room blocks at The Oberoi Udaivilas. Promo code: WEDLINK2026',
    couplePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600'
    ]
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('template');
      if (t) setTheme(t);

      const saved = localStorage.getItem('wedlink_custom_invite');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(prev => ({ ...prev, ...parsed }));
          if (parsed.theme) setTheme(parsed.theme);
        } catch (e) {}
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, couplePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => {
          const updated = [...prev.galleryPhotos];
          updated[index] = reader.result as string;
          return { ...prev, galleryPhotos: updated };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryPhoto = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.galleryPhotos];
      updated.splice(index, 1);
      return { ...prev, galleryPhotos: updated };
    });
  };

  const handlePreview = () => {
    const payload = { ...formData, theme };
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedlink_custom_invite', JSON.stringify(payload));
      window.location.href = `/templates/${theme}`;
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FAF7F2] text-[#2D141E] selection:bg-[#341822] selection:text-white pb-24 relative"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Google Fonts Matching Main Page */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
      `}</style>

      {/* Top Navbar Matching Main Page */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-16 py-4 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD5]">
        <a 
          href="/" 
          className="flex items-center gap-2 text-xs font-semibold text-[#6A5E62] hover:text-[#2D141E] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Wedlink
        </a>

        <span className="font-serif-luxury text-xl font-bold tracking-tight text-[#2D141E]">
          Wedlink <span className="font-sans text-xs font-normal text-[#8C7A70] tracking-widest uppercase ml-2">Personalize</span>
        </span>

        <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide text-white bg-[#341822] hover:bg-[#230f16] shadow-sm transition-all cursor-pointer"
        >
          Preview invitation <ArrowUpRight size={14} />
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12">
        {/* Main Heading Styled Like Homepage */}
        <div className="text-center mb-12 space-y-2">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#8C7A70] uppercase">
            — Make it truly yours
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#2D141E] tracking-tight">
            Personalize your <em className="italic">invitation.</em>
          </h1>
          <p className="text-[#6A5E62] text-sm max-w-lg mx-auto leading-relaxed pt-1">
            Fill in your wedding moments, itinerary, and family blessings. Experience your live 3D invitation in one click.
          </p>
        </div>

        {/* Section 1: Choose Theme (Clean White Cards) */}
        <section className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F0EAE1]">
            <Sparkles size={18} className="text-[#8D3A4B]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#2D141E]">
              1. Choose your design
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                  theme === t.id
                    ? 'border-[#341822] bg-[#FAF7F2] shadow-sm ring-1 ring-[#341822]'
                    : 'border-[#E8DFD5] bg-white hover:border-[#C4B5A5] hover:bg-[#FAF7F2]/50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif-luxury text-lg font-bold text-[#2D141E]">{t.name}</span>
                  {theme === t.id && <CheckCircle2 size={16} className="text-[#341822]" />}
                </div>
                <p className="text-xs text-[#6A5E62] leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Couple Details */}
        <section className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F0EAE1]">
            <Heart size={18} className="text-[#8D3A4B]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#2D141E]">
              2. The happy couple
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Groom&apos;s Full Name
              </label>
              <input
                type="text"
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Bride&apos;s Full Name
              </label>
              <input
                type="text"
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                placeholder="e.g. Meera Kapoor"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
              Welcome Tagline or Shloka
            </label>
            <textarea
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              rows={2}
              className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
            />
          </div>
        </section>

        {/* Section 3: Couple Photo & Moments Gallery */}
        <section className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F0EAE1]">
            <Camera size={18} className="text-[#8D3A4B]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#2D141E]">
              3. Photos & memories
            </h2>
          </div>

          {/* Main Portrait */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-2">
              Main Couple Photo
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#FAF7F2] border border-[#E0D7CC] p-4 rounded-xl">
              {formData.couplePhoto && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#D5C7B7] shrink-0 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.couplePhoto} alt="Couple" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white border border-[#D5C7B7] hover:bg-[#F3EDE2] text-xs font-semibold text-[#2D141E] cursor-pointer shadow-xs transition-all">
                    <Upload size={13} /> Upload photo
                    <input type="file" accept="image/*" onChange={handlePortraitUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-[#8C7A70]">or paste link:</span>
                </div>
                <input
                  type="url"
                  name="couplePhoto"
                  value={formData.couplePhoto}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-white border border-[#E0D7CC] rounded-lg px-3 py-2 text-xs text-[#2D141E] focus:outline-none focus:border-[#341822]"
                />
              </div>
            </div>
          </div>

          {/* Gallery Photos */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-2">
              Event Highlights (3 Photos)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formData.galleryPhotos.map((photoUrl, idx) => (
                <div key={idx} className="bg-[#FAF7F2] border border-[#E0D7CC] p-2.5 rounded-xl flex flex-col items-center">
                  <div className="relative w-full h-28 rounded-lg overflow-hidden border border-[#D5C7B7] mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryPhoto(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white hover:bg-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <label className="w-full flex items-center justify-center gap-1 py-1 rounded-md bg-white hover:bg-[#F3EDE2] border border-[#D5C7B7] text-[10px] font-semibold text-[#2D141E] cursor-pointer shadow-xs">
                    <Upload size={11} /> Replace
                    <input type="file" accept="image/*" onChange={(e) => handleGalleryUpload(e, idx)} className="hidden" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Date & Venue */}
        <section className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F0EAE1]">
            <Calendar size={18} className="text-[#8D3A4B]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#2D141E]">
              4. Date & celebration venue
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Wedding Date
              </label>
              <input
                type="date"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Ceremony Timings
              </label>
              <input
                type="text"
                name="weddingTime"
                value={formData.weddingTime}
                onChange={handleChange}
                placeholder="e.g. 06:00 PM Onwards"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Venue or Palace Name
              </label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="e.g. The Oberoi Udaivilas"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                City, State
              </label>
              <input
                type="text"
                name="venueCity"
                value={formData.venueCity}
                onChange={handleChange}
                placeholder="e.g. Udaipur, Rajasthan"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
              Google Maps Location Link
            </label>
            <input
              type="url"
              name="mapsUrl"
              value={formData.mapsUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
            />
          </div>
        </section>

        {/* Section 5: Family & Guest Info */}
        <section className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#F0EAE1]">
            <Users size={18} className="text-[#8D3A4B]" />
            <h2 className="font-serif-luxury text-2xl font-normal text-[#2D141E]">
              5. Family blessings & guest guide
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Groom&apos;s Family Blessings
              </label>
              <input
                type="text"
                name="firstFamily"
                value={formData.firstFamily}
                onChange={handleChange}
                placeholder="Blessings of Sharma Family"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Bride&apos;s Family Blessings
              </label>
              <input
                type="text"
                name="secondFamily"
                value={formData.secondFamily}
                onChange={handleChange}
                placeholder="Blessings of Kapoor Family"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Dress Code Recommendation
              </label>
              <input
                type="text"
                name="dressCode"
                value={formData.dressCode}
                onChange={handleChange}
                placeholder="Traditional Indian Festive Elegance"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#6A5E62] mb-1.5">
                Hotel Booking or Shuttle Note
              </label>
              <input
                type="text"
                name="hotelInfo"
                value={formData.hotelInfo}
                onChange={handleChange}
                placeholder="Hotel Promo Code: WEDLINK2026"
                className="w-full bg-[#FAF7F2] border border-[#E0D7CC] rounded-lg px-4 py-3 text-sm text-[#2D141E] focus:outline-none focus:border-[#341822] focus:bg-white transition-all"
              />
            </div>
          </div>
        </section>

        {/* Bottom CTA Button Styled Exactly Like Homepage */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-md text-sm font-semibold tracking-wide text-white bg-[#341822] hover:bg-[#230f16] shadow-md transition-all cursor-pointer"
          >
            Save details & preview live invitation <ArrowUpRight size={16} />
          </button>
          <p className="text-[#8C7A70] text-xs mt-3">
            One link for every guest • Made for sharing
          </p>
        </div>
      </main>
    </div>
  );
}
