// In src/services/auth.js
import api from './api';  // This is correct here

export const register = async (userData) => {
  return await api.post('/register', userData);
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  localStorage.setItem('token', response.data.access_token);
  // Store user email from token
  const tokenData = JSON.parse(atob(response.data.access_token.split('.')[1]));
  localStorage.setItem('user_email', tokenData.sub);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_email');
};