import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import { BUSINESS } from '../lib/business'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const isBookingFlow = ['/book', '/checkout', '/confirmation'].some((p) =>
    location.pathname.startsWith(p)
  )

  function scrollToId(id) {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <nav className="nav-side nav-left">
            <button onClick={() => scrollToId('services')}>Services</button>
            <button onClick={() => scrollToId('gallery')}>Gallery</button>
          </nav>

          <Link to="/" className="nav-badge" aria-label="Apex Car Detailing home">
            <img src="/images/logo-apex.webp" alt="Apex Car Detailing Westminster logo" />
          </Link>

          <nav className="nav-side nav-right">
            <button onClick={() => scrollToId('about')}>About</button>
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
        <button onClick={() => scrollToId('services')}>Services</button>
        <button onClick={() => scrollToId('gallery')}>Gallery</button>
        <button onClick={() => scrollToId('about')}>About</button>
        <button onClick={() => scrollToId('contact')}>Contact</button>
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
