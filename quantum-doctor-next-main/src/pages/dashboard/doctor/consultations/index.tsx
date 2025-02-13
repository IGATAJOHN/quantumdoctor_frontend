import React from 'react';
import Consultations from '@/components/doctor/dashboard/consultations';
import Head from 'next/head';

export default function DoctorConsultationPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Doctor Consultations</title>
      </Head>
      <Consultations/>
    </>
  );
}