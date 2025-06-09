import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { 
  FaCalendarAlt, 
  FaPlus,
  FaArrowLeft
} from 'react-icons/fa';

const BookingsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    document.title = 'My Bookings | Bhaiyaji Hotels';
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              {message}
            </div>
          )}
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-white transition"
              >
                <FaArrowLeft className="text-neutral-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">My Bookings</h1>
                <p className="text-neutral-600">Manage your trips and reservations</p>
              </div>
            </div>
            <Link
              to="/listings"
              className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
            >
              <FaPlus className="text-sm" />
              <span>Book a new trip</span>
            </Link>
          </div>
          
          {currentUser.bookings && currentUser.bookings.length > 0 ? (
            <div className="space-y-8">
              {/* Upcoming Bookings */}
              {currentUser.bookings.filter(b => new Date(b.checkIn) >= new Date()).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-6">Upcoming Trips</h2>
                  <div className="space-y-6">
                    {currentUser.bookings
                      .filter(b => new Date(b.checkIn) >= new Date())
                      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))
                      .map(booking => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:flex-shrink-0">
                            <div className="h-48 w-full md:w-64 bg-cover bg-center" style={{ backgroundImage: `url(${booking.listingImage})` }}></div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                    Confirmed
                                  </span>
                                  <span className="text-sm text-neutral-500">
                                    Booking #{booking.id}
                                  </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-neutral-900 mb-1">{booking.listingTitle}</h3>
                                <p className="text-neutral-600 mb-4">{booking.location}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center text-sm text-neutral-600">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Check-in: {booking.checkIn}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-neutral-600">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Check-out: {booking.checkOut}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-neutral-600">
                                    {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                                  </span>
                                  <span className="font-bold text-lg text-neutral-900">
                                    RS.{booking.total} total
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row mt-4 md:mt-0 md:ml-6 space-y-2 sm:space-y-0 sm:space-x-2">
                                <Link
                                  to={`/listings/${booking.listingId}`}
                                  className="bg-white border border-primary-500 text-primary-500 px-4 py-2 rounded-lg text-sm hover:bg-primary-50 transition text-center"
                                >
                                  View Property
                                </Link>
                                
                                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-600 transition">
                                  Manage Trip
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Past Bookings */}
              {currentUser.bookings.filter(b => new Date(b.checkIn) < new Date()).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-6">Past Trips</h2>
                  <div className="space-y-6">
                    {currentUser.bookings
                      .filter(b => new Date(b.checkIn) < new Date())
                      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                      .map(booking => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:flex-shrink-0">
                            <div className="h-48 w-full md:w-64 bg-cover bg-center opacity-80 grayscale-[30%]" style={{ backgroundImage: `url(${booking.listingImage})` }}></div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="bg-neutral-100 text-neutral-600 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                    Completed
                                  </span>
                                  <span className="text-sm text-neutral-500">
                                    Booking #{booking.id}
                                  </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-neutral-700 mb-1">{booking.listingTitle}</h3>
                                <p className="text-neutral-600 mb-4">{booking.location}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center text-sm text-neutral-600">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Check-in: {booking.checkIn}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-neutral-600">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Check-out: {booking.checkOut}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-neutral-600">
                                    {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                                  </span>
                                  <span className="font-bold text-lg text-neutral-700">
                                    Rs.{booking.total} total
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row mt-4 md:mt-0 md:ml-6 space-y-2 sm:space-y-0 sm:space-x-2">
                                <Link
                                  to={`/listings/${booking.listingId}`}
                                  className="bg-white border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg text-sm hover:bg-neutral-50 transition text-center"
                                >
                                  View Property
                                </Link>
                                
                                <button className="bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-700 transition">
                                  Write Review
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 text-3xl mx-auto mb-6">
                <FaCalendarAlt />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">No trips booked...yet!</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Time to dust off your bags and start planning your next adventure. The world is waiting for you!
              </p>
              <Link 
                to="/listings" 
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition inline-flex items-center space-x-2"
              >
                <FaPlus />
                <span>Start searching</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;