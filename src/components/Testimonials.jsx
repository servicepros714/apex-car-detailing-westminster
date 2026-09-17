import { Star } from 'lucide-react'
import './Testimonials.css'

const REVIEWS = [
  { name: 'Marissa T.', city: 'Westminster', text: 'They showed up right on time and my Accord looked brand new inside. Booking online took two minutes.' },
  { name: 'Daniel P.', city: 'Huntington Beach', text: 'Premium detail was worth every dollar. The interior shampoo got stains out I thought were permanent.' },
  { name: 'Grace L.', city: 'Fountain Valley', text: 'Easy scheduling, friendly crew, and the exterior wash left zero water spots. Already rebooked.' },
]

export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <span className="line-label">Reviews</span>
        <h2>What Westminster drivers are saying.</h2>
        <div className="testimonials-grid">
          {REVIEWS.map((r) => (
            <div key={r.name} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p>{r.text}</p>
              <div className="testimonial-name">{r.name} <span>· {r.city}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
