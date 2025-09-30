
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reporting from "./pages/Reporting";
import Expenses from "./pages/Expenses";

const App = () => {
  const { auth } = useContext(AuthContext);

  // Protected Route wrapper
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!auth) {
      // Not logged in
      return <Navigate to="/login" replace />;
    }
    if (adminOnly && auth.user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reporting"
        element={
          <ProtectedRoute adminOnly={true}>
            <Reporting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      {/* Default route: redirect to dashboard if logged in, else login */}
      <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;
