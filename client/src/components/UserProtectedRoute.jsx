import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

function UserProtectedRoute() {
  const { user } = useAuthContext();
  return (
    user?.username ? <Navigate to="/" /> : <Outlet />
  )
}

export default UserProtectedRoute