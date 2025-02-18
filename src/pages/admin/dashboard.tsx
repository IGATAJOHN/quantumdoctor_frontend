import React from 'react';
import Dashboard from '@/components/admin/dashboard/dashboard';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin Dashboard - Quantum Doctor</title>
      </Head>
      <Dashboard />
    </>
  );
}
