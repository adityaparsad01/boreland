import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await register(name, email, password);
      navigate('/account/profile');
    } catch (error) {
      setFormError(error.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface p-8 sm:p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSubmit}>
        {formError && <p className="bg-red-900/50 text-red-300 p-3 mb-4 text-center text-sm">{formError}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
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
        <div className="mb-6">
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <p className="text-center text-dark-text mt-6 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-secondary hover:text-primary font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
