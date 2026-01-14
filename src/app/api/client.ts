import axios from 'axios';
import { useAuthStore } from '../authStore';

const baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/shipments/';

const client = axios.create({
  baseURL,
});

// Attach token to all requests
client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: log response
client.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error);
    return Promise.reject(error);
  },
);

export default client;
