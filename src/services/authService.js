import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, { email, password });
    const token = response.headers["authorization"];
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
    }
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.errors || 'Invalid login credentials.');
  }
};

export const signUp = async (userData) => {
  try {
    // Replace with your backend endpoint for registration
    const response = await axios.post(`${API_URL}/auth`, userData);

    // Assuming the backend returns user data including a token on successful sign-up
    if (response?.data?.status === 'success') {
      localStorage.setItem('token', response.headers["authorization"]);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      return response.data;
    }
    throw new Error(response?.data?.message);
  } catch (err) {
    throw new Error(err?.response?.data?.message || 'Sign-up failed');
  }
};

export const logout = async () => {
  try {
    // Replace with your backend endpoint for logout
    const token = localStorage.getItem('token');
    if (!token) {
      removeLocalStorage();
      return;
    }

    const response = await axios.delete('http://localhost:3000/auth/sign_out', {
      headers: {
        'Authorization': token
      }
    });
    if (response?.data?.success) {
      removeLocalStorage();
      return;
    }
    throw new Error(response?.data?.message || 'Logout failed');
  } catch (err) {
    if (err.response?.status === 404) {
      removeLocalStorage();
      return;
    }
    throw new Error('Internal server error');
  }
};

const removeLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
