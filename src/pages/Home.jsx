import { Link } from 'react-router-dom'
import { Clock, Phone, MapPin } from 'lucide-react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import { BUSINESS, HOURS } from '../lib/business'
import { CITY_PAGES, HOME_CITY } from '../lib/pages'

function ServiceArea() {
  return (
    <section id="area" className="section area-section">
      <div className="container area-grid">
        <div>
          <span className="line-label">Service Area</span>
          <h2>Westminster and the neighborhoods next door.</h2>
          <p className="area-text">
            Apex is fully mobile. We detail cars at homes and offices across {HOME_CITY} and in nearby
            Midway City, Huntington Harbour, Sunset Beach and La Palma.
          </p>
          <ul className="lp-chips">
            {CITY_PAGES.map((p) => <li key={p.path}><Link to={p.path}>{p.city}</Link></li>)}
          </ul>
          <ul className="lp-info">
            <li><Clock size={15} /> {HOURS}</li>
            <li><Phone size={15} /> <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></li>
            <li><MapPin size={15} /> Not on the list? Call and ask.</li>
          </ul>
        </div>
        <div className="lp-map">
          <iframe
            title={`Map of ${HOME_CITY}, CA`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${HOME_CITY}, CA`)}&output=embed`}
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Faq />
      <ServiceArea />
    </>
  )
}
