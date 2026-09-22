'use client';

import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Play, Heart, MapPin, Music, 
  Smartphone, CheckCircle2, Eye, ShieldCheck, Clock, Share2
} from 'lucide-react';

const CATEGORIES = ['ALL', 'ROYAL PALACE', 'ROMANTIC BLUSH', 'HERITAGE VINTAGE', 'MODERN EDITORIAL'];

const SHOWCASE_TEMPLATES = [
  {
    id: 'royal-courtyard',
    category: 'ROYAL PALACE',
    title: 'The Royal Courtyard',
    couple: 'Aarav & Meera',
    date: 'Nov 29, 2026',
    venue: 'The Oberoi Udaivilas, Udaipur',
    badge: 'Flagship 3D',
    link: '/templates/royal-courtyard',
    bgGradient: 'from-[#0d1322] via-[#1a233a] to-[#0A0D14]',
    phoneBorder: 'border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]',
    accentColor: '#D4AF37',
    tagline: '3D Palace Doors & Shehnai',
    artType: 'palace',
  },
  {
    id: 'rose-letter',
    category: 'ROMANTIC BLUSH',
    title: 'The Rose Letter',
    couple: 'Veer & Zara',
    date: 'Dec 14, 2026',
    venue: 'The Taj Mahal Palace, Mumbai',
    badge: 'Wax Seal & Scratch',
    link: '/templates/rose-letter',
    bgGradient: 'from-[#2a131b] via-[#3d1825] to-[#1c0c12]',
    phoneBorder: 'border-[#f6a5b8]/40 shadow-[0_0_30px_rgba(246,165,184,0.2)]',
    accentColor: '#f6a5b8',
    tagline: '3D Envelope Unboxing',
    artType: 'envelope',
  },
  {
    id: 'heritage',
    category: 'HERITAGE VINTAGE',
    title: 'Heritage Rajputana',
    couple: 'Devraj & Radhika',
    date: 'Jan 18, 2027',
    venue: 'Umaid Bhawan Palace, Jodhpur',
    badge: 'Traditional Royal',
    link: '/templates/heritage',
    bgGradient: 'from-[#330c14] via-[#48111d] to-[#1e070c]',
    phoneBorder: 'border-[#E5C378]/50 shadow-[0_0_30px_rgba(229,195,120,0.2)]',
    accentColor: '#E5C378',
    tagline: 'Sacred Shlokas & Jharokha',
    artType: 'jharokha',
  },
  {
    id: 'garden-romance',
    category: 'ROMANTIC BLUSH',
    title: 'Garden Romance',
    couple: 'Kabir & Ananya',
    date: 'Feb 22, 2027',
    venue: 'Rambagh Palace, Jaipur',
    badge: 'Botanical Floral',
    link: '/templates/garden-romance',
    bgGradient: 'from-[#12231e] via-[#1a352d] to-[#0b1714]',
    phoneBorder: 'border-[#89d3b2]/40 shadow-[0_0_30px_rgba(137,211,178,0.2)]',
    accentColor: '#89d3b2',
    tagline: 'Sage Green Floral Vibe',
    artType: 'garden',
  },
  {
    id: 'editorial',
    category: 'MODERN EDITORIAL',
    title: 'The Editorial',
    couple: 'Rohan & Tara',
    date: 'Mar 08, 2027',
    venue: 'Alila Fort, Bishangarh',
    badge: 'Vogue Magazine',
    link: '/templates/editorial',
    bgGradient: 'from-[#141417] via-[#222228] to-[#0A0A0C]',
    phoneBorder: 'border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.15)]',
    accentColor: '#ffffff',
    tagline: 'High Fashion Monochrome',
    artType: 'editorial',
  }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredTemplates = selectedCategory === 'ALL'
    ? SHOWCASE_TEMPLATES
    : SHOWCASE_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div 
      className="min-h-screen bg-[#0A0D14] text-white selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
      `}</style>

      {/* Top Floating Brand Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4 bg-[#0A0D14]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-white">
            WED<span className="text-[#D4AF37]">LINK</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          <a href="#templates" className="hover:text-[#D4AF37] transition-colors">Templates</a>
          <a href="#features" className="hover:text-[#D4AF37] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">Pricing</a>
        </nav>
        <a
          href="/create"
          className="px-6 py-2.5 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#D4AF37]/25 hover:opacity-90 transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #E5C378 0%, #D4AF37 50%, #A87A24 100%)' }}
        >
          Create Invite ✨
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 text-center max-w-5xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#260A10]/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
          <Sparkles size={13} /> The New Era of Indian Wedding Invites
        </div>
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15]">
          Your Wedding, <br />
          <span className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-[#FBF0B9] font-normal block my-2">
            In A Single Calming Link
          </span>
        </h1>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
          Stop sending 50MB PDFs and confusing WhatsApp locations. Delight your guests with an interactive 3D mobile microsite featuring sliding palace gates, wax seal unboxing, shehnai music & 1-tap Google Maps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/create"
            className="w-full sm:w-auto px-10 py-4 rounded-full font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black shadow-2xl shadow-[#D4AF37]/30 hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #E5C378 0%, #D4AF37 50%, #A87A24 100%)' }}
          >
            Personalize Your Invite ↗
          </a>
          <a
            href="#templates"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-white border border-[#D4AF37]/40 hover:bg-white/5 transition-all cursor-pointer"
          >
            Explore 3D Collection ↓
          </a>
        </div>
      </section>

      {/* MOBILE SHOWCASE SECTION (PHOTO REFERENCE FORMAT) */}
      <section id="templates" className="py-20 px-6 relative z-10 border-t border-white/5 bg-[#07090E]">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
              Luxury Mobile Microsites
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Explore The 3D Collection
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm max-w-lg mx-auto mt-3">
              Designed specifically for mobile screens. Tap any phone mockup below to experience the live 3D unboxing and animations.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full font-cinzel text-[10px] sm:text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/25'
                      : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Realistic iPhone Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center pt-4">
            {filteredTemplates.map(template => (
              <div 
                key={template.id}
                className="flex flex-col items-center group"
              >
                {/* iPhone Device Frame */}
                <div 
                  className={`relative w-[275px] h-[570px] bg-[#141822] rounded-[48px] p-3 border-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 transform group-hover:-translate-y-3 ${template.phoneBorder}`}
                >
                  {/* Speaker & Dynamic Island Pill */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-end pr-2">
                    <div className="w-2.5 h-2.5 bg-[#1f2430] rounded-full border border-white/20" />
                  </div>

                  {/* Inner Screen Display */}
                  <div className={`relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b ${template.bgGradient} flex flex-col justify-between p-5 border border-white/10`}>
                    
                    {/* Top Status & Badge */}
                    <div className="pt-5 text-center">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md"
                        style={{ color: template.accentColor, borderColor: `${template.accentColor}40`, backgroundColor: `${template.accentColor}15` }}
                      >
                        {template.badge}
                      </span>
                      <p className="font-great-vibes text-sm text-[#FBF0B9] mt-2">Invited to celebrate</p>
                      <h3 className="font-cinzel text-lg font-bold text-white tracking-wider mt-0.5">
                        {template.couple}
                      </h3>
                      <p className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                        {template.date}
                      </p>
                    </div>

                    {/* Center Artwork / Visual Hook */}
                    <div className="my-auto py-4 text-center flex flex-col items-center justify-center">
                      {template.artType === 'palace' && (
                        <div className="relative w-36 h-36 rounded-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent p-3 flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-inner">
                          <div className="w-16 h-12 border-2 border-[#D4AF37] rounded-t-full flex items-center justify-center mb-1">
                            <Sparkles size={16} className="text-[#D4AF37]" />
                          </div>
                          <span className="font-cinzel text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                            Royal Gates
                          </span>
                          <span className="text-[8px] text-slate-300">Tap to Slide Open</span>
                        </div>
                      )}

                      {template.artType === 'envelope' && (
                        <div className="relative w-36 h-32 bg-[#FAF6EE]/10 rounded-2xl border border-[#f6a5b8]/30 flex flex-col items-center justify-center p-3">
                          <div className="w-12 h-12 rounded-full bg-[#c2415c] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg mb-1">
                            <span className="font-serif text-xs font-bold text-[#FBF0B9]">V•Z</span>
                          </div>
                          <span className="font-cinzel text-[10px] uppercase font-bold text-[#f6a5b8] tracking-wider">
                            Wax Seal Flap
                          </span>
                          <span className="text-[8px] text-slate-300">Touch to Unbox</span>
                        </div>
                      )}

                      {template.artType === 'jharokha' && (
                        <div className="relative w-36 h-36 rounded-t-full bg-[#260A10] border-2 border-[#E5C378]/40 p-3 flex flex-col items-center justify-center shadow-lg">
                          <span className="font-serif text-[11px] text-[#E5C378] mb-1">|| श्री गणेशाय नमः ||</span>
                          <Heart size={16} className="text-[#E5C378] my-1" />
                          <span className="font-cinzel text-[9px] uppercase font-bold text-white tracking-widest">
                            Vedic Phere
                          </span>
                        </div>
                      )}

                      {template.artType === 'garden' && (
                        <div className="relative w-36 h-36 rounded-full bg-[#89d3b2]/10 border border-[#89d3b2]/30 flex flex-col items-center justify-center p-3">
                          <div className="w-10 h-10 rounded-full border border-[#89d3b2] flex items-center justify-center mb-1 text-[#89d3b2]">
                            🌿
                          </div>
                          <span className="font-cinzel text-[10px] uppercase font-bold text-[#89d3b2] tracking-widest">
                            Love Story
                          </span>
                          <span className="text-[8px] text-slate-300">Botanical Timeline</span>
                        </div>
                      )}

                      {template.artType === 'editorial' && (
                        <div className="relative w-36 h-36 bg-black/60 border border-white/20 p-4 flex flex-col items-center justify-center text-center">
                          <span className="font-cinzel text-xs font-black tracking-[0.3em] text-white mb-1">VOGUE</span>
                          <div className="w-12 h-px bg-[#D4AF37] my-1" />
                          <span className="font-cinzel text-[9px] uppercase tracking-widest text-slate-300">THE UNION</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Venue & Floating Pill */}
                    <div className="pb-3 text-center">
                      <p className="text-[10px] text-slate-300 font-medium truncate mb-2">
                        {template.venue}
                      </p>
                      <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-black/60 border border-white/15 text-[10px] text-[#D4AF37]">
                        <Music size={11} /> 
                        <span className="font-sans font-semibold text-[9px] uppercase tracking-wider">{template.tagline}</span>
                      </div>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6 z-30">
                      <span className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                        {template.title}
                      </span>
                      <a
                        href={template.link}
                        className="w-full py-3 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider text-black text-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #E5C378 0%, #D4AF37 50%, #A87A24 100%)' }}
                      >
                        Experience 3D ↗
                      </a>
                      <a
                        href={`/create?template=${template.id}`}
                        className="w-full py-2.5 rounded-full font-cinzel text-xs font-semibold uppercase tracking-wider text-white border border-[#D4AF37]/50 text-center hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Personalize ✨
                      </a>
                    </div>
                  </div>
                </div>

                {/* Outer Caption below Phone */}
                <div className="text-center mt-4">
                  <h4 className="font-cinzel text-sm font-bold text-white tracking-wide">
                    {template.title}
                  </h4>
                  <a
                    href={template.link}
                    className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline font-semibold mt-1 cursor-pointer"
                  >
                    Open Live Demo <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Button */}
          <div className="text-center mt-16">
            <a
              href="/create"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white border border-[#D4AF37]/60 bg-[#260A10]/50 hover:bg-[#260A10] hover:border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 transition-all cursor-pointer"
            >
              Browse All Templates & Personalize ↗
            </a>
          </div>
        </div>
      </section>

      {/* Why Wedlink Features */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            The Digital Calm
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            Why Indian Couples Choose WedLink
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#260A10]/40 border border-[#D4AF37]/20 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
              <Sparkles size={22} />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">3D Unboxing Experiences</h3>
            <p className="text-[#94A3B8] text-xs leading-relaxed">
              No flat text messages or heavy PDFs. Guests interactively open carved sandstone palace gates or break golden wax seals.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#260A10]/40 border border-[#D4AF37]/20 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
              <MapPin size={22} />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">1-Tap Maps & Calendar</h3>
            <p className="text-[#94A3B8] text-xs leading-relaxed">
              Eliminate &apos;venue address kya hai?&apos; calls. Guests tap once to start GPS navigation in Google Maps or add events to Google Calendar.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#260A10]/40 border border-[#D4AF37]/20 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
              <Clock size={22} />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">Live Countdown & Music</h3>
            <p className="text-[#94A3B8] text-xs leading-relaxed">
              Build celebration excitement with ticking real-time 4-box countdown timers and authentic soothing shehnai & sitar melodies.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-xs text-[#94A3B8] bg-black/40">
        <div className="font-cinzel text-base font-bold text-white tracking-[0.2em] mb-2">
          WED<span className="text-[#D4AF37]">LINK</span>
        </div>
        <p className="mb-4">One Link • Endless Celebrations</p>
        <p className="text-[11px] text-slate-600">
          © {new Date().getFullYear()} WedLink. All rights reserved. Made with love for unforgettable celebrations.
        </p>
      </footer>
    </div>
  );
}
