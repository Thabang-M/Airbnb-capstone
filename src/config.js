// 🏠 Airbnb Application - Configuration
// Centralized configuration for environment variables

const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://airbnb-capstone-production.up.railway.app',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Feature Flags
  ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === 'true',
  
  // External Services
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  
  // Image Configuration
  IMAGE_CDN_URL: process.env.REACT_APP_IMAGE_CDN_URL,
  
  // Analytics
  GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  const baseUrl = config.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`;
};

// Helper function to check if we're in production
export const isProduction = () => config.NODE_ENV === 'production';

// Helper function to check if debug mode is enabled
export const isDebugEnabled = () => config.ENABLE_DEBUG && !isProduction();

export default config; 