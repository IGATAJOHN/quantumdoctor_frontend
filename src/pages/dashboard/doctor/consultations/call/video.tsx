'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import VideoCall from '@/components/doctor/dashboard/videoCall';
import Head from 'next/head';

export default function VideoCallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const doctorName = searchParams.get('doctorName') || 'Dr. Wilson';
  const doctorImage = searchParams.get('/images/drwil.png') || '/images/drwil.png';
  const patientName = searchParams.get('patientName') || 'John Doe';
  const patientImage = searchParams.get('patientcl.png') || '/images/patientcl.png';

  const handleEndCall = () => {
    router.push('/dashboard/doctor/consultations');
  };

  return (
    <>
     <Head>
        <title>Audio call - Quantum Doctor </title>
      </Head>
      <VideoCall
      doctorName={doctorName}
      doctorImage={doctorImage}
      patientName={patientName}
      patientImage={patientImage}
      onEndCall={handleEndCall}
    />
    </>
   
  );
}
