import Hero from '../components/home/Hero.jsx';
import Categories from '../components/home/Categories.jsx';
import FeaturedListings from '../components/home/FeaturedListings.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import NewsletterSection from '../components/home/NewsletterSection';
import { useEffect } from 'react';
import HotelsNearMeMap from '../components/common/HotelsNearMeMap.jsx';

const HomePage = () => {

  useEffect(() => {
    document.title = 'Bhaiyaji Hotels';
  }, []);

  return (
    <div>
      <Hero />
      <Categories />
      <HotelsNearMeMap />
      <FeaturedListings />
      <Testimonials />
      <NewsletterSection />

    </div>
  );
};

export default HomePage;