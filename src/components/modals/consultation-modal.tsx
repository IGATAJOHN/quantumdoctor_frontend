'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import consultationService from '@/services/consultation';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  patientName: string;
  patientImage: string;
  consultationId?: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  doctorName,
  doctorImage,
  patientName,
  patientImage,
  consultationId
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const startCall = async (type: 'video' | 'audio') => {
    try {
      if (consultationId) {
        setLoading(true);
        setError(null);
        
        // Update consultation status to 'accepted'
        const response = await consultationService.manageConsultationRequest(
          consultationId,
          'accepted'
        );

        if (!response.success) {
          setError(response.error || 'Failed to start consultation');
          return;
        }
      }

      const params = new URLSearchParams({
        doctorName,
        doctorImage,
        patientName,
        patientImage,
        consultationId: consultationId || '',
        type
      });

      router.push(`/dashboard/doctor/consultations/call/${type}?${params.toString()}`);
      onClose();
    } catch (error) {
      setError('An error occurred while starting the consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-80 h-auto pl-6 pr-7 pt-6 pb-8 bg-stone-100 rounded-lg flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex justify-between items-center w-full">
          <div className="text-[#141204] text-xl font-normal">
            Consultation Type
          </div>
          <button onClick={onClose} className="bg-transparent">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="w-full text-red-600 text-sm mb-2">
            {error}
          </div>
        )}

        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <button
            onClick={() => startCall('video')}
            disabled={loading}
            className={`w-full h-12 rounded-lg border border-[#004ba8] transition-colors
              ${loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'hover:bg-[#004ba8] hover:text-white'}`}
          >
            <div className={`text-[#004ba8] ${loading ? 'text-gray-500' : 'hover:text-white'} text-xl font-normal`}>
              Video Call
            </div>
          </button>
          <button
            onClick={() => startCall('audio')}
            disabled={loading}
            className={`w-full h-12 rounded-lg border border-[#004ba8] transition-colors
              ${loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'hover:bg-[#004ba8] hover:text-white'}`}
          >
            <div className={`text-[#004ba8] ${loading ? 'text-gray-500' : 'hover:text-white'} text-xl font-normal`}>
              Audio Call
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
