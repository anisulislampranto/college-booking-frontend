"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage when app starts
    const storedUser = localStorage.getItem("user");
    const storedCollege = localStorage.getItem("college");

    if (storedUser) {
      console.log("storedUser", storedUser);
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (storedCollege) {
      console.log("storedUser", storedCollege);
      setUser(JSON.parse(storedCollege));
      setLoading(false);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("college");
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("college");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
