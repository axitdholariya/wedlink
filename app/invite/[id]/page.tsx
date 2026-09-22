import {Invitation} from '@/app/shared';
import {publicData,rowById} from '@/lib/invites';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export const metadata={title:'A wedding invitation | Wedlink',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;let row;try{row=await rowById(id)}catch{return <main className="status-page"><h1>A little pause.</h1><p>This invitation is temporarily unavailable. Please try again in a moment.</p></main>}if(!row||row.status!=='paid')notFound();return <Invitation data={publicData(row)} invitationId={row.id}/>}
