
import React from 'react';
import { Search } from 'lucide-react';
import { ConversationList } from './ConversationList';
import { ContactList } from './ContactList';
import { GroupManager } from './GroupManager';
import { UserProfile } from './UserProfile';
import { Settings } from './Settings';
import { ActiveView, Conversation, User } from '@/types/chat';

interface LeftPanelProps {
  activeView: ActiveView;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  currentUser: User;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  activeView,
  searchQuery,
  onSearchChange,
  conversations,
  selectedConversation,
  onSelectConversation,
  currentUser
}) => {
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'chat': return 'Conversations';
      case 'contacts': return 'Contacts';
      case 'groups': return 'Groups';
      case 'profile': return 'Profile';
      case 'settings': return 'Settings';
      default: return 'Conversations';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-800">
            {getHeaderTitle()}
          </h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Content based on active view */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'chat' && (
          <ConversationList 
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={onSelectConversation}
            searchQuery={searchQuery}
          />
        )}
        {activeView === 'contacts' && <ContactList searchQuery={searchQuery} />}
        {activeView === 'groups' && <GroupManager searchQuery={searchQuery} />}
        {activeView === 'profile' && <UserProfile user={currentUser} />}
        {activeView === 'settings' && <Settings />}
      </div>
    </div>
  );
};
