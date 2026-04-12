import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { Button } from '../../components/ui/Button';

const ManageUsersPage = () => {
  const { users, deleteUser, loading, error } = useUsers();

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-xl">Loading users...</div>;
  }

  if (error) {
    return <div className="text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Link to="/admin/users/new">
          <Button>Add New User</Button>
        </Link>
      </div>

      <div className="bg-surface border border-gray-800 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-background text-left text-sm font-semibold uppercase tracking-wider text-secondary">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Date Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-4 font-medium text-primary">{user.name}</td>
                <td className="p-4 text-dark-text">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-primary text-background' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-dark-text">{user.dateJoined}</td>
                <td className="p-4 flex gap-2">
                  <Link to={`/admin/users/edit/${user.id}`}>
                    <Button variant="secondary" className="py-1 px-3 text-xs">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    className="py-1 px-3 text-xs bg-red-800/50 text-red-300 hover:bg-red-800"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;
