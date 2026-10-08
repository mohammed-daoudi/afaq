import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured.');
}

// Create a custom axios instance.
const api = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ''),
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Automatically attach Bearer token from cookies to every request
api.interceptors.request.use((config) => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/);
    if (match) {
      config.headers.Authorization = `Bearer ${decodeURIComponent(match[1])}`;
    }
  }
  return config;
});

export default api;
