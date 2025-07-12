
import React, { useState } from 'react';
import { UserPlus, Phone, Video, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

interface ContactListProps {
  searchQuery: string;
}

export const ContactList: React.FC<ContactListProps> = ({ searchQuery }) => {
  const [contacts] = useState<Contact[]>([
    {
      id: '2',
      name: 'Leo Gill',
      email: 'leo.gill@email.com',
      phone: '+33 6 12 34 56 78',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      status: 'online'
    },
    {
      id: '3',
      name: 'Walter Shelton',
      email: 'walter.shelton@email.com',
      phone: '+33 6 98 76 54 32',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      status: 'offline',
      lastSeen: 'Il y a 2 heures'
    },
    {
      id: '4',
      name: 'Nina Gutierrez',
      email: 'nina.gutierrez@email.com',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      status: 'away'
    },
    {
      id: '5',
      name: 'Edwin Lawrence',
      email: 'edwin.lawrence@email.com',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      status: 'online'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (contact: Contact) => {
    switch (contact.status) {
      case 'online': return 'En ligne';
      case 'away': return 'Absent';
      default: return contact.lastSeen || 'Hors ligne';
    }
  };

  return (
    <div className="p-4">
      {/* Add Contact Button */}
      <Button className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white">
        <UserPlus className="w-4 h-4 mr-2" />
        Ajouter un contact
      </Button>

      {/* Contacts List */}
      <div className="space-y-3">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}></div>
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                <p className="text-xs text-gray-400">{getStatusText(contact)}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-500">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p>Aucun contact trouvé</p>
        </div>
      )}
    </div>
  );
};
