'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, FileDiff } from 'lucide-react';
import { Input } from "@/components/ui/input";
import adminService from '@/services/admin';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Doctor {
  _id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  medical_license: {
    url: string;
  };
  medical_school_cert: {
    url: string;
  };
  nysc_cert: {
    url: string;
  };
  is_verified: boolean;
  is_approved: boolean;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [unverifiedDoctors, setUnverifiedDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const result = await adminService.getDoctors({
        page: currentPage,
        per_page: 10
      });

      if (result.success && result.data?.doctors) {
        setDoctors(result.data.doctors);
        setTotalPages(Math.ceil(result.data.total / 10));
      } else {
        toast.error(result.error || 'Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnverifiedDoctors = async () => {
    try {
      const result = await adminService.getUnverifiedDoctors();
      if (result.success && result.data?.doctors) {
        setUnverifiedDoctors(result.data.doctors);
      } else {
        toast.error(result.error || 'Failed to fetch unverified doctors');
      }
    } catch (error) {
      console.error('Error fetching unverified doctors:', error);
      toast.error('Failed to fetch unverified doctors');
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchDoctors();
    fetchUnverifiedDoctors();
  }, [currentPage, router]);

  const handleVerifyDoctor = async (doctorId: string) => {
    try {
      const result = await adminService.verifyDoctor(doctorId);
      if (result.success) {
        toast.success('Doctor verified successfully');
        fetchUnverifiedDoctors();
        fetchDoctors();
      } else {
        toast.error(result.error || 'Failed to verify doctor');
      }
    } catch (error) {
      console.error('Error verifying doctor:', error);
      toast.error('Failed to verify doctor');
    }
  };

  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const result = await adminService.approveDoctor(doctorId);
      if (result.success) {
        toast.success('Doctor approved successfully');
        fetchDoctors();
      } else {
        toast.error(result.error || 'Failed to approve doctor');
      }
    } catch (error) {
      console.error('Error approving doctor:', error);
      toast.error('Failed to approve doctor');
    }
  };

  const handleViewDocument = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('Document not available');
    }
  };

  const renderDoctorTable = (doctorsList: Doctor[], title: string) => (
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
            {doctorsList.map((doctor) => (
              <tr key={doctor._id} className="border-b border-[#cfd4dc] border-t">
                <td className="p-4 text-center text-[#475466] text-base font-normal">
                  {`${doctor.first_name} ${doctor.last_name}`}
                </td>
                <td className="p-4 text-center text-[#475466] text-base font-normal border-l">
                  {doctor.specialization}
                </td>
                <td className="p-4 text-center border-l">
                  <button 
                    className="text-[#004ba8] text-base font-medium"
                    onClick={() => handleViewDocument(doctor.medical_license?.url)}
                  >
                    <FileDiff className='w-6 h-auto inline-flex'/> View
                  </button>
                </td>
                <td className="p-4 text-center border-l">
                  <button 
                    className="text-[#004ba8] text-base font-medium"
                    onClick={() => handleViewDocument(doctor.medical_school_cert?.url)}
                  >
                    <FileDiff className='w-6 h-auto inline-flex'/> View
                  </button>
                </td>
                <td className="p-4 text-center border-l">
                  <button 
                    className="text-[#004ba8] text-base font-medium"
                    onClick={() => handleViewDocument(doctor.nysc_cert?.url)}
                  >
                    <FileDiff className='w-6 h-auto inline-flex'/> View
                  </button>
                </td>
                <td className="p-4 border-l">
                  <div className="flex items-center justify-center gap-6">
                    {!doctor.is_verified && (
                      <button 
                        className="px-2 h-10 bg-[#87d641] rounded-lg text-[#fffafb] text-base font-medium min-w-[128px]"
                        onClick={() => handleVerifyDoctor(doctor._id)}
                        disabled={loading}
                      >
                        {loading ? 'Verifying...' : 'Verify'}
                      </button>
                    )}
                    {doctor.is_verified && !doctor.is_approved && (
                      <button 
                        className="px-2 h-10 bg-[#87d641] rounded-lg text-[#fffafb] text-base font-medium min-w-[128px]"
                        onClick={() => handleApproveDoctor(doctor._id)}
                        disabled={loading}
                      >
                        {loading ? 'Approving...' : 'Approve'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {doctorsList.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
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

      {/* Search Bar */}
      <div className="relative mb-8 mx-5">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-2 w-full max-w-md rounded-lg border border-gray-300"
        />
      </div>

      {loading && (
        <div className="text-center py-4">
          Loading...
        </div>
      )}

      {/* Unverified Doctors */}
      {!loading && unverifiedDoctors.length > 0 && renderDoctorTable(unverifiedDoctors, 'Unverified Doctors')}

      {/* All Doctors */}
      {!loading && renderDoctorTable(doctors, 'All Doctors')}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-[#004ba8] text-white' : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}