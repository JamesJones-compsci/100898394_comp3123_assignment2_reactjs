import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
