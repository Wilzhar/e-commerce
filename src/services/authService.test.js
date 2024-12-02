import axios from 'axios';
import { login, signUp, logout } from './authService';
import MockAdapter from 'axios-mock-adapter';

const API_URL = process.env.REACT_APP_API_URL;

describe('authService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Initialize the mock adapter
  });

  afterEach(() => {
    mock.restore(); // Reset after each test
  });

  describe('login', () => {
    test('should store token and user data', async () => {
      const mockResponse = { data: { id: 1, email: 'test@example.com' } };
      const mockHeaders = { authorization: 'Bearer mock-token' };

      // Mock the POST request
      mock
        .onPost(`${API_URL}/auth/sign_in`, { email: 'test@example.com', password: 'password' })
        .reply(200, mockResponse, mockHeaders);

      const result = await login('test@example.com', 'password');

      // Check if localStorage.setItem was called correctly
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Bearer mock-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data));

      expect(result).toEqual(mockResponse);
    });

    test('should throw an error if the API call fails', async () => {
      const mockError = { errors: ['Invalid login credentials. Please try again.'] };

      mock
        .onPost(`${API_URL}/auth/sign_in`, { email: 'test@example.com', password: 'password' })
        .reply(401, mockError);

      try {
        await login('test@example.com', 'password');
      } catch (error) {
        expect(error.response.status).toBe(401); // Ensure 401 status
        expect(error.response.data.errors).toEqual(["Invalid login credentials. Please try again."]);
      }

    });
  });

  // Add similar tests for signUp and logout
});
