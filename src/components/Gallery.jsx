import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

// Real job photos (public/images). Captions name the vehicle only.
const PHOTOS = [
  { src: '/images/hero-bmw.jpg', w: 1080, h: 1350, caption: 'BMW X5', alt: 'Gray BMW X5 after a hand wash on a residential street' },
  { src: '/images/gallery-charger.jpg', w: 1080, h: 1080, caption: 'Dodge Charger', alt: 'White Dodge Charger with a clean finish in a parking lot' },
  { src: '/images/gallery-jeep.jpg', w: 1080, h: 1439, caption: 'Jeep Grand Cherokee', alt: 'Black Jeep Grand Cherokee after a detail' },
  { src: '/images/gallery-accord.jpg', w: 1080, h: 1080, caption: 'Honda Accord', alt: 'Silver Honda Accord after a detail on a residential street' },
  { src: '/images/gallery-silverado.jpg', w: 1080, h: 1080, caption: 'Chevrolet Silverado — foam pre-soak', alt: 'Black Chevrolet Silverado covered in foam during a curbside hand wash' },
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
            <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
