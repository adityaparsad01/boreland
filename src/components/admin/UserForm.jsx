import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'Customer',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setUser({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'Customer',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 border border-gray-800">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="role" className="block text-sm font-medium mb-2 uppercase tracking-wider text-secondary">Role</label>
        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="flex gap-4">
        <Button type="submit">
          Save User
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/admin/users')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
