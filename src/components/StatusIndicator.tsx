
import React from 'react';

interface StatusIndicatorProps {
  isOnline?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  isOnline = false, 
  className = '' 
}) => {
  return (
    <div
      className={`w-3 h-3 rounded-full border-2 border-white ${
        isOnline ? 'bg-green-400' : 'bg-gray-400'
      } ${className}`}
    />
  );
};
