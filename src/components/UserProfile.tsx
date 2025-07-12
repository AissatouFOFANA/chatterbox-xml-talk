
import React, { useState } from 'react';
import { Edit3, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving user profile:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <Camera className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            className="text-xl font-semibold text-center bg-transparent border-b-2 border-blue-500 focus:outline-none"
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        )}

        <div className="flex items-center justify-center mt-2">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-500">En ligne</span>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="block w-full mt-1 bg-transparent focus:outline-none text-gray-900"
              />
            ) : (
              <p className="text-gray-900">{user.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">Téléphone</label>
            <p className="text-gray-900">+33 6 12 34 56 78</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">Localisation</label>
            <p className="text-gray-900">Paris, France</p>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">Membre depuis</label>
            <p className="text-gray-900">Janvier 2024</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        {isEditing ? (
          <div className="flex space-x-3">
            <Button onClick={handleSave} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              Sauvegarder
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              Annuler
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Modifier le profil
          </Button>
        )}
      </div>

      {/* Status Message */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700 block mb-2">Message de statut</label>
        <textarea
          placeholder="Partagez ce que vous ressentez..."
          className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      </div>
    </div>
  );
};
