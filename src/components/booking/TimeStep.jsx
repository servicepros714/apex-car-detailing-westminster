import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useBooking } from '../../context/BookingContext'
import { getBookedSlots } from '../../lib/bookingDb'
import './BookSteps.css'

export default function TimeStep() {
  const { booking, updateBooking, TIME_SLOTS } = useBooking()
  const [booked, setBooked] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!booking.date) return
    setLoading(true)
    setError('')
    getBookedSlots(booking.date)
      .then(setBooked)
      .catch(() => setError("Couldn't load availability — all times shown as open."))
      .finally(() => setLoading(false))
  }, [booking.date])

  const dateLabel = booking.date ? format(new Date(`${booking.date}T00:00:00`), 'EEEE, MMMM d') : ''

  return (
    <div className="book-step">
      <h2>Pick a time</h2>
      <p className="book-step-sub">{dateLabel} · 30-minute appointments</p>

      {loading ? (
        <p className="time-loading">Checking open slots…</p>
      ) : (
        <>
          {error && <p className="time-loading">{error}</p>}
          <div className="time-grid">
            {TIME_SLOTS.map((slot) => {
              const isBooked = booked.includes(slot)
              const selected = booking.time === slot
              return (
                <button
                  key={slot}
                  className={`time-slot ${selected ? 'time-slot-selected' : ''}`}
                  disabled={isBooked}
                  onClick={() => updateBooking({ time: slot })}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
