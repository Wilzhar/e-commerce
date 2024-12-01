import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import * as authService from '../../services/authService';

import Login from './Login';
import Dashboard from '../Dashboard/Dashboard';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Login Component', () => {
  test('successful login', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };

    // Mock login API response to resolve quickly
    authService.login = jest.fn().mockResolvedValue(mockUser);

    // Render the component
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user interaction
    await userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));


    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });

    // You can also check if loginUser was called after the API resolves
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');

    window.history.pushState({}, '', `/dashboard`);

    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');

    // Simulate a value in localStorage
    mockGetItem.mockReturnValue(JSON.stringify(mockUser));

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();

    // mockGetItem.mockRestore();
  });

  test('failed login', async () => {
    // Mocking the login function to simulate a failed login
    authService.login = jest.fn(() => {
      throw {
        response: {
          data: {
            errors: 'Invalid login credentials. Please try again'
          }
        }
      };
    });

    // Render the Login component within the necessary context (MemoryRouter, AuthProvider)
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user interaction (filling out the form and clicking login)
    await userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Check that the error message appears on the screen
    expect(screen.getByText(/Invalid login credentials. Please try again/i)).toBeInTheDocument();
  });
});
