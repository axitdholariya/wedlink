'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Heart, Crown, Music, Compass, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  href: string;
  motif: string;
  coupleNames: string;
  weddingDate: string;
  tagline: string;
  doorBg: string;
  accentColor: string;
  pillColor: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'rose-letter',
    name: 'The Rose Letter',
    category: 'Romantic',
    subtitle: 'Wax Seal & Scratch Card • Romantic unboxing',
    href: '/templates/rose-letter',
    motif: '💌',
    coupleNames: 'Veer & Zara',
    weddingDate: '18 · 11 · 2026',
    tagline: 'TWO SOULS, ONE ETERNAL JOURNEY',
    doorBg: 'bg-[#F9ECEF]',
    accentColor: '#D97A8F',
    pillColor: '#F2D3D9',
  },
  {
    id: 'royal-courtyard',
    name: 'The Royal Courtyard',
    category: 'Indian',
    subtitle: '3D palace entrance • Cinematic',
    href: '/templates/royal-courtyard',
    motif: '🏰',
    coupleNames: 'Emma & Noah',
    weddingDate: '12 · 12 · 2027',
    tagline: 'TOGETHER IS A BEAUTIFUL PLACE TO BE',
    doorBg: 'bg-[#FBF6EE]',
    accentColor: '#B68A50',
    pillColor: '#EADBCC',
  },
  {
    id: 'editorial',
    name: 'The Editorial',
    category: 'Editorial',
    subtitle: 'Vogue minimalist • Cinematic opening',
    href: '/templates/editorial',
    motif: '✨',
    coupleNames: 'Maya & Liam',
    weddingDate: '24 · 01 · 2027',
    tagline: 'A MODERN LOVE STORY',
    doorBg: 'bg-[#EBF0EC]',
    accentColor: '#4A6B53',
    pillColor: '#D3DFD6',
  },
  {
    id: 'heritage',
    name: 'Heritage Rajputana',
    category: 'Indian',
    subtitle: 'Traditional Shlokas & Regal Borders',
    href: '/templates/heritage',
    motif: '🪔',
    coupleNames: 'Dev & Riya',
    weddingDate: '05 · 02 · 2027',
    tagline: 'SACRED VOWS & ROYAL SPLENDOR',
    doorBg: 'bg-[#FFF7ED]',
    accentColor: '#C25E2E',
    pillColor: '#FED7AA',
  },
  {
    id: 'garden-romance',
    name: 'Garden Romance',
    category: 'Romantic',
    subtitle: 'Botanical Florals & Ivory Whispers',
    href: '/templates/garden-romance',
    motif: '🌿',
    coupleNames: 'Chloe & Arthur',
    weddingDate: '15 · 03 · 2027',
    tagline: 'BLOOMING UNDER THE STARS',
    doorBg: 'bg-[#F4F9F4]',
    accentColor: '#5C8A68',
    pillColor: '#DBEADB',
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSlide, setActiveSlide] = useState<number>(1); // 1 = The Royal Courtyard (Center)

  const categories = ['All', 'Romantic', 'Indian', 'Editorial'];

  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2] flex flex-col">
      
      {/* Brand Kit Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-[#B68A50]/20 bg-[#FFF9F2]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#541D36] border border-[#B68A50]/40 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl">🏰</span>
          </div>
          <div className="flex flex-col">
            <span className="font-brand-heading text-2xl font-bold tracking-wide leading-none text-[#541D36]">
              Wedlink
            </span>
            <span className="text-[9px] tracking-widest text-[#B68A50] font-bold uppercase mt-0.5">
              One Link • Endless Celebrations
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="px-5 py-2.5 rounded-full bg-[#541D36] hover:bg-[#43162B] text-amber-200 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
          >
            Create Your Invite <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* 2. HERO SHOWCASE SECTION */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B68A50] mb-2 block">
            Signature Interactive Invitations
          </span>
          <h1 className="font-brand-heading italic text-4xl sm:text-6xl lg:text-7xl font-bold text-[#541D36] leading-tight">
            Designed for your kind of love.
          </h1>
          <p className="text-sm sm:text-base text-[#7A6B72] mt-3 max-w-xl mx-auto">
            Experience 3D unboxing, royal carved doors, sacred music, and instant guest RSVPs in one link.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#541D36] text-[#FFF9F2] shadow-sm'
                    : 'bg-white border border-[#B68A50]/30 text-[#7A6B72] hover:border-[#541D36]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. THREE-PHONE CAROUSEL / TEMPLATE SHOWCASE (Screenshot 1 Exact Layout) */}
        <div className="w-full relative flex items-center justify-center py-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-5xl items-center">
            
            {/* CARD 1: LEFT CARD (The Rose Letter) */}
            <div className="flex flex-col items-center group">
              <Link 
                href="/templates/rose-letter"
                className="w-full max-w-[280px] h-[520px] bg-[#241C24] rounded-[36px] p-2.5 shadow-xl border-4 border-[#241C24] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                <div className="w-24 h-4 bg-[#241C24] rounded-b-xl mx-auto mb-2" />
                
                {/* Screen Content */}
                <div className="flex-1 bg-[#F9ECEF] rounded-[24px] p-5 flex flex-col justify-between text-center relative border border-pink-200">
                  <div className="pt-6">
                    <span className="text-[9px] uppercase tracking-widest text-[#D97A8F] font-bold block mb-1">
                      Interactive 3D Wax Seal
                    </span>
                    <h3 className="font-brand-heading text-2xl font-bold text-[#541D36]">Veer & Zara</h3>
                    <p className="text-[10px] text-[#7A6B72] tracking-wider mt-1">18 · 11 · 2026</p>
                  </div>

                  <div className="w-24 h-24 mx-auto rounded-full bg-white/70 border-2 border-[#D97A8F]/40 flex items-center justify-center text-4xl shadow-md">
                    💌
                  </div>

                  {/* Direct Link Button */}
                  <span className="py-2.5 px-4 rounded-xl bg-white border border-[#D97A8F]/40 text-[#541D36] font-bold text-xs shadow flex items-center justify-center gap-1 group-hover:bg-[#541D36] group-hover:text-white transition-colors">
                    Explore design <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              {/* Bottom Caption & Link */}
              <div className="mt-4 text-center">
                <Link 
                  href="/templates/rose-letter"
                  className="font-brand-heading text-2xl font-bold text-[#541D36] hover:text-[#B68A50] transition-colors flex items-center justify-center gap-1.5"
                >
                  The Rose Letter <ArrowUpRight size={16} />
                </Link>
                <p className="text-xs text-[#7A6B72] mt-0.5">Wax Seal & Scratch Card • Romantic</p>
              </div>
            </div>

            {/* CARD 2: CENTER HERO CARD (THE ROYAL COURTYARD - YELLOW / GOLDEN ROYAL FOLD) */}
            <div className="flex flex-col items-center group md:-mt-6">
              <Link 
                href="/templates/royal-courtyard"
                className="w-full max-w-[320px] h-[580px] bg-[#241C24] rounded-[42px] p-3 shadow-2xl border-4 border-[#B68A50] relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col ring-4 ring-[#B68A50]/20"
              >
                {/* Speaker Notch */}
                <div className="w-28 h-4 bg-[#241C24] rounded-b-xl mx-auto mb-2 z-20" />
                
                {/* Screen Content: Carved Sandstone Palace Entrance */}
                <div className="flex-1 bg-[#FBF6EE] rounded-[28px] p-6 flex flex-col justify-between text-center relative border border-[#B68A50]/40 overflow-hidden shadow-inner">
                  
                  {/* Ornate Gold Border & Background */}
                  <div className="absolute inset-2 border border-[#B68A50]/30 rounded-[20px] pointer-events-none" />
                  
                  <div className="pt-6 relative z-10 space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B68A50] font-bold block">
                      INTERACTIVE 3D ENTRANCE
                    </span>
                    <span className="text-[10px] text-[#7A6B72] uppercase tracking-widest block pt-1">
                      THE WEDDING OF
                    </span>
                    <h2 className="font-brand-heading text-3xl sm:text-4xl font-bold text-[#541D36] leading-tight pt-1">
                      Emma
                    </h2>
                    <span className="font-brand-heading italic text-2xl text-[#B68A50] block leading-none">&</span>
                    <h2 className="font-brand-heading text-3xl sm:text-4xl font-bold text-[#541D36] leading-tight">
                      Noah
                    </h2>
                    <p className="text-[11px] font-mono font-bold text-[#B68A50] tracking-widest pt-2">
                      12 · 12 · 2027
                    </p>
                  </div>

                  <div className="relative z-10 py-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/80 border-2 border-[#B68A50] flex items-center justify-center text-3xl shadow-lg">
                      🏰
                    </div>
                    <p className="text-[10px] tracking-wider text-[#7A6B72] uppercase font-bold mt-2">
                      TOGETHER IS A BEAUTIFUL PLACE TO BE
                    </p>
                  </div>

                  {/* ✅ DIRECT EXPLORE DESIGN BUTTON (सीधे /templates/royal-courtyard पर जाएगा) */}
                  <div className="relative z-10">
                    <span className="w-full py-3 px-4 rounded-xl bg-white border border-[#B68A50] text-[#541D36] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 group-hover:bg-[#541D36] group-hover:text-amber-200 transition-colors">
                      Explore design <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Bottom Caption & Link */}
              <div className="mt-4 text-center">
                <Link 
                  href="/templates/royal-courtyard"
                  className="font-brand-heading text-2xl sm:text-3xl font-bold text-[#541D36] hover:text-[#B68A50] transition-colors flex items-center justify-center gap-1.5"
                >
                  The Royal Courtyard <ArrowUpRight size={18} />
                </Link>
                <p className="text-xs text-[#7A6B72] mt-0.5">3D palace entrance • Cinematic</p>
              </div>
            </div>

            {/* CARD 3: RIGHT CARD (The Editorial) */}
            <div className="flex flex-col items-center group">
              <Link 
                href="/templates/editorial"
                className="w-full max-w-[280px] h-[520px] bg-[#241C24] rounded-[36px] p-2.5 shadow-xl border-4 border-[#241C24] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                <div className="w-24 h-4 bg-[#241C24] rounded-b-xl mx-auto mb-2" />
                
                {/* Screen Content */}
                <div className="flex-1 bg-[#EBF0EC] rounded-[24px] p-5 flex flex-col justify-between text-center relative border border-emerald-200">
                  <div className="pt-6">
                    <span className="text-[9px] uppercase tracking-widest text-[#4A6B53] font-bold block mb-1">
                      Contemporary Editorial
                    </span>
                    <h3 className="font-brand-heading text-2xl font-bold text-[#241C24]">Maya & Liam</h3>
                    <p className="text-[10px] text-[#7A6B72] tracking-wider mt-1">24 · 01 · 2027</p>
                  </div>

                  <div className="w-24 h-24 mx-auto rounded-full bg-white/70 border-2 border-[#4A6B53]/40 flex items-center justify-center text-4xl shadow-md">
                    ✨
                  </div>

                  {/* Direct Link Button */}
                  <span className="py-2.5 px-4 rounded-xl bg-white border border-[#4A6B53]/40 text-[#241C24] font-bold text-xs shadow flex items-center justify-center gap-1 group-hover:bg-[#241C24] group-hover:text-white transition-colors">
                    Explore design <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              {/* Bottom Caption & Link */}
              <div className="mt-4 text-center">
                <Link 
                  href="/templates/editorial"
                  className="font-brand-heading text-2xl font-bold text-[#541D36] hover:text-[#B68A50] transition-colors flex items-center justify-center gap-1.5"
                >
                  The Editorial <ArrowUpRight size={16} />
                </Link>
                <p className="text-xs text-[#7A6B72] mt-0.5">Cinematic opening • Minimalist</p>
              </div>
            </div>

          </div>

        </div>

        {/* 4. ALL TEMPLATES GRID (DIRECT ACCESS TO ALL 5 DESIGNS) */}
        <div className="w-full max-w-5xl mt-16 pt-12 border-t border-[#B68A50]/20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B68A50]">
              Full Catalog
            </span>
            <h2 className="font-brand-heading text-3xl sm:text-4xl font-bold text-[#541D36] mt-1">
              Explore All Signature Invitations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map(t => (
              <Link
                key={t.id}
                href={t.href}
                className="p-5 rounded-2xl bg-white border border-[#B68A50]/30 shadow-sm hover:shadow-md hover:border-[#541D36] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl p-2 rounded-xl bg-[#FFF9F2] border border-[#B68A50]/20">{t.motif}</span>
                  <div>
                    <h3 className="font-brand-heading text-xl font-bold text-[#541D36] group-hover:text-[#B68A50] transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[#7A6B72]">{t.subtitle}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFF9F2] group-hover:bg-[#541D36] text-[#541D36] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* 5. FOOTER */}
      <footer className="py-8 border-t border-[#B68A50]/20 text-center text-xs text-[#7A6B72] bg-[#FAF4ED]">
        <span className="font-brand-heading text-xl font-bold text-[#541D36] block">Wedlink</span>
        <p className="text-[10px] tracking-widest text-[#B68A50] uppercase mt-1">One Link • Endless Celebrations</p>
      </footer>

    </div>
  );
}
