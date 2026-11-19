// Apex Car Detailing Westminster — Worker API client
// source tag: "apex-westminster"   |   booking ID prefix: "APX-"
// Talks to the detailing-bookings-remoticojobs D1 database via the
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

/**
 * Returns the time strings ("09:00 AM") that can't be booked on a given date —
 * already taken, in the past, or inside the 2-hour lead window (California time).
 */
export async function getBookedSlots(dateStr) {
  const availability = await request(`/api/availability?date=${dateStr}`)
  return Object.keys(availability).filter((slot) => availability[slot])
}

/**
 * Creates the booking row from the customer's choices (serviceId, exteriorAddOn,
 * contact details). The Worker computes the price; returns { id, service, subtotal, coupon, total }.
 */
export async function createBooking(booking) {
  return request('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  })
}

/**
 * Confirms a booking as Pay Later: the Worker turns the 'Pending' booking into
 * Confirmed / Pay Later and sends the booking notification.
 */
export async function confirmPayLater(bookingId, email) {
  return request(`/api/bookings/${encodeURIComponent(bookingId)}/confirm`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

/**
 * Creates a Stripe PaymentIntent server-side for the booking's server-computed
 * total and returns { clientSecret, amount } (amount in cents).
 */
export async function createPaymentIntent({ bookingId, coupon }) {
  return request('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({ bookingId, coupon }),
  })
}

/** Validates a coupon code (PREPAY). Returns { valid, discount } (discount in whole dollars). */
export async function validateCoupon(code) {
  return request('/api/validate-coupon', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}
