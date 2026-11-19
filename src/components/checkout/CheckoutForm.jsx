import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useStripe, useElements, ExpressCheckoutElement,
  CardNumberElement, CardExpiryElement, CardCvcElement,
} from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
import { Tag, Loader2, ShieldCheck } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { validateCoupon, confirmPayLater } from '../../lib/bookingDb'
import './CheckoutForm.css'

const elementStyle = {
  style: {
    base: {
      fontFamily: 'Barlow, sans-serif',
      fontSize: '16px',
      color: '#071019',
      '::placeholder': { color: '#7c8a99' },
    },
  },
}

export default function CheckoutForm({ clientSecret, baseCents, discountCents, setCoupon, finalCents }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { confirmedBooking, resetBooking } = useBooking()

  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState(null) // 'applied' | 'invalid' | null
  const [couponLoading, setCouponLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [confirmingPayLater, setConfirmingPayLater] = useState(false)

  async function applyCoupon() {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    try {
      const code = couponCode.trim().toUpperCase()
      const res = await validateCoupon(code)
      if (res.valid) {
        setCoupon({ code, discountCents: res.discount * 100 })
        setCouponStatus('applied')
      } else {
        setCouponStatus('invalid')
        setCoupon(null)
      }
    } catch {
      setCouponStatus('invalid')
    } finally {
      setCouponLoading(false)
    }
  }

  async function handlePayNow(e) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    try {
      const cardNumberElement = elements.getElement(CardNumberElement)
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumberElement },
      })
      if (error) throw new Error(error.message)
      // The Stripe webhook marks the booking Paid — the browser never sets payment status.
      if (paymentIntent?.status === 'succeeded') {
        resetBooking()
        navigate('/confirmation', { state: { paid: true } })
      }
    } catch (err) {
      toast.error(err.message || 'Payment failed. Please check your card details.')
    } finally {
      setPaying(false)
    }
  }

  // The booking was saved as 'Pending' at the last step; confirming makes it
  // Confirmed / Pay Later and sends the booking notification.
  async function handlePayLater() {
    setConfirmingPayLater(true)
    try {
      await confirmPayLater(confirmedBooking.id, confirmedBooking.email)
      resetBooking()
      navigate('/confirmation', { state: { paid: false } })
    } catch {
      toast.error('We could not confirm your booking. Please try again or call us.')
    } finally {
      setConfirmingPayLater(false)
    }
  }

  return (
    <div className="checkout-grid">
      <div className="checkout-form-col">
        <ExpressCheckoutElement
          onConfirm={async () => {
            if (!stripe || !elements) return
            const { error } = await stripe.confirmPayment({ elements, redirect: 'if_required' })
            if (error) {
              toast.error(error.message)
            } else {
              resetBooking()
              navigate('/confirmation', { state: { paid: true } })
            }
          }}
        />
        <div className="checkout-divider"><span>or pay with card</span></div>

        <form onSubmit={handlePayNow}>
          <div className="card-field">
            <label>Card Number</label>
            <div className="stripe-el"><CardNumberElement options={elementStyle} /></div>
          </div>
          <div className="card-row">
            <div className="card-field">
              <label>Expiry</label>
              <div className="stripe-el"><CardExpiryElement options={elementStyle} /></div>
            </div>
            <div className="card-field">
              <label>CVC</label>
              <div className="stripe-el"><CardCvcElement options={elementStyle} /></div>
            </div>
          </div>

          <div className="coupon-row">
            <div className="coupon-input">
              <Tag size={16} />
              <input
                placeholder="Coupon code (try PREPAY)"
                value={couponCode}
                onChange={(e) => { setCouponCode(e.target.value); setCouponStatus(null) }}
              />
            </div>
            <button type="button" className="btn btn-outline coupon-apply" onClick={applyCoupon} disabled={couponLoading}>
              {couponLoading ? <Loader2 size={16} className="spin" /> : 'Apply'}
            </button>
          </div>
          {couponStatus === 'applied' && <p className="coupon-msg coupon-msg-ok">$15 prepay discount applied.</p>}
          {couponStatus === 'invalid' && <p className="coupon-msg coupon-msg-bad">That code isn't valid.</p>}

          <button type="submit" className="btn btn-primary btn-block checkout-pay-btn" disabled={!stripe || paying}>
            {paying ? <Loader2 size={18} className="spin" /> : `Pay $${(finalCents / 100).toFixed(2)} Now`}
          </button>
        </form>

        <button className="checkout-pay-later" onClick={handlePayLater} disabled={confirmingPayLater || paying}>
          {confirmingPayLater ? 'Confirming…' : 'Pay Later — reserve without paying now'}
        </button>
        <p className="checkout-secure"><ShieldCheck size={14} /> Payments secured by Stripe</p>
      </div>

      <aside className="checkout-price-bar">
        <h5>Order Summary</h5>
        <div className="price-line"><span>{confirmedBooking.serviceNames}</span><span>${(baseCents / 100).toFixed(2)}</span></div>
        {discountCents > 0 && (
          <div className="price-line price-line-discount"><span>PREPAY discount</span><span>-${(discountCents / 100).toFixed(2)}</span></div>
        )}
        <div className="price-total"><span>Total Due</span><span>${(finalCents / 100).toFixed(2)}</span></div>
      </aside>
    </div>
  )
}
