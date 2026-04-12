import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center text-secondary">Loading access...</div>;
  }

  // 1. Check if logged in
  if (!isAuthenticated) {
    // If trying to access admin, redirect to admin login, otherwise standard login
    const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // 2. Check Role (if a specific role is required)
  if (requiredRole && currentUser?.role !== requiredRole) {
    // User is logged in but doesn't have permission
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
