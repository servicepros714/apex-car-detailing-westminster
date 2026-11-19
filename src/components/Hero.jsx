import { Link } from 'react-router-dom'
import { ShieldCheck, Droplets } from 'lucide-react'
import './Hero.css'

// Confirmed facts only (no counts, ratings or years).
const STATS = [
  { value: '$150', label: 'Interior details from' },
  { value: 'Any size', label: 'Same price' },
  { value: '7 days', label: '7 AM – 7 PM' },
]

export default function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-bg"
        src="/images/hero-bmw.jpg"
        alt="Gray BMW X5 after a hand wash on a residential street"
        width="1080"
        height="1350"
        fetchpriority="high"
      />
      <div className="hero-scrim" />

      <div className="container hero-content-wrap">
        <div className="hero-content">
          <h1 className="line-label">Mobile car detailing in Westminster, CA</h1>
          <p className="hero-title">
            Find your car's<br />apex condition.
          </p>
          <p className="hero-sub">
            Interior detailing, plus an optional hand wash, brought straight to
            your driveway. We bring our own water and power.
          </p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary">Book Your Detail</Link>
            <a href="#services" className="btn btn-outline">View Services</a>
          </div>
          <div className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-badges">
            <div className="hero-badge">
              <Droplets size={18} />
              <span>Water & Power Included</span>
            </div>
            <div className="hero-badge">
              <ShieldCheck size={18} />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
