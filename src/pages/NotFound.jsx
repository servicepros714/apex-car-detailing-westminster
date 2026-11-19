import { Link } from 'react-router-dom'

// Rendered for unknown URLs. Prerendered to dist/404.html, which Cloudflare
// Pages serves with a 404 status.
export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <span className="line-label">Error 404</span>
        <h1>This page missed the apex.</h1>
        <p>The page you were looking for doesn’t exist. Head back home or book a detail.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-dark">Back Home</Link>
          <Link to="/book" className="btn btn-primary">Book Your Detail</Link>
        </div>
      </div>
    </section>
  )
}
