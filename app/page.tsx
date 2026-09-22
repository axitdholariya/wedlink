'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Heart, Sparkles, Check, ChevronDown } from 'lucide-react';

const CATEGORIES = ['HINDU', 'MUSLIM', 'SIKH', 'CHRISTIAN', 'DESTINATION', 'FUSION'];

const MOBILE_TEMPLATES = [
  {
    id: 'royal-courtyard',
    name: 'The Royal Courtyard',
    couple: 'Priya & Arjun',
    date: '259d 09h 44m',
    link: '/templates/royal-courtyard',
    tag: '3D Palace Doors',
    bg: 'from-[#fadbc8] via-[#f7c8b2] to-[#f4b69d]',
    accent: '#8d4b32',
    style: 'palace'
  },
  {
    id: 'rose-letter',
    name: 'The Rose Letter',
    couple: 'Priya & Arjun',
    date: '259d 09h 45m',
    link: '/templates/rose-letter',
    tag: 'Wax Seal & Scratch',
    bg: 'from-[#1a2942] via-[#243b5e] to-[#121c2e]',
    accent: '#f0c674',
    style: 'night-palace'
  },
  {
    id: 'heritage',
    name: 'Heritage Rajputana',
    couple: 'Priya & Arjun',
    date: '259d 09h 44m',
    link: '/templates/heritage',
    tag: 'Royal Jharokha',
    bg: 'from-[#fcf8f2] via-[#f7ede1] to-[#eedbc5]',
    accent: '#9a6b38',
    style: 'arch'
  },
  {
    id: 'garden-romance',
    name: 'Garden Romance',
    couple: 'Priya & Arjun',
    date: '259d 09h 44m',
    link: '/templates/garden-romance',
    tag: 'Floral Jharokha',
    bg: 'from-[#f9ded1] via-[#f5c7b3] to-[#e8a58c]',
    accent: '#a84c2e',
    style: 'jharokha'
  },
  {
    id: 'editorial',
    name: 'The Editorial',
    couple: 'Priya & Arjun',
    date: '259d 09h 44m',
    link: '/templates/editorial',
    tag: 'Vogue Modern',
    bg: 'from-[#232526] via-[#414345] to-[#1a1a1a]',
    accent: '#ffffff',
    style: 'editorial'
  }
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('HINDU');

  return (
    <div 
      className="min-h-screen bg-[#FAF7F2] text-[#2D141E] selection:bg-[#341822] selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
      `}</style>

      {/* 1. ORIGINAL HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-16 py-5 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD5]">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#2D141E] flex items-center gap-2">
            <span className="text-xl font-sans font-black">W</span> Wedlink
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium text-[#6A5E62]">
          <a href="#collection" className="hover:text-[#2D141E] transition-colors">The collection</a>
          <a href="#how-it-works" className="hover:text-[#2D141E] transition-colors">How it works</a>
          <a href="#questions" className="hover:text-[#2D141E] transition-colors">Questions</a>
        </nav>

        <a
          href="/create"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide text-white bg-[#341822] hover:bg-[#230f16] transition-all cursor-pointer shadow-sm"
        >
          Create your invitation <ArrowUpRight size={14} />
        </a>
      </header>

      {/* 2. ORIGINAL HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-16 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#8C7A70] uppercase">
            — For the beginning of forever
          </div>
          <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-[76px] font-normal tracking-tight text-[#2D141E] leading-[1.08]">
            Your love story. <br />
            <span className="italic block mt-1">Beautifully linked.</span>
          </h1>
          <p className="text-[#6A5E62] text-base sm:text-lg max-w-xl font-normal leading-relaxed pt-2">
            A wedding website that feels like you. Thoughtfully designed, effortlessly personalized, and ready to share with everyone you love.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="/create"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold tracking-wide text-white bg-[#341822] hover:bg-[#230f16] transition-all shadow-md cursor-pointer"
            >
              Find your invitation <ArrowUpRight size={15} />
            </a>
            <a
              href="#collection"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-[#2D141E] hover:text-[#522535] transition-colors cursor-pointer"
            >
              Take a little peek →
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-[#7A6E72] font-medium">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#341822]" /> Make it yours in minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#341822]" /> One link for every guest
            </span>
          </div>
        </div>

        {/* Right Hero Arch Card (Exact Aarav & Meera Design) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          {/* Background Arch */}
          <div className="w-[330px] sm:w-[380px] h-[520px] bg-[#EAE2D8] rounded-t-[190px] rounded-b-2xl absolute -top-4 right-0 lg:right-4 z-0" />

          {/* Floating Card */}
          <div className="relative z-10 w-[300px] sm:w-[340px] bg-white rounded-t-[170px] rounded-b-xl shadow-2xl p-6 text-center border border-white/60">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A8A80] font-semibold block pt-6 mb-1">
              Your next chapter starts here
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A8A80] font-semibold block mb-3">
              Together with our families
            </span>

            <h3 className="font-serif-luxury text-3xl font-normal text-[#2D141E] mb-1">
              Aarav & Meera
            </h3>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A8A80] font-semibold block mb-4">
              Are getting married
            </span>

            {/* Photo Frame */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                alt="Aarav and Meera"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-[10px] uppercase tracking-[0.25em] text-[#9A8A80] font-bold">
              December
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#2D141E] my-0.5">
              12
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#9A8A80] font-bold mb-4">
              Udaipur, India
            </div>

            {/* Floating Mini Pill */}
            <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#E8DFD5] text-left">
              <p className="text-[10px] font-semibold text-[#2D141E] flex items-center gap-1">
                <Heart size={10} className="text-[#8D3A4B] fill-[#8D3A4B]" /> A little more you.
              </p>
              <p className="text-[9px] text-[#7A6E72]">A lot more meaningful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MOBILE FORMAT SHOWCASE SECTION (EXACT REFERENCE IMAGE) */}
      <section id="collection" className="py-20 px-6 sm:px-16 border-t border-[#E8DFD5] bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto">
          {/* Top Filter Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-14">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-sm text-xs tracking-[0.18em] uppercase font-semibold transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#341822] text-white shadow-sm'
                    : 'bg-transparent text-[#7A6E72] hover:text-[#2D141E] border border-[#DDD4C9]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 4-5 Mobile Phone Mockups in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {MOBILE_TEMPLATES.slice(0, 4).map(tpl => (
              <a
                key={tpl.id}
                href={tpl.link}
                className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                {/* iPhone Outer Frame */}
                <div className="relative w-[265px] h-[545px] bg-[#1C1D21] rounded-[48px] p-2.5 shadow-[0_15px_45px_rgba(0,0,0,0.15)] border-[3.5px] border-[#31333B] transition-shadow group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-end pr-2">
                    <div className="w-2.5 h-2.5 bg-[#252830] rounded-full border border-white/20" />
                  </div>

                  {/* Inner Screen Display */}
                  <div className={`relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b ${tpl.bg} flex flex-col justify-between p-5 pt-8 text-center border border-black/10`}>
                    
                    {/* Top Couple Name */}
                    <div>
                      <h4 className="font-serif-luxury text-2xl font-normal text-[#2D141E] tracking-tight leading-tight">
                        {tpl.couple.split('&')[0]}
                      </h4>
                      <p className="font-serif-luxury text-sm italic text-[#6A5E62] -my-0.5">weds</p>
                      <h4 className="font-serif-luxury text-2xl font-normal text-[#2D141E] tracking-tight leading-tight">
                        {tpl.couple.split('&')}
                      </h4>
                      <p className="text-[10px] text-[#7A6E72] tracking-widest mt-1 uppercase font-semibold">
                        {tpl.date}
                      </p>
                    </div>

                    {/* Center Artwork Illustration */}
                    <div className="my-auto flex flex-col items-center justify-center">
                      {tpl.style === 'palace' && (
                        <div className="w-32 h-32 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 p-3 flex flex-col items-center justify-center shadow-sm">
                          <div className="w-16 h-12 border-2 border-[#8d4b32] rounded-t-full flex items-center justify-center mb-1">
                            <Sparkles size={16} className="text-[#8d4b32]" />
                          </div>
                          <span className="font-serif-luxury text-sm font-bold text-[#8d4b32]">Palace Gates</span>
                          <span className="text-[9px] text-[#7A6E72]">Tap to Slide Open</span>
                        </div>
                      )}

                      {tpl.style === 'night-palace' && (
                        <div className="w-32 h-32 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/20 p-3 flex flex-col items-center justify-center shadow-lg text-white">
                          <div className="w-8 h-8 rounded-full bg-[#f0c674] mb-2 shadow-md flex items-center justify-center text-black font-bold text-xs">
                            🌕
                          </div>
                          <span className="font-serif-luxury text-sm font-bold text-[#f0c674]">Royal Night</span>
                          <span className="text-[9px] text-slate-300">Wax Seal Unboxing</span>
                        </div>
                      )}

                      {tpl.style === 'arch' && (
                        <div className="w-32 h-36 rounded-t-full bg-white/60 border border-[#9a6b38]/40 p-3 flex flex-col items-center justify-center shadow-sm">
                          <span className="font-serif-luxury text-xs text-[#9a6b38] mb-1">|| श्री गणेश ||</span>
                          <div className="w-10 h-10 border-t-2 border-[#9a6b38] rounded-t-full my-1 flex items-center justify-center">
                            <Heart size={14} className="text-[#9a6b38]" />
                          </div>
                          <span className="font-serif-luxury text-xs font-bold text-[#2D141E]">Vedic Phere</span>
                        </div>
                      )}

                      {tpl.style === 'jharokha' && (
                        <div className="w-32 h-36 rounded-t-full bg-[#e8a58c]/30 border-2 border-[#a84c2e]/40 p-3 flex flex-col items-center justify-center shadow-sm">
                          <span className="font-serif-luxury text-xs font-bold text-[#a84c2e] mb-1">Jharokha Vows</span>
                          <p className="text-[16px]">🌸 🌺</p>
                          <span className="text-[9px] text-[#7A6E72] mt-1">Floral Mandap</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Pill & Hover Button */}
                    <div className="space-y-2">
                      <div className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-black/5 text-[10px] font-semibold text-[#2D141E]">
                        {tpl.name}
                      </div>
                      <div className="w-full py-2 rounded-full bg-[#341822] text-white text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        View 3D Demo ↗
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle Below Phone */}
                <span className="mt-3 font-serif-luxury text-sm font-semibold text-[#2D141E]">
                  {tpl.name}
                </span>
              </a>
            ))}
          </div>

          {/* Brown "BROWSE ALL" Button (Exact like Reference Image) */}
          <div className="text-center mt-14">
            <a
              href="/create"
              className="inline-block px-10 py-3.5 rounded-sm font-sans text-xs uppercase tracking-[0.25em] font-bold text-white bg-[#732912] hover:bg-[#5e200c] shadow-md transition-all cursor-pointer"
            >
              BROWSE ALL
            </a>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6 sm:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A70] font-semibold block mb-2">
            Effortless In 3 Steps
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#2D141E]">
            How WedLink Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-sm font-bold text-[#341822] mb-5">
              1
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#2D141E] mb-2">Select Your 3D Theme</h3>
            <p className="text-sm text-[#6A5E62] leading-relaxed">
              Choose from royal palace gates, blush romance wax seals, or high-fashion editorial magazine formats.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-sm font-bold text-[#341822] mb-5">
              2
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#2D141E] mb-2">Personalize Details</h3>
            <p className="text-sm text-[#6A5E62] leading-relaxed">
              Add your love story, itinerary (Haldi, Sangeet, Pheras), Google Maps directions, and dress codes.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-sm font-bold text-[#341822] mb-5">
              3
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#2D141E] mb-2">Share One Calm Link</h3>
            <p className="text-sm text-[#6A5E62] leading-relaxed">
              Send your interactive link on WhatsApp. Collect real-time RSVPs and guest blessings effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer id="questions" className="py-12 px-6 border-t border-[#E8DFD5] text-center text-xs text-[#7A6E72] bg-[#FAF7F2]">
        <div className="font-serif-luxury text-xl font-bold text-[#2D141E] mb-2">
          Wedlink
        </div>
        <p className="mb-4">One Link • Endless Celebrations</p>
        <p className="text-[11px] text-[#9A8A80]">
          © {new Date().getFullYear()} WedLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
