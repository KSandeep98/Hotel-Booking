import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { listings } from '../data/listings.js';
import { toggleFavorite } from '../data/users.js';
import { 
  FaHeart, 
  FaStar,
  FaArrowLeft
} from 'react-icons/fa';

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [favoriteListings, setFavoriteListings] = useState([]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Get favorite listings details
    const favorites = currentUser.favorites || [];
    const favListings = favorites.map(favId => 
      listings.find(listing => listing.id === favId)
    ).filter(Boolean);
    setFavoriteListings(favListings);
    
    document.title = 'My Favorites | Bhaiyaji Hotels';
  }, [currentUser, navigate]);

  const handleRemoveFavorite = (listingId) => {
    toggleFavorite(currentUser.id, listingId);
    // Update local state immediately
    setFavoriteListings(prev => prev.filter(listing => listing.id !== listingId));
    
    // Update the current user context
    const updatedUser = { ...currentUser };
    updatedUser.favorites = updatedUser.favorites.filter(id => id !== listingId);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
                <h1 className="text-2xl font-bold text-neutral-900">My Favorites</h1>
                <p className="text-neutral-600">
                  {favoriteListings.length} saved propert{favoriteListings.length !== 1 ? 'ies' : 'y'}
                </p>
              </div>
            </div>
          </div>
          
          {favoriteListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteListings.map(listing => (
                <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-xs font-medium text-neutral-800">
                      {listing.type}
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFavorite(listing.id)}
                      className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center transition group"
                      aria-label="Remove from favorites"
                    >
                      <FaHeart className="text-accent-500 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1 line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-neutral-800 font-medium">{listing.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 mb-4 text-sm">{listing.location}</p>
                    
                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {listing.amenities.length > 3 && (
                        <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md text-xs">
                          +{listing.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="font-bold text-lg text-neutral-900">Rs.{listing.price}</span>
                        <span className="text-neutral-600"> / night</span>
                      </div>
                      <div className="text-xs text-neutral-600">
                        {listing.reviewCount} reviews
                      </div>
                    </div>
                    
                    <Link
                      to={`/listings/${listing.id}`}
                      className="block w-full bg-primary-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-600 transition text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 text-3xl mx-auto mb-6">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">No saved properties yet</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Start exploring and click the heart icon on any property to save it for later. Build your dream travel wishlist!
              </p>
              <Link 
                to="/listings" 
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition"
              >
                Browse properties
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;