import React from 'react';
import CallControls from './CallControls';
import { Volume2 } from 'lucide-react';

interface AudioCallProps {
  doctorName: string;
  doctorImage: string;
  patientName: string;
  patientImage: string;
  onEndCall: () => void;
}

const AudioCall: React.FC<AudioCallProps> = ({
  doctorName,
  doctorImage,
  patientName,
  patientImage,
  onEndCall,
}) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#3b392d] text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-normal">Ongoing Consultation</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Doctor's audio card */}
        <div className="relative">
          <div className="w-[200px] h-[180px] rounded-lg bg-[#e4a853] overflow-hidden">
            <img
              src={doctorImage}
              alt={doctorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-black/30 rounded-full flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Patient's audio card */}
        <div className="absolute bottom-24 right-4 w-[150px] h-[120px] bg-[#626158] rounded-lg overflow-hidden">
          <img
            src={patientImage}
            alt={patientName}
            className="w-full h-full object-cover"
          />
          <div className="absolute -top-1 -right-[2px] w-6 h-6 bg-black/30 rounded-full flex items-center justify-center">
            <Volume2 className="w-4 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-8">
        <CallControls onEndCall={onEndCall} />
      </div>
    </div>
  );
};

export default AudioCall;

