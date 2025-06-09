import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { addBooking } from '../../data/users.js';

const BookingForm = ({ listing }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Calculate total nights
  const nightCount = checkIn && checkOut
    ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    : 0;

  // Calculate base price
  const basePrice = listing.price * nightCount;

  // Calculate cleaning fee
  const cleaningFee = nightCount > 0 ? 60 : 0;

  // Calculate service fee
  const serviceFee = Math.round(basePrice * 0.12);

  // Calculate total price
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const handlePayment = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setIsCalculating(true);

    try {
      // Create booking object
      const booking = {
        id: Date.now().toString(),
        listingId: listing.id,
        listingTitle: listing.title,
        listingImage: listing.images[0],
        location: listing.location,
        checkIn: checkIn.toLocaleDateString('en-CA'),
        checkOut: checkOut.toLocaleDateString('en-CA'),

        guests,
        total: totalPrice,
        status: 'upcoming',
        bookedAt: new Date().toISOString()
      };

      // Add booking to user's bookings
      const result = addBooking(currentUser.id, booking);

      if (result) {
        navigate('/profile', { state: { bookingSuccess: true, booking } });
        window.location.reload();
      } else {
        alert('Failed to save booking');
      }
    } catch (error) {
      alert('An error occurred while processing your booking');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl font-bold text-neutral-900">Rs.{listing.price}</span>
          <span className="text-neutral-600"> night</span>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-medium">{listing.rating}</span>
          <span className="mx-1 text-neutral-400">•</span>
          <span className="text-neutral-600 text-sm underline">
            {listing.reviewCount} reviews
          </span>
        </div>
      </div>

      <div className="border border-neutral-300 rounded-lg overflow-hidden mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-3 border-b md:border-b-0 md:border-r border-neutral-300">
            <label className="block text-xs font-semibold mb-1">CHECK-IN</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              className="w-full bg-transparent border-none focus:outline-none text-neutral-800"
            />
          </div>

          <div className="p-3">
            <label className="block text-xs font-semibold mb-1">CHECKOUT</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Add date"
              className="w-full bg-transparent border-none focus:outline-none text-neutral-800"
            />
          </div>
        </div>

        <div className="border-t border-neutral-300 p-3">
          <label className="block text-xs font-semibold mb-1">GUESTS</label>
          <div className="flex justify-between items-center">
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full bg-transparent border-none focus:outline-none text-neutral-800"
            >
              {[...Array(listing.guests)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className={`w-full bg-accent-500 text-white py-3 rounded-lg font-medium mb-4 hover:bg-accent-600 transition ${isCalculating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        disabled={isCalculating}
      >
        {isCalculating ? 'Processing...' : 'Reserve'}
      </button>

      <p className="text-center text-sm text-neutral-600 mb-6">
        You won't be charged yet
      </p>

      {nightCount > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-600 underline">
              Rs.{listing.price} x {nightCount} nights
            </span>
            <span>Rs.{basePrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-600 underline">Cleaning fee</span>
            <span>Rs.{cleaningFee}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-600 underline">Service fee</span>
            <span>Rs.{serviceFee}</span>
          </div>

          <div className="border-t border-neutral-300 pt-3 mt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>Rs.{totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;