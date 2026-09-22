import {ready,runtime} from '@/lib/invites';
export async function GET(){return Response.json({checkoutReady:ready(),price:ready()?runtime().PUBLIC_PRICE_LABEL:null},{headers:{'Cache-Control':'no-store'}})}
