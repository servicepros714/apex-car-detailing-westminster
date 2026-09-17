import { Check } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import './BookSteps.css'

export default function ServiceStep() {
  const { SERVICES, booking, toggleService } = useBooking()
  const coreServices = SERVICES.filter((s) => !s.addOn)

  return (
    <div className="book-step">
      <h2>Choose your detail</h2>
      <p className="book-step-sub">Select a Basic or Premium interior detail.</p>
      <div className="service-step-grid">
        {coreServices.map((svc) => {
          const selected = booking.services.includes(svc.id)
          return (
            <button
              key={svc.id}
              className={`service-pick ${selected ? 'service-pick-selected' : ''}`}
              onClick={() => toggleService(svc.id)}
              type="button"
            >
              <span className="service-pick-badge">{selected && <Check size={14} />}</span>
              <div className="service-pick-body">
                <h4>{svc.name}</h4>
                <span className="service-pick-price">${svc.price}</span>
                <p>{svc.tagline}</p>
                <ul>
                  {svc.features.map((f) => (
                    <li key={f}><Check size={14} /><span>{f}</span></li>
                  ))}
                </ul>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}