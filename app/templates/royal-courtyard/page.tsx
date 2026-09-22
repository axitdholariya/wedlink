import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { example } from '@/app/shared';
import RoyalCourtyard from '@/app/royal-courtyard';

export const metadata = {
  title: 'The Royal Courtyard — 3D Palace Gate Wedding Invitation | Wedlink',
  description: 'Experience 3D carved sandstone gates sliding open with authentic shehnai background music, Ganesha invocation and real-time countdown.'
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#0A0D14]">
      {/* Clickable Luxury Top Bar */}
      <header 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999, pointerEvents: 'auto' }}
        className="flex items-center justify-between px-4 py-2.5 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 text-white text-xs font-sans shadow-lg"
      >
        <a 
          href="/" 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] font-medium transition-all cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Wedlink
        </a>
        <span className="hidden sm:inline font-serif tracking-widest text-[#D4AF37] text-[11px] uppercase">
          The Royal Courtyard · Sample Invitation
        </span>
        <a 
          href="/create?template=royal-courtyard"
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black font-semibold uppercase tracking-wider text-[11px] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Personalize <ArrowUpRight size={14} />
        </a>
      </header>

      {/* Main Template */}
      <div className="pt-12">
        <RoyalCourtyard
          data={{
            ...example,
            template: 'royal',
            status: 'active',
            isPaid: true,
            paid: true,
            isDraft: false,
            published: true,
            firstFamily: 'Together with the Sharma family',
            secondFamily: 'Together with the Kapoor family',
            timezone: 'Asia/Kolkata',
            dressCode: 'Royal Traditional Indian Elegance',
            accommodation: 'Special room blocks negotiated at The Oberoi Udaivilas. Booking code: WEDLINK2026',
            gifts: 'Your presence and blessings are our greatest gift.'
          }}
        />
      </div>
    </div>
  );
}
