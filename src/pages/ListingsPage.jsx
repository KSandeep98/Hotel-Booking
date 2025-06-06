import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/listings/ListingCard.jsx';
import { listings } from '../data/listings.js';
import { FaFilter, FaSlidersH, FaStar, FaHeart } from 'react-icons/fa';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredListings, setFilteredListings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [propertyType, setPropertyType] = useState('');
  const [amenities, setAmenities] = useState([]);
  
  // Get search parameters
  const locationParam = searchParams.get('location');
  const categoryParam = searchParams.get('category');
  
  // Update page title
  useEffect(() => {
    document.title = locationParam 
      ? `Places to stay in ${locationParam} | Bhaiyaji Hotels` 
      : categoryParam
        ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} properties | Bhaiyaji Hotels`
        : 'Find your next stay | Bhaiyaji Hotels';
  }, [locationParam, categoryParam]);
  
  // Filter listings based on search parameters and filters
  useEffect(() => {
    let results = [...listings];
    
    // Filter by location
    if (locationParam) {
      results = results.filter(listing => 
        listing.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    // Filter by category (this is simplified, in a real app categories would be properties of listings)
    if (categoryParam) {
      // Mock category filtering based on keywords in description or amenities
      switch(categoryParam) {
        case 'beach':
          results = results.filter(listing => 
            listing.description.toLowerCase().includes('beach') || 
            listing.amenities.some(a => a.toLowerCase().includes('beach'))
          );
          break;
        case 'mountain':
          results = results.filter(listing => 
            listing.description.toLowerCase().includes('mountain') || 
            listing.amenities.some(a => a.toLowerCase().includes('mountain'))
          );
          break;
        // Add more categories as needed
      }
    }
    
    // Apply price filter
    results = results.filter(listing => 
      listing.price >= priceRange[0] && listing.price <= priceRange[1]
    );
    
    // Apply bedrooms filter
    if (bedrooms > 0) {
      results = results.filter(listing => listing.bedrooms >= bedrooms);
    }
    
    // Apply property type filter
    if (propertyType) {
      results = results.filter(listing => listing.type === propertyType);
    }
    
    // Apply amenities filter
    if (amenities.length > 0) {
      results = results.filter(listing => 
        amenities.every(amenity => 
          listing.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    setFilteredListings(results);
  }, [locationParam, categoryParam, priceRange, bedrooms, propertyType, amenities]);
  
  const handleAmenityToggle = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBedrooms(0);
    setPropertyType('');
    setAmenities([]);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {locationParam 
              ? `Places to stay in ${locationParam}` 
              : categoryParam
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} properties`
                : 'All properties'}
          </h1>
          <p className="text-neutral-600">
            {filteredListings.length} hotels found
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg px-4 py-2 text-neutral-800 hover:border-neutral-400 transition"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            
            <div className="flex space-x-2">
              
              <button className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg px-4 py-2 text-neutral-800 hover:border-neutral-400 transition">
                <FaStar className="text-yellow-400" />
                <span>Rating</span>
              </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-6 shadow-md slide-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      min="0"
                      className="w-24 border border-neutral-300 rounded px-3 py-2"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      min={priceRange[0]}
                      className="w-24 border border-neutral-300 rounded px-3 py-2"
                      placeholder="Max"
                    />
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <h3 className="font-semibold mb-3">Bedrooms</h3>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(num)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          bedrooms === num
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'border-neutral-300 text-neutral-700 hover:border-primary-300'
                        }`}
                      >
                        {num === 0 ? 'Any' : num}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Property Type */}
                <div>
                  <h3 className="font-semibold mb-3">Property Type</h3>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-3 py-2"
                  >
                    <option value="">Any type</option>
                    <option value="Entire house">House</option>
                    <option value="Entire apartment">Apartment</option>
                    <option value="Entire villa">Villa</option>
                    <option value="Entire cottage">Cottage</option>
                    <option value="Entire cabin">Cabin</option>
                  </select>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Wifi', 'Kitchen', 'Pool', 'Washer & dryer', 'Air conditioning', 'Free parking'].map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded text-primary-500 focus:ring-primary-500"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={resetFilters}
                  className="text-neutral-600 underline"
                >
                  Clear all filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}
          
          {/* Active Filters */}
          {(priceRange[0] > 0 || priceRange[1] < 1000 || bedrooms > 0 || propertyType || amenities.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {priceRange[0] > 0 || priceRange[1] < 1000 ? (
                <div className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>Rs.{priceRange[0]} - Rs.{priceRange[1]}</span>
                  <button 
                    onClick={() => setPriceRange([0, 1000])} 
                    className="ml-2 text-neutral-500 hover:text-neutral-700"
                  >
                    ×
                  </button>
                </div>
              ) : null}
              
              {bedrooms > 0 && (
                <div className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{bedrooms} bedroom{bedrooms > 1 ? 's' : ''}</span>
                  <button 
                    onClick={() => setBedrooms(0)} 
                    className="ml-2 text-neutral-500 hover:text-neutral-700"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {propertyType && (
                <div className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{propertyType}</span>
                  <button 
                    onClick={() => setPropertyType('')} 
                    className="ml-2 text-neutral-500 hover:text-neutral-700"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {amenities.map(amenity => (
                <div key={amenity} className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{amenity}</span>
                  <button 
                    onClick={() => handleAmenityToggle(amenity)} 
                    className="ml-2 text-neutral-500 hover:text-neutral-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <button 
                onClick={resetFilters}
                className="text-primary-500 hover:text-primary-600 underline text-sm px-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        
        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaHeart className="text-accent-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-800 mb-2">No listings found</h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={resetFilters}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;