import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LandingPage from "./Pages/LandingPage";
import TLServices from "./Pages/ServicePage";
import LoadingSpinner from "./Components/LoadingSpinner";
import NotFoundPage from "./Components/NotFoundPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState({
    title: "Default Title",
    description: "Default Description",
    keywords: "default,keywords",
    // Add other SEO fields you expect from the API
  });
  const location = useLocation();

  // Fetch SEO data from backend API
  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        // Determine which SEO endpoint to call based on route
        let endpoint = '';
        if (location.pathname === '/') {
          endpoint = 'Landingpage';
        } else if (location.pathname === '/products&services') {
          endpoint = 'Servicespage'; // Adjust based on your backend endpoints
        }

        if (endpoint) {
          const response = await fetch(`http://localhost:8080/api/v1/web/seo/get/${endpoint}`);
          const data = await response.json();          
          setSeoData(data.seoData);
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
        // Fallback to default SEO values if API fails
        setSeoData({
          title: "Default Title",
          description: "Default Description",
          keywords: "default,keywords"
        });
      }
    };

    fetchSeoData();
  }, [location.pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    handleRouteChange();
  }, [location.pathname]);

  useEffect(() => {
    const initialLoadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(initialLoadTimeout);
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        {/* SEO Meta Tags */}
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <meta name="keywords" content={seoData.keywords} />
          <meta property="og:title" content={seoData.title} />
          <meta property="og:description" content={seoData.description} />
          {/* Add other meta tags as needed */}
        </Helmet>

        {loading && <LoadingSpinner />}
        {!loading && (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products&services" element={<TLServices />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </div>
    </HelmetProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}