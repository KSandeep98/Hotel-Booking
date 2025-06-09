// MUI version of RegisterPage with unified validation

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  FormHelperText,
} from '@mui/material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const { register, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
    document.title = 'Create Account | StayScape';
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputValue = name === 'email' ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
  };

  const passwordValidations = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true, passwordConfirm: true });

    if (formData.password !== formData.passwordConfirm) {
      return setError('Passwords do not match');
    }

    if (!isPasswordValid) {
      return setError('Password does not meet the required criteria');
    }

    if (!validateEmail(formData.email)) {
      return setError('Invalid email format');
    }

    try {
      setLoading(true);
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to create an account');
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
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Create your account
          </Typography>

          {error && (
            <Box mb={3} p={2} bgcolor="#ffe5e5" color="#d32f2f" borderRadius={2}>
              {error}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              required
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser color="#9e9e9e" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={touched.email && !validateEmail(formData.email)}
              helperText={
                touched.email && !validateEmail(formData.email)
                  ? 'Enter a valid email address'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope color="#9e9e9e" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={touched.password && !isPasswordValid}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock color="#9e9e9e" />
                  </InputAdornment>
                ),
              }}
            />
            {touched.password && !isPasswordValid && (
              <Box ml={1}>
                {!passwordValidations.length && (
                  <FormHelperText error>Password must be at least 8 characters</FormHelperText>
                )}
                {!passwordValidations.upper && (
                  <FormHelperText error>Include at least one uppercase letter</FormHelperText>
                )}
                {!passwordValidations.lower && (
                  <FormHelperText error>Include at least one lowercase letter</FormHelperText>
                )}
                {!passwordValidations.digit && (
                  <FormHelperText error>Include at least one number</FormHelperText>
                )}
                {!passwordValidations.special && (
                  <FormHelperText error>
                    Include at least one special character (!@#$%^&*)
                  </FormHelperText>
                )}
              </Box>
            )}

            <TextField
              margin="normal"
              fullWidth
              required
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              error={
                touched.passwordConfirm && formData.passwordConfirm !== formData.password
              }
              helperText={
                touched.passwordConfirm && formData.passwordConfirm !== formData.password
                  ? 'Passwords do not match'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock color="#9e9e9e" />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox color="success" />}
                label={
                  <Typography fontSize={14}>
                    I agree to the{' '}
                    <Link to="#" style={{ color: '#329542', fontWeight: 600 }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="#" style={{ color: '#329542', fontWeight: 600 }}>
                      Privacy Policy.
                    </Link>
                  </Typography>
                }
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
            </Button>
          </Box>

          <Divider sx={{ my: 4, color: '#9e9e9e', fontSize: '0.875rem', fontWeight: 700 }}>
            or sign up with
          </Divider>

          <Grid container spacing={2} justifyContent="center" mb={3}>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<FaGoogle style={{ color: '#db4437' }} />}
                sx={{
                  width: 200,
                  py: 1.5,
                  textTransform: 'none',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: 'black',
                  borderColor: 'black',
                  '&:hover': {
                    bgcolor: '#fef3e7',
                    borderColor: '#FB923C',
                    color: '#F04A00',
                  },
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
                  fontWeight: 600,
                  color: 'black',
                  borderColor: 'black',
                  '&:hover': {
                    bgcolor: '#fef3e7',
                    borderColor: '#FB923C',
                    color: '#F04A00',
                  },
                }}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>

          <Typography align="center" fontSize="0.95rem" color="text.secondary" fontWeight={600}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#329542', fontWeight: 600 }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
