"use client"
import React from 'react';
import Login from '@/components/Login';
import "./globals.css";
import { UserProvider } from '@/components/UserContext';
import ProtectedRoute from '@/components/UserProtectedRoutes';


export default function Page() {
 
  return (
    <main>
    
      <Login />
   
    </main>
  );
}
