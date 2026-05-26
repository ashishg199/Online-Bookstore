import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false
}) {
  const {
    loggedIn,
    role
  } = useAuth();

  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  if (
    adminOnly &&
    role !== "admin"
  ) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  return children;
}