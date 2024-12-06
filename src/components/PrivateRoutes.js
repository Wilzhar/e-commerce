
// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PrivateRoute component for v6
const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
