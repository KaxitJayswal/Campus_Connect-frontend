import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If not loading and there is still no user, then redirect.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If we are not loading and a user exists, render the protected component.
  return children;
}

export default ProtectedRoute;