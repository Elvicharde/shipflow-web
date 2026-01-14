import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/shipments/';

const client = axios.create({
  baseURL,
});

// Request interceptor: log request config
// client.interceptors.request.use(
//   (config) => {
//     console.log('[API Request]', config);
//     return config;
//   },
//   (error) => {
//     console.error('[API Request Error]', error);
//     return Promise.reject(error);
//   }
// );

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
