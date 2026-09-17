import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'
import './Hero.css'

const STATS = [
  { value: '500+', label: 'Cars Detailed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '100%', label: 'Mobile Service' },
]

export default function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-bg"
        src="/images/hero-bmw.jpg"
        alt="Freshly washed SUV detailed by Apex Car Detailing in Westminster"
      />
      <div className="hero-scrim" />

      <div className="container hero-content-wrap">
        <div className="hero-content">
          <span className="line-label">Westminster, CA · Mobile Detailing</span>
        <h1 className="hero-title">
          Find your car's<br />apex condition.
        </h1>
        <p className="hero-sub">
          We bring showroom-quality interior and exterior detailing straight to
          your driveway. Book online in under two minutes.
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
            <ShieldCheck size={18} />
            <span>Fully Insured</span>
          </div>
            <div className="hero-badge">
              <Sparkles size={18} />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}