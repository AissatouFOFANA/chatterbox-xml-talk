
import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from './StatusIndicator';
import { Conversation } from '@/types/chat';

interface ChatHeaderProps {
  conversation: Conversation;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {conversation.name.charAt(0).toUpperCase()}
          </div>
          <StatusIndicator 
            isOnline={conversation.isOnline} 
            className="absolute -bottom-1 -right-1" 
          />
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
          <p className="text-sm text-gray-500">
            {conversation.isOnline ? 'En ligne' : 'Vu dernièrement il y a 2h'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
