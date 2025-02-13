'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import PersonwhiteIcon from '@/icons/Personwhite';
import StethoscopeIcon2 from '@/icons/StethoscopeIcon2';
import ProfileIcon from '@/icons/Profile';
import LogoutIcon from '@/icons/Logout';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#004ba8] text-white p-6">
      <div className="flex justify-between items-center mb-12">
        <img className="w-36 h-14" src="/images/doclogo.png" alt="Logo" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link 
              href="/dashboard/doctor" 
              className={`flex items-center px-4 py-2 ${
                activeTab === 'Dashboard' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : ''
              } rounded-lg text-lg`}
              onClick={() => setActiveTab('Dashboard')}
            >
              <DashboardIcon className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/doctor/patients" 
              className={`flex items-center px-4 py-2 ${
                activeTab === 'Patients' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : ''
              } hover:bg-[#1e6fd3] rounded-lg text-lg`}
              onClick={() => setActiveTab('Patients')}
            >
              <PersonwhiteIcon className="mr-2" />
              Patient Requests
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/doctor/consultations" 
              className={`flex items-center px-4 py-2 ${
                activeTab === 'Consultations' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : ''
              } hover:bg-[#1e6fd3] rounded-lg text-lg`}
              onClick={() => setActiveTab('Consultations')}
            >
              <StethoscopeIcon2 className="mr-2" />
              Consultations
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/doctor/profile" 
              className={`flex items-center px-4 py-2 ${
                activeTab === 'Profile' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : ''
              } hover:bg-[#1e6fd3] rounded-lg text-lg`}
              onClick={() => setActiveTab('Profile')}
            >
              <ProfileIcon className="mr-2" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <Link 
        href="/" 
        className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg mt-auto"
      >
        <LogoutIcon className="mr-2" />
        Log Out
      </Link>
    </aside>
  );
}

