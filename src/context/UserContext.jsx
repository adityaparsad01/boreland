import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    const newUser = await apiService.createUser(userData);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = async (userId, updatedData) => {
    const updatedUser = await apiService.updateUser(userId, updatedData);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? updatedUser : user))
    );
  };

  const deleteUser = async (userId) => {
    await apiService.deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const value = {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
