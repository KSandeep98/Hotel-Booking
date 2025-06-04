import Hero from '../components/home/Hero.jsx';

import FeaturedListings from '../components/home/FeaturedListings.jsx';

import NewsletterSection from '../components/home/NewsletterSection';
import { useEffect } from 'react';

const HomePage = () => {

  useEffect(() => {
    document.title = 'Bhaiyaji Hotels';
  }, []);

  return (
    <div>
      <Hero />

      <FeaturedListings />

      <NewsletterSection/>
    </div>
  );
};

export default HomePage;