'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Check, Heart, Sparkles, MapPin, Music } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2] flex flex-col">
      
      {/* Brand Typography */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#541D36] text-[#FFF9F2] text-[11px] py-2 px-4 text-center font-medium tracking-wider">
        A little link. A lifetime of memories.
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="h-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between border-b border-[#B68A50]/20 bg-[#FFF9F2]/90 backdrop-blur-md sticky top-0 z-40">
        
        {/* Official Ribbon 'W' Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#541D36] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 85" fill="none" className="w-full h-full text-[#FFF9F2]">
              <path 
                d="M12 25 C18 10, 32 10, 38 30 L45 55 C48 65, 52 65, 55 55 L62 30 C68 10, 82 10, 88 25 C94 40, 85 62, 70 75 C60 84, 52 84, 48 78 C44 72, 45 62, 48 50 C42 62, 35 75, 26 75 C14 75, 6 50, 12 25 Z" 
                fill="currentColor" 
                opacity="0.95"
              />
            </svg>
          </div>
          <span className="font-brand-heading text-2xl font-bold tracking-wide text-[#541D36]">
            Wedlink
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#7A6B72]">
          <a href="#collection" className="hover:text-[#541D36] transition-colors">The collection</a>
          <a href="#how-it-works" className="hover:text-[#541D36] transition-colors">How it works</a>
          <a href="#questions" className="hover:text-[#541D36] transition-colors">Questions</a>
        </nav>

        {/* Right CTA */}
        <div>
          <Link
            href="/create"
            className="px-5 py-2.5 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-[#FFF9F2] font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
          >
            Create your invitation <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* 3. HERO SECTION (SCREENSHOT 1 EXACT DESIGN) */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Story Headline & CTAs */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          
          <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#7A6B72] flex items-center gap-2">
            <span className="w-6 h-px bg-[#B68A50]" /> FOR THE BEGINNING OF FOREVER
          </div>

          <h1 className="font-brand-heading italic text-5xl sm:text-6xl lg:text-7xl font-bold text-[#541D36] leading-[1.08] tracking-tight">
            Your love story.<br />
            <span className="not-italic font-brand-heading">Beautifully linked.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#7A6B72] leading-relaxed max-w-lg font-brand-body">
            A wedding website that feels like you. Thoughtfully designed, effortlessly personalized, and ready to share with everyone you love.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#collection"
              className="px-7 py-3.5 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-[#FFF9F2] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              Find your invitation <ArrowUpRight size={15} />
            </a>

            <a
              href="#how-it-works"
              className="px-5 py-3.5 text-xs font-bold text-[#241C24] hover:text-[#541D36] transition-colors flex items-center gap-1.5"
            >
              Take a little peek <ArrowRight size={14} />
            </a>
          </div>

          {/* Checklist Trust Badges */}
          <div className="flex items-center gap-6 pt-4 text-xs text-[#7A6B72]">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#B68A50] stroke-" /> Make it yours in minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#B68A50] stroke-" /> One link for every guest
            </span>
          </div>

        </div>

        {/* Right Column: Signature Invitation Showcase Card */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          
          {/* Subtle Arch Shadow Backdrop */}
          <div className="relative w-full max-w-md">
            
            {/* The Outer Arch Container */}
            <div className="bg-[#EADBCC]/50 rounded-t-[180px] rounded-b-3xl p-6 sm:p-8 pt-10 shadow-lg border border-[#B68A50]/20 relative">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A6B72] font-bold block text-center mb-4">
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              {/* The Inner Pure White Invitation Card */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-neutral-100 text-center relative space-y-4">
                
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#7A6B72] font-semibold block">
                    TOGETHER WITH OUR FAMILIES
                  </span>
                  <h3 className="font-brand-heading text-3xl font-bold text-[#241C24] mt-1">
                    Aarav & Meera
                  </h3>
                  <span className="text-[8px] uppercase tracking-widest text-[#B68A50] font-bold block mt-0.5">
                    ARE GETTING MARRIED
                  </span>
                </div>

                {/* Arched Couple Photo Frame */}
                <div className="w-full h-56 sm:h-64 rounded-t-full rounded-b-xl overflow-hidden relative border-2 border-[#B68A50]/30 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                    alt="Aarav & Meera"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Date Block */}
                <div className="pt-2 border-t border-[#B68A50]/15 space-y-0.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#7A6B72] font-bold block">
                    DECEMBER
                  </span>
                  <div className="font-brand-heading text-3xl font-bold text-[#541D36] leading-none">
                    12
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#7A6B72] font-semibold block pt-1">
                    UDAIPUR, INDIA
                  </span>
                  <p className="text-[10px] text-neutral-400 italic pt-1">
                    We saved you a place in our hearts
                  </p>
                </div>

              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-4 right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#B68A50]/20 flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-[#541D36]/10 flex items-center justify-center text-[#541D36]">
                  <Heart size={14} className="fill-[#541D36]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#241C24] block leading-tight">A little more you.</span>
                  <span className="text-[9px] text-[#7A6B72] block">A lot more meaningful.</span>
                </div>
              </div>

            </div>

            <div className="text-center mt-6">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A6B72] font-bold">
                DESIGNED FOR LOVE • MADE FOR SHARING
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* 4. SIGNATURE TEMPLATES COLLECTION SECTION */}
      <section id="collection" className="py-20 px-6 sm:px-12 bg-white border-t border-[#B68A50]/20">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B68A50] block mb-2">
              The Design Catalog
            </span>
            <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold text-[#541D36]">
              Signature Interactive Templates
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B72] mt-2">
              Tap any design below to experience live 3D unboxing, royal doors, and music.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. THE ROYAL COURTYARD (Yellow / Gold Royal Fold) */}
            <div className="p-6 rounded-3xl bg-[#FFF9F2] border-2 border-[#B68A50] text-left space-y-4 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-44 rounded-2xl bg-[#541D36] text-[#FFF9F2] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-[#B68A50]/40">
                  <span className="text-3xl mb-2">🏰</span>
                  <h4 className="font-brand-heading text-2xl font-bold text-[#FFF9F2]">The Royal Courtyard</h4>
                  <p className="text-[10px] text-[#E8C9CD] uppercase tracking-widest mt-1">Carved Palace Doors & Shehnai</p>
                </div>
                <h3 className="font-brand-heading text-2xl font-bold text-[#541D36] mt-4">The Royal Courtyard</h3>
                <p className="text-xs text-[#7A6B72] leading-relaxed mt-1">
                  Sliding palace gates with lion handles, sacred Ganesha shloka, shehnai symphony, and live 4-box countdown.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B68A50]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#541D36]">₹1,499</span>
                <Link
                  href="/templates/royal-courtyard"
                  className="px-4 py-2 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow"
                >
                  Live Preview <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* 2. THE ROSE LETTER (Blush Pink Envelope) */}
            <div className="p-6 rounded-3xl bg-[#FFF9F2] border border-[#B68A50]/30 text-left space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-44 rounded-2xl bg-[#E8C2C8] text-[#541D36] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-pink-300">
                  <span className="text-3xl mb-2">💌</span>
                  <h4 className="font-brand-heading text-2xl font-bold text-[#541D36]">The Rose Letter</h4>
                  <p className="text-[10px] text-[#541D36] uppercase tracking-widest mt-1">Wax Seal & Scratch Card</p>
                </div>
                <h3 className="font-brand-heading text-2xl font-bold text-[#541D36] mt-4">The Rose Letter</h3>
                <p className="text-xs text-[#7A6B72] leading-relaxed mt-1">
                  Blush pink envelope unboxing, interactive gold foil scratch-to-reveal heart card, and timeline itinerary.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B68A50]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#541D36]">₹1,499</span>
                <Link
                  href="/templates/rose-letter"
                  className="px-4 py-2 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow"
                >
                  Live Preview <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* 3. HERITAGE RAJPUTANA */}
            <div className="p-6 rounded-3xl bg-[#FFF9F2] border border-[#B68A50]/30 text-left space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-44 rounded-2xl bg-[#43162B] text-[#FFF9F2] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-[#B68A50]/40">
                  <span className="text-3xl mb-2">🪔</span>
                  <h4 className="font-brand-heading text-2xl font-bold text-[#FFF9F2]">Heritage Rajputana</h4>
                  <p className="text-[10px] text-[#E8C9CD] uppercase tracking-widest mt-1">Vedic Shlokas & Regal Borders</p>
                </div>
                <h3 className="font-brand-heading text-2xl font-bold text-[#541D36] mt-4">Heritage Rajputana</h3>
                <p className="text-xs text-[#7A6B72] leading-relaxed mt-1">
                  Sacred Sanskrit invocations, multi-event ceremony pills, family lineage cards, and Google Maps GPS.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B68A50]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#541D36]">₹1,499</span>
                <Link
                  href="/templates/heritage"
                  className="px-4 py-2 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow"
                >
                  Live Preview <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 bg-[#FAF4ED] border-t border-[#B68A50]/20 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B68A50] block mb-2">Simple Workflow</span>
            <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold text-[#541D36]">Ready in 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-2xl border border-[#B68A50]/20 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#541D36] text-white flex items-center justify-center font-bold text-xs">1</span>
              <h3 className="font-brand-heading text-xl font-bold text-[#541D36]">Choose a Template</h3>
              <p className="text-xs text-[#7A6B72]">Select from our royal palace, romantic wax seal, or modern editorial suites.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-[#B68A50]/20 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#541D36] text-white flex items-center justify-center font-bold text-xs">2</span>
              <h3 className="font-brand-heading text-xl font-bold text-[#541D36]">Personalize & Preview</h3>
              <p className="text-xs text-[#7A6B72]">Add your names, date, venue, dress codes, and events with instant free 3D preview.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-[#B68A50]/20 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#541D36] text-white flex items-center justify-center font-bold text-xs">3</span>
              <h3 className="font-brand-heading text-xl font-bold text-[#541D36]">Share Your Link</h3>
              <p className="text-xs text-[#7A6B72]">Deliver via WhatsApp. Guests tap once for maps, schedule, music, and instant RSVP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-12 px-6 bg-[#541D36] text-[#FFF9F2] text-center text-xs border-t border-[#B68A50]/30 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span className="font-brand-heading text-2xl font-bold">Wedlink</span>
        </div>
        <p className="text-[11px] text-[#E8C9CD] tracking-widest uppercase">One Link • Endless Celebrations</p>
        <p className="text-[10px] text-neutral-400 pt-2">© {new Date().getFullYear()} Wedlink. All rights reserved.</p>
      </footer>

    </div>
  );
}
