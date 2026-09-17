import './BookProgress.css'

const STEPS = ['Service', 'Add-On', 'Date', 'Time', 'Your Info']

export default function BookProgress({ current }) {
  return (
    <div className="book-progress-bar">
      <div className="book-progress">
        {STEPS.map((label, i) => (
          <div key={label} className={`book-progress-item ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}>
            <span className="book-progress-dot">{i + 1}</span>
            <span className="book-progress-label">{label}</span>
            {i < STEPS.length - 1 && <span className="book-progress-line" />}
          </div>
        ))}
      </div>
    </div>
  )
}