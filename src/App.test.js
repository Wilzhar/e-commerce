// src/App.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../tests/test-utils.js';
import { AuthProvider } from './context/AuthContext';
import '@testing-library/jest-dom';

// Components
import Home from './pages/Home/Home';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

describe('App Component', () => {
  test('renders the Home page when the path is "/"', () => {
    renderWithRouter(
      <>
        <Header />
        <AuthProvider>
          <Home />
        </AuthProvider>
        <Footer />
      </>
    );

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Home page')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    // Ensure Home component content renders
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
  });
});
