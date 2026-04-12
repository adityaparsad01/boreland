import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const user = await login(email, password);
      if (user?.user_metadata?.role === 'Admin') {
        navigate('/admin');
      } else {
        setFormError('Access Denied: You do not have administrator privileges.');
      }
    } catch (error) {
      setFormError(error.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface border border-gray-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-primary font-serif text-2xl font-bold uppercase tracking-widest">Admin Portal</h2>
          <p className="text-secondary text-sm mt-2">Boreland Global Fashions</p>
        </div>

        <form onSubmit={handleSubmit}>
          {formError && <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 mb-4 text-sm text-center">{formError}</div>}
          
          <div className="mb-4">
            <label className="block text-secondary text-xs uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-gray-700 text-primary px-4 py-3 focus:border-primary outline-none transition-colors"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-secondary text-xs uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-gray-700 text-primary px-4 py-3 focus:border-primary outline-none transition-colors"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
