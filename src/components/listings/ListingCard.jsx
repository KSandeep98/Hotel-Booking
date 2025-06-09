import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { toggleFavorite } from '../../data/users.js';

const ListingCard = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && currentUser.favorites) {
      setIsFavorite(currentUser.favorites.includes(listing.id));
    }
  }, [currentUser, listing.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      alert('Please log in to save favorites');
      return;
    }
    
    const newFavorites = toggleFavorite(currentUser.id, listing.id);
    setIsFavorite(!isFavorite);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Link to={`/listings/${listing.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={listing.images[currentImageIndex]} 
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {listing.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                &lt;
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                &gt;
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {listing.images.map((_, index) => (
                  <span 
                    key={index} 
                    className={`block h-1.5 rounded-full transition-all ${
                      currentImageIndex === index 
                        ? 'w-4 bg-white' 
                        : 'w-1.5 bg-white bg-opacity-60'
                    }`}
                  ></span>
                ))}
              </div>
            </>
          )}
          
          {/* Type Badge */}
          <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-xs font-medium text-neutral-800">
            {listing.type}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center transition"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart className="text-accent-500" />
            ) : (
              <FaRegHeart className="text-neutral-600" />
            )}
          </button>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-neutral-900 line-clamp-1">
              {listing.title}
            </h3>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-neutral-800 font-medium">{listing.rating}</span>
            </div>
          </div>
          
          <p className="text-neutral-600 mb-3 text-sm">
            {listing.location}
          </p>
          
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
          
          <div className="flex justify-between items-center">
            <div className="text-neutral-900">
              <span className="font-bold text-lg">Rs.{listing.price}</span>
              <span className="text-neutral-600"> / night</span>
            </div>
            <div className="text-xs text-neutral-600">
              {listing.reviewCount} reviews
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;