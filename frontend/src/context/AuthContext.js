import React, { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Safely parse user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.warn("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  // Safely get token from localStorage
  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      return token || null;
    } catch (err) {
      console.warn("Failed to read token from localStorage:", err);
      return null;
    }
  };

  // Login function
  const login = (token, userData) => {
    if (!token || !userData) return;
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error("Failed to store login data:", err);
    }
  };

  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Failed to remove login data:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
