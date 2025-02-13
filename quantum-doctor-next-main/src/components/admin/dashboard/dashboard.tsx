'use client';

import React, { useState } from 'react';
import { Search, X, FileDiff } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Doctor {
  name: string;
  specialization: string;
  medicalLicense: string;
  medicalCertificate: string;
  nyscCertificate: string;
}

const mockData = {
  today: [
    {
      name: 'Henry Riggs',
      specialization: 'Optometry',
      medicalLicense: 'ML123',
      medicalCertificate: 'MC123',
      nyscCertificate: 'NYSC123',
    },
    {
      name: 'Henry Riggs',
      specialization: 'Paediatrics',
      medicalLicense: 'ML124',
      medicalCertificate: 'MC124',
      nyscCertificate: 'NYSC124',
    },
    // Add more mock data as needed
  ],
  "25/11": [
    {
      name: 'Henry Riggs',
      specialization: 'Dentist',
      medicalLicense: 'ML125',
      medicalCertificate: 'MC125',
      nyscCertificate: 'NYSC125',
    },
    // Add more mock data as needed
  ]
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderDoctorTable = (doctors: Doctor[], title: string) => (
    <div className="space-y-4 ml-5 mr-5">
      <h2 className="text-[#3b392d] text-xl font-medium font-['Inter']">{title}</h2>
      <div className="bg-white rounded-lg border border-[#cfd4dc] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#cfd4dc]">
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-44">Name</th>
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-56 border-l">Specialization</th>
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-60 border-l">Medical License</th>
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-60 border-l">Medical Certificate</th>
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-60 border-l">NYSC Certificate</th>
              <th className="text-[#475466] text-base font-medium font-['Inter'] p-4 text-center w-52 border-l">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index} className="border-b border-[#cfd4dc] border-t">
                <td className="p-4 text-center text-[#475466] text-base font-normal">{doctor.name}</td>
                <td className="p-4 text-center text-[#475466] text-base font-normal border-l">{doctor.specialization}</td>
                <td className="p-4 text-center border-l">
                  <button className="text-[#004ba8] text-base font-medium"><FileDiff className='w-6 h-auto inline-flex'/> View</button>
                </td>
                <td className="p-4 text-center border-l">
                  <button className="text-[#004ba8] text-base font-medium"><FileDiff className='w-6 h-auto inline-flex'/> View</button>
                </td>
                <td className="p-4 text-center border-l">
                  <button className="text-[#004ba8] text-base font-medium"><FileDiff className='w-6 h-auto inline-flex'/> View</button>
                </td>
                <td className="p-4 border-l">
                  <div className="flex items-center justify-center gap-6">
                    <button className="px-2 h-10 bg-[#87d641] rounded-lg text-[#fffafb] text-base font-medium min-w-[128px]">
                      Verify
                    </button>
                    <button className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-[#475466]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-9 mb-8">
        <img className="w-20 h-20" src="/images/logo.png" alt="Quantum Doctor Logo" />
        <h1 className="text-[#141204] text-2xl font-medium font-['Inter']">Admin Dashboard</h1>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Input
          type="text"
          placeholder="Search Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#fffafb] border-[#d0cfcc] placeholder:text-[#b0b0ab]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b0b0ab]" />
      </div>

      {/* Tables */}
      <div className="space-y-12">
        {renderDoctorTable(mockData.today, 'Today')}
        {renderDoctorTable(mockData['25/11'], '25/11')}
      </div>
    </div>
  );
}