import { Link } from 'react-router-dom'
import { Check, ArrowRight, Clock } from 'lucide-react'
import { SERVICES } from '../lib/business'
import { SERVICE_PAGES } from '../lib/pages'
import './Services.css'

// Packages + prices. Used on the home page (with links to the service pages) and on
// every landing page (own title, no links: those pages have a "More services" row).
export default function Services({ title = 'Two details. One add-on. No surprises.', links = true }) {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="services-head">
          <span className="line-label">Services</span>
          <h2>{title}</h2>
          <p className="services-intro">Same price for every vehicle size. We bring our own water and power.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((svc) => (
            <div key={svc.id} className={`service-card ${svc.popular ? 'service-card-popular' : ''}`}>
              {svc.popular && <span className="service-tag">Most Complete</span>}
              <h3>{svc.name}</h3>
              <p className="service-tagline">{svc.tagline}</p>
              <div className="service-price">
                {svc.addOn && <span className="service-plus">+</span>}${svc.price}
              </div>
              <p className="service-time"><Clock size={14} /> {svc.duration}</p>
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
        {links && (
          <nav className="seo-links" aria-label="Detailing services">
            <span>Learn more:</span>
            {SERVICE_PAGES.map((p) => <Link key={p.path} to={p.path}>{p.nav}</Link>)}
          </nav>
        )}
      </div>
    </section>
  )
}
