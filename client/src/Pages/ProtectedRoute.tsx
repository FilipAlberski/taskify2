import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCheckAuthQuery } from '../slices/usersApiSlice.js';

const ProtectedRoute = () => {
  const { data: userData, isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  if (!userData) {
    // No user data found, redirect to login
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render children routes if user data is present
};

export default ProtectedRoute;
