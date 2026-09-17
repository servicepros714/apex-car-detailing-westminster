# Apex Car Detailing Westminster

Mobile auto-detailing booking site for Apex Car Detailing Westminster
((714) 276-1658). Built on the shared Service Pros stack: Vite + React 18,
Cloudflare Pages + Workers + D1, Stripe.

## Identifiers assigned to this site
- **source tag:** `apex-westminster`
- **booking ID prefix:** `APX-`
- **Worker URL:** `apex-westminster-detailing-worker.austin80565.workers.dev`

These do not collide with any existing site in the portfolio (Montek, Sonrisa,
Bonnie, Wax Coat Brea, Premium Anaheim).

## Local development

```bash
npm install
npm run dev
```

Copy `.env.local` and make sure it points at your Worker + Stripe publishable key
(the file is already committed with placeholder-safe values — only the secret
key stays out of git).

## Deploying

### 1. Cloudflare D1
This site uses the **shared** `detailing-bookings` D1 database on account
`austin80565`. The Worker runs `CREATE TABLE IF NOT EXISTS` on every request,
so no manual migration is required — it's safe to point this Worker's `DB`
binding at the existing shared database.

### 2. Cloudflare Worker
1. In the Cloudflare dashboard, create a new Worker named
   `apex-westminster-detailing-worker`.
2. Paste the contents of `worker/index.js`.
3. Bind the shared D1 database to the variable name `DB`.
4. Add a Worker secret `STRIPE_SECRET_KEY` with your Stripe **secret** key.
5. Deploy. Confirm the URL matches `VITE_API_URL` in `.env.local`.

### 3. GitHub + Cloudflare Pages
1. Push this repo to GitHub.
2. In GitHub → Settings → Secrets, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
3. Create a Cloudflare Pages project named `apex-car-detailing-westminster`
   (or update the `projectName` in `.github/workflows/deploy.yml` to match
   whatever you create).
4. Push to `main` — GitHub Actions builds and deploys automatically.

### 4. Stripe
- Uses `automatic_payment_methods[enabled]=true` so Link, Apple Pay, and
  Google Pay all work through the same PaymentIntent.
- Apple Pay requires domain verification in the Stripe dashboard once the
  custom domain is live.
- The `PREPAY` coupon gives a flat $15 discount and is validated server-side
  in the Worker (`/api/validate-coupon`).

### 5. Admin dashboard
This Worker's endpoints (`/api/bookings/:id` PATCH with
`reschedule_date`, `reschedule_time`, `original_date`, `original_time`,
`notes2`) are compatible with the shared portfolio admin dashboard.

## What's unique to this build
- Navy / chrome / cyan palette pulled from the Apex logo
- Rajdhani + Barlow + Oswald type trio
- Split nav with a centered floating chrome logo badge
- Diagonal split-screen hero with a one-time animated light streak
- Horizontal scroll-snap results gallery
- Angled "cut corner" service cards
