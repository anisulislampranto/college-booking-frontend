"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFetch, setUserFetch] = useState(0);
  const [userType, setUserType] = useState("student");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("collegeToken");

      if (token) {
        try {
          const isTokenExpired = (token) => {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
          };

          if (isTokenExpired(token)) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-me`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              console.log("dataUSer", data);
              setLoading(false);
              localStorage.setItem("collegeToken", token);
              setUser({ token, ...data.data });
              // setUserType(data.data.)
            } else {
              localStorage.removeItem("token");
              setUser(null);
              setLoading(false);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userFetch]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
        userFetch,
        setUserFetch,
        userType,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
