import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/auth';

export default function PrivateRoute() {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
