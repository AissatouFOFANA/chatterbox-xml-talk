
import React from 'react';
import { MessageSquare, Users, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActiveView } from '@/types/chat';

interface ChatSidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ activeView, onViewChange }) => {
  const sidebarItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chats', active: activeView === 'chat' },
    { id: 'contacts', icon: Users, label: 'Contacts', active: activeView === 'contacts' },
    { id: 'groups', icon: Users, label: 'Groups', active: activeView === 'groups' },
    { id: 'profile', icon: User, label: 'Profile', active: activeView === 'profile' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings', active: activeView === 'settings' },
  ];

  return (
    <div className="w-16 bg-slate-800 flex flex-col items-center py-4 space-y-4">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        C
      </div>
      
      {sidebarItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="sm"
          className={`w-10 h-10 p-0 rounded-lg transition-colors ${
            item.active 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'text-gray-400 hover:text-white hover:bg-slate-700'
          }`}
          onClick={() => onViewChange(item.id as ActiveView)}
        >
          <item.icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
};
