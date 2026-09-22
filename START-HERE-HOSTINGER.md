# Wedlink — complete project export
Export date: 21 September 2026

## Read this before uploading to Hostinger
This ZIP is a complete project handoff, NOT a static HTML website or an already-converted Hostinger application. Extracting it into public_html will not run the application. The included production output targets Cloudflare Workers, not a standard Node.js server.

The current app uses React, a Next-compatible Vinext build, Cloudflare Workers, D1 SQL storage and R2 photo storage. A Hostinger deployment must first be adapted to the runtime and database available on your specific hosting plan. No Hostinger deployment has been performed or verified.

Do not put the entire source archive in a publicly accessible directory. In particular, backend code and configuration belong outside publicly served files.

## Included
- All five complete templates, including the newest Heritage template.
- Storefront, filters, customizer, mobile layout fixes and all artwork/logo files.
- Server routes for private drafts, photos, checkout, payment webhook and guest wishes.
- Database schema and all SQL migrations.
- Package manifest, dependency lockfile, framework/build configuration and scripts.
- dist/: the newly validated Cloudflare production build, included for completeness only.
- .env.example: blank configuration names. No payment credentials are included.

Not included: node_modules (reinstall from the lockfile), Git history, temporary QA pages, local caches, runtime state, real environment files, customer records, uploaded customer photos or payment secrets. This is application code, not a production database backup.

## Hostinger migration checklist for the developer
1. Confirm whether the account provides a Node.js application runtime, a VPS, or only static/PHP hosting. Do not assume the existing npm start command is a Hostinger production server: it runs local Wrangler tooling.
2. Port the Vinext/Cloudflare entrypoint to an appropriate production runtime. For a Node.js solution, adapt the Next-compatible app and use a supported Next production build/start configuration; that conversion has not been done in this export.
3. Replace cloudflare:workers bindings in lib/invites.ts, db/index.ts and other runtime integration points. Implement SQL persistence and durable image storage for the destination, retaining prepared queries, ownership checks and paid-only publication.
4. Apply the migrations under drizzle/ using the chosen database's compatible syntax. Back up and migrate existing data separately if needed.
5. Configure HTTPS, the actual domain/SITE_ORIGIN and environment secrets outside the public directory. Preserve HttpOnly ownership cookies, same-origin checks, signed webhook verification and protected drafts/photos.
6. Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID and PUBLIC_PRICE_LABEL for the selected merchant account. Checkout is disabled until all required settings exist. Configure /api/payments/webhook for checkout.session.completed and checkout.session.async_payment_succeeded.
7. Verify draft save/reopen, photo permissions, each template, guestbook permissions, payment success/failure, duplicate webhook handling and paid invitation publication in test mode before accepting payments.

A plain static export can show template samples but cannot provide private drafts, persistent uploads, guest wishes, or payment-triggered publishing by itself.

## Existing-runtime development
Use Node.js >=22.13.0 and the pnpm version in package.json. Install dependencies from pnpm-lock.yaml (pnpm install --frozen-lockfile). The checked-in scripts choose their portable profile outside the managed development environment. Run pnpm dev for local development or pnpm build to reproduce the Cloudflare build. Provision compatible local/hosted bindings and SQL migrations as needed. These commands are not instructions to deploy on Hostinger without the migration above.

## Template paths
/templates/royal-courtyard
/templates/rose-letter
/templates/editorial
/templates/garden-romance
/templates/heritage

Customizer: /create?template=heritage (or royal, rose-letter, editorial, romance).

## Validation
The complete five-template source passed TypeScript checking and its Cloudflare production build. Template 5's cover, opening and countdown were checked at mobile widths. This does not establish Hostinger compatibility.
