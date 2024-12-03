import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

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
    if (!validEmailFormat(userData.email)) throw new Error('Invalid email format')
    if (!validPassword(userData.password, userData.password_confirmation)) throw new Error('Password doesn\'t match')
    const response = await axios.post(`${API_URL}/auth`, userData);

    if (response?.data?.status === 'success') {
      localStorage.setItem('token', response.headers["authorization"]);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      return response.data;
    }
    throw new Error(response?.data?.message || 'Sign-up failed');
  } catch (err) {
    throw new Error(err?.response?.data?.errors?.full_messages || err?.message || 'Sign-up failed');
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      removeLocalStorage();
      return;
    }

    const response = await axios.delete(`${API_URL}/auth/sign_out`, {
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

const validEmailFormat = (email) => {
  let regex = new RegExp(EMAIL_REGEX, 'g')
  let result = regex.test(email)
  return result
}

const validPassword = (password, passwordConfirmation) => {
  return password === passwordConfirmation
}
