'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1E26] font-sans flex flex-col relative overflow-x-hidden">
      
      {/* 1. TOP HEADER */}
      <header className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-neutral-200 bg-[#FAF6EE]/90 backdrop-blur-md sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wider text-[#1A1E26]">WEDLINK</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsCollectionModalOpen(true)}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
          >
            Templates
          </button>
          <Link
            href="/create"
            className="px-4 py-2 rounded-full bg-[#1A1E26] text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all"
          >
            Create
          </Link>
        </div>
      </header>

      {/* 2. MAIN STOREFRONT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif italic text-4xl sm:text-6xl text-[#3b1219]">
            ... your kind of love.
          </h1>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={() => setSelectedCategory('Romantic')}
              className={`px-5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                selectedCategory === 'Romantic'
                  ? 'bg-white border-neutral-900 text-neutral-900 shadow-sm'
                  : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              Romantic
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Indian')}
              className={`px-5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                selectedCategory === 'Indian'
                  ? 'bg-white border-neutral-900 text-neutral-900 shadow-sm'
                  : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              Indian
            </button>
          </div>
        </div>

        {/* 3-PHONE CAROUSEL */}
        <div className="w-full flex justify-center items-center py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl w-full">
            
            {/* 1. LEFT PHONE: THE ROSE LETTER */}
            <div className="flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity">
              <div 
                onClick={() => setIsCollectionModalOpen(true)}
                className="w-[260px] h-[480px] bg-[#1A1E26] rounded-[36px] p-2.5 shadow-xl border-4 border-[#1A1E26] cursor-pointer flex flex-col relative overflow-hidden"
              >
                <div className="w-20 h-3.5 bg-[#1A1E26] rounded-b-xl mx-auto mb-2" />
                <div className="flex-1 bg-[#E8C2C8] rounded-[24px] p-4 flex flex-col justify-between border border-pink-300 text-center relative overflow-hidden">
                  <div className="pt-4">
                    <span className="text-[8px] uppercase tracking-widest text-[#541D36] font-bold block">
                      3D WAX SEAL
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#541D36] mt-1">Veer & Zara</h3>
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
                <h4 className="font-serif text-lg font-bold text-neutral-800">The Rose Letter</h4>
                <p className="text-[11px] text-neutral-500">Wax seal unboxing</p>
              </div>
            </div>

            {/* 2. CENTER PHONE: THE ROYAL COURTYARD (EMMA & NOAH) */}
            <div className="flex flex-col items-center">
              <div className="w-[300px] sm:w-[320px] h-[550px] sm:h-[580px] bg-[#1A1E26] rounded-[42px] p-3 shadow-2xl border-4 border-amber-600/60 flex flex-col relative overflow-hidden ring-4 ring-amber-500/10">
                <div className="w-28 h-4 bg-[#1A1E26] rounded-b-xl mx-auto mb-2 z-20" />

                {/* Inner Screen: Royal Carved Sandstone Entrance */}
                <div className="flex-1 bg-[#9A7B4F] rounded-[28px] p-3 flex flex-col justify-between text-center relative overflow-hidden border border-amber-300/40">
                  
                  {/* Inner Ivory Card with Gold Border */}
                  <div className="flex-1 bg-[#FFF9F2] rounded-[20px] p-5 flex flex-col justify-between text-center relative z-10 border border-amber-500/30 shadow-xl">
                    <div className="space-y-1 pt-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-amber-700 font-bold block">
                        INTERACTIVE 3D ENTRANCE
                      </span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-widest block pt-2">
                        THE WEDDING OF
                      </span>
                      <h2 className="font-serif text-3xl font-bold text-neutral-900 leading-tight pt-1">
                        Emma
                      </h2>
                      <span className="font-serif italic text-2xl text-amber-700 block leading-none">&</span>
                      <h2 className="font-serif text-3xl font-bold text-neutral-900 leading-tight">
                        Noah
                      </h2>
                      <p className="text-[11px] font-mono font-bold text-neutral-600 tracking-widest pt-2">
                        12 · 12 · 2027
                      </p>
                    </div>

                    <p className="text-[9px] tracking-wider text-neutral-500 uppercase font-semibold px-2 leading-relaxed">
                      TOGETHER IS A BEAUTIFUL PLACE TO BE
                    </p>

                    <Link
                      href="/templates/royal-courtyard"
                      className="w-full py-2.5 px-4 bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-900 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Explore design ↗
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Caption with Circle Arrow */}
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="/templates/royal-courtyard"
                  className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  <ArrowUpRight size={14} />
                </Link>
                <div className="text-left">
                  <Link
                    href="/templates/royal-courtyard"
                    className="font-serif text-xl font-bold text-neutral-900 hover:underline block leading-tight"
                  >
                    The Royal Courtyard
                  </Link>
                  <span className="text-xs text-neutral-500">3D palace entrance • Cinematic</span>
                </div>
              </div>
            </div>

            {/* 3. RIGHT PHONE: THE EDITORIAL */}
            <div className="flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity">
              <div 
                onClick={() => setIsCollectionModalOpen(true)}
                className="w-[260px] h-[480px] bg-[#1A1E26] rounded-[36px] p-2.5 shadow-xl border-4 border-[#1A1E26] cursor-pointer flex flex-col relative overflow-hidden"
              >
                <div className="w-20 h-3.5 bg-[#1A1E26] rounded-b-xl mx-auto mb-2" />
                <div className="flex-1 bg-[#2C3830] rounded-[24px] p-4 flex flex-col justify-between border border-emerald-800 text-center relative overflow-hidden text-white">
                  <div className="pt-4">
                    <span className="text-[8px] uppercase tracking-widest text-amber-300 font-bold block">
                      MODERN EDITORIAL
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">Maya & Liam</h3>
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
                <h4 className="font-serif text-lg font-bold text-neutral-800">The Editorial</h4>
                <p className="text-[11px] text-neutral-500">Cinematic opening</p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* 3. WEDLINK COLLECTION MODAL */}
      {isCollectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0E14]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-white/10 rounded-[28px] max-w-lg w-full p-8 text-center text-white shadow-2xl relative">
            
            <button 
              type="button" 
              onClick={() => setIsCollectionModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white text-lg"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-2">
              WEDLINK COLLECTION
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mb-2">
              Explore Wedding Invitations
            </h2>
            <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto leading-relaxed">
              Select any interactive luxury wedding invitation template below to experience live 3D unboxing, music and animations.
            </p>

            {/* 4 Template Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
              
              <Link
                href="/templates/royal-courtyard"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">The Royal Courtyard</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">3D Palace Gates & Music</p>
              </Link>

              <Link
                href="/templates/rose-letter"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">The Rose Letter</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Wax Seal & Scratch Card</p>
              </Link>

              <Link
                href="/templates/heritage"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">Heritage Rajputana</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Traditional Royal Elegance</p>
              </Link>

              <Link
                href="/templates/garden-romance"
                onClick={() => setIsCollectionModalOpen(false)}
                className="p-4 rounded-xl bg-[#1C2230] border border-white/5 hover:border-[#D4AF37] hover:bg-[#232B3D] transition-all group block cursor-pointer"
              >
                <h3 className="text-sm font-bold text-[#D4AF37] group-hover:underline">Garden Romance</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Floral Botanical Aesthetics</p>
              </Link>

            </div>

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
      <footer className="py-8 border-t border-neutral-200 text-center text-xs text-neutral-400">
        <p>WedLink • One Link • Endless Celebrations</p>
      </footer>

    </div>
  );
}
