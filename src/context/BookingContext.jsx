import { createContext, useContext, useState } from 'react'
import { SERVICES } from '../lib/business'

const BookingContext = createContext(null)

const TIME_SLOTS = (() => {
  const slots = []
  let h = 7, m = 0
  while (h < 19 || (h === 19 && m === 0)) {
    if (h === 19 && m > 0) break
    const period = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 === 0 ? 12 : h % 12
    slots.push(`${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`)
    m += 30
    if (m === 60) { m = 0; h += 1 }
  }
  return slots
})()

const emptyBooking = {
  services: [], // array of service ids
  date: null,
  time: null,
  name: '',
  phone: '',
  email: '',
  address: '',
  vehicle: '',
  notes: '',
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(emptyBooking)
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  function updateBooking(patch) {
    setBooking((prev) => ({ ...prev, ...patch }))
  }

  function toggleService(id) {
    setBooking((prev) => {
      const svc = SERVICES.find((s) => s.id === id)
      const has = prev.services.includes(id)

      // turning it off
      if (has) {
        return { ...prev, services: prev.services.filter((s) => s !== id) }
      }

      // core detail (Basic / Premium): pick one at a time, keep any add-ons
      if (svc && !svc.addOn) {
        const addOnsOnly = prev.services.filter((sid) => {
          const s = SERVICES.find((x) => x.id === sid)
          return s?.addOn
        })
        return { ...prev, services: [...addOnsOnly, id] }
      }

      // add-on: just add it alongside whatever else is selected
      return { ...prev, services: [...prev.services, id] }
    })
  }

  function resetBooking() {
    setBooking(emptyBooking)
  }

  const total = booking.services.reduce((sum, id) => {
    const svc = SERVICES.find((s) => s.id === id)
    return sum + (svc ? svc.price : 0)
  }, 0)

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        toggleService,
        resetBooking,
        total,
        confirmedBooking,
        setConfirmedBooking,
        SERVICES,
        TIME_SLOTS,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
