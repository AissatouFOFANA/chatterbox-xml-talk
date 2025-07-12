
import React from 'react';
import { ChatArea } from './ChatArea';
import { WelcomeScreen } from './WelcomeScreen';
import { ActiveView, Conversation, User } from '@/types/chat';

interface ChatMainContentProps {
  activeView: ActiveView;
  selectedConversation: string | null;
  conversations: Conversation[];
  currentUser: User;
}

export const ChatMainContent: React.FC<ChatMainContentProps> = ({
  activeView,
  selectedConversation,
  conversations,
  currentUser
}) => {
  if (selectedConversation && activeView === 'chat') {
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (conversation) {
      return (
        <div className="flex-1 flex flex-col">
          <ChatArea 
            conversation={conversation}
            currentUser={currentUser}
          />
        </div>
      );
    }
  }

  return <WelcomeScreen />;
};
