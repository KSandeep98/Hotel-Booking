import { Box, Typography, TextField, Button, Container } from '@mui/material';

const NewsletterSection = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Get travel inspiration delivered to your inbox
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'black' }}>
          Sign up for our newsletter to receive exclusive offers, travel tips, and destination recommendations.
        </Typography>

        <Box sx={{ display: 'flex', maxWidth: 500, mx: 'auto' }}>
          <TextField
            type="email"
            placeholder="Your email address"
            fullWidth
            variant="outlined"
            sx={{
              bgcolor: 'white',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
               borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default NewsletterSection;
