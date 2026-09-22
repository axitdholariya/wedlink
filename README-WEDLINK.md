# Wedlink

Premium wedding-invitation storefront and automatic personalization flow.

## Implemented
- Linked W logo SVG, wine/ivory design system, responsive storefront.
- Five complete invitation templates, filtered collection and live personalized previews.
- Names, date, welcome, story, one photo and up to eight wedding events.
- Private D1 drafts, R2 photo storage, opaque HttpOnly browser ownership cookie.
- Stripe Checkout adapter with server-selected price, idempotent session creation, verified signed webhook, order-to-invitation and line-item validation, automatic paid-only publication.
- Payment pending view; unpublished invitations and photos are protected.

## Launch configuration still required
The existing Site is public. Checkout is intentionally disabled until payment configuration is supplied; it is not yet an open-for-sales service.
1. Owner must confirm package price, currency and supported merchant/payment account. Current adapter is Stripe; adapt it if another provider is selected.
2. Configure STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, SITE_ORIGIN and PUBLIC_PRICE_LABEL through hosted environment settings. Do not commit secrets. The label must match the configured price. Use test mode first.
3. Keep guest invitation URLs and payment webhook endpoints reachable when launching the store. Do not expose private drafts or owner guestbooks.
4. Configure provider webhook /api/payments/webhook for checkout.session.completed and checkout.session.async_payment_succeeded.
5. Test success, asynchronous payment, failure/cancellation, duplicate webhook, signature rejection, and final invitation access using the chosen payment account before accepting real sales.
6. Finalize business contact details, pricing/hosting duration, privacy/refund/terms policies and any owned custom domain before public commerce launch.

Drafts reopen only in the browser that created them, using the saved URL. Cross-device accounts/recovery, post-payment editing, RSVP, custom per-couple domains, multilingual UI and analytics are not implemented or advertised.

The competitor reference pages could not be accessed. The supplied references were not copied; this is an original design direction based on the approved Wedlink brand. Hero image is generated, not a customer testimonial. No customer counts, reviews or prices are fabricated.

Validation: production build and TypeScript checks; storefront rendering, category filtering, editor preview, date updates, private save and reload checked in browser. Payment signature valid/tampered/expired/malformed checks pass. No live payment account was configured or charged. WebMCP registration is feature-detected; browser context did not support it, so runtime WebMCP validation is unavailable.

## The Rose Letter
A video-inspired original template at `/templates/rose-letter`, with a floral envelope opening, palace scene, optional original synthesized music, scratch/tap date reveal, timezone-aware countdown, venue maps, optional family/dress/accommodation/gift details, and a guest wishes form. Customize via `/create?template=rose-letter`.

Wishes are accepted only for paid invitations, stored in D1, and readable at `/manage/[id]` only with the invitation owner's cookie. The sample deliberately disables submission. Guestbook displays the latest 100 messages. No payment configuration or publishing audience has changed.

Verified in managed preview: envelope opens; pointer scratching reveals the date; scratch reset works; narrow editor preview renders; new fields persist in a private draft; a local-only paid fixture accepts a wish and shows it to its owner. The fixture is not included in deployment. TypeScript and production build pass.

## Current template collection
1. Royal Courtyard: `/templates/royal-courtyard`
2. Rose Letter: `/templates/rose-letter`
3. Editorial: `/templates/editorial`
4. Garden Romance: `/templates/garden-romance`
5. Heritage: `/templates/heritage`

Heritage includes a 3D opening, animated portrait, timezone-aware countdown, family lines, events, maps and optional guest details. The export includes this newest template. Current source uses Cloudflare Workers, D1 and R2; see START-HERE-HOSTINGER.md in the export before attempting another hosting platform.
