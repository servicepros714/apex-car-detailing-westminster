import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/stripeConfig'
import { createPaymentIntent } from '../lib/bookingDb'
import { useBooking } from '../context/BookingContext'
import CheckoutForm from '../components/checkout/CheckoutForm'
import './Checkout.css'

export default function Checkout() {
  const { confirmedBooking } = useBooking()
  const [clientSecret, setClientSecret] = useState(null)
  const [coupon, setCoupon] = useState(null) // { code, discountCents } once applied
  const [error, setError] = useState('')

  const baseCents = confirmedBooking ? Math.round(confirmedBooking.total * 100) : 0
  const discountCents = coupon?.discountCents || 0
  const finalCents = Math.max(baseCents - discountCents, 0)

  useEffect(() => {
    if (!confirmedBooking) return
    setError('')
    // The Worker prices the booking itself; refuse to continue if it disagrees with what's on screen.
    createPaymentIntent({ bookingId: confirmedBooking.id, coupon: coupon?.code || null })
      .then((data) => {
        if (data.amount !== finalCents) throw new Error('Price mismatch')
        setClientSecret(data.clientSecret)
      })
      .catch(() => {
        setClientSecret(null)
        setError("Couldn't start checkout. Please try again or choose Pay Later.")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedBooking, coupon])

  if (!confirmedBooking) return <Navigate to="/book" replace />

  return (
    <div className="checkout-page page-shell">
      <div className="container checkout-container">
        <h2>Complete your booking</h2>
        <p className="checkout-sub">
          {confirmedBooking.serviceNames} · {confirmedBooking.date} · {confirmedBooking.time}
        </p>
        {error && <p className="checkout-error">{error}</p>}
        {clientSecret ? (
          <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
            <CheckoutForm
              clientSecret={clientSecret}
              baseCents={baseCents}
              discountCents={discountCents}
              setCoupon={setCoupon}
              finalCents={finalCents}
            />
          </Elements>
        ) : (
          !error && <p className="checkout-loading">Preparing secure checkout…</p>
        )}
      </div>
    </div>
  )
}
