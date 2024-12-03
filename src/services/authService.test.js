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
        expect(error.message).toEqual("Invalid login credentials. Please try again.");
      }

    });
  });

  describe('signUp', () => {
    test('should store token and user data', async () => {
      const mockResponse = { status: 'success', data: { id: 1, email: 'test@example.com' } };
      const mockHeaders = { authorization: 'Bearer mock-token' };

      // Mock the POST request
      mock
        .onPost(`${API_URL}/auth`, { email: 'test@example.com', password: 'password', password_confirmation: 'password' })
        .reply(200, mockResponse, mockHeaders);

      const result = await signUp({ email: 'test@example.com', password: 'password', password_confirmation: 'password' });

      // Check if localStorage.setItem was called correctly
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Bearer mock-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data));

      expect(result).toEqual(mockResponse);
    });

    test('should throw an error if the passwords do not match', async () => {
      try {
        await signUp({ email: 'test@example.com', password: 'password', password_confirmation: 'passwordd' });
      } catch (error) {
        expect(error.message).toEqual("Password doesn\'t match");
      }
    });

    test('should throw an error if the email is invalid', async () => {
      try {
        await signUp({ email: 'test@example', password: 'password', password_confirmation: 'password' });
      } catch (error) {
        expect(error.message).toEqual("Invalid email format");
      }
    });

    test('should throw an error if the API call fails', async () => {
      mock
        .onPost(`${API_URL}/auth`, { email: 'test@example.com', password: 'password', password_confirmation: 'password' })
        .reply(500, {});

      try {
        await signUp({ email: 'test@example.com', password: 'password', password_confirmation: 'password' });
      } catch (error) {
        expect(error.message).toEqual("Request failed with status code 500");
      }
    });
  });

  describe('logout', () => {
    test('should remove localStorage items', async () => {
      const mockResponse = { success: true };

      // Mock the DELETE request
      mock
        .onDelete(`${API_URL}/auth/sign_out`)
        .reply(200, mockResponse);

      await logout();

      // Check if localStorage.removeItem was called correctly
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });

    test('should throw an error if the API call fails', async () => {

      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('Bearer mock-token');

      mock
        .onDelete(`${API_URL}/auth/sign_out`)
        .reply((config) => {
          // Verify headers
          expect(config.headers.Authorization).toBe('Bearer mock-token');

          // Return mock response
          return [500, {}];
        });

      try {
        await logout();
      } catch (error) {
        expect(error.message).toEqual("Internal server error");
      }

      expect(localStorage.removeItem).not.toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).not.toHaveBeenCalledWith('user');
    });

    test('should remove localStorage items if the API call returns a 404 error', async () => {
      const mockError = { errors: ['Invalid login credentials. Please try again.'] };
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('Bearer mock-token');

      // Mock the DELETE request
      mock
        .onDelete(`${API_URL}/auth/sign_out`)
        .reply((config) => {
          // Verify headers
          expect(config.headers.Authorization).toBe('Bearer mock-token');

          // Return mock response
          return [404, mockError];
        });

      await logout();

      // Check if localStorage.removeItem was called correctly
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });
});
