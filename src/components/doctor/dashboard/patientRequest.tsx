import React, { useState } from 'react';
import { Bell, Menu, X, Clock, Calendar} from 'lucide-react';
import StethoscopeIcon2 from '@/icons/StethoscopeIcon2';
import { DashboardIcon } from '@radix-ui/react-icons';
import PersonwhiteIcon from '@/icons/Personwhite';
import ProfileIcon from '@/icons/Profile';
import LogoutIcon from '@/icons/Logout';
import Link from 'next/link';
import RescheduleModal from '@/components/modals/reschedule-modal';
import NotificationDrawer, { Notification as NotificationType } from './NotificationDrawer';

interface Notification extends NotificationType {}

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

const patientRequest: React.FC = () => {
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setRescheduleModalOpen] = useState(false);
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
              <Link href="/dashboard/doctor" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3]  rounded-lg text-lg">
                <DashboardIcon className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/requests" className="flex items-center px-4 py-2  bg-gradient-to-b from-[#1e6fd3] to-[#99bfed] rounded-lg text-lg">
               <PersonwhiteIcon className="mr-2" />
                Patient Requests
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/consultations" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3]  rounded-lg text-lg">
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
         <header className="bg-stone-100 rounded-tl-3xl rounded-bl-3xl   z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <button 
                  className="md:hidden text-[#3b392d]"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="hidden md:block text-[#3b392d] text-2xl font-medium font-['Inter'] ml-2 md:ml-0 ">Patient Requests</h1>
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
        <div className="p-4 lg:mr-40 md:p-8 flex flex-col flex-1 mt-4 md:mt-10">
          {/* Overview */}

          {/* Patient Requests and Upcoming Consultations */}
          <div className="flex flex-col lg:flex-row flex-1">
            {/* Patient Requests */}
            <section className="flex-1">
              <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 space-y-4">
                <PatientRequest name="Reuben Sampson" onCancel={() => setCancelModalOpen(true)} onReschedule={() => setRescheduleModalOpen(true)} />
                <div className="border-t border-gray-300 my-4"></div>
                <PatientRequest name="Emma Johnson" onCancel={() => setCancelModalOpen(true)} onReschedule={() => setRescheduleModalOpen(true)} />
                <div className="border-t border-gray-300 my-4"></div>
                <PatientRequest name="Michael Chen" onCancel={() => setCancelModalOpen(true)} onReschedule={() => setRescheduleModalOpen(true)} />
              </div>
            </section>
          </div>
        </div>
      </main>

      {isCancelModalOpen && <CancelModal onClose={() => setCancelModalOpen(false)} />}
      {isRescheduleModalOpen && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          onReschedule={() => {
            // Add your reschedule logic here
            setRescheduleModalOpen(false);
          }}
        />
      )}


      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        notifications={notifications}
      />
    </div>
  );
};

const PatientRequest: React.FC<{ name: string; onCancel: () => void; onReschedule: () => void }> = ({ name, onCancel, onReschedule }) => (
  <div className="space-y-6 p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
    <div className="flex items-start gap-4 md:gap-8">
      <div className="w-2 h-2 bg-[#004ba8] rounded-full" />
      <img className="w-12 h-12 rounded-full" src="/images/docs/ruben1.png" alt="Patient" />
      <div>
        <p className="text-[#3b392d] text-base mb-2">{name} sent you a Consultation Request</p>
        <div className="flex gap-4 md:gap-8">
          <div className="h-8 px-3.5 py-1.5 bg-stone-100 rounded-lg justify-between items-center inline-flex">
            <div className="justify-center items-center gap-2 flex">
              <Calendar className="w-4 h-4 text-[#004ba8]" />
              <div className="text-[#3b392d] text-sm font-normal font-['Inter']">20th Nov, 2024</div>
            </div>
            <div className="justify-center items-center gap-2 flex">
              <Clock className="w-4 h-4 text-[#004ba8]" />
              <div className="text-[#3b392d] text-sm font-normal font-['Inter']">9:00 - 10:00pm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-4 md:gap-8 mt-4 md:mt-0">
      <button className="px-4 py-2 md:px-6 md:py-1 bg-[#004ba8] text-white text-sm font-medium rounded-lg hover:bg-[#003d8a] transition-colors" >
        Accept
      </button>
      <button className="px-4 py-2 md:px-6 md:py-1 bg-stone-100 text-[#626157] text-sm font-medium rounded-lg border border-[#d0cfcc] hover:bg-stone-200 transition-colors" onClick={onReschedule}>
      Reschedule
      </button>
       <button className="w-6 h-6 relative">
          <div className="w-6 h-6 left-0 top-0 absolute bg-blue-50 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" onClick={onCancel} />
          </div>
        </button>
    </div>
  </div>
);

const CancelModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-96 h-40 relative bg-stone-100 rounded-lg overflow-hidden p-4">
      <div className="text-[#141204] text-xl font-normal font-['Inter']">Are you sure you want to Cancel<br />Request?</div>
      <div className="flex justify-center items-center gap-5 mt-4">
        <button className="w-28 h-12 px-5 py-4 bg-stone-100 rounded-lg border border-[#d0cfcc] text-[#626157] text-base font-medium font-['Inter']" onClick={onClose}>
          Back
        </button>
        <button className="w-32 h-12 px-5 py-4 bg-[#d91f11] rounded-lg text-[#fffafb] text-base font-medium font-['Inter']">
          Cancel
        </button>
      </div>
    </div>
  </div>
);


export default patientRequest;