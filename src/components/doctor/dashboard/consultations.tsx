'use client';

import React, { useState } from 'react';
import { Bell, Menu, X, Search } from 'lucide-react';
import StethoscopeIcon2 from '@/icons/StethoscopeIcon2';
import { DashboardIcon } from '@radix-ui/react-icons';
import PersonwhiteIcon from '@/icons/Personwhite';
import ProfileIcon from '@/icons/Profile';
import LogoutIcon from '@/icons/Logout';
import Link from 'next/link';
import NotificationDrawer from './NotificationDrawer';
import ConversationCard from './ConversationCard';
import StartConsultationButton from '../../ui/consultbutton';
import ConsultationModal from '../../modals/consultation-modal';
import ConversationDetail from './ConversationDetail';

interface Consultation {
  id: number;
  name: string;
  date: string;
  time: string;
  imageUrl: string;
  isActive: boolean;
}

interface Conversation {
  id: number;
  name: string;
  message: string;
  date: string;
  imageUrl: string;
  lastConsultation: string;
}

const consultations: Consultation[] = [
  {
    id: 1,
    name: "Reuben Sampson",
    date: "20th Nov, 2024",
    time: "9:00 - 10:00pm",
    imageUrl: "https://via.placeholder.com/44x44",
    isActive: true
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "21st Nov, 2024",
    time: "2:00 - 3:00pm",
    imageUrl: "https://via.placeholder.com/44x44",
    isActive: false
  },
  {
    id: 3,
    name: "John Smith",
    date: "22nd Nov, 2024",
    time: "11:00 - 12:00pm",
    imageUrl: "https://via.placeholder.com/44x44",
    isActive: false
  },
];

import { Notification as NotificationType } from './NotificationDrawer';

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

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Alex Johnson",
    message: `Dear Alex Johnson,

Thank you for attending today's consultation. Based on our discussion and initial findings, I recommend the following tests to gain a clearer understanding of your condition:

1. Complete Blood Count (CBC)
2. Lipid Profile
3. Thyroid Function Test (if applicable)

Please visit a certified laboratory to complete these tests at your earliest convenience. Once you have the results, kindly upload them to the platform or bring them to your next appointment.

If you have any questions or concerns, feel free to message me via the platform.

Wishing you good health,
Dr. Wilson
Cardiologist`,
    date: "15/11",
    imageUrl: "https://via.placeholder.com/44x44",
    lastConsultation: "25/11"
  },
  {
    id: 2,
    name: "Sarah Smith",
    message: "Thank you for the consultation yesterday. I have a follow-up question.",
    date: "14/11",
    imageUrl: "https://via.placeholder.com/44x44",
    lastConsultation: "24/11"
  },
  {
    id: 3,
    name: "Michael Brown",
    message: "Can we reschedule our appointment for next week?",
    date: "13/11",
    imageUrl: "https://via.placeholder.com/44x44",
    lastConsultation: "20/11"
  },
];

const Consultation: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);



  return (
    <div className='flex h-screen lg:bg-[#004ba8] sm:bg-stone-100 overflow-y-auto'>
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
              <Link href="/dashboard/doctor/requests" className="flex items-center px-4 py-2 hover:bg-[#1e6fd3] rounded-lg text-lg">
               <PersonwhiteIcon className="mr-2" />
                Patient Requests
              </Link>
            </li>
            <li>
              <Link href="/dashboard/doctor/consultations" className="flex items-center px-4 py-2  bg-gradient-to-b from-[#1e6fd3] to-[#99bfed] rounded-lg text-lg">
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

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
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
                <h1 className="hidden md:block text-[#3b392d] text-2xl font-medium font-['Inter'] ml-2 md:ml-0 ">Consultations</h1>
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
           {/* Content area */}
        <div className="lg:ml-5 flex-1 flex flex-col md:flex-row overflow-hidden bg-stone-100">
          {/* Consultations */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Today's Consultations */}
            <div className="mb-8">
              <h2 className="text-[#3b392d] text-xl font-medium font-['Inter'] mb-4">Today</h2>
              <ConsultationCard consultation={consultations[0]} />
            </div>

            {/* All Consultations */}
            <div>
              <h2 className="text-[#3b392d] text-xl font-medium font-['Inter'] mb-4">All</h2>
              <div className="space-y-4">
                {consultations.map(consultation => (
                  <ConsultationCard key={consultation.id} consultation={consultation} />
                ))}
              </div>
            </div>
          </div>

        

          {/* Conversations (right side on desktop, bottom on mobile) */}
          <div className="md:w-1/2 p-8 border-t md:border-t-0 md:border-l border-gray-200 bg-stone-100">
            <h2 className="text-[#3b392d] text-xl font-medium font-['Inter'] mb-4">Conversations</h2>
            
            {selectedConversation ? (
              <ConversationDetail 
                conversation={selectedConversation}
                onClose={() => setSelectedConversation(null)}
              />
            ) : (
              <>
                {/* Search input */}
                <div className="lg:w-[300px] mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Conversation"
                      className="w-full h-12 pl-10 pr-4 py-3.5 bg-[#fffafb] rounded-lg border border-[#d0cfcc] text-[#3b392d] text-xs font-normal font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#004ba8]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d0cfcc]" size={16} />
                  </div>
                </div>

                {/* Conversation list */}
                {conversations.length > 0 ? (
                  <div className="lg:w-[480px]  bg-[#fffafb] rounded-lg border border-[#d0cfcc]  p-4">
                    {conversations.map(conversation => (
                      <div key={conversation.id} onClick={() => setSelectedConversation(conversation)}>
                        <ConversationCard conversation={conversation} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-[#fffafb] rounded-lg border border-[#d0cfcc] flex items-center justify-center">
                    <span className="text-[#626157] text-sm font-normal font-['Inter']">No Conversations yet</span>
                  </div>
                )}
              </>
            )}
          </div>
      
        </div>
        </header>

       
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        notifications={notifications}
      />
    </div>
  );
};

const ConsultationCard: React.FC<{ consultation: Consultation }> = ({ consultation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative bg-[#fffafb] rounded-lg border border-[#d0cfcc] overflow-hidden">
      <div className="absolute left-0 top-0 w-2.5 h-full bg-[#adc3dd]" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img className="w-11 h-11 rounded-full" src={consultation.imageUrl} alt={consultation.name} />
            <div>
              <h3 className="text-[#3b392d] text-base font-normal font-['Inter']">{consultation.name}</h3>
            </div>
          </div>
          
          <StartConsultationButton onClick={handleOpenModal} />
        </div>
        <div className="bg-stone-100 rounded-lg p-2 flex justify-between items-center">
          <div className="text-[#3b392d] text-sm font-normal font-['Inter']">{consultation.date}</div>
          <div className="text-[#3b392d] text-sm font-normal font-['Inter']">{consultation.time}</div>
        </div>
      </div>
      <ConsultationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      doctorName="Dr. Wilson"
      doctorImage="/doctor-image.jpg"
      patientName="John Doe"
      patientImage="/patient-image.jpg"
    />
    </div>
  );
};

export default Consultation;

