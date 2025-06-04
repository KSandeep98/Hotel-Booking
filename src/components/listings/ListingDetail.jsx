import { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaUser, FaHeart, FaRegHeart, FaShare } from 'react-icons/fa';
import BookingForm from './BookingForm.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ListingDetail = ({ listing }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = useAuth();

  const handleFavoriteClick = () => {
    if (!currentUser) {
      alert('Please log in to save favorites');
      return;
    }
    setIsFavorite(!isFavorite);
    // In a real app, this would call an API to save/remove favorite
  };

  return (
    <div className="pt-24 pb-16">
      {/* Photo Gallery Overlay */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">All Photos</h3>
              <button 
                onClick={() => setShowAllPhotos(false)}
                className="text-neutral-800 hover:text-accent-500"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.images.map((image, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img 
                    src={image} 
                    alt={`${listing.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Title and Action Buttons */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">{listing.title}</h1>
        
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-medium">{listing.rating}</span>
              <span className="mx-1">•</span>
              <span className="text-neutral-600">{listing.reviewCount} reviews</span>
            </div>
            
            <div className="flex items-center text-neutral-600">
              <FaMapMarkerAlt className="mr-1" />
              <span>{listing.location}</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <button 
              onClick={handleFavoriteClick}
              className="flex items-center space-x-1 text-sm border border-neutral-300 rounded-lg px-3 py-2 hover:border-accent-500 transition-colors"
            >
              {isFavorite ? (
                <>
                  <FaHeart className="text-accent-500" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <FaRegHeart />
                  <span>Save</span>
                </>
              )}
            </button>
            
            <button className="flex items-center space-x-1 text-sm border border-neutral-300 rounded-lg px-3 py-2 hover:border-primary-500 transition-colors">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        {/* Photo Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-tl-xl rounded-bl-xl overflow-hidden">
              <img 
                src={listing.images[0]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden md:block relative rounded-tr-xl overflow-hidden">
              <img 
                src={listing.images[1]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden md:block relative overflow-hidden">
              <img 
                src={listing.images[2]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden md:block relative overflow-hidden">
              <img 
                src={listing.images[3]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden md:block relative rounded-br-xl overflow-hidden">
              <img 
                src={listing.images[0]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              
              <button 
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-4 right-4 bg-white text-neutral-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100 transition"
              >
                Show all photos
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Host Info */}
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-neutral-200">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {listing.type} hosted by {listing.host.name}
                </h2>
                <p className="text-neutral-600">
                  {listing.bedrooms} bedrooms • {listing.beds} beds • {listing.bathrooms} bathrooms • Up to {listing.guests} guests
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                  <img 
                    src={listing.host.image} 
                    alt={listing.host.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {listing.host.superhost && (
                  <div className="bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full">
                    Superhost
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">About this place</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {listing.description}
              </p>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 text-primary-500 mr-4">
                      <FaUser />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;