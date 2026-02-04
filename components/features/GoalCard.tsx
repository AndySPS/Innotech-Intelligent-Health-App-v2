
import React from 'react';
import { useM3Theme } from '../../theme/ThemeConfig';
import { M3Icon, IconName } from '../Icons';

interface GoalCardProps {
  title: string;
  progress: number;
  icon: IconName;
  statusText: string;
  active?: boolean;
}

export const GoalCard: React.FC<GoalCardProps> = ({ title, progress, icon, statusText, active = false }) => {
  const { typography, shape } = useM3Theme();

  return (
    <div className={`p-dp-16 ${shape.card} border ${
      active ? 'bg-m3-secondaryContainer border-m3-secondaryContainer text-m3-onSecondaryContainer' : 'bg-white border-m3-outline/10'
    } shadow-sm flex flex-col gap-dp-12 transition-all`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-dp-12">
          <div className={`p-2 rounded-m3-sm ${active ? 'bg-m3-primary text-m3-onPrimary' : 'bg-m3-surfaceContainerHighest'}`}>
            <M3Icon name={icon} size={20} />
          </div>
          <h4 className={typography.title.medium}>{title}</h4>
        </div>
        <span className={`${typography.title.large} ${active ? 'text-m3-primary' : ''}`}>{progress}%</span>
      </div>
      
      <div className="flex flex-col gap-dp-4">
        <div className="h-2 w-full bg-m3-outline/10 rounded-m3-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${active ? 'bg-m3-primary' : 'bg-m3-outline/40'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={`${typography.label.medium} text-m3-onSurfaceVariant`}>{statusText}</p>
      </div>
    </div>
  );
};
