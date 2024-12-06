import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// Components
import CustomForm from '../Form/CustomForm';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser, user } = useAuth();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
  ];

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    try {
      await login(email, password);
      loginUser();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <CustomForm
        title="Log in to Exclusive"
        subtitle="Enter your details below"
        fields={fields}
        onSubmit={handleSubmit}
        errorMessage={error}
        buttonText="Log in"
      >
        <div className="flex flex-col items-center w-full p-0">
          <Link to="/forgot-password" className='mt-2 text-sm text-red-500 hover:text-red-700'>Forgot password?</Link>
          <p className="mt-6">Don't have an account? <Link to="/signup" className='ml-4 border-b-2 border-gray-200 hover:border-gray-300'>Sign up</Link></p>
        </div>
      </CustomForm>
    </div >
  );
}

export default Login;
