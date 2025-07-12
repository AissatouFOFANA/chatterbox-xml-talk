
import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  HelpCircle, 
  Info,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Notifications push',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        },
        {
          icon: Bell,
          label: 'Sons de notification',
          type: 'link'
        }
      ]
    },
    {
      title: 'Apparence',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: 'Mode sombre',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode
        },
        {
          icon: Palette,
          label: 'Thème de couleur',
          type: 'link'
        }
      ]
    },
    {
      title: 'Compte',
      items: [
        {
          icon: Shield,
          label: 'Confidentialité et sécurité',
          type: 'link'
        },
        {
          icon: Globe,
          label: 'Langue',
          type: 'select',
          value: language,
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' }
          ]
        }
      ]
    },
    {
      title: 'Données',
      items: [
        {
          icon: Download,
          label: 'Exporter les données',
          type: 'link'
        },
        {
          icon: Trash2,
          label: 'Supprimer le compte',
          type: 'link',
          danger: true
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Centre d\'aide',
          type: 'link'
        },
        {
          icon: Info,
          label: 'À propos',
          type: 'link'
        }
      ]
    }
  ];

  return (
    <div className="p-4">
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-gray-400'}`} />
                    <span className={`${item.danger ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.type === 'toggle' && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.value}
                        onChange={(e) => item.onChange?.(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  )}

                  {item.type === 'select' && (
                    <select
                      value={item.value}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {item.type === 'link' && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* App Version */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>ChatApp Version 1.0.0</p>
        <p className="mt-1">© 2024 - Tous droits réservés</p>
      </div>
    </div>
  );
};
