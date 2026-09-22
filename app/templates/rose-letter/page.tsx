import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { example } from '@/app/shared';
import RoseLetter from '@/app/rose-letter';

export const metadata = {
  title: 'The Rose Letter — An Interactive Wedding Invitation | Wedlink',
  description: 'Open a rose envelope, discover the love story and scratch a little heart to reveal the wedding date.'
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2D141E] selection:bg-[#341822] selection:text-white">
      {/* 1. Global Scrollbar Remover (Standard React - No styled-jsx error) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }

            /* Hide Scrollbar on All Browsers */
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

      {/* 2. Top Bar Matched With Wedlink Signature Ivory & Wine Theme */}
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
          The Rose Letter · Sample Invitation
        </span>

        <a 
          href="/create?template=rose-letter"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#341822] hover:bg-[#230f16] text-white font-semibold text-xs tracking-wide transition-all shadow-sm cursor-pointer"
        >
          Personalize <ArrowUpRight size={14} />
        </a>
      </header>

      {/* Main Template */}
      <div className="pt-14 overflow-hidden">
        <RoseLetter
          data={{
            ...example,
            template: 'rose-letter',
            status: 'active',
            isPaid: true,
            paid: true,
            isDraft: false,
            published: true,
            firstFamily: 'Together with the Sharma family',
            secondFamily: 'Together with the Mehta family',
            timezone: 'Asia/Kolkata',
            dressCode: 'Indian festive. Soft pastels, warm colours and a little sparkle.',
            accommodation: 'Please contact our families for nearby hotel recommendations and help planning your stay.',
            gifts: 'Your love, blessings and presence are the only gifts we wish for.'
          }}
        />
      </div>
    </div>
  );
}
