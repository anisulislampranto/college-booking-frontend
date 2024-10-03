"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state

  useEffect(() => {
    // Get user from localStorage when app starts
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      console.log("storedUser", storedUser);
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
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
