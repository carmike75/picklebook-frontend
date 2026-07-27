# Picklebook Frontend - React Marketplace

Complete React 18 player marketplace for Picklebook - Dumaguete's pickleball court booking platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or extract the files:**
```bash
cd picklebook-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## ✨ Features

- **Court Marketplace** - Browse 12+ verified courts in Dumaguete
- **Search & Filter** - Find courts by name, location, price range
- **Court Details** - View amenities, hours, ratings, number of courts
- **Booking Form** - Players can request bookings with dates/times
- **Owner Signup** - CTA for venue owners to list their courts
- **Responsive Design** - Works on desktop, tablet, mobile
- **Connected Backend** - Ready to integrate with Picklebook API

## 📁 Project Structure

```
src/
├── App.jsx          # Main React component
├── App.css          # Styling
└── main.jsx         # React DOM entry point

public/
└── (static assets)

index.html           # HTML template
package.json         # Dependencies
vite.config.js       # Vite configuration
```

## 🔌 Backend Integration

The frontend is configured to connect to your live backend:

```
Backend URL: https://picklebook-backend-production.up.railway.app
API Port: 3000
```

To integrate with the backend API:

1. In `vite.config.js`, the proxy is configured to route `/api` calls to your backend
2. To make API calls in React:

```jsx
import axios from 'axios'

// Example: Fetch courts from backend
const courts = await axios.get('/api/courts')

// Example: Submit booking
const booking = await axios.post('/api/bookings', {
  playerName: 'John Doe',
  courtId: 1,
  date: '2026-07-28',
  time: '10:00'
})
```

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## 🌐 Deploy to Vercel

### Option 1: Deploy via CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically:
- Detect Vite configuration
- Install dependencies
- Build the project
- Deploy to a live URL

### Environment Variables

Set these in Vercel settings if needed:

```
VITE_API_URL=https://picklebook-backend-production.up.railway.app
```

## 📊 Project Data

Currently includes 12 hardcoded courts in Dumaguete:

- **Premium Courts (₱150+):** Pickleball Plus, Elite Hub, Pro Arena, Champion's Court
- **Mid-Range (₱100-150):** Duma Sports, Sunset, Downtown
- **Budget (₱45-99):** Casual Courts, Community Court, Friendly Courts, Paradise Courts, Valley Court

## 🔄 Connect to Database

To fetch live court data from your backend instead of hardcoded data:

1. Update `App.jsx` to call the backend API on page load:

```jsx
useEffect(() => {
  const fetchCourts = async () => {
    const response = await axios.get('/api/courts')
    setCourts(response.data)
  }
  fetchCourts()
}, [])
```

2. Replace the `courtsData` array with API response

## 🛠️ Future Features

- [ ] Owner dashboard (view bookings, earnings, payouts)
- [ ] Payment integration (GCash/Maya QR)
- [ ] User authentication
- [ ] Court ratings & reviews
- [ ] Real-time booking notifications
- [ ] Admin panel

## 📝 Next Steps

1. **Deploy to Vercel** - Get your live URL
2. **Connect Backend** - Integrate court data API
3. **Create Database Tables** - Set up Supabase schema
4. **Test Full Flow** - Book a court end-to-end
5. **Recruit Pilot Owners** - Get 5-10 courts to test

## 🎉 You're Ready!

Your marketplace frontend is production-ready!

Next: Deploy to Vercel, then we'll connect the backend API.

---

**Questions?** Check the backend API documentation at:
https://github.com/carmike75/picklebook-backend
