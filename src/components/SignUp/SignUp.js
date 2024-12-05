import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signUp } from '../../services/authService';
import CustomForm from '../Form/CustomForm';
import { Link } from 'react-router-dom';

function SignUp() {
  const [error, setError] = useState('');
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
    { name: 'passwordConfirmation', type: 'password', placeholder: 'Confirm Password', required: true },
  ];

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (formData) => {
    setError('');
    const { email, password, passwordConfirmation } = formData;
    try {
      await signUp({ email, password, password_confirmation: passwordConfirmation });
      loginUser();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <div>
      <CustomForm
        title="Create an account"
        subtitle="Enter your details below"
        fields={fields}
        onSubmit={handleSubmit}
        errorMessage={error}
        buttonText="Create Account"
      >
        <p className='mt-8 text-center'>Already have an account? <Link to="/login" className='ml-4 border-b-2 hover:border-gray-300'>Login</Link></p>
      </CustomForm>
    </div>
  );
}

export default SignUp;
