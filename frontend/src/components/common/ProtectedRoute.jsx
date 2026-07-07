import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from '../ui/Loader';
import { ROUTES } from '../../routes';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role, initialized } = useAuth();
  const location = useLocation();

  // Wait for the initial "who am I" check before deciding — otherwise a
  // page refresh would briefly bounce logged-in users to /login.
  if (!initialized) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
