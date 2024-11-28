import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  console.log("Login");
  const response = await axios.post(`${API_URL}/auth/sign_in`, { email, password });
  const token = response.headers.get("Authorization");
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(response?.data?.data));
  }
  return response.data;
};

export const signUp = async (userData) => {
  try {
    // Replace with your backend endpoint for registration
    const response = await axios.post(`${API_URL}/auth`, userData);

    // Assuming the backend returns user data including a token on successful sign-up
    if (response?.data?.status == 'success') {
      localStorage.setItem('token', response.headers.get('Authorization'));
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      return response.data;
    }
    throw new Error(response?.data?.message);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Sign-up failed');
  }
};

export const logout = async () => {
  try {
    // Replace with your backend endpoint for logout
    const response = await axios.delete(`${API_URL}/auth/sign_out`);
    if (response?.data?.status == 'success') {
      localStorage.removeItem('token');
      return response.data;
    }
    throw new Error(response?.data?.message || 'Logout failed');
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Logout failed');
  }
};
