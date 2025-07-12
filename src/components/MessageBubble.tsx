
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isOwn, 
  showAvatar = false 
}) => {
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-2 flex-shrink-0">
            U
          </div>
        )}

        {/* Message Content */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-blue-500 text-white rounded-tr-sm'
              : 'bg-white text-gray-900 border border-gray-200 rounded-tl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {/* Message Status and Time */}
          <div className={`flex items-center justify-end mt-1 space-x-1 ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}>
            <span className="text-xs">{formatTime(message.timestamp)}</span>
            {isOwn && (
              <div className="flex items-center">
                {message.read ? (
                  <CheckCheck className="w-3 h-3 text-blue-200" />
                ) : message.delivered ? (
                  <CheckCheck className="w-3 h-3 text-blue-300" />
                ) : (
                  <Check className="w-3 h-3 text-blue-300" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
