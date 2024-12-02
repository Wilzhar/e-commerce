// tests/test-utils.js
import React, { isValidElement } from "react";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const futureConfig = {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  },
}

export function renderWithRouter(children, routes = []) {
  const options = isValidElement(children)
    ? { element: children, path: "/" }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], futureConfig, {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} future={{ v7_startTransition: true }} />);
}
