'use client';

import React, { useState } from 'react';
import { Bell, Menu, X, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import PersonwhiteIcon from '@/icons/Personwhite';
import StethoscopeIcon from '@/icons/StethoscopeIcon';
import StethoscopeIcon2 from '@/icons/StethoscopeIcon2';
import ClockIcon from '@/icons/Clock';
import PersonIcon from '@/icons/Person';
import ProfileIcon from '@/icons/Profile';
import LogoutIcon from '@/icons/Logout';
import NotificationDrawer, { Notification } from './NotificationDrawer';

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

const Dashboard: React.FC = () => {
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
              <Link href="/dashboard/doctor" className="flex items-center px-4 py-2 bg-gradient-to-b from-[#1e6fd3] to-[#99bfed] rounded-lg text-lg">
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
              <Link href="/dashboard/doctor/profile" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
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
                <h1 className="hidden md:block text-[#3b392d] text-2xl font-medium font-['Inter'] ml-2 md:ml-0">Dashboard</h1>
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

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-[#3b392d] text-xl font-medium mb-4">Overview</h2>
            <div className="w-full flex justify-start items-start gap-4 flex-wrap">
              <StatCard icon={<StethoscopeIcon className="w-6 h-6 text-blue-500" />} value={12} label="Completed Consultations" />
              <StatCard icon={<ClockIcon className="w-6 h-6 text-green-500" />} value={10} label="Upcoming Appointments" />
              <StatCard icon={<PersonIcon className="w-6 h-6 text-purple-500" />} value={18} label="Patient Requests" />
            </div>
          </section>

          {/* Patient Requests and Upcoming Consultations */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Patient Requests */}
            <section className="flex-1">
              <h2 className="text-[#3b392d] text-xl font-medium mb-4">Patient Requests</h2>
              <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 space-y-4">
                <PatientRequest name="Reuben Sampson" time="2min" />
                <PatientRequest name="Emma Johnson" time="5min" />
                <PatientRequest name="Michael Chen" time="10min" />
                <button className="w-full py-2 bg-[#f4f9fe] text-[#004ba8] text-sm font-medium rounded-lg hover:bg-[#e4f1fd] transition-colors">
                  See all
                </button>
              </div>
            </section>

            {/* Upcoming Consultations */}
            <section className="flex-1">
              <h2 className="text-[#3b392d] text-xl font-medium mb-4">Upcoming Consultations (3)</h2>
              <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 space-y-4">
                <ConsultationCard name="Esther Azima" date="20th Nov, 2024" time="9:00 - 10:00pm" />
                <ConsultationCard name="John Doe" date="21st Nov, 2024" time="2:00 - 3:00pm" />
                <ConsultationCard name="Sarah Smith" date="22nd Nov, 2024" time="11:00 - 12:00pm" />
                <button className="w-full py-2 bg-[#f4f9fe] text-[#004ba8] text-sm font-medium rounded-lg hover:bg-[#e4f1fd] transition-colors">
                  See all
                </button>
              </div>
            </section>
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
};

const StatCard: React.FC<{ icon: React.ReactNode; value: number; label: string }> = ({ icon, value, label }) => (
  <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 flex items-center space-x-4">
    <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
    <div>
      <div className="text-[#626157] text-xl font-medium">{value}</div>
      <div className="text-[#626157] text-sm">{label}</div>
    </div>
  </div>
);

const PatientRequest: React.FC<{ name: string; time: string }> = ({ name, time }) => (
  <div className="flex justify-between items-start">
    <div className="flex items-start gap-3.5">
      <img className="w-12 h-12 rounded-full" src="/images/docs/ruben1.png" alt="Patient" />
      <div>
        <p className="text-[#3b392d] text-base mb-2">{name} sent you a Consultation Request</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#004ba8] text-white text-sm font-medium rounded-lg hover:bg-[#003d8a] transition-colors">
            Accept
          </button>
          <button className="px-4 py-2 bg-stone-100 text-[#626157] text-sm font-medium rounded-lg border border-[#d0cfcc] hover:bg-stone-200 transition-colors">
            Decline
          </button>
        </div>
      </div>
    </div>
    <span className="text-[#626157] text-sm">{time}</span>
  </div>
);

const ConsultationCard: React.FC<{ name: string; date: string; time: string }> = ({ name, date, time }) => (
  <div className="flex items-center gap-4">
    <img className="w-10 h-10 rounded" src="/images/docs/esther1.png" alt="Patient" />
    <div className="flex-1">
      <p className="text-[#3b392d] text-base mb-1">{name}</p>
      <div className="bg-stone-100 rounded-lg p-2 flex justify-between text-sm text-[#3b392d]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#004ba8]" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#004ba8]" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;

