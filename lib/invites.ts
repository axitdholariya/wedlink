import {env} from 'cloudflare:workers';
import {z} from 'zod';
export const runtime=()=>env as unknown as {DB:D1Database;BUCKET:R2Bucket;STRIPE_SECRET_KEY?:string;STRIPE_WEBHOOK_SECRET?:string;STRIPE_PRICE_ID?:string;SITE_ORIGIN?:string;PUBLIC_PRICE_LABEL?:string};
export function database(){const db=runtime().DB;if(!db)throw Error('Storage unavailable');return db}
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v,'Enter a valid date');
export const inviteSchema=z.object({template:z.enum(['editorial','romance','heritage','royal','rose-letter']),first:z.string().trim().min(1).max(60),second:z.string().trim().min(1).max(60),date,firstFamily:z.string().trim().max(250).optional(),secondFamily:z.string().trim().max(250).optional(),dressCode:z.string().trim().max(1000).optional(),accommodation:z.string().trim().max(1000).optional(),gifts:z.string().trim().max(1000).optional(),timezone:z.string().max(100).refine(v=>{try{new Intl.DateTimeFormat('en',{timeZone:v});return true}catch{return false}},'Enter a valid timezone').optional(),message:z.string().trim().max(1000),story:z.string().trim().max(4000),events:z.array(z.object({name:z.string().trim().min(1).max(100),date,time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),venue:z.string().trim().min(1).max(200),address:z.string().trim().max(500)})).min(1).max(8)});
export type Row={id:string;owner_hash:string;data:string;photo_key:string|null;status:string;checkout_id:string|null};
export const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
export function cookie(req:Request){return req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('wedlink_owner='))?.slice(14)||''}
export async function owned(req:Request,row:Row){const token=cookie(req);return !!token&&await hash(token)===row.owner_hash}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
export const fail=(error:string,status=400)=>Response.json({error},{status});
export async function rowById(id:string){return database().prepare('SELECT * FROM invitations WHERE id = ?').bind(id).first<Row>()}
export function publicData(row:Row){return {...JSON.parse(row.data),photo:row.photo_key?'/api/photo/'+row.id:undefined}}
export function ready(){const e=runtime();return !!(e.STRIPE_SECRET_KEY&&e.STRIPE_WEBHOOK_SECRET&&e.STRIPE_PRICE_ID&&e.SITE_ORIGIN&&e.PUBLIC_PRICE_LABEL)}
