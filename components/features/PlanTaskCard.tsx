
import React from 'react';
import { useM3Theme } from '../../theme/ThemeConfig';
import { M3Icon, IconName } from '../Icons';

interface PlanTaskCardProps {
  label: string;
  category: string;
  duration: string;
  completed: boolean;
  onToggle: () => void;
}

export const PlanTaskCard: React.FC<PlanTaskCardProps> = ({ label, category, duration, completed, onToggle }) => {
  const { typography, shape } = useM3Theme();

  return (
    <button 
      onClick={onToggle}
      className={`p-dp-16 w-full flex items-center justify-between border transition-all ${
        completed 
          ? 'bg-m3-surfaceContainerLowest border-m3-outline/10 opacity-60' 
          : 'bg-white border-m3-outline/20 shadow-sm'
      } ${shape.card}`}
    >
      <div className="flex items-center gap-dp-16">
        <div className={`w-10 h-10 rounded-m3-full flex items-center justify-center ${
          completed ? 'bg-m3-surfaceVariant' : 'bg-m3-primaryContainer text-m3-onPrimaryContainer'
        }`}>
          <M3Icon name={completed ? IconName.Done : IconName.Zap} size={20} />
        </div>
        <div className="text-left">
          <p className={`${typography.title.medium} ${completed ? 'line-through' : ''}`}>{label}</p>
          <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>{category} • {duration}</p>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-m3-xs border-2 flex items-center justify-center transition-colors ${
        completed ? 'bg-m3-primary border-m3-primary' : 'border-m3-outline/30'
      }`}>
        {completed && <M3Icon name={IconName.Done} size={16} className="text-m3-onPrimary" />}
      </div>
    </button>
  );
};
