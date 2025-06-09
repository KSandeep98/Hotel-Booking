import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listings } from '../../data/listings'; // Your listings data
import { FaStar } from 'react-icons/fa';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const R = 6371; // Radius of earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const NearbyHotels = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHotels, setNearbyHotels] = useState([]);
  const [status, setStatus] = useState('idle');
  const [locationName, setLocationName] = useState('');
  const theme = useTheme();

  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-900px
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // >=900px

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('denied');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus('granted');
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setLocationName(data?.display_name || 'Your Location');
        } catch {
          setLocationName('Your Location');
        }

        const filtered = listings.filter((hotel) => {
          const distance = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            hotel.latitude,
            hotel.longitude
          );
          return distance <= 5;
        });

        setNearbyHotels(filtered);
      },
      (error) => {
        console.error('Error getting location:', error);
        setStatus('denied');
        setNearbyHotels([]);
      }
    );
  }, []);

  if (status === 'idle' || status === 'loading') {
    return (
      <Box textAlign="center" py={10}>
        <Typography>Requesting location permission...</Typography>
      </Box>
    );
  }

  if (status === 'denied') {
    return (
      <Box textAlign="center" py={10}>
        <Typography color="error" mb={2}>
          Location permission denied or not supported. Unable to show nearby hotels.
        </Typography>
        <Typography>Please allow location access or try using a compatible browser.</Typography>
      </Box>
    );
  }

  if (status === 'granted' && !userLocation) {
    return (
      <Box textAlign="center" py={10}>
        <Typography>Fetching your location...</Typography>
      </Box>
    );
  }

  // Determine flexBasis and maxWidth for each card based on screen size
  const getFlexStyles = () => {
    if (isXs) {
      return { flexBasis: '100%', maxWidth: '100%' };
    }
    if (isSm) {
      return { flexBasis: 'calc(50% - 16px)', maxWidth: 'calc(50% - 16px)' };
    }
    if (isMdUp) {
      return { flexBasis: '25%', maxWidth: 400 };
    }
    return { flexBasis: '25%', maxWidth: 400 };
  };

  const flexStyles = getFlexStyles();

  return (
    <Box py={10} bgcolor="#f9fafb">
      <Box textAlign="center" mb={6} px={2}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Hotels Near You
        </Typography>
        <Typography color="text.secondary" maxWidth="600px" mx="auto">
          Showing hotels within 5 km of: <strong>{locationName || 'your current location'}</strong>
        </Typography>
      </Box>

      <Box
        px={2}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
      >
        {nearbyHotels.length === 0 && (
          <Typography>No hotels found within 5 km of your location.</Typography>
        )}

        {nearbyHotels.map((hotel) => (
          <Box
            key={hotel.id}
            sx={{
              flex: `1 1 ${flexStyles.flexBasis}`,
              maxWidth: flexStyles.maxWidth,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link to={`/listings/${hotel.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card
                sx={{
                  width: '100%',
                  height: 450,
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '100%', height: 257, position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={hotel.images[0]}
                    alt={hotel.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Chip
                    label={hotel.type}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    width: '100%',
                    height: 193, 
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h6" fontWeight={600} color="text.primary" noWrap>
                      {hotel.title}
                    </Typography>
                    <Box display="flex" alignItems="center" ml={2}>
                      <FaStar color="#facc15" size={16} />
                      <Typography ml={0.5} fontSize="0.9rem" fontWeight={500}>
                        {hotel.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" noWrap mb={2}>
                    {hotel.location}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      ₹{hotel.price}
                      <Typography component="span" fontWeight="regular" color="text.secondary">
                        {' '}
                        / night
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hotel.reviewCount} reviews
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NearbyHotels;
