import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../const/constant';

const withAuth = (WrappedComponent) => {
  console.log("Authentication Called")
  const AuthComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch(API_URL + 'auth/checkauth/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
      
          if (!response.ok) {
            const responseData = await response.json();
            const errorMessage = responseData.data.usermessage || "Not authenticated";
            throw new Error(errorMessage);
          }
      
          setIsLoading(false);
        } catch (error) {
          console.error('Authentication failed:', error.message);
          navigate('/login'); // Redirect to the login page if not authenticated
        }
      };
      
      checkAuth();
    }, [navigate]);

    return isLoading ? <div>Loading...</div> : <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;
