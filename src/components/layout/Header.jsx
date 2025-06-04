import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
  InputBase,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setAnchorEl(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled || isMenuOpen || location.pathname !== '/' ? 4 : 0}
        sx={{
          backgroundColor:
            isScrolled || isMenuOpen || location.pathname !== '/'
              ? 'white'
              : 'transparent',
          color:
            isScrolled || isMenuOpen || location.pathname !== '/'
              ? 'text.primary'
              : 'white',
          transition: 'all 0.3s ease',
          py: { xs: 1.5, md: isScrolled || isMenuOpen || location.pathname !== '/' ? 1 : 2 },
        }}
      >
        <Toolbar
          sx={{
            px: 2,
            maxWidth: 'calc(100% - 400px)',
            width: '100%',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              color:
                isScrolled || isMenuOpen || location.pathname !== '/'
                  ? "#F04A00"
                  : 'white',
            }}
          >
            BhaiyajiHotels
          </Typography>

          {/* Search Bar */}
          {isMdUp && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                px: 2,
                py: 1,
                borderRadius: '999px',
                boxShadow: 2,
                border: '1px solid #E5E7EB',
              }}
            >
              <InputBase
                placeholder="Search destinations"
                sx={{ width: '250px' }}
              />
              <IconButton
                sx={{
                  ml: 1,
                  bgcolor: '#F04A00',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          {/* Desktop Navigation */}
          {isMdUp ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button
                component={Link}
                to="/listings"
                sx={{
                  color:
                    isScrolled || location.pathname !== '/'
                      ? 'text.primary'
                      : 'white',
                  fontWeight: 600,
                }}
              >
                Explore
              </Button>
              {currentUser ? (
                <>
                  <Button
                    onClick={handleProfileMenu}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '999px',
                      border: '1px solid #ccc',
                      px: 2,
                      py: 0.5,
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': { boxShadow: 3 },
                    }}
                  >
                    <AccountCircle color="action" />
                    <Typography
                      sx={{ color: 'text.primary', fontWeight: 500 }}
                    >
                      {currentUser.name}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                  >
                    <MenuItem component={Link} to="/profile" onClick={handleProfileClose}>
                      Profile
                    </MenuItem>
                    <MenuItem component={Link} to="/profile/bookings" onClick={handleProfileClose}>
                      My Bookings
                    </MenuItem>
                    <MenuItem component={Link} to="/profile/favorites" onClick={handleProfileClose}>
                      Favorites
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color:
                        isScrolled || location.pathname !== '/'
                          ? 'text.primary'
                          : 'white',
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{ fontWeight: 600, textTransform: 'none', bgcolor:"#F04A00"}}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          ) : (
            // Mobile Menu Button
            <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <CloseIcon
                  sx={{
                    color:
                      isScrolled || location.pathname !== '/'
                        ? 'text.primary'
                        : 'white',
                  }}
                />
              ) : (
                <MenuIcon
                  sx={{
                    color:
                      isScrolled || location.pathname !== '/'
                        ? 'text.primary'
                        : 'white',
                  }}
                />
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{ sx: { p: 3, pt: 8 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <InputBase
              placeholder="Search destinations"
              fullWidth
              sx={{
                px: 2,
                py: 1,
                border: '1px solid #ccc',
                borderRadius: '999px',
              }}
            />
            <IconButton
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Button component={Link} to="/listings">Explore</Button>
          {currentUser ? (
            <>
              <Button component={Link} to="/profile">Profile</Button>
              <Button component={Link} to="/profile/bookings">My Bookings</Button>
              <Button component={Link} to="/profile/favorites">Favorites</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
