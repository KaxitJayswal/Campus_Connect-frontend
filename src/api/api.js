import axios from 'axios';

// Set the base URL to your production backend
const api = axios.create({
  baseURL: ' https://campus-connect-backend-xrtz.onrender.com'
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('userToken'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
