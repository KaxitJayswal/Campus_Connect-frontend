import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/api/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('userToken', JSON.stringify(response.data.token));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('userToken');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
