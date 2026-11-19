import { Star } from 'lucide-react'
import { REVIEWS, GOOGLE_PROFILE_URL } from '../lib/business'
import './Testimonials.css'

// Real Google reviews only (src/lib/business.js). With no reviews, this shows a link
// to the Google profile if there is one, or nothing at all.
export default function Testimonials() {
  if (!REVIEWS.length && !GOOGLE_PROFILE_URL) return null
  return (
    <section id="reviews" className="testimonials section">
      <div className="container">
        <span className="line-label">Reviews</span>
        <h2>{REVIEWS.length ? 'What customers are saying.' : 'Find us on Google.'}</h2>
        {REVIEWS.length > 0 && (
          <div className="testimonials-grid">
            {REVIEWS.map((r) => (
              <div key={r.name} className="testimonial-card">
                <div className="testimonial-stars" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p>{r.text}</p>
                <div className="testimonial-name">{r.name} <span>· Google review</span></div>
              </div>
            ))}
          </div>
        )}
        {GOOGLE_PROFILE_URL && (
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark reviews-google">
            {REVIEWS.length ? 'See all reviews on Google' : 'Apex on Google'}
          </a>
        )}
      </div>
    </section>
  )
}
