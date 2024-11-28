import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const redirectLogin = () => {
    navigate('/login');
  };

  const redirectSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      {!user && <>
        <p> Login</p>
        <button onClick={redirectLogin}>Login</button>
        <p> Sign Up</p>
        <button onClick={redirectSignUp}>Sign Up</button>
      </>}
    </div>
  );
};

export default Home;
