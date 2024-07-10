import axios from 'axios';

export const register = async (username, password) => {
  return await axios.post('/api/users/register', { username, password });
};

export const login = async (username, password) => {
  const response = await axios.post('/api/users/login', { username, password });
  const token = response.data.token;
  localStorage.setItem('token', token);
  return response;
};

export const getAuthHeader = () => {
  return { headers: { Authorization: localStorage.getItem('token') } };
};
