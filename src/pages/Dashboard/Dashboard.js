import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../services/authService";

import './Dashboard.scss';

const Dashboard = () => {
  const [error, setError] = useState('');
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Handle the logout process
  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate('/');
    }
    catch (err) {
      setError(err?.message || 'Logout failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      {error && <p className="error">{error}</p>}
      <h2>Welcome to the Dashboard</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
