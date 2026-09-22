import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {example} from '@/app/shared';
import RoseLetter from '@/app/rose-letter';

export const metadata={
  title:'The Rose Letter — An Interactive Wedding Invitation | Wedlink',
  description:'Open a rose envelope, discover the love story and scratch a little heart to reveal the wedding date.'
};

export default function Page(){
  return (
    <>
      <header className="rose-demo-bar">
        <Link href="/#collection"><ArrowLeft size={14}/> Wedlink</Link>
        <span>THE ROSE LETTER · SAMPLE INVITATION</span>
        <Link href="/create?template=rose-letter">Personalize <ArrowUpRight size={14}/></Link>
      </header>
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
    </>
  );
}
