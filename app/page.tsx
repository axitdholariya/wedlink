'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, ArrowRight, Check, Heart, Sparkles, MapPin, 
  ChevronDown, ChevronUp, Music, ShieldCheck, Clock
} from 'lucide-react';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [collectionFilter, setCollectionFilter] = useState<string>('All');

  const faqs = [
    {
      q: "मेहमानों को इनविटेशन कैसे मिलेगा और क्या उन्हें कोई ऐप डाउनलोड करनी होगी?",
      a: "नहीं, कोई ऐप डाउनलोड नहीं करनी होगी। यह सिर्फ 1 साधारण और खूबसूरत वेब लिंक है जो सीधे WhatsApp या मैसेज पर खुल जाता है। किसी भी iPhone या Android पर यह 1 सेकंड में लोड होता है।"
    },
    {
      q: "शादी का लिंक कितने समय तक एक्टिव रहता है?",
      a: "आपका Wedlink पूरे 1 साल तक 100% एक्टिव और लाइव रहता है। शादी के बाद भी मेहमान आपकी शादी की यादें और गैलरी देख सकते हैं।"
    },
    {
      q: "क्या मैं लिंक भेजने के बाद भी इवेंट्स या वेन्यू का समय बदल सकता हूँ?",
      a: "हाँ, बिल्कुल! आप कभी भी अपने बिल्डर में जाकर समय या वेन्यू अपडेट कर सकते हैं, और वह तुरंत सभी मेहमानों के फोन में लाइव अपडेट हो जाएगा।"
    },
    {
      q: "मेहमानों का RSVP और खाना (Veg/Jain) कैसे ट्रैक होगा?",
      a: "मेहमान सीधे 1-टैप में WhatsApp के जरिए या लाइव फॉर्म में अपनी उपस्थिति और फ़ूड प्रेफरेंस कन्फर्म कर सकते हैं, जो तुरंत आपके पास पहुँच जाता है।"
    }
  ];

  const templates = [
    {
      id: 'royal-courtyard',
      name: 'The Royal Courtyard',
      category: 'Indian',
      tag: '3D Palace Gates & Shehnai',
      description: 'नक्काशीदार महल के 3D स्लाइडिंग गेट्स, श्री गणेशाय नमः मंत्र, लाइव शहनाई और 4-बॉक्स काउंटडाउन।',
      motif: '🏰',
      accent: '#B68A50',
      href: '/templates/royal-courtyard'
    },
    {
      id: 'rose-letter',
      name: 'The Rose Letter',
      category: 'Romantic',
      tag: 'Wax Seal & Scratch Card',
      description: 'ब्लश पिंक 3D लिफाफा अनबॉक्सिंग, इंटरएक्टिव गोल्ड स्क्रैच-टू-रिवीअल हार्ट कार्ड और टाइमलाइन।',
      motif: '💌',
      accent: '#D97A8F',
      href: '/templates/rose-letter'
    },
    {
      id: 'heritage',
      name: 'Heritage Rajputana',
      category: 'Indian',
      tag: 'Vedic Shlokas & Regal Borders',
      description: 'वैदिक श्लोक, शाही सोने के बॉर्डर्स, दोनों पक्षों का पारिवारिक आशीर्वाद और गूगल मैप्स नेविगेशन।',
      motif: '🪔',
      accent: '#C25E2E',
      href: '/templates/heritage'
    },
    {
      id: 'editorial',
      name: 'The Editorial',
      category: 'Editorial',
      tag: 'Vogue Minimalist Magazine',
      description: 'वोग मैगज़ीन स्टाइल फुल-स्क्रीन कवर फ्लिप, मिनिमलिस्ट ब्लैक & वार्म व्हाइट टाइपोग्राफी।',
      motif: '✨',
      accent: '#4A6B53',
      href: '/templates/editorial'
    },
    {
      id: 'garden-romance',
      name: 'Garden Romance',
      category: 'Romantic',
      tag: 'Botanical Florals & Ivory Whispers',
      description: 'नाजुक फूलों की पंखुड़ियों की बारिश, बोटैनिकल आर्च और शांत आइवरी रोमांस थीम।',
      motif: '🌿',
      accent: '#5C8A68',
      href: '/templates/garden-romance'
    }
  ];

  const filteredTemplates = collectionFilter === 'All'
    ? templates
    : templates.filter(t => t.category === collectionFilter);

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#241C24] font-['Manrope',sans-serif] selection:bg-[#541D36] selection:text-[#FFF9F2] flex flex-col">
      
      {/* Brand Kit Luxury Typography */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        .font-brand-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-brand-body { font-family: 'Manrope', -apple-system, sans-serif; }
      `}</style>

      {/* ============================================================== */}
      {/* 1. TOP ANNOUNCEMENT BAR                                        */}
      {/* ============================================================== */}
      <div className="bg-[#541D36] text-[#FFF9F2] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wider">
        A little link. A lifetime of memories.
      </div>

      {/* ============================================================== */}
      {/* 2. NAVBAR (OFFICIAL RIBBON 'W' LOGO)                           */}
      {/* ============================================================== */}
      <header className="h-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between border-b border-[#B68A50]/20 bg-[#FFF9F2]/90 backdrop-blur-md sticky top-0 z-40">
        
        {/* Left: The Official Ribbon 'W' Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#541D36] flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 85" fill="none" className="w-full h-full text-[#FFF9F2]">
              <path 
                d="M12 25 C18 10, 32 10, 38 30 L45 55 C48 65, 52 65, 55 55 L62 30 C68 10, 82 10, 88 25 C94 40, 85 62, 70 75 C60 84, 52 84, 48 78 C44 72, 45 62, 48 50 C42 62, 35 75, 26 75 C14 75, 6 50, 12 25 Z" 
                fill="currentColor" 
                opacity="0.95"
              />
            </svg>
          </div>
          <span className="font-brand-heading text-2xl sm:text-3xl font-bold tracking-wide text-[#541D36]">
            Wedlink
          </span>
        </Link>

        {/* Center: Clean Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#7A6B72]">
          <a href="#collection" className="hover:text-[#541D36] transition-colors">The collection</a>
          <a href="#how-it-works" className="hover:text-[#541D36] transition-colors">How it works</a>
          <a href="#questions" className="hover:text-[#541D36] transition-colors">Questions</a>
        </nav>

        {/* Right: Primary Call to Action */}
        <div>
          <Link
            href="/create"
            className="px-5 py-2.5 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-[#FFF9F2] font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 hover:shadow-md"
          >
            Create your invitation <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. HERO SECTION (SCREENSHOT 1 EXACT DESIGN)                    */}
      {/* ============================================================== */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Headline, Story & Buttons */}
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
              <Check size={14} className="text-[#B68A50] stroke-[2.5]" /> Make it yours in minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#B68A50] stroke-[2.5]" /> One link for every guest
            </span>
          </div>

        </div>

        {/* Right Column: Signature Invitation Showcase Card (Aarav & Meera) */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          
          <div className="relative w-full max-w-md">
            
            {/* Arched Backdrop Frame */}
            <div className="bg-[#EADBCC]/50 rounded-t-[180px] rounded-b-3xl p-6 sm:p-8 pt-10 shadow-lg border border-[#B68A50]/20 relative">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A6B72] font-bold block text-center mb-4">
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              {/* The Pure White Card */}
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

                {/* Arched Photo Frame of Indian Couple */}
                <div className="w-full h-56 sm:h-64 rounded-t-full rounded-b-xl overflow-hidden relative border-2 border-[#B68A50]/30 shadow-inner bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                    alt="Aarav & Meera"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Date & Venue Block */}
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

              {/* Floating Heart Badge */}
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

      {/* ============================================================== */}
      {/* 4. THE COLLECTION (5 MASTER SUITES WITH DIRECT LIVE PREVIEW)   */}
      {/* ============================================================== */}
      <section id="collection" className="py-20 px-6 sm:px-12 bg-white border-t border-[#B68A50]/20">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B68A50] block mb-2">
              The Design Catalog
            </span>
            <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold text-[#541D36]">
              Signature Interactive Templates
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B72] mt-2">
              Tap any design below to experience live 3D unboxing, royal doors, and music.
            </p>

            {/* Filter Pills */}
            <div className="flex justify-center gap-2 mt-6">
              {['All', 'Indian', 'Romantic', 'Editorial'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCollectionFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    collectionFilter === cat
                      ? 'bg-[#541D36] text-[#FFF9F2] shadow-sm'
                      : 'bg-[#FFF9F2] border border-[#B68A50]/30 text-[#7A6B72] hover:border-[#541D36]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTemplates.map(t => (
              <div 
                key={t.id}
                className="p-6 rounded-3xl bg-[#FFF9F2] border border-[#B68A50]/30 text-left space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 rounded-2xl bg-[#541D36] text-[#FFF9F2] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-[#B68A50]/40 group-hover:scale-[1.01] transition-transform">
                    <span className="text-4xl mb-2">{t.motif}</span>
                    <h4 className="font-brand-heading text-2xl font-bold text-[#FFF9F2]">{t.name}</h4>
                    <p className="text-[10px] text-[#E8C9CD] uppercase tracking-widest mt-1">{t.tag}</p>
                  </div>
                  
                  <h3 className="font-brand-heading text-2xl font-bold text-[#541D36] mt-4">{t.name}</h3>
                  <p className="text-xs text-[#7A6B72] leading-relaxed mt-1">{t.description}</p>
                </div>

                <div className="pt-4 border-t border-[#B68A50]/20 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#541D36]">₹1,499</span>
                  
                  {/* ✅ DIRECT LINK TO THE 3D TEMPLATE (No Intermediate Blocker) */}
                  <div className="flex gap-2">
                    <Link
                      href={t.href}
                      className="px-3.5 py-1.5 rounded-lg bg-[#541D36] hover:bg-[#43162B] text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow"
                    >
                      Live Demo <ArrowUpRight size={13} />
                    </Link>
                    <Link
                      href={`/create?template=${t.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#B68A50] hover:bg-[#c99a5e] text-[#541D36] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. HOW IT WORKS (3 SIMPLE STEPS)                               */}
      {/* ============================================================== */}
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

      {/* ============================================================== */}
      {/* 6. QUESTIONS (FAQ ACCORDION)                                   */}
      {/* ============================================================== */}
      <section id="questions" className="py-20 px-6 sm:px-12 bg-white border-t border-[#B68A50]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B68A50] block mb-2">Common Inquiries</span>
            <h2 className="font-brand-heading text-4xl sm:text-5xl font-bold text-[#541D36]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-[#B68A50]/20 rounded-2xl overflow-hidden transition-all bg-[#FFF9F2]"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left font-bold text-sm text-[#541D36] flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {activeFaq === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-[#7A6B72] leading-relaxed border-t border-[#B68A50]/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. FOOTER                                                      */}
      {/* ============================================================== */}
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
