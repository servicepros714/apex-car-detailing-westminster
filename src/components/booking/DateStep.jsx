import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  startOfMonth, endOfMonth, startOfDay, addMonths, subMonths,
  eachDayOfInterval, format, getDay, isBefore, isSameDay,
} from 'date-fns'
import { useBooking } from '../../context/BookingContext'
import './BookSteps.css'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DateStep() {
  const { booking, updateBooking } = useBooking()
  const [viewMonth, setViewMonth] = useState(startOfMonth(new Date()))

  const today = startOfDay(new Date())
  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const leadingBlanks = getDay(monthStart)

  return (
    <div className="book-step">
      <h2>Pick a date</h2>
      <p className="book-step-sub">Availability shown in Pacific Time.</p>
      <div className="calendar">
        <div className="calendar-head">
          <button onClick={() => setViewMonth((m) => subMonths(m, 1))} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <h4>{format(viewMonth, 'MMMM yyyy')}</h4>
          <button onClick={() => setViewMonth((m) => addMonths(m, 1))} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="calendar-grid">
          {DOW.map((d) => <span key={d} className="calendar-dow">{d}</span>)}
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`b${i}`} className="calendar-day calendar-day-empty" />
          ))}
          {days.map((day) => {
            const disabled = isBefore(day, today)
            const selected = booking.date && isSameDay(day, new Date(booking.date))
            return (
              <button
                key={day.toISOString()}
                className={`calendar-day ${selected ? 'calendar-day-selected' : ''}`}
                disabled={disabled}
                onClick={() => updateBooking({ date: format(day, 'yyyy-MM-dd'), time: null })}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
