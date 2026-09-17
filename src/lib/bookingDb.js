// Apex Car Detailing Westminster — Worker API client
// source tag: "apex-westminster"   |   booking ID prefix: "APX-"
// Talks to the shared detailing-bookings D1 database via the
// site's own Cloudflare Worker (see /worker/index.js).

const API_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  return res.json()
}

/** Returns an array of already-booked time strings ("09:00 AM") for a given date. */
export async function getBookedSlots(dateStr) {
  const data = await request(`/api/availability?date=${dateStr}`)
  return data.booked || []
}

/** Creates the booking row. Returns { id, ...booking }. */
export async function createBooking(booking) {
  return request('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  })
}

/** Updates payment_status once Stripe confirms the charge, or marks Pay Later. */
export async function updateBookingPayment(id, payment_status) {
  return request(`/api/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ payment_status }),
  })
}

/** Creates a Stripe PaymentIntent server-side and returns { clientSecret }. */
export async function createPaymentIntent(amountCents) {
  return request('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({ amount: amountCents }),
  })
}

/** Validates a coupon code (PREPAY). Returns { valid, discountCents }. */
export async function validateCoupon(code) {
  return request('/api/validate-coupon', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}
