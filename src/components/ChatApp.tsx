
import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ChatArea } from './ChatArea';
import { UserProfile } from './UserProfile';
import { ContactList } from './ContactList';
import { GroupManager } from './GroupManager';
import { Settings } from './Settings';
import { MessageSquare, Users, User, Settings as SettingsIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

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

const ChatApp = () => {
  const [activeView, setActiveView] = useState<'chat' | 'contacts' | 'groups' | 'profile' | 'settings'>('chat');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const currentUser: User = {
    id: '1',
    name: 'Leo Gill',
    email: 'leo.gill@email.com',
    avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
    status: 'online'
  };

  const conversations: Conversation[] = [
    {
      id: '1',
      type: 'individual',
      name: 'Leo Gill',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      participants: ['1', '2'],
      unreadCount: 2,
      isOnline: true,
      lastMessage: {
        id: '1',
        senderId: '2',
        content: 'Hello Leo! I'm happy to tell you that Acme Air',
        timestamp: new Date(),
        type: 'text',
        delivered: true,
        read: false
      }
    },
    {
      id: '2',
      type: 'individual',
      name: 'Walter Shelton',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      participants: ['1', '3'],
      unreadCount: 1,
      isOnline: false,
      lastMessage: {
        id: '2',
        senderId: '3',
        content: 'Thank you! I'm reporting this internally',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        delivered: true,
        read: false
      }
    },
    {
      id: '3',
      type: 'individual',
      name: 'visitor49',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      participants: ['1', '4'],
      unreadCount: 0,
      isOnline: true,
      lastMessage: {
        id: '3',
        senderId: '1',
        content: 'Sure. Let me tell you about what we offer 😊',
        timestamp: new Date(Date.now() - 7200000),
        type: 'text',
        delivered: true,
        read: true
      }
    }
  ];

  const sidebarItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chats', active: activeView === 'chat' },
    { id: 'contacts', icon: Users, label: 'Contacts', active: activeView === 'contacts' },
    { id: 'groups', icon: Users, label: 'Groups', active: activeView === 'groups' },
    { id: 'profile', icon: User, label: 'Profile', active: activeView === 'profile' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings', active: activeView === 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
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
            onClick={() => setActiveView(item.id as any)}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Panel */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeView === 'chat' && 'Conversations'}
                {activeView === 'contacts' && 'Contacts'}
                {activeView === 'groups' && 'Groups'}
                {activeView === 'profile' && 'Profile'}
                {activeView === 'settings' && 'Settings'}
              </h1>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Content based on active view */}
          <div className="flex-1 overflow-y-auto">
            {activeView === 'chat' && (
              <ConversationList 
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={setSelectedConversation}
                searchQuery={searchQuery}
              />
            )}
            {activeView === 'contacts' && <ContactList searchQuery={searchQuery} />}
            {activeView === 'groups' && <GroupManager searchQuery={searchQuery} />}
            {activeView === 'profile' && <UserProfile user={currentUser} />}
            {activeView === 'settings' && <Settings />}
          </div>
        </div>

        {/* Right Panel - Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation && activeView === 'chat' ? (
            <ChatArea 
              conversation={conversations.find(c => c.id === selectedConversation)!}
              currentUser={currentUser}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500">Welcome to ChatApp</h3>
                <p className="text-gray-400">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
