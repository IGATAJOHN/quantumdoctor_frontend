import React, { useState } from 'react';
import Profile from '@/components/doctor/dashboard/profile/Profile';
import Head from 'next/head';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  return (
    <>
      <Head>
        <title>Dashboard - Doctor Profile</title>
      </Head>
      <Profile activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default ProfilePage;