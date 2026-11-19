import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Star } from 'lucide-react'
import { BUSINESS, HOURS, SERVICES, GOOGLE_PROFILE_URL } from '../lib/business'
import { SERVICE_PAGES, CITY_PAGES, HOME_CITY } from '../lib/pages'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo-apex.webp" alt="Apex Car Detailing logo" width="56" height="56" loading="lazy" />
          <p>{BUSINESS.fullName}: mobile car detailing brought to your door, with our own water and power.</p>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Contact</p>
          <a href={BUSINESS.phoneHref}><Phone size={15} /> {BUSINESS.phone}</a>
          <span><MapPin size={15} /> Mobile service in {BUSINESS.city} and nearby</span>
          <span><Clock size={15} /> {HOURS}</span>
          {GOOGLE_PROFILE_URL && (
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer"><Star size={15} /> Find us on Google</a>
          )}
        </div>
        <div className="footer-col">
          <p className="footer-heading">Site</p>
          <a href="/#services">Services</a>
          <a href="/#gallery">Gallery</a>
          <a href="/#about">About</a>
          <a href="/#faq">FAQ</a>
          <a href="/#area">Service Area</a>
          <Link to="/book">Book Online</Link>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Packages</p>
          {SERVICES.map((s) => (
            <a key={s.id} href="/#services">{s.name} — {s.addOn ? '+' : ''}${s.price}</a>
          ))}
        </div>
      </div>
      <div className="container footer-links">
        <nav className="footer-links-row" aria-label="Services">
          <span className="footer-heading">Services</span>
          {SERVICE_PAGES.map((p) => <Link key={p.path} to={p.path}>{p.nav}</Link>)}
        </nav>
        <nav className="footer-links-row" aria-label="Areas we serve">
          <span className="footer-heading">Areas</span>
          <Link to="/">{HOME_CITY}</Link>
          {CITY_PAGES.map((p) => <Link key={p.path} to={p.path}>{p.city}</Link>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {BUSINESS.fullName}. All rights reserved.</span>
      </div>
    </footer>
  )
}
