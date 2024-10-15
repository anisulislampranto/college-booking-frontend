"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user and token from localStorage when app starts
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const isTokenExpired = (token) => {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds
          return decoded.exp < currentTime; // Check if the token is expired
        } catch (error) {
          return true; // Assume token is expired if decoding fails
        }
      };

      if (isTokenExpired(token)) {
        // If token is expired, clear user and token from storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      } else {
        // If token is valid, set user
        setUser(JSON.parse(storedUser));
      }
    } else {
      // If no token or user found, clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
