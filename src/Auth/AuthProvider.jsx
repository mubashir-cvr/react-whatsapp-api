import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import { API_URL } from "../const/constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(API_URL + "auth/checkauth/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const responseData = await response.json();
          const errorMessage = responseData.message || "Not authenticated";
          let error = new Error(errorMessage);
          error.statusCode = responseData.statusCode;
          throw error;
        }

        const responseData = await response.json();
        setUser(responseData.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication failed:" + error.message);
        if (error.statusCode) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {isLoading ? (
        <div className="w-screen h-screen">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
