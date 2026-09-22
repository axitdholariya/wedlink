import * as schema from './schema';

// Vercel / Node.js safe fallback
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

// Cloudflare environment check
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
