import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, MapPin, Phone } from 'lucide-react'
import { BUSINESS, HOURS, SERVICES } from '../lib/business'
import { SERVICE_PAGES, CITY_PAGES, HOME_CITY } from '../lib/pages'
import Services from '../components/Services'
import Faq from '../components/Faq'

// One template for every SEO landing page in src/lib/pages.js.

const [basic, premium, wash] = SERVICES

// Hero price card: a detail, or 'combo' = Premium Detail + Exterior Wash.
// The Exterior Wash is never shown as a product on its own.
function HeroCard({ page }) {
  const combo = page.card === 'combo'
  const pkg = combo ? premium : SERVICES.find((s) => s.id === page.card)
  const name = combo ? `${premium.name} + ${wash.name}` : pkg.name
  const price = combo ? premium.price + wash.price : pkg.price
  const items = combo
    ? ['Everything in the Premium Detail', 'Full Interior Shampooing', 'UV-Protectant Coating', 'Hand-Washed Exterior', 'Rims, Tires & Tire Shine', 'Spot-Free Hand Drying']
    : pkg.features
  return (
    <aside className="service-card service-card-popular lp-card" aria-label={name}>
      <span className="service-tag">{combo ? 'Inside + Out' : 'Most Complete'}</span>
      <h2 className="lp-card-title">{name}</h2>
      <p className="service-tagline">{combo ? `$${premium.price} detail + $${wash.price} hand wash` : pkg.tagline}</p>
      <div className="service-price">${price}</div>
      <p className="service-time"><Clock size={14} /> {combo ? `${premium.duration} + ${wash.duration.replace('adds ', '')}` : pkg.duration}</p>
      <ul>
        {items.map((f) => <li key={f}><Check size={16} /><span>{f}</span></li>)}
      </ul>
      <Link to="/book" className="btn btn-primary btn-block lp-card-btn">
        {combo ? 'Book Premium + Wash' : `Book ${pkg.name.split(' ')[0]}`} <ArrowRight size={18} />
      </Link>
      <p className="lp-card-note">
        {combo
          ? `Or the Basic Interior Detail + wash for $${basic.price + wash.price}.`
          : 'Prepay online with code PREPAY and save $15, or pay later.'}
      </p>
    </aside>
  )
}

function Related({ page }) {
  const services = SERVICE_PAGES.filter((p) => p.path !== page.path)
  const areas = CITY_PAGES.filter((p) => p.path !== page.path)
  return (
    <section className="section lp-related" aria-label="More from Apex">
      <div className="container lp-related-grid">
        <div>
          <h2 className="lp-related-title">More services</h2>
          <ul className="lp-chips">
            {services.map((p) => <li key={p.path}><Link to={p.path}>{p.nav}</Link></li>)}
            <li><a href="/#services">All prices</a></li>
          </ul>
        </div>
        <div>
          <h2 className="lp-related-title">Areas we serve</h2>
          <ul className="lp-chips">
            <li><Link to="/">{HOME_CITY}</Link></li>
            {areas.map((p) => <li key={p.path}><Link to={p.path}>{p.city}</Link></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Landing({ page }) {
  const { local, intro } = page
  const isCity = page.kind === 'city'

  return (
    <>
      <section className="lp-hero">
        <div className="container lp-hero-grid">
          <div className="lp-hero-copy">
            <nav className="lp-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.nav}</span>
            </nav>
            <span className="line-label">{page.eyebrow}</span>
            <h1 className="lp-title">
              {page.h1[0]} <span>{page.h1[1]}</span>
            </h1>
            <p className="lp-lede">{page.lede}</p>
            <div className="lp-ctas">
              <Link to="/book" className="btn btn-primary">Book Your Detail <ArrowRight size={18} /></Link>
              <a href={BUSINESS.phoneHref} className="btn btn-outline"><Phone size={16} /> {BUSINESS.phone}</a>
            </div>
            <ul className="lp-facts">
              {page.facts.map((f) => <li key={f}><Check size={15} /> {f}</li>)}
            </ul>
          </div>
          <HeroCard page={page} />
        </div>
      </section>

      <section className="section">
        <div className="container lp-intro-grid">
          <div className="lp-intro-text">
            <span className="line-label">{isCity ? page.city : 'Overview'}</span>
            <h2>{intro.h2}</h2>
            {intro.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
          <figure className="lp-photo">
            <img src={page.photo.src} alt={page.photo.alt} width={page.photo.w} height={page.photo.h} loading="lazy" />
          </figure>
        </div>
      </section>

      <div className="lp-dark">
        <Services title={isCity ? `Prices in ${page.city}.` : 'Two details and an add-on.'} links={false} />
      </div>

      <section className="section">
        <div className="container">
          <span className="line-label">Why Apex</span>
          <h2 className="lp-points-title">{isCity ? `Why book us in ${page.city}.` : 'Why book Apex.'}</h2>
          <ul className="lp-points">
            {page.points.map((pt) => (
              <li key={pt.title} className="testimonial-card">
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq faqs={page.faqs} title={`${page.nav} questions.`} />

      {local && (
        <section className="section">
          <div className="container area-grid">
            <div>
              <span className="line-label">Service Area</span>
              <h2>{local.h2}</h2>
              <p className="area-text">{local.text}</p>
              <p className="lp-spots-label"><MapPin size={14} /> {local.spotsLabel}</p>
              <ul className="lp-chips lp-chips--plain">
                {local.spots.map((s) => <li key={s}><span>{s}</span></li>)}
              </ul>
              <ul className="lp-info">
                <li><Clock size={15} /> {HOURS}</li>
                <li><Phone size={15} /> <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></li>
              </ul>
            </div>
            <div className="lp-map">
              <iframe
                title={`Map of ${local.map}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(local.map)}&output=embed`}
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      )}

      <Related page={page} />

      <section className="lp-cta">
        <div className="container lp-cta-inner">
          <div>
            <h2>Ready for a cleaner ride?</h2>
            <p>{HOURS}. We come to you.</p>
          </div>
          <Link to="/book" className="btn btn-primary">Book Your Detail <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
