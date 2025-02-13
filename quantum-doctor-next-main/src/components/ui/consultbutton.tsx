import React from 'react';
import { Phone } from 'lucide-react';
const StartConsultationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="w-48 h-11 relative">
      <div className="w-48 h-11 left-0 top-0 absolute rounded-lg border border-[#5587c5]" />
      <div className="w-44 h-8 p-2.5 left-[8px] top-[6px] absolute bg-[#004ba8] rounded-lg justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#fffafb] text-sm font-medium font-['Inter']"><Phone className="w-4 h-4 text-white inline-flex" /> Start Consultation</div>
      </div>
    </button>
  );
};

export default StartConsultationButton
