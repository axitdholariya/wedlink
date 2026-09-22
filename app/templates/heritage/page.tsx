import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { example } from '@/app/shared';
import HeritageInvitation from '@/app/heritage-invitation';

export const metadata = {
  title: 'Heritage Rajputana — Traditional Royal Wedding Invitation | Wedlink',
  description: 'Experience vintage royal Rajputana aesthetics, shlokas, ornate borders and multi-day royal wedding itinerary.'
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2D141E] selection:bg-[#341822] selection:text-white">
      {/* 1. Global Scrollbar Remover */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }

            ::-webkit-scrollbar {
              display: none !important;
              width: 0px !important;
              height: 0px !important;
            }
            * {
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
          `
        }}
      />

      {/* 2. Top Bar */}
      <header 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999, pointerEvents: 'auto' }}
        className="flex items-center justify-between px-6 sm:px-12 py-3 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] text-[#2D141E] text-xs shadow-sm"
      >
        <a 
          href="/" 
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DFD5] hover:bg-[#F3EDE2] text-[#2D141E] font-medium transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Wedlink
        </a>

        <span className="hidden sm:inline font-serif-luxury tracking-[0.2em] text-[#2D141E] text-sm uppercase font-semibold">
          Heritage Rajputana · Sample Invitation
        </span>

        <a 
          href="/create?template=heritage"
          style={{ 
            backgroundColor: '#341822', 
            color: '#ffffff', 
            padding: '7px 16px', 
            borderRadius: '6px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontSize: '12px', 
            fontWeight: 600, 
            textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          className="cursor-pointer transition-all hover:opacity-90"
        >
          <span style={{ color: '#ffffff' }}>Personalize</span>
          <ArrowUpRight size={14} color="#ffffff" style={{ color: '#ffffff' }} />
        </a>
      </header>

      {/* Main Template */}
      <div className="pt-14 overflow-hidden">
        <HeritageInvitation
          data={{
            ...example,
            template: 'heritage',
            status: 'active',
            isPaid: true,
            paid: true,
            isDraft: false,
            published: true,
            firstFamily: 'Blessings of Sharma Family',
            secondFamily: 'Blessings of Kapoor Family',
            timezone: 'Asia/Kolkata',
            dressCode: 'Royal Rajputana Traditional Indian Elegance',
            accommodation: 'The Oberoi Udaivilas, Udaipur. Special Code: WEDLINK2026',
            gifts: 'Your presence and blessings are our greatest gift.'
          }}
        />
      </div>
    </div>
  );
}
