import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

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
