
import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { LeftPanel } from './LeftPanel';
import { ChatMainContent } from './ChatMainContent';
import { ActiveView, User, Conversation } from '@/types/chat';

const ChatApp = () => {
  const [activeView, setActiveView] = useState<ActiveView>('chat');
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
        content: 'Hello Leo! I\'m happy to tell you that Acme Air',
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
        content: 'Thank you! I\'m reporting this internally',
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

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar 
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <div className="flex-1 flex">
        <LeftPanel
          activeView={activeView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          currentUser={currentUser}
        />

        <ChatMainContent
          activeView={activeView}
          selectedConversation={selectedConversation}
          conversations={conversations}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ChatApp;
