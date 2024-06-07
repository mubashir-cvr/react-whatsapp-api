import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Loading from "../utils/Loading";
import { API_URL } from "../const/env_constant";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user data exists in local storage
        const cachedUser = localStorage.getItem("user");
        const cachedUserPermission = localStorage.getItem("userPermissions");

        if (cachedUser && cachedUserPermission) {
          // Check if there is a stored date
          const cachedAt = localStorage.getItem("cachedAt");
          if (cachedAt) {
            const currentDate = new Date();
            const storedDate = new Date(cachedAt);
            if (storedDate == currentDate) {
              setUser(JSON.parse(cachedUser));
              setUserPermissions(JSON.parse(cachedUserPermission));
    
              setIsLoading(false);
    
              return;
            }
          }
         
          
        }

        const response = await fetch(API_URL + "auth/checkauth/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();

        if (response.status === 401) {
          navigate("/login", { state: { from: location.pathname } });
        }

        if (!response.ok) {
          const errorMessage = responseData.message || "Not authenticated";
          let error = new Error(errorMessage);
          error.statusCode = responseData.statusCode;
          throw error;
        }

        setUser(responseData.data.user);
        setUserPermissions(responseData.data.permissions);
        setIsLoading(false);

        // Cache the user data in local storage
        localStorage.setItem("user", JSON.stringify(responseData.data.user));
        localStorage.setItem(
          "userPermissions",
          JSON.stringify(responseData.data.permissions)
        );
        
        const currentDate = new Date();
        const dateString = currentDate.toISOString();
        localStorage.setItem("cachedAt", dateString);
      } catch (error) {
        console.error("Authentication failed:" + error.message);
        if (error.statusCode === 401) {
          navigate("/login", { state: { from: location.pathname } });
        } else {
          alert(error.message);
          navigate("/error");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isLoading, userPermissions }}>
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
