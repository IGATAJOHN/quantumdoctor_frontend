import React from 'react';
import Dashboard from '@/components/doctor/dashboard/dashboard';
import Head from 'next/head';

export default function DoctorDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Quantum Doctor</title>
      </Head>
      <Dashboard />
    </>
  );
}