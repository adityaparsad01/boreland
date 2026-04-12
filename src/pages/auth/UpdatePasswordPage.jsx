import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { updatePassword, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      await updatePassword(password);
      navigate('/account/profile');
    } catch (err) {
      setError('Failed to update password. ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface p-8 sm:p-12 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Set New Password</h1>
      
      {error && <p className="bg-red-900/50 text-red-300 p-3 mb-4 text-center text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            New Password
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
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
