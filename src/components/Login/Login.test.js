import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import * as authService from '../../services/authService';

import Login from './Login';
import Dashboard from '../Dashboard/Dashboard';

// Mock useNavigate explicitly with jest.fn() and store it in a variable
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate, // Return the mocked function
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mock calls before each test
  });

  const setupComponent = (component) =>
    render(
      <MemoryRouter>
        <AuthProvider>{component}</AuthProvider>
      </MemoryRouter>
    );

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
      throw { response: { data: { errors: errorMessage } } };
    });

    // Render Login component
    setupComponent(<Login />);

    // Simulate user interaction
    await simulateLogin('test@example.com', 'password123');

    // Assert error message
    expect(screen.getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument();
  });
});
