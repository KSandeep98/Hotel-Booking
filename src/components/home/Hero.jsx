import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import SearchBar from '../common/SearchBar.jsx'; // Use your existing component

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          zIndex: 0,
        }}
      >
        {/* Overlay */}
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />
      </Box>

      {/* Content */}
      <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
            lineHeight: 1.3,
          }}
        >
          Find your perfect stay, anywhere
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'white',
            maxWidth: '800px',
            margin: '0 auto',
            mb: 4,
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Discover unique places to stay around the world
        </Typography>

        {/* Search Section */}
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <SearchBar />
        </Box>

        {/* Call to Action */}
        <Box sx={{ mt: 6 }}>
          <Button
            component={Link}
            to="/listings"
            variant="contained"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Explore Popular Destinations
          </Button>
        </Box>
      </Container>

      {/* Wave Divider */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          lineHeight: 0,
          zIndex: 1,
        }}
      >
        <svg
          className="wave"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 70 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,
            70.36-5.37,136.33-33.31,206.8-37.5C438.64,
            32.43,512.34,53.67,583,72.05c69.27,18,
            138.3,24.88,209.4,13.08,36.15-6,
            69.85-17.84,104.45-29.34C989.49,
            25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="#ffffff"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,
            47.69,72.05,99.41,111.27,165,111,
            224.58,91.58c31.15-10.15,60.09-26.07,
            89.67-39.8,40.92-19,84.73-46,
            130.83-49.67,36.26-2.85,70.9,
            9.42,98.6,31.56,31.77,25.39,
            62.32,62,103.63,73,40.44,10.79,
            81.35-6.69,119.13-24.28s75.16-39,
            116.92-43.05c59.73-5.85,113.28,
            22.88,168.9,38.84,30.2,8.66,
            59,6.17,87.09-7.5,22.43-10.89,
            48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="#ffffff"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,
            475.83,42.57c43-7.64,84.23-20.12,
            127.61-26.46,59-8.63,112.48,
            12.24,165.56,35.4C827.93,
            77.22,886,95.24,951.2,
            90c86.53-7,172.46-45.71,
            248.8-84.81V0Z"
            fill="#ffffff"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default Hero;
