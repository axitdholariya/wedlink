import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">WedLink Collection</span>
        <h1 className="text-3xl font-serif text-white mt-3 mb-4">Explore Wedding Invitations</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Select any interactive luxury wedding invitation template below to experience live 3D unboxing, music and animations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            href="/templates/royal-courtyard"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all"
          >
            <div className="text-sm font-semibold text-[#D4AF37]">The Royal Courtyard</div>
            <div className="text-xs text-slate-400 mt-1">3D Palace Gates & Music</div>
          </Link>

          <Link
            href="/templates/rose-letter"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all"
          >
            <div className="text-sm font-semibold text-[#D4AF37]">The Rose Letter</div>
            <div className="text-xs text-slate-400 mt-1">Wax Seal & Scratch Card</div>
          </Link>

          <Link
            href="/templates/heritage"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all"
          >
            <div className="text-sm font-semibold text-[#D4AF37]">Heritage Rajputana</div>
            <div className="text-xs text-slate-400 mt-1">Traditional Royal Elegance</div>
          </Link>

          <Link
            href="/templates/garden-romance"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all"
          >
            <div className="text-sm font-semibold text-[#D4AF37]">Garden Romance</div>
            <div className="text-xs text-slate-400 mt-1">Floral Botanical Aesthetics</div>
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>

      <div className="mt-8 text-xs text-slate-500">
        WedLink • One Link • Endless Celebrations
      </div>
    </div>
  );
}
