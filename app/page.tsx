'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2] flex flex-col relative overflow-x-hidden">
      
      {/* Brand Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* 1. TOP HEADER */}
      <header className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-[#B68A50]/20 bg-[#FFF9F2]/90 backdrop-blur-md sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#541D36] border border-[#B68A50]/40 flex items-center justify-center text-lg shadow-sm">
            🏰
          </div>
          <span className="font-brand-heading text-2xl font-bold tracking-wide text-[#541D36]">
            Wedlink
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCollectionModalOpen(true)}
            className="text-xs font-bold uppercase tracking-wider text-[#541D36] hover:text-[#B68A50] px-3 py-1.5"
          >
            All Templates
          </button>
          <Link
            href="/create"
            className="px-4 py-2 rounded-full bg-[#541D36] hover:bg-[#43162B] text-amber-200 font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-1"
          >
            Create Invite <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* 2. MAIN STOREFRONT (SCREENSHOT 1 EXACT DESIGN) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-brand-heading italic text-4xl sm:text-6xl text-[#3b1219]">
            ... your kind of love.
          </h1>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => setSelectedCategory('Romantic')}
              className={`px-5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedCategory === 'Romantic'
                  ? 'bg-white border-[#541D36] text-[#541D36] shadow-sm'
                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-500'
              }`}
            >
              Romantic
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Indian')}
              className={`px-5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedCategory === 'Indian'
                  ? 'bg-white border-[#541D36] text-[#541D36] shadow-sm'
                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-500'
              }`}
            >
              Indian
            </button>
          </div>
        </div>

        {/* 3-PHONE CAROUSEL */}
        <div className="w-full flex justify-center items-center py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl w-full">
            
            {/* 1. LEFT PHONE: THE ROSE LETTER (BLUSH ENVELOPE) */}
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <div 
                onClick={() => setIsCollectionModalOpen(true)}
                className="w-[260px] h-[480px] bg-[#241C24] rounded-[36px] p-2.5 shadow-xl border-4 border-[#241C24] cursor-pointer flex flex-col relative overflow-hidden"
              >
                <div className="w-20 h-3.5 bg-[#241C24] rounded-b-xl mx-auto mb-2" />
                <div className="flex-1 bg-[#E8C2C8] rounded-[24px] p-4 flex flex-col justify-between border border-pink-300 text-center relative overflow-hidden">
                  <div className="pt-4">
                    <span className="text-[8px] uppercase tracking-widest text-[#541D36] font-bold block">
                      3D WAX SEAL
                    </span>
                    <h3 className="font-brand-heading text-xl font-bold text-[#541D36]">Veer & Zara</h3>
                  </div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-3xl shadow">
                    💌
                  </div>
                  <div className="py-2 bg-white/80 rounded-lg text-[10px] font-bold text-[#541D36]">
                    Explore design ↗
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-brand-heading text-xl font-bold text-[#541D36]">The Rose Letter</h4>
                <p className="text-[11px] text-[#7A6B72]">Romantic Unboxing</p>
              </div>
            </div>

            {/* 2. CENTER PHONE: THE ROYAL COURTYARD (EMMA & NOAH - YELLOW ROYAL FOLD) */}
            <div className="flex flex-col items-center">
              <div className="w-[300px] sm:w-[320px] h-[550px] sm:h-[580px] bg-[#241C24] rounded-[42px] p-3 shadow-2xl border-4 border-[#B68A50] flex flex-col relative overflow-hidden ring-4 ring-[#B68A50]/20">
                {/* Speaker notch */}
                <div className="w-28 h-4 bg-[#241C24] rounded-b-xl mx-auto mb-2 z-20" />

                {/* Inner Screen: Royal Carved Sandstone Entrance */}
                <div className="flex-1 bg-[#856536] rounded-[28px] p-3 flex flex-col justify-between text-center relative overflow-hidden border border-[#D8B67D]">
                  
                  {/* Outer Sandstone Palace Pillars Image/Texture */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Inner Ivory Card with Gold Border */}
                  <div className="flex-1 bg-[#FBF6EE] rounded-[20px] p-5 flex flex-col justify-between text-center relative z-10 border-2 border-[#B68A50] shadow-xl">
                    <div className="space-y-1 pt-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#B68A50] font-bold block">
                        INTERACTIVE 3D ENTRANCE
                      </span>
                      <span className="text-[9px] text-[#7A6B72] uppercase tracking-widest block pt-2">
                        THE WEDDING OF
                      </span>
                      <h2 className="font-brand-heading text-3xl font-bold text-[#241C24] leading-tight pt-1">
                        Emma
                      </h2>
                      <span className="font-brand-heading italic text-2xl text-[#B68A50] block leading-none">&</span>
                      <h2 className="font-brand-heading text-3xl font-bold text-[#241C24] leading-tight">
                        Noah
                      </h2>
                      <p className="text-[11px] font-mono font-bold text-[#7A6B72] tracking-widest pt-2">
                        12 · 12 · 2027
                      </p>
                    </div>

                    <p className="text-[9px] tracking-wider text-[#7A6B72] uppercase font-bold px-2 leading-relaxed">
                      TOGETHER IS A BEAUTIFUL PLACE TO BE
                    </p>

                    {/* ✅ DIRECT BUTTON (सीधा पीला 3D टेम्पलेट खुलेगा) */}
                    <Link
                      href="/templates/royal-courtyard"
                      className="w-full py-2.5 px-4 bg-white border border-[#B68A50] text-[#241C24] hover:bg-[#541D36] hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Explore design <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Caption with Circle Arrow */}
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="/templates/royal-courtyard"
                  className="w-9 h-9 rounded-full border border-[#541D36] flex items-center justify-center text-[#541D36] hover:bg-[#541D36] hover:text-white transition-colors"
                >
                  <ArrowUpRight size={16} />
                </Link>
                <div className="text-left">
                  <Link
                    href="/templates/royal-courtyard"
                    className="font-brand-heading text-xl font-bold text-[#541D36] hover:text-[#B68A50] transition-colors block leading-tight"
                  >
                    The Royal Courtyard
                  </Link>
                  <span className="text-xs text-[#7A6B72]">3D palace entrance • Cinematic</span>
                </div>
              </div>
            </div>

            {/* 3. RIGHT PHONE: THE EDITORIAL */}
            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
              <div 
                onClick={() => setIsCollectionModalOpen(true)}
                className="w-[260px] h-[480px] bg-[#241C24] rounded-[36px] p-2.5 shadow-xl border-4 border-[#241C24] cursor-pointer flex flex-col relative overflow-hidden"
              >
                <div className="w-20 h-3.5 bg-[#241C24] rounded-b-xl mx-auto mb-2" />
                <div className="flex-1 bg-[#2C3830] rounded-[24px] p-4 flex flex-col justify-between border border-emerald-800 text-center relative overflow-hidden text-white">
                  <div className="pt-4">
                    <span className="text-[8px] uppercase tracking-widest text-[#B68A50] font-bold block">
                      MODERN EDITORIAL
                    </span>
                    <h3 className="font-brand-heading text-xl font-bold text-white">Maya & Liam</h3>
                  </div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow">
                    ✨
                  </div>
                  <div className="py-2 bg-white/20 rounded-lg text-[10px] font-bold text-white">
                    Explore design ↗
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-brand-heading text-xl font-bold text-[#541D36]">The Editorial</h4>
                <p className="text-[11px] text-[#7A6B72]">Cinematic opening</p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ============================================================== */}
      {/* 3. WEDLINK COLLECTION MODAL (SCREENSHOT 2 EXACT DESIGN)         */}
      {/* ============================================================== */}
      {isCollectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0E14]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-white/10 rounded-[28px] max-w-lg w-full p-8 text-center text-white shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              type="button" 
              onClick={() => setIsCollectionModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white text-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-2">
              WEDLINK COLLECTION
            </span>
            <h2 className="font-brand-heading text-3xl font-bold text-white mb-2">
              Explore Wedding Invitations
            </h2>
            <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto leading-relaxed">
              Select any interactive luxury wedding invitation template below to experience live 3D unboxing, music and animations.
            </p>

            {/* 4 Template Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
              
              {/* ✅ 1. THE ROYAL COURTYARD (सीधा पीला 3D टेम्पलेट खोलेगा) */}
              <Link
                href="/templates/royal-courtyard"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">The Royal Courtyard</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">3D Palace Gates & Music</p>
              </Link>

              {/* 2. THE ROSE LETTER */}
              <Link
                href="/templates/rose-letter"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">The Rose Letter</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Wax Seal & Scratch Card</p>
              </Link>

              {/* 3. HERITAGE RAJPUTANA */}
              <Link
                href="/templates/heritage"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">Heritage Rajputana</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Traditional Royal Elegance</p>
              </Link>

              {/* 4. GARDEN ROMANCE */}
              <Link
                href="/templates/garden-romance"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">Garden Romance</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Floral Botanical Aesthetics</p>
              </Link>

            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => setIsCollectionModalOpen(false)}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              ← Back to Homepage
            </button>

            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-neutral-500">
              WedLink • One Link • Endless Celebrations
            </div>
          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <footer className="py-8 border-t border-[#B68A50]/20 text-center text-xs text-[#7A6B72]">
        <span className="font-brand-heading text-xl font-bold text-[#541D36] block">Wedlink</span>
        <p className="text-[10px] tracking-widest text-[#B68A50] uppercase mt-1">One Link • Endless Celebrations</p>
      </footer>

    </div>
  );
}
