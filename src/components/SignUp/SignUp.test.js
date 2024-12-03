import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setupComponent, mockedNavigate } from '../../../tests/test-utils.js';
import * as authService from '../../services/authService';
import SignUp from './SignUp.js';
import Dashboard from '../Dashboard/Dashboard.js';

describe('Signup Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mock calls before each test
  });

  const simulateSignUp = async (email, password, passwordConfirmation) => {
    await userEvent.type(screen.getByPlaceholderText(/Email/i), email);
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    await userEvent.type(screen.getByPlaceholderText(/Confirm Password/i), passwordConfirmation);
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  };

  test('successful signup', async () => {    // Mock login API response
    const mockUser = { id: 1, email: 'test@example.com' };
    jest.spyOn(authService, 'signUp').mockResolvedValue(mockUser);

    // Render Login component
    setupComponent(<SignUp />);

    // Simulate user interaction
    await simulateSignUp('test@example.com', 'password123', 'password123');

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

  test('invalid email', async () => {
    const errorMessage = 'Invalid email format';
    jest.spyOn(authService, 'signUp').mockImplementation(() => {
      throw { message: errorMessage };
    });
    // Render Login component
    setupComponent(<SignUp />);

    // Simulate user interaction
    await simulateSignUp('invalid', 'password123', 'password123');

    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
  });

  test('passwords do not match', async () => {
    const errorMessage = 'Password doesn\'t match';
    jest.spyOn(authService, 'signUp').mockImplementation(() => {
      throw { message: errorMessage };
    });
    // Render Login component
    setupComponent(<SignUp />);

    // Simulate user interaction
    await simulateSignUp('test@example.com', 'invalid', 'password123');

    expect(screen.getByText(/Password doesn\'t match/i)).toBeInTheDocument();
  });
});
