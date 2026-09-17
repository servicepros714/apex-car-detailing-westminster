// Apex Car Detailing Westminster — Cloudflare Worker
// Deploy manually via the Cloudflare dashboard on account austin80565.
// Bindings required:
//   D1 database   -> DB   (bind to the shared "detailing-bookings" database)
//   Secret         -> STRIPE_SECRET_KEY  (set via dashboard, not committed)
// Worker URL pattern: apex-westminster-detailing-worker.austin80565.workers.dev
//
// source tag for this site: "apex-westminster"
// booking ID prefix: "APX-"

const SOURCE = 'apex-westminster'
const PREFIX = 'APX-'
const STRIPE_API = 'https://api.stripe.com/v1'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

async function ensureSchema(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      date TEXT,
      time TEXT,
      service TEXT,
      name TEXT,
      phone TEXT,
      email TEXT,
      vehicle TEXT,
      address TEXT,
      notes TEXT,
      source TEXT,
      created_at TEXT,
      status TEXT,
      reschedule_date TEXT,
      reschedule_time TEXT,
      notes2 TEXT,
      original_date TEXT,
      original_time TEXT,
      payment_status TEXT
    )
  `)
}

async function nextBookingId(db) {
  const row = await db
    .prepare(`SELECT id FROM bookings WHERE source = ? ORDER BY created_at DESC LIMIT 1`)
    .bind(SOURCE)
    .first()
  let n = 1
  if (row?.id) {
    const match = row.id.match(/(\d+)$/)
    if (match) n = parseInt(match[1], 10) + 1
  }
  return `${PREFIX}${String(n).padStart(4, '0')}`
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname } = url

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    try {
      await ensureSchema(env.DB)

      // GET /api/availability?date=YYYY-MM-DD
      if (pathname === '/api/availability' && request.method === 'GET') {
        const date = url.searchParams.get('date')
        if (!date) return json({ error: 'date is required' }, 400)
        const { results } = await env.DB.prepare(
          `SELECT time FROM bookings WHERE date = ? AND source = ? AND status != 'Cancelled'`
        ).bind(date, SOURCE).all()
        return json({ booked: results.map((r) => r.time) })
      }

      // POST /api/bookings
      if (pathname === '/api/bookings' && request.method === 'POST') {
        const body = await request.json()
        const id = await nextBookingId(env.DB)
        const created_at = new Date().toISOString()
        await env.DB.prepare(
          `INSERT INTO bookings
            (id, date, time, service, name, phone, email, vehicle, address, notes,
             source, created_at, status, payment_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id, body.date, body.time, body.service, body.name, body.phone, body.email,
          body.vehicle, body.address, body.notes || '', SOURCE, created_at,
          body.status || 'Pending', body.payment_status || 'Pay Later'
        ).run()
        return json({ id, ...body })
      }

      // PATCH /api/bookings/:id  (payment status updates + admin dashboard reschedule fields)
      const patchMatch = pathname.match(/^\/api\/bookings\/([A-Za-z0-9-]+)$/)
      if (patchMatch && request.method === 'PATCH') {
        const id = patchMatch[1]
        const body = await request.json()
        const patchable = [
          'status', 'payment_status', 'reschedule_date', 'reschedule_time',
          'original_date', 'original_time', 'notes2',
        ]
        const fields = Object.keys(body).filter((k) => patchable.includes(k))
        if (fields.length === 0) return json({ error: 'no valid fields to update' }, 400)
        const setClause = fields.map((f) => `${f} = ?`).join(', ')
        const values = fields.map((f) => body[f])
        await env.DB.prepare(`UPDATE bookings SET ${setClause} WHERE id = ? AND source = ?`)
          .bind(...values, id, SOURCE)
          .run()
        return json({ id, updated: fields })
      }

      // POST /api/create-payment-intent   { amount: cents }
      if (pathname === '/api/create-payment-intent' && request.method === 'POST') {
        const { amount } = await request.json()
        if (!amount || amount < 50) return json({ error: 'invalid amount' }, 400)
        const params = new URLSearchParams({
          amount: String(amount),
          currency: 'usd',
          'automatic_payment_methods[enabled]': 'true',
        })
        const stripeRes = await fetch(`${STRIPE_API}/payment_intents`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
        })
        const pi = await stripeRes.json()
        if (!stripeRes.ok) return json({ error: pi.error?.message || 'Stripe error' }, 500)
        return json({ clientSecret: pi.client_secret })
      }

      // POST /api/validate-coupon   { code }
      if (pathname === '/api/validate-coupon' && request.method === 'POST') {
        const { code } = await request.json()
        if (code === 'PREPAY') return json({ valid: true, discountCents: 1500 })
        return json({ valid: false, discountCents: 0 })
      }

      return json({ error: 'Not found' }, 404)
    } catch (err) {
      return json({ error: err.message || 'Server error' }, 500)
    }
  },
}
