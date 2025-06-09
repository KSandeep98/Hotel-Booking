import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ListingsPage from './pages/ListingsPage.jsx'
import ListingDetailPage from './pages/ListingDetailPage.jsx'
import BookingPage from './pages/BookingsPage.jsx'
// import ProfilePage from './pages/ProfilePage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
// import FavoritesPage from './pages/FavoritesPage.jsx'
// import AccountSettingsPage from './pages/AccountSettingsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/bookings" element={<BookingsPage />} />
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
          {/* <Route path="/account-settings" element={<AccountSettingsPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App