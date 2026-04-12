import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetPassword, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      await resetPassword(email);
      setMessage('Password reset link has been sent to your email.');
    } catch (err) {
      setError('Failed to send reset email. ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface p-8 sm:p-12 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
      <p className="text-dark-text mb-6 text-center text-sm">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {message && <p className="bg-green-900/50 text-green-300 p-3 mb-4 text-center text-sm">{message}</p>}
      {error && <p className="bg-red-900/50 text-red-300 p-3 mb-4 text-center text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <Link to="/login" className="text-secondary hover:text-primary text-sm font-medium">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
