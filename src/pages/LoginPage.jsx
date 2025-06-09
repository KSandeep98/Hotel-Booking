import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
    document.title = 'Log In | StayScape';
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const result = await login(email, password);
      if (result.success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom color="text.primary">
            Welcome back
          </Typography>

          {error && (
            <Box mb={3} p={2} bgcolor="#ffe5e5" color="#d32f2f" borderRadius={2}>
              {error}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box mb={2}>
              <Typography variant="subtitle2" fontWeight={600} color="#000" mb={1}>
                Email
              </Typography>
              <TextField
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope color="#9e9e9e" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight={600} color="#000">
                  Password
                </Typography>
                <Link to="#" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#329542' }}>
                  Forgot password?
                </Link>
              </Box>
              <TextField
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="#9e9e9e" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#FB923C',
                color: 'white',
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: '#F04A00',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit"  /> : 'Sign in'}
            </Button>
          </Box>

          <Divider sx={{ my: 4, color: '#9e9e9e', fontSize: '0.875rem', fontWeight: 700 }}>or continue with</Divider>

          <Grid container spacing={2} mb={3} justifyContent="center" >
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<FaGoogle style={{ color: '#db4437',  }} />}
                sx={{
                  width: 200, 
                  py: 1.5,
                  textTransform: 'none',
                  justifyContent: 'center',
                  color:"black",
                  fontWeight:600,
                  borderColor:"black"
                }}
              >
                Google
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<FaFacebook style={{ color: '#3b5998' }} />}
                sx={{
                  width: 200,
                  py: 1.5,
                  textTransform: 'none',
                  justifyContent: 'center',
                  color:"black",
                  fontWeight:600,
                  borderColor:"black"
                }}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>


          <Typography align="center" fontSize="0.95rem" color="text.secondary" fontWeight={600}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#329542', fontWeight: 600 }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
