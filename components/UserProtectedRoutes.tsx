import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode; // Content to render within the protected route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if code is running in the client-side environment
    if (typeof window !== 'undefined') {
      const userRoleID = localStorage.getItem("userRoleID");
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if(userRoleID==="2" && isLoggedIn==="true"){
        router.push("/Admin");
      }
      else if(userRoleID==="1" && isLoggedIn==="true"){
        router.push("/User")
      }
      else{
        router.replace("/");
      }
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
