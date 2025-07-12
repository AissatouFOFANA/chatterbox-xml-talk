
import React, { useState } from 'react';
import { Users, Plus, Settings, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  isAdmin: boolean;
  lastActivity: Date;
}

interface GroupManagerProps {
  searchQuery: string;
}

export const GroupManager: React.FC<GroupManagerProps> = ({ searchQuery }) => {
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Équipe Développement',
      description: 'Discussion technique et coordination',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      memberCount: 8,
      isAdmin: true,
      lastActivity: new Date(Date.now() - 600000)
    },
    {
      id: '2',
      name: 'Famille',
      description: 'Groupe familial',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      memberCount: 5,
      isAdmin: false,
      lastActivity: new Date(Date.now() - 1800000)
    },
    {
      id: '3',
      name: 'Amis Université',
      description: 'Anciens camarades de classe',
      avatar: '/lovable-uploads/b3562943-f898-4056-8f66-3212fc1f75df.png',
      memberCount: 12,
      isAdmin: true,
      lastActivity: new Date(Date.now() - 3600000)
    }
  ]);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Create Group Button */}
      <Button className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white">
        <Plus className="w-4 h-4 mr-2" />
        Créer un groupe
      </Button>

      {/* Groups List */}
      <div className="space-y-3">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
              {/* Group Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                <Users className="w-6 h-6" />
              </div>

              {/* Group Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900 truncate">{group.name}</h3>
                  {group.isAdmin && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">{group.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {group.memberCount} membre{group.memberCount > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(group.lastActivity).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-1">
                {group.isAdmin && (
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                    <Settings className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p>Aucun groupe trouvé</p>
        </div>
      )}
    </div>
  );
};
