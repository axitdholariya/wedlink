import {Invitation} from '@/app/shared';
import {publicData,rowById} from '@/lib/invites';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export const metadata={title:'A wedding invitation | Wedlink',robots:{index:false,follow:false}};
export async function generateStaticParams() {
  return [
    { id: 'demo' }
  ];
}
