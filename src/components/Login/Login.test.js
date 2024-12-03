import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as authService from '../../services/authService';
import { setupComponent, mockedNavigate } from '../../../tests/test-utils.js';

import Login from './Login';
import Dashboard from '../Dashboard/Dashboard';

describe('Login Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mock calls before each test
  });

  const simulateLogin = async (email, password) => {
    await userEvent.type(screen.getByPlaceholderText(/Email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/Password/i), password);
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
  };

  test('successful login', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };

    // Mock login API response
    jest.spyOn(authService, 'login').mockResolvedValue(mockUser);

    // Render Login component
    setupComponent(<Login />);

    // Simulate user interaction
    await simulateLogin('test@example.com', 'password123');
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(localStorage.getItem).toHaveBeenCalledWith('user');

    // Assert navigation to dashboard
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/dashboard'));

    // Simulate localStorage behavior
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));

    // Render Dashboard component
    setupComponent(<Dashboard />);

    // Assert dashboard content
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  test('failed login', async () => {
    const errorMessage = 'Invalid login credentials. Please try again';

    // Mock login function to simulate a failed login
    jest.spyOn(authService, 'login').mockImplementation(() => {
      throw { message: errorMessage };
    });

    // Render Login component
    setupComponent(<Login />);

    // Simulate user interaction
    await simulateLogin('test@example.com', 'password123');

    // Assert error message
    expect(screen.getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument();
  });

  test('email with spaces', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };

    // Mock login API response
    jest.spyOn(authService, 'login').mockResolvedValue(mockUser);

    // Render Login component
    setupComponent(<Login />);

    // Simulate user interaction
    await simulateLogin(' test@example.com ', 'password123');

    // Assert navigation to dashboard
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/dashboard'));

    // Simulate localStorage behavior
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));

    // Render Dashboard component
    setupComponent(<Dashboard />);

    // Assert dashboard content
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
});
