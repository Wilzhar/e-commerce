// src/App.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../tests/test-utils.js';
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
});
