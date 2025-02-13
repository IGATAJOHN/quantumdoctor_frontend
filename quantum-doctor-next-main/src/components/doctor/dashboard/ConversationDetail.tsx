import React from 'react';
import { Send } from 'lucide-react';

interface ConversationDetailProps {
  conversation: {
    name: string;
    imageUrl: string;
    lastConsultation: string;
    message: string;
  };
  onClose: () => void;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({ conversation, onClose }) => {
  return (
    <div className="w-full h-full bg-[#fffafb] rounded-lg border border-[#d0cfcc] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#d0cfcc] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img className="w-8 h-8 rounded-full" src={conversation.imageUrl} alt={conversation.name} />
          <div className="text-[#3b392d] text-lg font-medium font-['Inter']">{conversation.name}</div>
        </div>
        <button onClick={onClose} className="text-[#3b392d] hover:text-[#004ba8]">
          Close
        </button>
      </div>

      {/* Consultation badge */}
      <div className="p-4">
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full">
          <div className="text-[#5587c5] text-xs font-normal font-['Inter']">
            Had Consultation {conversation.lastConsultation}
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="p-2.5 bg-[#f4f9ff] rounded-lg">
          <p className="text-black text-sm font-normal font-['Inter'] whitespace-pre-wrap">
            {conversation.message}
          </p>
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-[#d0cfcc]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Text Here"
            className="flex-grow px-4 py-2 rounded-lg border border-[#d0cfcc] text-[#3b392d] text-sm font-normal font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#004ba8]"
          />
          <button className="w-10 h-10 bg-[#004ba8] rounded-lg flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;

