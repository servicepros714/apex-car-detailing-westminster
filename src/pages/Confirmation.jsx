import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, Calendar, Phone } from 'lucide-react'
import { BUSINESS } from '../lib/business'
import './Confirmation.css'

export default function Confirmation() {
  const location = useLocation()
  const state = location.state

  if (!state) return <Navigate to="/" replace />

  return (
    <div className="confirmation-page page-shell">
      <div className="container confirmation-box">
        <CheckCircle2 size={56} className="confirmation-icon" />
        <h1>{state.paid ? "You're all set." : "You're booked."}</h1>
        <p>
          {state.paid
            ? 'Your payment went through and your appointment is confirmed. A confirmation text and email are on the way.'
            : "Your appointment is reserved. You'll pay in person once the detail is complete."}
        </p>
        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <a href={BUSINESS.phoneHref} className="btn btn-outline confirmation-call">
            <Phone size={16} /> Call Us
          </a>
        </div>
        <div className="confirmation-note">
          <Calendar size={15} />
          <span>Need to reschedule? Call {BUSINESS.phone} and we'll take care of it.</span>
        </div>
      </div>
    </div>
  )
}
