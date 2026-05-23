import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Use JSON.parse for isAdmin because localStorage stores everything as strings
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const[loggedIn, setLoggedIn] = useState(false);

  const login = (t, userRole) => {
    localStorage.setItem("token", t);
    localStorage.setItem("role", userRole);
    setToken(t);
    setRole(userRole);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole("user");
    setLoggedIn(false);
  };

  // Helper to check if the current user is an admin
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider value={{ token, role, isAdmin, login, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};