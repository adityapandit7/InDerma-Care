
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  // Load auth state from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth({
        token,
        user: JSON.parse(user),
      });

      // set default axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuth({ token, user });
    return { token, user };
  };

  // Register function
  const register = async (email, password) => {
    const res = await axios.post(`${API_BASE}/api/auth/register`, { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuth({ token, user });
    return { token, user };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
