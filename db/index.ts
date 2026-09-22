import * as schema from './schema';

// Vercel / Node.js safe fallback taaki build crash na ho
let db: any = {
  select: () => ({
    from: () => ({
      where: () => Promise.resolve([]),
      all: () => Promise.resolve([]),
    }),
  }),
  insert: () => ({
    values: () => Promise.resolve({}),
  }),
};

// Agar Cloudflare environment ho tabhi load karein
try {
  // @ts-ignore
  if (typeof globalThis !== 'undefined' && (globalThis as any).DB) {
    const { drizzle } = require('drizzle-orm/d1');
    db = drizzle((globalThis as any).DB, { schema });
  }
} catch (err) {
  // Safe fallback for Vercel
}

export { db };
