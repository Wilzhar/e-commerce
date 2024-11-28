// src/components/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // To access AuthContext
import { useNavigate } from 'react-router-dom'; // To navigate

import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logoutUser } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate(); // To navigate to login after logout

  // Handle the logout process
  const handleLogout = () => {
    logoutUser(); // Update the context state
    navigate('/'); // Redirect the user to the login page
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
