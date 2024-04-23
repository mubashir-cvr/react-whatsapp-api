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
  const [userPermissions, setUserPermissions] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user data exists in local storage
        const cachedUser = localStorage.getItem("user");
        const cachedUserPermission = localStorage.getItem("userPermissions");
        if (cachedUser && cachedUserPermission) {
          setUser(JSON.parse(cachedUser));
          setUserPermissions(JSON.parse(cachedUserPermission));

          setIsLoading(false);
          return;
        }

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
        setUserPermissions(responseData.data.permissions);
        setIsLoading(false);

        // Cache the user data in local storage
        localStorage.setItem("user", JSON.stringify(responseData.data.user));
        localStorage.setItem(
          "userPermissions",
          JSON.stringify(responseData.data.permissions)
        );
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
