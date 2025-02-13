'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  doctorImage: string;
  patientName: string;
  patientImage: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  doctorName,
  doctorImage,
  patientName,
  patientImage,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const startCall = (type: 'video' | 'audio') => {
    const params = new URLSearchParams({
      doctorName,
      doctorImage,
      patientName,
      patientImage,
    });

    router.push(`/dashboard/doctor/consultations/call/${type}?${params.toString()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-80 h-56 pl-6 pr-7 pt-6 pb-8 bg-stone-100 rounded-lg flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex justify-between items-center w-full">
          <div className="text-[#141204] text-xl font-normal font-['Inter']">
            Consultation Type
          </div>
          <button onClick={onClose} className="bg-transparent">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="self-stretch h-28 flex-col justify-start items-start gap-6 flex">
          <button
            onClick={() => startCall('video')}
            className="w-full h-12 rounded-lg border border-[#004ba8] hover:bg-[#004ba8] hover:text-white transition-colors"
          >
            <div className="text-[#004ba8] hover:text-white text-xl font-normal font-['Inter']">
              Video Call
            </div>
          </button>
          <button
            onClick={() => startCall('audio')}
            className="w-full h-12 rounded-lg border border-[#004ba8] hover:bg-[#004ba8] hover:text-white transition-colors"
          >
            <div className="text-[#004ba8] hover:text-white text-xl font-normal font-['Inter']">
              Audio Call
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;

