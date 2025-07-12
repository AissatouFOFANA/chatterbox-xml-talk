
import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500">Welcome to ChatApp</h3>
        <p className="text-gray-400">Select a conversation to start chatting</p>
      </div>
    </div>
  );
};
