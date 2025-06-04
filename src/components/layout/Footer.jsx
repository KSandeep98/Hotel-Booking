import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Divider } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Color variables to match Tailwind equivalents
  const bgNeutral800 = '#27272A';
  const textNeutral400 = '#A1A1AA';
  const textWhite = '#FFFFFF';
  const orange400 = '#FB923C'; // Tailwind's orange-400 approx

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: bgNeutral800,
        color: textWhite,
        pt: 8,
        pb: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 'calc(100% - 400px)',
          mx: 'auto',
          px: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 4,
        }}
      >
        {/* Company Info */}
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            sx={{ color: orange400 }}
          >
            BhaiyajiHotels
          </Typography>
          <Typography color={textNeutral400} mb={3}>
            Finding your perfect stay, anywhere in the world.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}>
              <FaFacebook size={20} />
            </Link>
            <Link href="#" sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}>
              <FaTwitter size={20} />
            </Link>
            <Link href="#" sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}>
              <FaInstagram size={20} />
            </Link>
            <Link href="#" sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}>
              <FaLinkedin size={20} />
            </Link>
          </Box>
        </Box>

        {/* Support */}
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Support
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              component={RouterLink}
              to="/help"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Help Center
            </Link>
            <Link
              component={RouterLink}
              to="/safety"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Safety Information
            </Link>
            <Link
              component={RouterLink}
              to="/cancellation"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Cancellation Options
            </Link>
            <Link
              component={RouterLink}
              to="/covid"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              COVID-19 Response
            </Link>
          </Box>
        </Box>

        {/* Community */}
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Community
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              component={RouterLink}
              to="/community"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Community Forum
            </Link>
            <Link
              component={RouterLink}
              to="/host"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Become a Host
            </Link>
            <Link
              component={RouterLink}
              to="/referrals"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Referral Program
            </Link>
            <Link
              component={RouterLink}
              to="/resources"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Resource Center
            </Link>
          </Box>
        </Box>

        {/* Legal */}
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Legal
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              component={RouterLink}
              to="/privacy"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/sitemap"
              underline="none"
              sx={{ color: textNeutral400, '&:hover': { color: textWhite } }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Divider
        sx={{ borderColor: '#3F3F46', my: 5 /* matches border-neutral-700 */ }}
      />
      <Typography
        textAlign="center"
        color={textNeutral400}
        variant="body2"
        mb={2}
      >
        © {currentYear} Bhaiyaji Hotels Inc. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
