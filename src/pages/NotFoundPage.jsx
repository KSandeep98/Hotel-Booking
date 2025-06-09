import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFoundPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Page Not Found | StayScape';
  }, []);

  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="max-w-md text-center px-4">
        <h1 className="text-6xl font-bold text-primary-500 mb-6">404</h1>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Page not found</h2>
        <p className="text-neutral-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="bg-accent-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-600 transition inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;