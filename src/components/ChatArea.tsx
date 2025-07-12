
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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

interface ChatAreaProps {
  conversation: Conversation;
  currentUser: User;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ conversation, currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      content: 'Hello Leo! I\'m happy to tell you that Acme Air Max are back in stock 😊',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '2',
      senderId: '1',
      content: 'We are out of stock now.',
      timestamp: new Date(Date.now() - 240000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'We are planning to have other sizes starting tomorrow, so let me know.',
      timestamp: new Date(Date.now() - 180000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '4',
      senderId: '2',
      content: 'Shall I contact you when it\'s available again?',
      timestamp: new Date(Date.now() - 120000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '5',
      senderId: '1',
      content: 'Yes! Please.',
      timestamp: new Date(Date.now() - 60000),
      type: 'text',
      delivered: true,
      read: true
    },
    {
      id: '6',
      senderId: '1',
      content: 'Have a nice day! 😊',
      timestamp: new Date(Date.now() - 30000),
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

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        content: message.trim(),
        timestamp: new Date(),
        type: 'text',
        delivered: true,
        read: false
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {conversation.name.charAt(0).toUpperCase()}
            </div>
            {conversation.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{conversation.name}</h2>
            <p className="text-sm text-gray-500">
              {conversation.isOnline ? 'En ligne' : 'Vu récemment'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => {
          const isOwn = msg.senderId === currentUser.id;
          const showTimestamp = index === 0 || 
            (messages[index - 1] && 
             new Date(msg.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000);

          return (
            <div key={msg.id}>
              {showTimestamp && (
                <div className="text-center text-xs text-gray-500 mb-4">
                  {formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: fr })}
                </div>
              )}
              
              <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {isOwn && (
                      <span className="ml-1">
                        {msg.read ? '✓✓' : msg.delivered ? '✓' : '○'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tapez votre message..."
              className="w-full px-4 py-2 pr-12 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
