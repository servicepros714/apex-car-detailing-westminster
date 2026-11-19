import './About.css'

const STEPS = [
  { title: 'Book your slot', text: 'Pick a service, date and time online. Any day, 7 AM to 7 PM.' },
  { title: 'We come to you', text: 'We arrive at your home or office in Westminster or nearby, with our own water and power.' },
  { title: 'Drive away sharp', text: 'A clean interior, and a hand-washed exterior if you add the wash. Not happy? We’ll make it right.' },
]

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="line-label">Why Apex</span>
          <h2>Detailing that comes to your curb.</h2>
          <p>
            Apex Car Detailing is a mobile detailing service based in Westminster,
            California. We built our process around one idea: the best detail is
            the one you don't have to drive anywhere for. Fully equipped, backed by
            a satisfaction guarantee, and booked entirely online.
          </p>
          <div className="about-chrome-panel">
            <div><strong>7 days</strong><span>a week booking</span></div>
            <div><strong>Same price</strong><span>for every vehicle size</span></div>
            <div><strong>Mobile</strong><span>we come to you</span></div>
          </div>
        </div>
        <div className="about-steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="about-step">
              <span className="about-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
