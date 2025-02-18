import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-[#004ba8] text-white p-6">
      <img className="w-36 h-14 mb-12" src="/images/doclogo.png" alt="Logo" />
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-lg ${activeTab === 'Dashboard' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : 'hover:bg-[#1e6fd3]'}`}
              onClick={() => setActiveTab('Dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-lg ${activeTab === 'Patient Requests' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : 'hover:bg-[#1e6fd3]'}`}
              onClick={() => setActiveTab('Patient Requests')}
            >
              Patient Requests
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-lg ${activeTab === 'Consultations' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : 'hover:bg-[#1e6fd3]'}`}
              onClick={() => setActiveTab('Consultations')}
            >
              Consultations
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-lg ${activeTab === 'Profile' ? 'bg-gradient-to-b from-[#1e6fd3] to-[#99bfed]' : 'hover:bg-[#1e6fd3]'}`}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;