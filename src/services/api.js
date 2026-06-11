import axios from 'axios';

const API = axios.create({
  // Fallback to local development port if env variable isn't configured
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic Request Interceptor: Injects user tokens automatically
API.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mh_nexus_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Unified Response interceptor: Strips Axios wrapper data layer directly
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Network communication failed';
    return Promise.reject(new Error(message));
  }
);

export default API;