import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from '@mui/material';

// Reusable custom input for DatePicker
const DatePickerInput = forwardRef(({ value, onClick, placeholder, icon }, ref) => (
  <TextField
    fullWidth
    variant="standard"
    value={value}
    onClick={onClick}
    placeholder={placeholder}
    inputRef={ref}
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start" sx={{ color: '#FB923C', mr: 1 }}>
          {icon}
        </InputAdornment>
      ),
      sx: {
        cursor: 'pointer',
        color: '#4B5563',
      },
    }}
  />
));

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', checkIn.toISOString().split('T')[0]);
    if (checkOut) params.append('checkOut', checkOut.toISOString().split('T')[0]);
    if (guests) params.append('guests', guests);

    navigate({ pathname: '/listings', search: params.toString() });
  };

  const inputBoxStyle = {
    flex: 1,
    minWidth: '160px',
    px: 1,
    py: 0.5,
    borderRadius: 2,
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        transition: 'all 0.3s',
        maxWidth: 1000,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Location */}
        <Box sx={inputBoxStyle}>
          <Typography variant="body1" fontWeight={500} color="#1F2937">
            Location
          </Typography>
          <TextField
            variant="standard"
            fullWidth
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start" sx={{ color: '#329542', mr: 1 }}>
                  <FaMapMarkerAlt />
                </InputAdornment>
              ),
              sx: { color: '#4B5563' },
            }}
          />
        </Box>

        {/* Check-in */}
        <Box sx={inputBoxStyle}>
          <Typography variant="body1" fontWeight={500} color="#1F2937">
            Check in
          </Typography>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Add dates"
            customInput={<DatePickerInput icon={<FaCalendarAlt style={{ color: '#329542' }} />} />}

          />
        </Box>

        {/* Check-out */}
        <Box sx={inputBoxStyle}>
          <Typography variant="body1" fontWeight={500} color="#1F2937">
            Check out
          </Typography>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="Add dates"
            customInput={<DatePickerInput icon={<FaCalendarAlt style={{ color: '#329542' }} />} />}

          />
        </Box>

        {/* Guests */}
        <Box sx={{ ...inputBoxStyle, bgcolor: '#F3F4F6' }}>
          <Typography variant="body1" fontWeight={500} color="#1F2937">
            Guests
          </Typography>
          <TextField
            variant="standard"
            type="number"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                // <InputAdornment position="start" sx={{ color: '#FB923C', mr: 1 }}>
                //   <FaUserFriends />
                // </InputAdornment>
                <InputAdornment position="start" sx={{ color: '#329542', mr: 1 }}>
                  <FaUserFriends />
                </InputAdornment>

              ),
              sx: { color: '#4B5563', width: '100px' },
            }}
          />
        </Box>

        {/* Search Button */}
        <Button
          type="submit"
          variant="contained"
          startIcon={<FaSearch />}
          sx={{
            mt: { xs: 2, md: 0 },
            ml: { md: 2 },
            minWidth: 120,
            px: 3,
            py: 1.5,
            bgcolor: '#FB923C',
            color: '#fff',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#F97316',
            },
          }}
        >

          Search
        </Button>
      </Box>
    </Box >
  );
};

export default SearchBar;
