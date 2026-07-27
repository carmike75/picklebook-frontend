import React, { useState } from 'react'
import './App.css'

const courtsData = [
  { id: 1, name: "Pickleball Plus Dumaguete", location: "Fuente Osmeña", price: 150, amenities: ["Lights", "AC Lounge", "Parking"], courts: 4, hours: "6AM-10PM", rating: 4.9, type: "premium", surface: "Acrylic" },
  { id: 2, name: "Duma Sports Complex", location: "Banilad", price: 100, amenities: ["Pro Staff", "Cafe"], courts: 6, hours: "7AM-9PM", rating: 4.7, type: "mid", surface: "Acrylic" },
  { id: 3, name: "Casual Courts", location: "Bajada", price: 75, amenities: ["Parking"], courts: 2, hours: "8AM-8PM", rating: 4.5, type: "budget", surface: "Concrete" },
  { id: 4, name: "Elite Pickleball Hub", location: "Recta", price: 180, amenities: ["Lights", "AC Lounge", "Pro Staff", "Cafe"], courts: 8, hours: "6AM-11PM", rating: 4.9, type: "premium", surface: "Acrylic" },
  { id: 5, name: "Community Court", location: "San Jose", price: 60, amenities: ["Open Air"], courts: 2, hours: "7AM-7PM", rating: 4.3, type: "budget", surface: "Concrete" },
  { id: 6, name: "Sunset Pickleball", location: "Piapi", price: 120, amenities: ["Lights", "Cafe"], courts: 3, hours: "6AM-10PM", rating: 4.6, type: "mid", surface: "Acrylic" },
  { id: 7, name: "Pro Arena", location: "Rutis", price: 200, amenities: ["Lights", "AC Lounge", "Pro Staff", "Tournament Grade"], courts: 10, hours: "5AM-11PM", rating: 5.0, type: "premium", surface: "Professional" },
  { id: 8, name: "Friendly Courts", location: "Subangdaan", price: 85, amenities: ["Parking", "Water"], courts: 3, hours: "7AM-9PM", rating: 4.4, type: "budget", surface: "Concrete" },
  { id: 9, name: "Downtown Pickleball", location: "Sta. Rosa", price: 110, amenities: ["Lights", "Cafe"], courts: 4, hours: "6AM-10PM", rating: 4.7, type: "mid", surface: "Acrylic" },
  { id: 10, name: "Paradise Courts", location: "Tanjay Road", price: 95, amenities: ["Open Air", "Parking"], courts: 2, hours: "7AM-8PM", rating: 4.5, type: "budget", surface: "Concrete" },
  { id: 11, name: "Champion's Court", location: "Aznar", price: 160, amenities: ["Lights", "AC Lounge", "Pro Staff"], courts: 5, hours: "6AM-10PM", rating: 4.8, type: "premium", surface: "Acrylic" },
  { id: 12, name: "Valley Court", location: "Cambaro", price: 70, amenities: ["Open Air"], courts: 1, hours: "8AM-6PM", rating: 4.2, type: "budget", surface: "Concrete" }
]

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [selectedCourt, setSelectedCourt] = useState(null)
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', time: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const filteredCourts = courtsData.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          court.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = priceFilter === 'all' || court.type === priceFilter
    return matchesSearch && matchesPrice
  })

  const handleBooking = (e) => {
    e.preventDefault()
    if (bookingForm.name && bookingForm.phone && bookingForm.date && bookingForm.time) {
      setBookingSuccess(true)
      setTimeout(() => {
        setBookingSuccess(false)
        setSelectedCourt(null)
        setBookingForm({ name: '', phone: '', date: '', time: '' })
      }, 2000)
    }
  }

  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
      
      <main className="container">
        <div className="courts-grid">
          {filteredCourts.map(court => (
            <CourtCard key={court.id} court={court} onClick={() => setSelectedCourt(court)} />
          ))}
        </div>

        <OwnerCTA />
      </main>

      {selectedCourt && (
        <Modal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          onBooking={handleBooking}
          bookingSuccess={bookingSuccess}
        />
      )}
    </div>
  )
}

function Header({ searchTerm, setSearchTerm, priceFilter, setPriceFilter }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🏐 Picklebook</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courts by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <button className={`filter-btn ${priceFilter === 'all' ? 'active' : ''}`} onClick={() => setPriceFilter('all')}>
            All prices
          </button>
          <button className={`filter-btn ${priceFilter === 'budget' ? 'active' : ''}`} onClick={() => setPriceFilter('budget')}>
            Budget (₱45-99)
          </button>
          <button className={`filter-btn ${priceFilter === 'mid' ? 'active' : ''}`} onClick={() => setPriceFilter('mid')}>
            Mid-range (₱100-150)
          </button>
          <button className={`filter-btn ${priceFilter === 'premium' ? 'active' : ''}`} onClick={() => setPriceFilter('premium')}>
            Premium (₱151+)
          </button>
        </div>
      </div>
    </header>
  )
}

function CourtCard({ court, onClick }) {
  return (
    <div className="court-card" onClick={onClick}>
      <h3 className="court-name">{court.name}</h3>
      <p className="court-location">📍 {court.location}</p>
      <p className="court-price">₱{court.price}/hr</p>
      <div className="court-amenities">
        {court.amenities.map((amenity, idx) => (
          <span key={idx} className="amenity-badge">{amenity}</span>
        ))}
      </div>
      <p className="court-rating">★★★★★ {court.rating}</p>
    </div>
  )
}

function Modal({ court, onClose, bookingForm, setBookingForm, onBooking, bookingSuccess }) {
  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 className="modal-title">{court.name}</h2>
          <p className="modal-subtitle">📍 {court.location}</p>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="modal-section-title">Pricing</h4>
            <div className="modal-detail">
              <span>Hourly rate</span>
              <span style={{ fontWeight: 500 }}>₱{court.price}</span>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Amenities</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {court.amenities.map((amenity, idx) => (
                <span key={idx} className="amenity-badge">{amenity}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Details</h4>
            <div className="modal-detail">
              <span>Surface type</span>
              <span>{court.surface}</span>
            </div>
            <div className="modal-detail">
              <span>Number of courts</span>
              <span>{court.courts}</span>
            </div>
            <div className="modal-detail">
              <span>Hours</span>
              <span>{court.hours}</span>
            </div>
            <div className="modal-detail">
              <span>Rating</span>
              <span>★★★★★ {court.rating}</span>
            </div>
          </div>

          {bookingSuccess && (
            <div className="booking-success">
              ✓ Booking request sent! Court owner will contact you soon.
            </div>
          )}

          <form className="booking-form" onSubmit={onBooking}>
            <h3>Book a court</h3>
            <div className="form-group">
              <label>Your name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="+63 9XX XXX XXXX"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Request booking
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function OwnerCTA() {
  return (
    <div className="owner-cta">
      <h3 className="owner-cta-title">Own a pickleball court?</h3>
      <p className="owner-cta-desc">
        List your court for free and start accepting bookings today. Earn ₱5 per platform booking with instant payouts.
      </p>
      <button className="btn btn-secondary" onClick={() => alert('Owner signup coming soon!')}>
        Become a venue owner
      </button>
    </div>
  )
}
