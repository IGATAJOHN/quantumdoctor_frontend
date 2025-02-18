import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '@/components/admin/dashboard/dashboard';
import Head from 'next/head';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Dashboard - Quantum Doctor</title>
      </Head>
      <Dashboard />
    </>
  );
}