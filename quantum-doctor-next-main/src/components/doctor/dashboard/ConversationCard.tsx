import React from 'react';

interface Conversation {
  id: number;
  name: string;
  message: string;
  date: string;
  imageUrl: string;
}

interface ConversationCardProps {
  conversation: Conversation;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ conversation }) => {
  return (
    <>
    <ul role="list" className="divide-y divide-white/5">
        <li className="flex gap-x-4 py-5">
          <img src={conversation.imageUrl} alt={conversation.name} className="size-12 flex-none rounded-full bg-gray-50" />
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm/6 font-semibold text-gray-900">{conversation.name}</p>
              <p className="flex-none text-xs text-gray-600">
                <time dateTime={conversation.date}>{conversation.date}</time>
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-sm/6 text-gray-600">{conversation.message}</p>
          </div>
        </li>
      
    </ul>
    </>
  );
};

export default ConversationCard;




