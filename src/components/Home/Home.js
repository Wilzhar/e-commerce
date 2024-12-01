import { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      {!user && <>
        <Link to="/login">Login</Link>;
        <Link to="/signup">Sign Up</Link>;
      </>}
    </div>
  );
};

export default Home;
