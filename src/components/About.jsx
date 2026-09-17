import './About.css'

const STEPS = [
  { title: 'Book your slot', text: 'Pick a service, date, and time online — takes under two minutes.' },
  { title: 'We come to you', text: 'Our team arrives at your home or office in Westminster and nearby cities.' },
  { title: 'Drive away sharp', text: 'Interior and exterior restored to a showroom finish, every time.' },
]

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="line-label">Why Apex</span>
          <h2>Detailing that comes to your curb.</h2>
          <p>
            Apex Car Detailing is a mobile detailing crew based in Westminster,
            California. We built our process around one idea: the best detail is
            the one you don't have to drive anywhere for. Fully insured, fully
            equipped, and scheduled entirely online.
          </p>
          <div className="about-chrome-panel">
            <div><strong>7 days</strong><span>a week booking</span></div>
            <div><strong>Fully</strong><span>insured & equipped</span></div>
            <div><strong>Mobile</strong><span>we come to you</span></div>
          </div>
        </div>
        <div className="about-steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="about-step">
              <span className="about-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
