'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Calendar, MapPin, Heart, Users, CheckCircle2, Eye, Camera, Image as ImageIcon, Trash2, Upload } from 'lucide-react';

const THEMES = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', desc: '3D Carved Sandstone Gates, Shehnai Music & Auspicious Ganesha' },
  { id: 'rose-letter', name: 'The Rose Letter', desc: '3D Envelope Unboxing, Golden Wax Seal & Metallic Scratch Card' },
  { id: 'heritage', name: 'Heritage Rajputana', desc: 'Traditional Rajputana Grandeur, Sacred Shlokas & Ornate Borders' },
  { id: 'garden-romance', name: 'Garden Romance', desc: 'Botanical Floral Aesthetics, Pastel Sage Green & Romantic Timeline' },
  { id: 'editorial', name: 'The Editorial', desc: 'Vogue-Inspired Typography, Monochrome Portraits & Contemporary Chic' },
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

  // Main Portrait File Upload Handler
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

  // Gallery Photos File Upload Handler
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
      className="min-h-screen bg-[#0A0D14] text-white selection:bg-[#D4AF37] selection:text-black pb-24 relative overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Import Official Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
      `}</style>

      {/* Ambient Luxury Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg- blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-[#0A0D14]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl">
        <a 
          href="/" 
          className="flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Back to WedLink
        </a>
        <div className="flex items-center gap-2">
          <span className="font-cinzel tracking-[0.25em] text-[#D4AF37] text-xs uppercase font-bold">
            WEDLINK · INVITATION BUILDER
          </span>
        </div>
        <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-2 px-5 py-2 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#D4AF37]/20 hover:opacity-90 transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #E5C378 0%, #C9A24F 50%, #A87A24 100%)' }}
        >
          <Eye size={14} /> Preview Live
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            One Link • Endless Celebrations
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl text-white font-bold tracking-wide">
            Personalize Your Invitation
          </h1>
          <p className="font-great-vibes text-2xl text-[#FBF0B9] mt-2 mb-3">
            Your love story, crafted in digital luxury
          </p>
          <p className="text-[#94A3B8] text-xs max-w-md mx-auto leading-relaxed">
            Fill in your wedding itinerary, romantic photos & family details below. Experience your 3D microsite in real-time.
          </p>
        </div>

        {/* Section 1: Choose Theme */}
        <section className="bg-[#260A10]/50 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
            <Sparkles size={18} className="text-[#D4AF37]" />
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              1. Select Luxury Theme
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  theme === t.id
                    ? 'border-[#D4AF37] bg-[#260A10] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                    : 'border-white/10 bg-black/40 hover:border-[#D4AF37]/40 hover:bg-white/5'
                }`}
              >
                {theme === t.id && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#D4AF37] rounded-bl-xl flex items-center justify-center">
                    <CheckCircle2 size={15} className="text-black font-bold" />
                  </div>
                )}
                <span className="font-cinzel text-sm font-bold text-white block mb-1 tracking-wide">
                  {t.name}
                </span>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Couple Details */}
        <section className="bg-[#260A10]/50 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
            <Heart size={18} className="text-[#D4AF37]" />
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              2. Couple Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Groom&apos;s Full Name
              </label>
              <input
                type="text"
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Bride&apos;s Full Name
              </label>
              <input
                type="text"
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                placeholder="e.g. Meera Kapoor"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
              Welcome Shloka / Auspicious Tagline
            </label>
            <textarea
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              rows={2}
              className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
          </div>
        </section>

        {/* Section 3: Couple Portrait & Photo Gallery (NEW FEATURE) */}
        <section className="bg-[#260A10]/50 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
            <Camera size={18} className="text-[#D4AF37]" />
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              3. Couple Portrait & Moments Gallery
            </h2>
          </div>

          {/* Main Couple Hero Portrait */}
          <div className="mb-8">
            <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
              Main Couple Hero Portrait (Cover Photo)
            </label>
            <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#0A0D14]/80 border border-[#D4AF37]/20 p-4 rounded-2xl">
              {formData.couplePhoto && (
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0 shadow-lg shadow-[#D4AF37]/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.couplePhoto} alt="Couple Portrait" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 w-full space-y-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] cursor-pointer transition-all">
                    <Upload size={14} /> Upload from Phone / PC
                    <input type="file" accept="image/*" onChange={handlePortraitUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-[#94A3B8]">or paste link:</span>
                </div>
                <input
                  type="url"
                  name="couplePhoto"
                  value={formData.couplePhoto}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0A0D14] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Pre-Wedding Moments Gallery */}
          <div>
            <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-3">
              Pre-Wedding Moments & Event Highlights (3 Photos)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.galleryPhotos.map((photoUrl, idx) => (
                <div key={idx} className="bg-[#0A0D14]/80 border border-[#D4AF37]/20 p-3 rounded-2xl flex flex-col items-center">
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#D4AF37]/30 mb-3 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoUrl} alt={`Moment ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryPhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <label className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/25 text-[10px] uppercase font-semibold text-[#D4AF37] cursor-pointer transition-all">
                    <Upload size={12} /> Replace Photo
                    <input type="file" accept="image/*" onChange={(e) => handleGalleryUpload(e, idx)} className="hidden" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Date & Venue */}
        <section className="bg-[#260A10]/50 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
            <Calendar size={18} className="text-[#D4AF37]" />
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              4. Sacred Date & Location
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Wedding Date
              </label>
              <input
                type="date"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Ceremony Timings
              </label>
              <input
                type="text"
                name="weddingTime"
                value={formData.weddingTime}
                onChange={handleChange}
                placeholder="e.g. 06:00 PM Onwards"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Palace / Resort Venue
              </label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="e.g. The Oberoi Udaivilas"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                City, State
              </label>
              <input
                type="text"
                name="venueCity"
                value={formData.venueCity}
                onChange={handleChange}
                placeholder="e.g. Udaipur, Rajasthan"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
              Google Maps GPS Link
            </label>
            <input
              type="url"
              name="mapsUrl"
              value={formData.mapsUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
          </div>
        </section>

        {/* Section 5: Family & Logistics */}
        <section className="bg-[#260A10]/50 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
            <Users size={18} className="text-[#D4AF37]" />
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              5. Family Lineage & Guest Logistics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Groom&apos;s Family Blessings
              </label>
              <input
                type="text"
                name="firstFamily"
                value={formData.firstFamily}
                onChange={handleChange}
                placeholder="Blessings of Sharma Family"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Bride&apos;s Family Blessings
              </label>
              <input
                type="text"
                name="secondFamily"
                value={formData.secondFamily}
                onChange={handleChange}
                placeholder="Blessings of Kapoor Family"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Dress Code Recommendation
              </label>
              <input
                type="text"
                name="dressCode"
                value={formData.dressCode}
                onChange={handleChange}
                placeholder="Royal Traditional Indian Elegance"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="font-cinzel block text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-2">
                Hotel / Shuttle Booking Note
              </label>
              <input
                type="text"
                name="hotelInfo"
                value={formData.hotelInfo}
                onChange={handleChange}
                placeholder="Promo Code: WEDLINK2026"
                className="w-full bg-[#0A0D14]/90 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
        </section>

        {/* Luxury CTA Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handlePreview}
            className="w-full sm:w-auto px-12 py-4 rounded-full font-cinzel text-sm font-bold uppercase tracking-[0.2em] text-black shadow-2xl shadow-[#D4AF37]/30 hover:opacity-95 transition-all transform hover:-translate-y-1 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #E5C378 0%, #D4AF37 50%, #A87A24 100%)' }}
          >
            ✨ Save Details & Preview My Live Invitation
          </button>
          <p className="text-[#94A3B8] text-xs mt-4">
            WedLink • One Link • Endless Celebrations
          </p>
        </div>
      </main>
    </div>
  );
}
