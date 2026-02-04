
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface SettingsViewProps {
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onLogout }) => {
  const { typography, shape } = useM3Theme();
  const settings = [
    { icon: IconName.Profile, label: 'Personal Profile', sub: 'Alex Thompson' },
    { icon: IconName.Layers, label: 'Medical Profile', sub: 'Updated 2 days ago' },
    { icon: IconName.Notification, label: 'Notification Preferences', sub: 'Enabled' },
    { icon: IconName.Settings, label: 'Connected Devices', sub: 'Apple Watch, Withings' },
  ];
  return (
    <div className="flex flex-col gap-dp-24 animate-in fade-in duration-500">
      <h2 className={typography.headline.small}>Settings</h2>
      <div className="flex flex-col bg-m3-surfaceContainerLowest rounded-m3-xl border border-m3-outline/10 overflow-hidden shadow-sm">
        {settings.map((item, idx) => (
          <button key={item.label} className={`flex items-center gap-dp-16 p-dp-16 hover:bg-m3-surfaceVariant transition-colors text-left ${idx !== settings.length - 1 ? 'border-b border-m3-outline/10' : ''}`}>
            <div className="w-10 h-10 rounded-m3-full bg-m3-surfaceContainer flex items-center justify-center">
              <M3Icon name={item.icon} size={20} className="text-m3-onSurfaceVariant" />
            </div>
            <div className="flex-1">
              <p className={typography.title.medium}>{item.label}</p>
              <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={onLogout} className={`h-dp-48 mt-dp-16 text-m3-error ${shape.medium} border border-m3-error/20 hover:bg-m3-error/5 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide`}>
        LOGOUT
      </button>
    </div>
  );
};
