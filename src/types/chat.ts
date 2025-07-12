
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  delivered: boolean;
  read: boolean;
}

export interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

export type ActiveView = 'chat' | 'contacts' | 'groups' | 'profile' | 'settings';
