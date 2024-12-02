import React from 'react';
import { screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import { setupComponent } from '../../../tests/test-utils.js';

describe('Home Component', () => {
  test('renders the Home page when the path is "/"', () => {
    setupComponent(<Home />);
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
  });
});
