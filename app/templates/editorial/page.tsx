import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { example } from '@/app/shared';
import EditorialInvitation from '@/app/editorial-invitation';

export const metadata = {
  title: 'The Editorial — Modern Magazine Style Wedding Invitation | Wedlink',
  description: 'Vogue-inspired clean typography, bold monochrome portraits, and high-fashion wedding itinerary.'
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#0A0D14]">
      {/* Clickable Luxury Top Bar */}
      <header 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999, pointerEvents: 'auto' }}
        className="flex items-center justify-between px-4 py-2.5 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 text-white text-xs font-sans shadow-lg"
      >
        <Link 
          href="/" 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] font-medium transition-all"
        >
          <ArrowLeft size={14} /> Back to Wedlink
        </Link>
        <span className="hidden sm:inline font-serif tracking-widest text-[#D4AF37] text-[11px] uppercase">
          The Editorial · Sample Invitation
        </span>
        <Link 
          href="/create?template=editorial"
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E5C378] to-[#C9A24F] text-black font-semibold uppercase tracking-wider text-[11px] hover:opacity-90 transition-opacity"
        >
          Personalize <ArrowUpRight size={14} />
        </Link>
      </header>

      {/* Main Template with padding for top bar */}
      <div className="pt-12">
        <EditorialInvitation
          data={{
            ...example,
            template: 'editorial',
            status: 'active',
            isPaid: true,
            paid: true,
            isDraft: false,
            published: true,
            firstFamily: 'The Sharma Family',
            secondFamily: 'The Mehta Family',
            timezone: 'Asia/Kolkata',
            dressCode: 'Black Tie Elegance & Contemporary Glamour',
            accommodation: 'The Taj Mahal Palace, Mumbai',
            gifts: 'No boxed gifts please. Your blessings are everything.'
          }}
        />
      </div>
    </div>
  );
}
