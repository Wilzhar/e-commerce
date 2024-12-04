import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signUp } from '../../services/authService';
import { Link } from 'react-router-dom';

import './SignUp.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signUp({ email, password, password_confirmation: passwordConfirmation });
      loginUser();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="sign-up-container align-left justify-normal">
      <h2 className='text-4xl mb-4'>Create an account</h2>
      <p>Enter your details below</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={passwordConfirmation}
            placeholder='Confirm Password'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button className="base-button w-full" type="submit">Create Account</button>
      </form>

      <p className='mt-8 text-center'>Already have an account? <Link to="/login" className='ml-4 border-b-2 border-gray-200'>Login</Link></p>
    </div>
  );
}

export default SignUp;
