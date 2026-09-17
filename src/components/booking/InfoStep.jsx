import { useBooking } from '../../context/BookingContext'
import './BookSteps.css'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  const len = digits.length
  if (len < 4) return digits
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function InfoStep() {
  const { booking, updateBooking } = useBooking()

  return (
    <div className="book-step">
      <h2>Your information</h2>
      <p className="book-step-sub">We'll text and email your confirmation.</p>
      <div className="info-form">
        <div className="info-field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name" type="text" value={booking.name}
            onChange={(e) => updateBooking({ name: e.target.value })}
            placeholder="Jordan Smith"
          />
        </div>
        <div className="info-field">
          <label htmlFor="phone">Phone</label>
          <div className="phone-input-wrap">
            <span className="phone-flag">
              <img src="https://flagcdn.com/w20/us.png" alt="US" /> +1
            </span>
            <input
              id="phone" type="tel" value={booking.phone}
              onChange={(e) => updateBooking({ phone: formatPhone(e.target.value) })}
              placeholder="(714) 555-0132"
            />
          </div>
        </div>
        <div className="info-field">
          <label htmlFor="email">Email</label>
          <input
            id="email" type="email" value={booking.email}
            onChange={(e) => updateBooking({ email: e.target.value })}
            placeholder="jordan@email.com"
          />
        </div>
        <div className="info-field">
          <label htmlFor="vehicle">Vehicle (Year, Make, Model)</label>
          <input
            id="vehicle" type="text" value={booking.vehicle}
            onChange={(e) => updateBooking({ vehicle: e.target.value })}
            placeholder="2022 Honda Accord"
          />
        </div>
        <div className="info-field full">
          <label htmlFor="address">Service Address</label>
          <input
            id="address" type="text" value={booking.address}
            onChange={(e) => updateBooking({ address: e.target.value })}
            placeholder="Street, City, ZIP"
          />
        </div>
        <div className="info-field full">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes" rows={3} value={booking.notes}
            onChange={(e) => updateBooking({ notes: e.target.value })}
            placeholder="Gate code, parking instructions, specific concerns…"
          />
        </div>
      </div>
    </div>
  )
}
