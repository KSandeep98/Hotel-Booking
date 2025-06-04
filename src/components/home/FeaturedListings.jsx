import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listings } from '../../data/listings';
import { FaStar } from 'react-icons/fa';

import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';

const FeaturedListings = () => {
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    const featured = listings.filter(listing => listing.isFeatured);
    setFeaturedListings(featured);
  }, []);

  return (
    <Box py={10} bgcolor="#f9fafb">
      <Box textAlign="center" mb={6} px={2}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Featured Places to Stay
        </Typography>
        <Typography color="text.secondary" maxWidth="600px" mx="auto">
          Discover handpicked, high-quality accommodations from around the world. Each property has been
          vetted for quality, comfort, and unforgettable experiences.
        </Typography>
      </Box>

      <Box
        px={2}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}  // gap between cards
      >
        {featuredListings.map((listing) => (
          <Box key={listing.id}>
            <Link to={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  width: 400,
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
                {/* Image Section */}
                <Box
                  sx={{
                    width: 400,
                    height: 288,
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={listing.images[0]}
                    alt={listing.title}
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
                    label={listing.type}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>

                {/* Description Section */}
                <Box
                  sx={{
                    width: 400,
                    height: 212,
                    p: 3,
                    boxSizing: 'border-box',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h6" fontWeight={600} color="text.primary" noWrap>
                      {listing.title}
                    </Typography>
                    <Box display="flex" alignItems="center" ml={2}>
                      <FaStar color="#facc15" size={16} />
                      <Typography ml={0.5} fontSize="0.9rem" fontWeight={500}>
                        {listing.rating}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" noWrap mb={2}>
                    {listing.location}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      Rs.{listing.price}
                      <Typography component="span" fontWeight="regular" color="text.secondary">
                        {' '} / night
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.reviewCount} reviews
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={6}>
        <Button
          component={Link}
          to="/listings"
          variant="outlined"
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 500,
            textTransform: 'none',
          }}
        >
          View All Properties
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedListings;
