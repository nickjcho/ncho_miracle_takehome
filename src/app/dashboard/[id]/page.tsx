"use client";
import React from 'react';
import DashboardClient from './dashboard-client';
import { useParams } from 'next/navigation';


// Dashboard page - Shows custom dashboards based on ID
const DashboardPage = () => {
  const params = useParams();
  const { id } = params

  return (
    <div className="h-full">
      <h1 className="p-4">Dashboard {id}</h1>
      <DashboardClient dashboardId={Number(id)} />
    </div>
  )
};

export default DashboardPage;
