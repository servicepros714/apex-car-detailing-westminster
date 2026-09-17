import { Link } from 'react-router-dom'
import { Phone, MapPin, Instagram, Facebook } from 'lucide-react'
import { BUSINESS } from '../lib/business'
import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-top" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo-apex.webp" alt="Apex Car Detailing logo" />
          <p>{BUSINESS.fullName} — mobile auto detailing done right, brought to your door.</p>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <a href={BUSINESS.phoneHref}><Phone size={15} /> {BUSINESS.phone}</a>
          <span><MapPin size={15} /> {BUSINESS.city}</span>
        </div>
        <div className="footer-col">
          <h5>Site</h5>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <Link to="/book">Book Online</Link>
        </div>
        <div className="footer-col">
          <h5>Follow</h5>
          <div className="footer-social">
            <a href={BUSINESS.instagram} aria-label="Instagram"><Instagram size={18} /></a>
            <a href={BUSINESS.facebook} aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {BUSINESS.fullName}. All rights reserved.</span>
      </div>
    </footer>
  )
}
