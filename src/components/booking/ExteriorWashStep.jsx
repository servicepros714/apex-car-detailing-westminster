import { Check } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import './BookSteps.css'

export default function ExteriorWashStep() {
  const { SERVICES, booking, toggleService } = useBooking()
  const exterior = SERVICES.find((s) => s.addOn)
  const coreName = SERVICES.find((s) => booking.services.includes(s.id) && !s.addOn)?.name || 'your detail'
  const selected = booking.services.includes(exterior.id)

  return (
    <div className="book-step">
      <h2>Add an exterior wash?</h2>
      <p className="book-step-sub">
        Optional — add a full hand wash &amp; shine to your {coreName}. Leave it off to continue with interior only.
      </p>
      <div className="service-step-grid service-step-grid-single">
        <button
          className={`service-pick ${selected ? 'service-pick-selected' : ''}`}
          onClick={() => toggleService(exterior.id)}
          type="button"
        >
          <span className="service-pick-badge">{selected && <Check size={14} />}</span>
          <div className="service-pick-body">
            <h4>Add Exterior Wash</h4>
            <span className="service-pick-price">+${exterior.price}</span>
            <p>{exterior.tagline}</p>
            <ul>
              {exterior.features.map((f) => (
                <li key={f}><Check size={14} /><span>{f}</span></li>
              ))}
            </ul>
          </div>
        </button>
      </div>
    </div>
  )
}
