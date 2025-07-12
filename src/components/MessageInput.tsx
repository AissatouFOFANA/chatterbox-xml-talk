
import React, { useState } from 'react';
import { Paperclip, Smile, Send, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-blue-500 p-2"
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="pr-20 py-3 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            multiline
          />
          
          {/* Emoji and Image buttons inside input */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-blue-500 p-1"
            >
              <Image className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-blue-500 p-1"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            className="text-gray-500 hover:text-blue-500 rounded-full w-10 h-10 p-0"
          >
            <Mic className="w-5 h-5" />
          </Button>
        )}
      </form>
    </div>
  );
};
