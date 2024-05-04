"use client"
import React from 'react';
import UserDashbord from '@/components/userComponent/UserDashbord';

import "../globals.css";
import ProtectedRoute from '@/components/UserProtectedRoutes';



const Page = () => {
  

  return (
    
         

       <ProtectedRoute>  
        <UserDashbord />
          </ProtectedRoute>  
     
       
    
  );
};

export default Page;
