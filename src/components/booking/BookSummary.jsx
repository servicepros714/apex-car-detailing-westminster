import { useBooking } from '../../context/BookingContext'
import './BookSummary.css'

export default function BookSummary() {
  const { booking, SERVICES, total } = useBooking()
  const chosen = SERVICES.filter((s) => booking.services.includes(s.id))

  return (
    <aside className="book-summary">
      <h5>Your Booking</h5>
      {chosen.length === 0 ? (
        <p className="book-summary-empty">No services selected yet.</p>
      ) : (
        <ul>
          {chosen.map((s) => (
            <li key={s.id}>
              <span>{s.name}</span>
              <span>${s.price}</span>
            </li>
          ))}
        </ul>
      )}
      {booking.date && (
        <div className="book-summary-line">
          <span>Date</span><span>{booking.date}</span>
        </div>
      )}
      {booking.time && (
        <div className="book-summary-line">
          <span>Time</span><span>{booking.time}</span>
        </div>
      )}
      <div className="book-summary-total">
        <span>Total</span><span>${total}</span>
      </div>
    </aside>
  )
}
