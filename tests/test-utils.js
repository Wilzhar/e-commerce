// tests/test-utils.js
import React, { isValidElement } from "react";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const futureConfig = {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  },
}

function renderWithRouter(children, routes = []) {
  const options = isValidElement(children)
    ? { element: children, path: "/" }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], futureConfig, {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} future={{ v7_startTransition: true }} />);
}

function setupComponent(component) {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
}

// Mock useNavigate explicitly with jest.fn() and store it in a variable
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate, // Return the mocked function
  };
});

export { renderWithRouter, setupComponent, mockedNavigate };
