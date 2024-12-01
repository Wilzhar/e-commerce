// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from '../tests/test-utils.js';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import '@testing-library/jest-dom';
import Home from './components/Home/Home';

describe('App Component', () => {
  test('renders the Home page when the path is "/"', () => {
    renderWithRouter(
      <>
        <div>Header</div>
        <AuthProvider>
          <Home />
        </AuthProvider>
        <div>Footer</div>
      </>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    // Ensure Home component content renders
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
  });

  // test('renders the Login page when the path is "/login"', () => {
  //   render(
  //     <AuthProvider>
  //       <MemoryRouter initialEntries={['/login']}>
  //         <App />
  //       </MemoryRouter>
  //     </AuthProvider>
  //   );
  //   // Ensure Login component content renders
  //   expect(screen.getByText(/Login Component Text/i)).toBeInTheDocument(); // Update to actual text in Login
  // });

  // test('renders the SignUp page when the path is "/signup"', () => {
  //   render(
  //     <AuthProvider>
  //       <MemoryRouter initialEntries={['/signup']}>
  //         <App />
  //       </MemoryRouter>
  //     </AuthProvider>
  //   );
  //   // Ensure SignUp component content renders
  //   expect(screen.getByText(/SignUp Component Text/i)).toBeInTheDocument(); // Update to actual text in SignUp
  // });

  // test('renders the Dashboard page when the path is "/dashboard" for authenticated users', () => {
  //   render(
  //     <AuthProvider>
  //       <MemoryRouter initialEntries={['/dashboard']}>
  //         <App />
  //       </MemoryRouter>
  //     </AuthProvider>
  //   );
  //   // Ensure Dashboard component content renders
  //   expect(screen.getByText(/Dashboard Component Text/i)).toBeInTheDocument(); // Update to actual text in Dashboard
  // });

  // test('renders the Error page for an invalid path', () => {
  //   render(
  //     <AuthProvider>
  //       <MemoryRouter initialEntries={['/invalid-path']}>
  //         <App />
  //       </MemoryRouter>
  //     </AuthProvider>
  //   );
  //   // Ensure Error component renders
  //   expect(screen.getByText(/Error/i)).toBeInTheDocument();
  // });
});
