import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

export function NonUserRoute() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <h1 className="font-semibold text-5xl">Loading...</h1>
      </div>
    )
  }

  return (
    user?.username ? <Navigate to="/" replace /> : <Outlet />
  )
}

export function UserRoute() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <h1 className="font-semibold text-5xl">Loading...</h1>
      </div>
    )
  }

  return (
    user?.username ? <Outlet /> : <Navigate to="/" replace />
  )
}

