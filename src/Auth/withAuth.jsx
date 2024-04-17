import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../utils/Loading";

const withAuth = (WrappedComponent) => {
  const API_URL = import.meta.env.REACT_APP_API_URL;
  const AuthComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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
            error.statusCode=responseData.statusCode
            throw error
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Authentication failed:"+error.message);
          if(error.statusCode){
          navigate("/login"); 
          }
          else{
            navigate("/error");
          }
        }
      };

      checkAuth();
    }, [navigate]);

    return isLoading ? (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    ) : (
      <WrappedComponent />
    );
  };

  return AuthComponent;
};

export default withAuth;
