
import React from 'react';

export enum IconName {
  Home = 'home',
  Settings = 'settings',
  Search = 'search',
  Menu = 'menu',
  Back = 'chevron_left',
  Forward = 'chevron_right',
  More = 'more_vert',
  Notification = 'notifications',
  Profile = 'person',
  Add = 'add',
  Done = 'check',
  Info = 'info',
  Warning = 'warning',
  Email = 'mail',
  Calendar = 'calendar_today',
  Layers = 'layers',
  MapPin = 'location_on',
  Star = 'star',
  Activity = 'show_chart',
  Heart = 'favorite',
  Zap = 'bolt',
  Chat = 'chat_bubble',
  Send = 'send'
}

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
}

export const M3Icon: React.FC<IconProps> = ({ name, size = 24, className = '' }) => {
  return (
    <span 
      className={`material-symbols-rounded select-none ${className}`} 
      style={{ 
        fontSize: size,
        width: size,
        height: size,
        overflow: 'hidden'
      }}
    >
      {name}
    </span>
  );
};
