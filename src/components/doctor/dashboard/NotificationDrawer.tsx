'use client';

import React from 'react';
import { X, FileIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface Notification {
  id: number;
  type: 'consultationRequest' | 'conversation' | 'fileShared' | 'comment';
  message: string;
  time: string;
  isUnread?: boolean;
  sender: {
    name: string;
    initials: string;
    avatar?: string;
  };
  actions?: {
    accept?: () => void;
    decline?: () => void;
  };
  details?: {
    fileName?: string;
    fileSize?: string;
    commentCount?: number;
  };
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, notifications }) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
      <div className="flex justify-between items-center p-6 border-b border-[#ebedf0]">
        <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-[#004ba8] text-sm font-medium">
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
     
    </div>
  );
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  switch (notification.type) {
    case 'consultationRequest':
      return <ConsultationRequestNotification notification={notification} />;
    case 'conversation':
      return <ConversationNotification notification={notification} />;
    case 'fileShared':
      return <FileSharedNotification notification={notification} />;
    case 'comment':
      return <CommentNotification notification={notification} />;
    default:
      return null;
  }
};

const ConsultationRequestNotification: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={`p-6 ${notification.isUnread ? 'bg-blue-50' : 'bg-white'} flex items-start gap-3 border-b border-slate-200 relative`}>
      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
        <span className="text-[#72839a] text-xl font-semibold">{notification.sender.initials}</span>
      </div>
      <div className="flex-grow">
        <p className="text-[#626157] text-sm mb-2">{notification.message}</p>
        <div className="flex gap-2">
          <Button size="sm" onClick={notification.actions?.accept}>Accept</Button>
          <Button size="sm" variant="outline" onClick={notification.actions?.decline}>Decline</Button>
        </div>
      </div>
      <span className="text-slate-600 text-xs">{notification.time}</span>
      {notification.isUnread && (
        <div className="w-2 h-2 bg-[#2e70e8] rounded-full absolute top-2 right-2" />
      )}
    </div>
  );
};

const ConversationNotification: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className="p-6 bg-white flex items-start gap-3 border-b border-slate-200">
      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
        <span className="text-[#72839a] text-xl font-semibold">{notification.sender.initials}</span>
      </div>
      <div className="flex-grow">
        <p className="text-slate-700 text-sm mb-2">
          <span className="font-semibold">{notification.sender.name}</span> sent you a Conversation
        </p>
        <div className="flex items-start gap-2.5">
          <div className="w-1 self-stretch bg-slate-200 rounded-sm" />
          <p className="text-slate-600 text-sm">{notification.message}</p>
        </div>
      </div>
      <span className="text-slate-600 text-xs">{notification.time}</span>
    </div>
  );
};

const FileSharedNotification: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className="p-6 bg-white flex items-start gap-3 border-b border-slate-200">
      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
        {notification.sender.avatar ? (
          <img src={notification.sender.avatar} alt={notification.sender.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#72839a] text-xl font-semibold">{notification.sender.initials}</span>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <p className="text-slate-700 text-sm mb-2">
          <span className="font-semibold">{notification.sender.name}</span> has shared a file with you
        </p>
        <div className="flex items-center gap-1.5">
          <FileIcon className="w-5 h-5 text-slate-500" />
          <span className="text-slate-800 text-xs font-medium">{notification.details?.fileName}</span>
          <span className="text-slate-500 text-xs">{notification.details?.fileSize}</span>
        </div>
      </div>
      <span className="text-slate-600 text-xs">{notification.time}</span>
    </div>
  );
};

const CommentNotification: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className="p-6 bg-white flex items-start gap-3 border-b border-slate-200">
      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
        <span className="text-[#72839a] text-xl font-semibold">{notification.sender.initials}</span>
      </div>
      <div className="flex-grow">
        <p className="text-slate-700 text-sm">
          <span className="font-semibold">{notification.sender.name} and {notification.details?.commentCount} others</span> added comments on <span className="font-semibold">Design Assets - Smart Tags file</span>
        </p>
      </div>
      <span className="text-slate-600 text-xs">{notification.time}</span>
    </div>
  );
};

export default NotificationDrawer;

