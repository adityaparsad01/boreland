import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import UserForm from '../../components/admin/UserForm';

const AddUserPage = () => {
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (userData) => {
    addUser(userData);
    navigate('/admin/users');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-6">Add New User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddUserPage;
