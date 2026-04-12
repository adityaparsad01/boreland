import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setFormError(error.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface p-8 sm:p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit}>
        {formError && <p className="bg-red-900/50 text-red-300 p-3 mb-4 text-center text-sm">{formError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-secondary hover:text-primary transition-colors">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      <p className="text-center text-dark-text mt-6 text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-secondary hover:text-primary font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
