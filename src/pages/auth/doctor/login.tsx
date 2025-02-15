import React from 'react';
import Head from 'next/head';
import DoctorLogin from '@/components/doctor/auth/login';

export default function DoctorLoginPage() {
  return (
    <>
      <Head>
        <title>Login - Quantum Doctor </title>
      </Head>
      <DoctorLogin />
    </>
  );
}