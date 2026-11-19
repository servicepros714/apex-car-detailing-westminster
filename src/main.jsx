import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BookingProvider } from './context/BookingContext'
import './index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <App />
      </BookingProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Prerendered pages already have HTML in #root: hydrate it. Booking pages are empty: render.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
