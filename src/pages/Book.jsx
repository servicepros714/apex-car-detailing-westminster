import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import BookProgress from '../components/booking/BookProgress'
import BookSummary from '../components/booking/BookSummary'
import ServiceStep from '../components/booking/ServiceStep'
import ExteriorWashStep from '../components/booking/ExteriorWashStep'
import DateStep from '../components/booking/DateStep'
import TimeStep from '../components/booking/TimeStep'
import InfoStep from '../components/booking/InfoStep'
import StepBar from '../components/StepBar'
import { useBooking } from '../context/BookingContext'
import { createBooking } from '../lib/bookingDb'
import { BUSINESS } from '../lib/business'
import './Book.css'

export default function Book() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { booking, SERVICES, total, setConfirmedBooking } = useBooking()
  const navigate = useNavigate()

  const hasCoreService = booking.services.some((id) => SERVICES.find((s) => s.id === id && !s.addOn))

  const canContinue = [
    hasCoreService,
    true, // exterior wash step is optional
    Boolean(booking.date),
    Boolean(booking.time),
    Boolean(booking.name && booking.phone && booking.email && booking.address && booking.vehicle),
  ][step]

  async function handleNext() {
    if (step < 4) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // final step -> create the booking row, then move to checkout
    setLoading(true)
    try {
      const serviceNames = SERVICES.filter((s) => booking.services.includes(s.id)).map((s) => s.name).join(' + ')
      const result = await createBooking({
        date: booking.date,
        time: booking.time,
        service: serviceNames,
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        vehicle: booking.vehicle,
        address: booking.address,
        notes: booking.notes,
        source: BUSINESS.source,
        status: 'Pending',
        payment_status: 'Pay Later',
      })
      setConfirmedBooking({ ...booking, id: result.id, serviceNames, total })
      navigate('/checkout')
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleBack() {
    if (step === 0) return
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps = [
    <ServiceStep key="s" />,
    <ExteriorWashStep key="e" />,
    <DateStep key="d" />,
    <TimeStep key="t" />,
    <InfoStep key="i" />,
  ]

  return (
    <div className="book-page page-shell">
      <BookProgress current={step} />
      <div className="container book-layout">
        <div className="book-main">{steps[step]}</div>
        <BookSummary />
      </div>
      <StepBar
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!canContinue}
        loading={loading}
        hideBack={step === 0}
        nextLabel={step === 4 ? 'Continue to Checkout' : 'Continue'}
      />
    </div>
  )
}
