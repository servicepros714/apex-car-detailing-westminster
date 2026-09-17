import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Book from './pages/Book'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'

export default function App() {
  const location = useLocation()
  const isBookingFlow = ['/book', '/checkout', '/confirmation'].some((p) =>
    location.pathname.startsWith(p)
  )

  useEffect(() => {
    document.body.classList.toggle('has-mobile-bar', !isBookingFlow)
  }, [isBookingFlow])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      {!isBookingFlow && <Footer />}
    </>
  )
}
