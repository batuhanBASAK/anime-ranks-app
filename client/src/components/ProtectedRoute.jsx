import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

export function NonUserRoute() {
  const { user } = useAuthContext();
  return (
    user?.username ? <Navigate to="/" /> : <Outlet />
  )
}

export function UserRoute() {
  const { user } = useAuthContext();
  return (
    user?.username ? <Outlet /> : <Navigate to="/" />
  )
}

