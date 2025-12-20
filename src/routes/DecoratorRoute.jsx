// src/routes/DecoratorRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export const DecoratorRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  // Wait for loading to complete before checking role
  if (loading) {
    return <LoadingSpinner />;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow decorators and admins to access decorator routes
  if (userRole === "decorator" || userRole === "admin") {
    return children;
  }

  // If user doesn't have decorator/admin role, redirect to their appropriate dashboard
  if (userRole === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // Default redirect to dashboard (which will redirect based on role)
  return <Navigate to="/dashboard" replace />;
};

export default DecoratorRoute;
