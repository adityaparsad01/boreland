import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import UserForm from '../../components/admin/UserForm';

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useUsers();

  const userToEdit = getUserById(parseInt(userId, 10));

  const handleSubmit = (updatedData) => {
    updateUser(parseInt(userId, 10), updatedData);
    navigate('/admin/users');
  };

  if (!userToEdit) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-dark-text mb-6">User Not Found</h1>
        <p>The user you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-6">Edit User</h1>
      <UserForm onSubmit={handleSubmit} initialData={userToEdit} />
    </div>
  );
};

export default EditUserPage;
