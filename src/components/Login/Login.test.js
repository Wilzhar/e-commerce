import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import Login from './Login';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import * as authService from '../../services/authService';


const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Login Component', () => {
  test('successful login', async () => {
    const mockUser = { data: { id: 1, email: 'test@example.com' } };

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
  });

  // test('failed login', async () => {
  //   // Mock API failure response
  //   nock('http://localhost')
  //     .post('/api/login', { email: 'test@example.com', password: 'wrongpassword' })
  //     .reply(401, { message: 'Invalid credentials' }, {
  //       'Access-Control-Allow-Origin': '*', // Add CORS headers if needed
  //     });

  //   <MemoryRouter>
  //     <AuthProvider>
  //       <Login />
  //     </AuthProvider>
  //   </MemoryRouter>

  //   // Simulate user interaction
  //   userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  //   userEvent.type(screen.getByPlaceholderText('Password'), 'wrongpassword');
  //   userEvent.click(screen.getByRole('button', { name: 'Login' }));

  //   // Assert error message is displayed
  //   const errorMessage = await screen.findByText(/login failed/i);
  //   expect(errorMessage).toBeInTheDocument();
  // });
});
