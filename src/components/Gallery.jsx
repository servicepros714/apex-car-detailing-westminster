import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const PHOTOS = [
  { src: '/images/hero-bmw.jpg', caption: 'BMW X5 — full exterior detail, Newport driveway' },
  { src: '/images/gallery-charger.jpg', caption: 'Dodge Charger — hand wash & tire shine' },
  { src: '/images/gallery-jeep.jpg', caption: 'Jeep Grand Cherokee — chrome & panel detail' },
  { src: '/images/gallery-accord.jpg', caption: 'Honda Accord — showroom exterior finish' },
  { src: '/images/gallery-silverado.jpg', caption: 'Silverado — foam pre-soak before hand wash' },
]

export default function Gallery() {
  const trackRef = useRef(null)

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container gallery-head">
        <div>
          <span className="line-label">Recent Work</span>
          <h2>Every panel, brought to the apex.</h2>
        </div>
        <div className="gallery-controls">
          <button onClick={() => scrollBy(-1)} aria-label="Scroll left"><ChevronLeft size={20} /></button>
          <button onClick={() => scrollBy(1)} aria-label="Scroll right"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="gallery-track" ref={trackRef}>
        {PHOTOS.map((p) => (
          <figure key={p.src} className="gallery-card">
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
