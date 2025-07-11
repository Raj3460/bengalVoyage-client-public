import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRouts = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return (
      <Navigate state={{ form: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRouts;
