// src/components/SignUp.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after successful sign-up
import { useAuth } from '../../context/AuthContext'; // To access AuthContext for loginUser
import { signUp } from '../../services/authService'; // A service function to handle API call

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser, user } = useAuth(); // To update the global auth state after registration
  const navigate = useNavigate(); // To navigate after successful sign-up

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      await signUp({ email, password, confirm_password });

      loginUser(); // Update the global auth state after registration
      navigate('/dashboard');

      // Redirect the user to the dashboard or home page
    } catch (err) {
      // Handle errors (e.g., email already taken, invalid input, etc.)
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
