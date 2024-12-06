// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  );
}

export default App;
