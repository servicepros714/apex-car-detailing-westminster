import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import './Services.css'

export default function Services() {
  const { SERVICES } = useBooking()

  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="services-head">
          <span className="line-label">Services</span>
          <h2>Two details. One add-on. No surprises.</h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((svc) => (
            <div key={svc.id} className={`service-card ${svc.popular ? 'service-card-popular' : ''}`}>
              {svc.popular && <span className="service-tag">Most Booked</span>}
              <h3>{svc.name}</h3>
              <p className="service-tagline">{svc.tagline}</p>
              <div className="service-price">
                {svc.addOn && <span className="service-plus">+</span>}${svc.price}
              </div>
              <ul>
                {svc.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <Link to="/book" className="btn btn-primary">
            Book Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
