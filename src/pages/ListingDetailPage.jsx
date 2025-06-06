import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListingDetail from '../components/listings/ListingDetail.jsx';
import { listings } from '../data/listings.js';
import { FaArrowLeft } from 'react-icons/fa';
import {
  Box,
  IconButton,
  Skeleton,
  Grid,
  Paper,
} from '@mui/material';

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = () => {
      setLoading(true);
      const foundListing = listings.find(l => l.id === parseInt(id));
      if (foundListing) {
        setListing(foundListing);
        document.title = `${foundListing.title} | Bhaiyaji Hotels`;
      } else {
        navigate('/not-found');
      }
      setLoading(false);
    };
    fetchListing();
  }, [id, navigate]);

  return (
    <Box sx={{ pt: 4, px: { xs: 2, md: 4 }, }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: 'fixed',
          top: 96,
          left: 16,
          zIndex: 1000,
          backgroundColor: '#fff',
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
            backgroundColor: '#f9f9f9',
          },
        }}
        aria-label="Go back"
      >
        <FaArrowLeft />
      </IconButton>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ mt: 8 }}>
          <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="20%" height={24} sx={{ mb: 6 }} />
          <Skeleton variant="rectangular" height={400} sx={{ mb: 6, borderRadius: 2 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Skeleton variant="text" width="70%" height={30} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="50%" height={20} sx={{ mb: 4 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mb: 4, borderRadius: 2 }} />
              <Skeleton variant="text" width="25%" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Box>
      ) : listing ? (
        <ListingDetail listing={listing} />
      ) : null}
    </Box>
  );
};

export default ListingDetailPage;
