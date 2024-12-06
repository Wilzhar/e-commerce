import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupComponent, mockedNavigate } from '../../../tests/test-utils';
import Dashboard from './Dashboard';
import * as authService from '../../services/authService';

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mock calls before each test
  });

  test('renders home page when logged out', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));
    jest.spyOn(authService, 'logout').mockResolvedValue();

    setupComponent(<Dashboard />);
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

    // Test logout functionality
    const logoutButton = screen.getByText(/Log Out/i);
    expect(logoutButton).toBeInTheDocument();
    await act(() => logoutButton.click());

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'));
  });

  test('show error when server returns a 500 error', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));
    jest.spyOn(authService, 'logout').mockRejectedValue({ response: { status: 500 } });

    setupComponent(<Dashboard />);
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

    // Test logout functionality
    const logoutButton = screen.getByText(/Log Out/i);
    expect(logoutButton).toBeInTheDocument();
    await act(() => logoutButton.click());

    expect(screen.getByText(/Logout failed. Please try again./i)).toBeInTheDocument();
  });
});
