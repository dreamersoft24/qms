"use client"
import AdminDashboard from '@/components/AdminComponent/AdminDashboard'
import ProtectedRoute from '@/components/UserProtectedRoutes'
import React from 'react';
import "../globals.css";
const page = () => {
  return (
   
        <ProtectedRoute>
      <AdminDashboard/>
        </ProtectedRoute>
   
  )

}

export default page
