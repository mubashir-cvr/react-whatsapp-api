import React, { useEffect } from 'react';
import Loading from '../utils/Loading';

function LogOut() {
    useEffect(() => {
        const logoutTimeout = setTimeout(() => {
          // Logic to handle logout after 3 seconds
          localStorage.removeItem('token'); // Remove token from local storage
          localStorage.removeItem('user'); // Remove token from local storage
          localStorage.removeItem('userPermissions'); // Remove token from local storage
          localStorage.removeItem('cachedAt'); // Remove token from local storage
          window.location.href = '/';  // Redirect to login page after logout
        }, 3000); // Timeout set to 3 seconds (3000 milliseconds)
    
        // Cleanup function to clear the timeout in case component unmounts before 3 seconds
        return () => clearTimeout(logoutTimeout);
      }, []);
  return (
    <div className='h-screen w-screen'><Loading/></div>
  )
}

export default LogOut