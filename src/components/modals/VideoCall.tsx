import React from 'react';
import CallControls from './CallControls';

interface VideoCallProps {
  doctorName: string;
  doctorImage: string;
  patientName: string;
  patientImage: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  doctorName,
  doctorImage,
  patientName,
  patientImage,
  onEndCall,
}) => {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#3b392d] text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <h1 className="text-2xl font-normal">Ongoing Consultation</h1>
      </div>

      {/* Main video (Doctor) */}
      <div className="absolute inset-0 bg-[#e4a853]">
        <img
          src={doctorImage}
          alt={doctorName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Patient video (small overlay) */}
      <div className="absolute bottom-24 right-4 w-32 h-32 bg-[#4a4a4a] rounded-lg overflow-hidden border-2 border-white/20">
        <img
          src={patientImage}
          alt={patientName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-8">
        <CallControls onEndCall={onEndCall} />
      </div>
    </div>
  );
};

export default VideoCall;

