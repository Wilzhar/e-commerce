import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import Home from './Home.js';
import '@testing-library/jest-dom';
import { setupComponent, mockedNavigate } from '../../../tests/test-utils.js';

describe('Home Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mock calls before each test
  });

  test('renders the Home page when the path is "/"', () => {
    setupComponent(<Home />);
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
  });

  test.skip('renders Dashboard when the user is logged in', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    setupComponent(<Home />);
    expect(screen.getByText(/Welcome to the Home page/i)).toBeInTheDocument();
    act(() => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));
      setupComponent(<Home />);
    });
    expect(mockedNavigate).toHaveBeenCalled()
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/dashboard'));
  });
});
