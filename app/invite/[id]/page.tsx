import React from 'react';
import Link from 'next/link';

export async function generateStaticParams() {
  return [
    { id: 'demo' }
  ];
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function InvitePage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || 'demo';

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Official Invitation</span>
        <h1 className="text-3xl font-serif text-white mt-3 mb-4">WedLink Wedding Microsite</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Welcome to the live interactive wedding invitation. Tap below to experience the 3D palace theme.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/templates/royal-courtyard"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black hover:opacity-90 transition-opacity"
          >
            Open Royal Courtyard
          </Link>
          <Link
            href={`/manage/${id}`}
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
          >
            Manage RSVPs
          </Link>
        </div>
      </div>
      <div className="mt-8 text-xs text-slate-500">
        WedLink • One Link • Endless Celebrations
      </div>
    </div>
  );
}
