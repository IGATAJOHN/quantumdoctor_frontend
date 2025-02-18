import React from 'react';
import PatientRequests from '@/components/doctor/dashboard/patientRequest';
import Head from 'next/head';
export default function DoctorPatientRequestPage() {
  return  (
    <>
    <Head>
    <title>Dashboard Request - Quantum Doctor</title>
  </Head>
  <PatientRequests/>;
    </>
    
  )
}

