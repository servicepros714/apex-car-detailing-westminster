# Apex Car Detailing Westminster

Mobile auto-detailing booking site for Apex Car Detailing Westminster
((714) 276-1658). Built on the shared Service Pros stack: Vite + React 18,
Cloudflare Pages + Workers + D1, Stripe.

## Identifiers assigned to this site

| | |
|---|---|
| Source tag | `apex-westminster` |
| Booking ID prefix | `APX-` |
| Worker URL | `apex-car-detailing-v2.remoticojobs.workers.dev` |
| D1 database | `detailing-bookings-remoticojobs` (shared, remoticojobs account) |
| Pages project | `apex-car-detailing-v2` → https://apex-car-detailing-v2.pages.dev |
| Time zone | All booking dates/times are California time (America/Los_Angeles), enforced in the Worker |

Same setup as `alera-car-detailing-v2`. The older Pages project
`apex-car-detailin-westminster` (domain `apexcardetailinwestminster.site`) is a
separate, earlier site and is not deployed from this repo.

## Local development

```bash
npm install
npm run dev
```

`.env.local` is committed with `VITE_API_URL` and the Stripe **publishable** key
(safe to commit — only secret keys stay out of git).

## Deploying

### 1. Cloudflare D1
This site uses the shared `detailing-bookings-remoticojobs` database. The schema
is in `worker/schema.sql` (`IF NOT EXISTS`, safe to re-run) and is already
applied — nothing to do for a normal deploy.

### 2. Cloudflare Worker
Config lives in `worker/wrangler.jsonc` (D1 binding `DB`). Deploy from the CLI:

```bash
cd worker
npx wrangler deploy
```

Secrets (`npx wrangler secret put <NAME>`, only needed once / when rotating):

| Secret | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` / `sk_live_…`) — must match the mode of the publishable key in `.env.local` |
| `STRIPE_WEBHOOK_SECRET` | Signing secret (`whsec_…`) of the Stripe webhook below |
| `ADMIN_TOKEN` | Required for `GET`/`PATCH /api/bookings/:id`. Stored locally in `.admin-token` (git-ignored) |

The Worker rejects past dates, invalid slots, double-booked slots, and same-day
slots inside the 2-hour lead window, all evaluated in California time.

### 3. Cloudflare Pages
Project `apex-car-detailing-v2` (Direct Upload, no Git connection). Manual deploy:

```bash
npm run build
npx wrangler pages deploy dist --project-name apex-car-detailing-v2 --branch main
```

`.github/workflows/deploy.yml` does the same on push to `main`, provided the
repo's `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets belong to the
remoticojobs account.

### 4. Stripe
- Uses `automatic_payment_methods[enabled]=true` so Link, Apple Pay, and
  Google Pay all work through the same PaymentIntent.
- Apple Pay requires domain verification in the Stripe dashboard once the
  custom domain is live.
- The `PREPAY` coupon gives a flat $15 discount, validated server-side.
- **Pricing is server-side.** The site sends only `serviceId`, `exteriorAddOn`
  and `coupon`; the Worker computes the total (prices live in `SERVICES` in
  `worker/index.js` — keep them in sync with `src/context/BookingContext.jsx`)
  and charges that amount. Any client-sent amount, service name or payment
  status is ignored.
- **Webhook** → `https://apex-car-detailing-v2.remoticojobs.workers.dev/api/stripe-webhook`,
  events `payment_intent.succeeded` (booking → `Paid`) and `charge.refunded`
  (→ `Refunded` / `Partially Refunded`). Bookings only become `Paid` through
  this webhook. The Stripe account is shared with other sites, so the Worker
  ignores events whose `metadata.source` isn't `apex-westminster`.

### 5. Admin dashboard
`GET` and `PATCH /api/bookings/:id` require the header
`Authorization: Bearer <ADMIN_TOKEN>` (401 otherwise). `PATCH` accepts
`reschedule_date`, `reschedule_time`, `original_date`, `original_time`,
`notes2`, `status`, and `payment_status` — compatible with the shared
portfolio admin dashboard.

## What's unique to this build
- Navy / chrome / cyan palette pulled from the Apex logo
- Rajdhani + Barlow + Oswald type trio
- Split nav with a centered floating chrome logo badge
- Diagonal split-screen hero with a one-time animated light streak
- Horizontal scroll-snap results gallery
- Angled "cut corner" service cards
