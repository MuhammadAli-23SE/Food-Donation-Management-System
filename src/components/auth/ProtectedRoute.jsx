import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6EF]">
        <div className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] shadow-lg animate-pulse mb-4">
          <Sprout className="w-6 h-6 stroke-[2.5]" />
        </div>
        <p className="text-xs font-bold text-[#174D38] uppercase tracking-wider">
          Verifying Secure Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
