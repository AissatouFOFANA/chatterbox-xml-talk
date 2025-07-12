import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StatusIndicator } from './StatusIndicator';
import { NotificationBadge } from './NotificationBadge';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  delivered: boolean;
  read: boolean;
}

interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchQuery
}) => {
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y divide-gray-100">
      {filteredConversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
            selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {conversation.name.charAt(0).toUpperCase()}
              </div>
              <StatusIndicator 
                isOnline={conversation.isOnline} 
                className="absolute -bottom-1 -right-1" 
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 truncate">
                  {conversation.name}
                </h3>
                {conversation.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(conversation.lastMessage.timestamp, { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage?.content || 'Nouvelle conversation'}
                </p>
                
                <NotificationBadge count={conversation.unreadCount} />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {filteredConversations.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>Aucune conversation trouvée</p>
        </div>
      )}
    </div>
  );
};
