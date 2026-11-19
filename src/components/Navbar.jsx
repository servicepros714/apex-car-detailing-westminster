import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import { BUSINESS } from '../lib/business'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const isBookingFlow = ['/book', '/checkout', '/confirmation'].some((p) =>
    location.pathname.startsWith(p)
  )

  // Plain /#section links: they work from every page (home and landing pages),
  // and crawlers can follow them.
  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <nav className="nav-side nav-left">
            <a className="nav-link" href="/#services">Services</a>
            <a className="nav-link" href="/#gallery">Gallery</a>
            <a className="nav-link" href="/#faq">FAQ</a>
          </nav>

          <Link to="/" className="nav-badge" aria-label="Apex Car Detailing home">
            <img src="/images/logo-apex.webp" alt="Apex Car Detailing Westminster logo" />
          </Link>

          <nav className="nav-side nav-right">
            <a className="nav-link" href="/#area">Areas</a>
            <a href={BUSINESS.phoneHref} className="nav-phone">
              <Phone size={15} /> {BUSINESS.phone}
            </a>
            <Link to="/book" className="btn btn-primary nav-cta">
              Book Online
            </Link>
          </nav>

          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={26} />
          </button>
        </div>
      </header>

      <div className={`nav-drawer ${open ? 'nav-drawer-open' : ''}`}>
        <div className="nav-drawer-head">
          <img src="/images/logo-apex.webp" alt="" className="nav-drawer-logo" />
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>
        <a className="nav-drawer-link" href="/#services" onClick={close}>Services</a>
        <a className="nav-drawer-link" href="/#gallery" onClick={close}>Gallery</a>
        <a className="nav-drawer-link" href="/#about" onClick={close}>About</a>
        <a className="nav-drawer-link" href="/#faq" onClick={close}>FAQ</a>
        <a className="nav-drawer-link" href="/#area" onClick={close}>Service Area</a>
        <Link to="/book" className="btn btn-primary nav-drawer-cta">
          <Calendar size={17} /> Book Online
        </Link>
        <a href={BUSINESS.phoneHref} className="nav-drawer-phone">
          <Phone size={16} /> {BUSINESS.phone}
        </a>
      </div>
      {open && <div className="nav-scrim" onClick={() => setOpen(false)} />}

      {!isBookingFlow && (
        <div className="mobile-action-bar">
          <a href={BUSINESS.phoneHref} className="mobile-action-btn mobile-action-outline">
            <Phone size={18} /> Call Now
          </a>
          <Link to="/book" className="mobile-action-btn mobile-action-primary">
            <Calendar size={18} /> Book Online
          </Link>
        </div>
      )}
    </>
  )
}
