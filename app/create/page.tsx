'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Calendar, MapPin, Heart, Users, CheckCircle2, Eye } from 'lucide-react';

const THEMES = [
  { id: 'royal-courtyard', name: 'The Royal Courtyard', desc: '3D Palace Gate, Shehnai Music & Auspicious Ganesha' },
  { id: 'rose-letter', name: 'The Rose Letter', desc: '3D Envelope Unboxing, Golden Wax Seal & Scratch Card' },
  { id: 'heritage', name: 'Heritage Rajputana', desc: 'Royal Rajputana Elegance, Shlokas & Ornate Borders' },
  { id: 'garden-romance', name: 'Garden Romance', desc: 'Botanical Floral Aesthetics, Pastel Shades & Timeline' },
  { id: 'editorial', name: 'The Editorial', desc: 'Vogue-Style Typography, High-Fashion Layout & Portraits' },
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
    firstFamily: 'Blessings of Mr. & Mrs. Sharma',
    secondFamily: 'Blessings of Mr. & Mrs. Kapoor',
    dressCode: 'Royal Traditional Indian Elegance',
    hotelInfo: 'Special room blocks booked at The Oberoi Udaivilas. Promo code: WEDLINK2026',
  });

  useEffect(() => {
    // URL query check
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

  const handlePreview = () => {
    const payload = { ...formData, theme };
    localStorage.setItem('wedlink_custom_invite', JSON.stringify(payload));
    window.location.href = '/invite/demo';
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans selection:bg-[#D4AF37] selection:text-black pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10">
        <a href="/" className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white cursor-pointer">
          <ArrowLeft size={16} /> Back to WedLink
        </a>
        <span className="font-serif tracking-widest text-[#D4AF37] text-sm uppercase font-semibold">
          Invitation Builder
        </span>
        <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black hover:opacity-90 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
        >
          <Eye size={14} /> Preview Live
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Custom Wedding Microsite</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mt-2 mb-3">Personalize Your Invitation</h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Fill in your wedding details below. You can preview and experience your personalized 3D invitation immediately.
          </p>
        </div>

        {/* 1. Theme Selection */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2.5 mb-6 text-[#D4AF37]">
            <Sparkles size={18} />
            <h2 className="text-lg font-serif font-semibold text-white">1. Select Luxury Theme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  theme === t.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-md shadow-[#D4AF37]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-serif text-sm font-semibold text-white">{t.name}</span>
                  {theme === t.id && <CheckCircle2 size={16} className="text-[#D4AF37]" />}
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Couple Names */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2.5 mb-6 text-[#D4AF37]">
            <Heart size={18} />
            <h2 className="text-lg font-serif font-semibold text-white">2. Couple Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Groom&apos;s Full Name</label>
              <input
                type="text"
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Bride&apos;s Full Name</label>
              <input
                type="text"
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                placeholder="e.g. Meera Kapoor"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Welcome Tagline / Invocation</label>
            <textarea
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              rows={2}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </section>

        {/* 3. Date & Venue */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2.5 mb-6 text-[#D4AF37]">
            <Calendar size={18} />
            <h2 className="text-lg font-serif font-semibold text-white">3. Wedding Date & Location</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Wedding Date</label>
              <input
                type="date"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Ceremony Time</label>
              <input
                type="text"
                name="weddingTime"
                value={formData.weddingTime}
                onChange={handleChange}
                placeholder="e.g. 06:00 PM Onwards"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Venue / Palace Name</label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="e.g. The Oberoi Udaivilas"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">City & State</label>
              <input
                type="text"
                name="venueCity"
                value={formData.venueCity}
                onChange={handleChange}
                placeholder="e.g. Udaipur, Rajasthan"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Google Maps Direction URL</label>
            <input
              type="url"
              name="mapsUrl"
              value={formData.mapsUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </section>

        {/* 4. Family & Logistics */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2.5 mb-6 text-[#D4AF37]">
            <Users size={18} />
            <h2 className="text-lg font-serif font-semibold text-white">4. Family Blessings & Logistics</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Groom&apos;s Family</label>
              <input
                type="text"
                name="firstFamily"
                value={formData.firstFamily}
                onChange={handleChange}
                placeholder="Blessings of Sharma Family"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Bride&apos;s Family</label>
              <input
                type="text"
                name="secondFamily"
                value={formData.secondFamily}
                onChange={handleChange}
                placeholder="Blessings of Kapoor Family"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Dress Code</label>
              <input
                type="text"
                name="dressCode"
                value={formData.dressCode}
                onChange={handleChange}
                placeholder="Royal Traditional Indian Elegance"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Hotel / Travel Promo Code</label>
              <input
                type="text"
                name="hotelInfo"
                value={formData.hotelInfo}
                onChange={handleChange}
                placeholder="Promo Code: WEDLINK2026"
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handlePreview}
            className="w-full sm:w-auto px-10 py-4 rounded-full font-serif text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C9A24F] text-black shadow-xl shadow-[#D4AF37]/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            ✨ Save Details & Preview My Live Invitation
          </button>
          <p className="text-xs text-slate-500 mt-3">
            Changes are saved instantly in your browser. You can edit anytime.
          </p>
        </div>
      </main>
    </div>
  );
}
