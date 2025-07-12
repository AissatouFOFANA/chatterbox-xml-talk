
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { Conversation, User, Message } from '@/types/chat';

interface ChatAreaProps {
  conversation: Conversation;
  currentUser: User;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ conversation, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      content: 'Salut ! Comment ça va ?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '2',
      senderId: '1',
      content: 'Ça va bien merci ! Et toi ?',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'Super ! J\'ai quelque chose d\'intéressant à te montrer 😊',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      delivered: true,
      read: false
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type: 'text',
      delivered: false,
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, delivered: true }
            : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader conversation={conversation} />
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
            showAvatar={message.senderId !== currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};
