'use client';

import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import PersonwhiteIcon from '@/icons/Personwhite';
import StethoscopeIcon2 from '@/icons/StethoscopeIcon2';
import ProfileIcon from '@/icons/Profile';
import LogoutIcon from '@/icons/Logout';
import NotificationDrawer, { Notification } from '../NotificationDrawer';
import PersonalInfoTab from './PersonalInfoTab';
import PaymentTab from './PaymentTab';
import AccountTab from './AccountTab';

const tabs = ['Personal Info', 'Payment', 'Account'];

const notifications: Notification[] = [
  {
    id: 1,
    type: 'consultationRequest',
    message: "You have a new consultation request from John Doe",
    time: "2m",
    isUnread: true,
    sender: { name: "John Doe", initials: "JD" },
    actions: {
      accept: () => console.log("Accepted"),
      decline: () => console.log("Declined"),
    },
  },
  {
    id: 2,
    type: 'conversation',
    message: "My test results came out Positive",
    time: "1h",
    sender: { name: "Patrick", initials: "P" },
  },
  {
    id: 3,
    type: 'fileShared',
    message: "Samantha has shared a file with you",
    time: "14h",
    sender: { name: "Samantha", initials: "S", avatar: "https://via.placeholder.com/48x48" },
    details: { fileName: "Demo File.pdf", fileSize: "2.2 MB" },
  },
  {
    id: 4,
    type: 'comment',
    message: "Steve and others commented on Design Assets",
    time: "15h",
    sender: { name: "Steve", initials: "S" },
    details: { commentCount: 8 },
  },
];

interface ProfileProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Profile: React.FC<ProfileProps> = ({ activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen lg:bg-[#004ba8]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:flex flex-col w-64 bg-[#004ba8] text-white p-6 fixed md:static inset-y-0 left-0 z-50 overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-12">
          <img className="w-36 h-14" src="/images/doclogo.png" alt="Logo" />
          <button 
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard/doctor" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
                <DashboardIcon className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/requests" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
                <PersonwhiteIcon className="mr-2" />
                Patient Requests
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/consultations" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
                <StethoscopeIcon2 className="mr-2" />
                Consultations
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/profile" className="flex items-center px-4 py-2 bg-gradient-to-b from-[#1e6fd3] to-[#99bfed] rounded-lg text-lg">
                <ProfileIcon className="mr-2" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="/" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
          <LogoutIcon className="mr-2" />
          Log Out
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-stone-100 rounded-tl-3xl rounded-bl-3xl overflow-y-auto">
        {/* Header */}
        <header className="bg-stone-100 rounded-tl-3xl rounded-bl-3xl z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <button 
                  className="md:hidden text-[#3b392d]"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="hidden md:block text-[#3b392d] text-2xl font-medium font-['Inter'] ml-2 md:ml-0">Profile</h1>
              </div>
              <div className="flex items-center justify-end md:flex-1 lg:w-0">
                <button 
                  className="mr-4 w-10 h-10 bg-stone-100 rounded-full border border-[#d0cfcc] flex items-center justify-center"
                  onClick={() => setNotificationDrawerOpen(true)}
                >
                  <Bell className="w-4 h-4 text-[#3b392d]" />
                </button>
                <div className="flex items-center gap-2">
                  <img className="w-10 h-10 rounded-full border border-[#b0b0ab]" src="/images/doctor.png" alt="Dr Wilson" />
                  <div className="px-2.5 py-1.5 bg-[#f2f7fe] rounded-lg border border-[#d0cfcc]">
                    <span className="text-black text-sm font-normal font-['Inter']">Dr Wilson</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
        </header>

        {/* Profile Content */}
        <div className="p-10">
          <div className="mt-8 flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`p-2.5 ${
                  activeTab === tab
                    ? 'border-b-2 border-[#004ba8] text-[#141204] font-medium'
                    : 'text-[#3b392d]'
                } text-lg`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-8">
            {activeTab === 'Personal Info' && <PersonalInfoTab />}
            {activeTab === 'Payment' && <PaymentTab />}
            {activeTab === 'Account' && <AccountTab />}
          </div>
        </div>
      </main>

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}

export default Profile;