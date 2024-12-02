// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { AuthProvider } from '../../context/AuthContext';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  test('renders the Home page when the path is "/"', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter >
    );
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
  });
});
