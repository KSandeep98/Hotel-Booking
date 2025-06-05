import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaWater,
  FaHotel,
  FaHome,
  FaSnowflake,
  FaLeaf
} from 'react-icons/fa';

import { Box, Typography, Grid, Paper } from '@mui/material';

const Categories = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { id: 'beach', name: 'Beach', icon: <FaUmbrellaBeach size={24} />, color: '#bfdbfe' },
    { id: 'mountain', name: 'Mountain', icon: <FaMountain size={24} />, color: '#bbf7d0' },
    { id: 'city', name: 'City', icon: <FaCity size={24} />, color: '#e9d5ff' },
    { id: 'lakefront', name: 'Lakefront', icon: <FaWater size={24} />, color: '#99f6e4' },
    { id: 'luxury', name: 'Luxury', icon: <FaHotel size={24} />, color: '#fef08a' },
    { id: 'cabin', name: 'Cabin', icon: <FaHome size={24} />, color: '#fed7aa' },
    { id: 'skiing', name: 'Skiing', icon: <FaSnowflake size={24} />, color: '#ddd6fe' },
    { id: 'countryside', name: 'Countryside', icon: <FaLeaf size={24} />, color: '#a7f3d0' },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/listings?category=${categoryId}`);
  };

  return (
    <Box py={10} bgcolor="white">
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Explore by category
        </Typography>
      </Box>

      <Grid container spacing={10} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={6} sm={3} md={1.5} key={category.id}>
            <Paper
              elevation={activeCategory === category.id ? 6 : 1}
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                p: 2,
                cursor: 'pointer',
                textAlign: 'center',
                borderRadius: 3,
                transform: activeCategory === category.id ? 'scale(1.05)' : 'scale(1)',
                border: activeCategory === category.id
                  ? '2px solid #3b82f6'
                  : '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#60a5fa',
                },
              }}
            >
              <Box
                sx={{
                  width: "70px",
                  height: "70px",
                  mx: 'auto',
                  mb: 1,
                  borderRadius: '50%',
                  backgroundColor: category.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {category.icon}
              </Box>
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
