import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Zustand 스토어 경로에 맞게 수정

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.accessToken);


  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
