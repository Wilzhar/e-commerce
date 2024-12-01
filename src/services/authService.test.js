import axios from 'axios';
import { login, signUp, logout } from './authService';

jest.mock('axios'); // Mock axios

describe('authService', () => {
  const API_URL = "http://localhost:3000";

  test('login should store token and user data', async () => {
    const mockResponse = {
      headers: { authorization: 'Bearer mock-token' },
      data: { data: { id: 1, name: 'John Doe' } },
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await login('test@example.com', 'password');

    // Check if localStorage.setItem was called correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Bearer mock-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data.data));

    expect(result).toEqual(mockResponse.data);
  });

  // Add similar tests for signUp and logout
});
