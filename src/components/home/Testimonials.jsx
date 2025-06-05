import { useEffect, useState } from "react";
import { Avatar, Box, Container, Typography, Paper, Fade } from "@mui/material";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    text: "My family and I had an amazing experience using Bhaiyaji Hotels. The booking process was seamless, and the property exceeded our expectations. Will definitely use this platform for all our future vacations!",
  },
  {
    id: 2,
    name: "Priya Mehra",
    location: "Delhi, India",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    text: "I've used several booking platforms before, but none compare to Bhaiyaji Hotels. The attention to detail in property descriptions and the customer service is unmatched. Found the perfect apartment for my business trip.",
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kochi, India",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4,
    text: "The filter options on Bhaiyaji Hotels helped me find exactly what I was looking for - a beachfront property with specific amenities. The booking process was quick, and the host was fantastic. Highly recommend!",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad, India",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    text: "Absolutely loved our stay! The property was just as pictured, and the communication with both the host and Bhaiyaji Hotels support was excellent. We'll definitely be back for our next holiday.",
  },
];


const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <Box py={10} sx={{ backgroundColor: "#f0fdfa" }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What Our Guests Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Read testimonials from travelers who have experienced unforgettable stays through our platform.
          </Typography>
        </Box>

        <Fade in timeout={500} key={testimonial.id}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                maxWidth: 800,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar
                src={testimonial.image}
                alt={testimonial.name}
                sx={{ width: 96, height: 96 }}
              />
              <Box>
                <FaQuoteLeft style={{ color: "#00a699", fontSize: 30, marginBottom: 10 }} />
                <Box display="flex" mb={1}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      style={{
                        color: i < testimonial.rating ? "#facc15" : "#e0e0e0",
                        marginRight: 4,
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body1" color="text.secondary" fontStyle="italic" mb={2}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {testimonial.name}
                </Typography>
                <Typography color="text.secondary">{testimonial.location}</Typography>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Testimonials;
