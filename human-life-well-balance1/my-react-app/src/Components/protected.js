import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
