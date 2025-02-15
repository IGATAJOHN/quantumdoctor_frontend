import React from 'react';
import { Mic, Camera, PhoneOff } from 'lucide-react';

interface CallControlsProps {
  onEndCall: () => void;
}

const CallControls: React.FC<CallControlsProps> = ({ onEndCall }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isCameraOff, setIsCameraOff] = React.useState(false);

  return (
    <div className="flex gap-2 bg-black/20 backdrop-blur-sm p-2 rounded-lg">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`p-3 rounded-full ${
          isMuted ? 'bg-red-500' : 'bg-black/30'
        } hover:bg-black/40 transition-colors`}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Mic className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => setIsCameraOff(!isCameraOff)}
        className={`p-3 rounded-full ${
          isCameraOff ? 'bg-red-500' : 'bg-black/30'
        } hover:bg-black/40 transition-colors`}
        aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
      >
        <Camera className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={onEndCall}
        className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        aria-label="End call"
      >
        <PhoneOff className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default CallControls;

