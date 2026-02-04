
import React from 'react';
import { M3Icon, IconName } from '../Icons';
import { useM3Theme } from '../../theme/ThemeConfig';

interface ActivityCardProps {
  icon: IconName;
  label: string;
  value: string;
  color: string;
  onClick: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ icon, label, value, color, onClick }) => {
  const { shape } = useM3Theme();
  
  // Extract icon base color from metric color string (e.g., 'bg-m3-secondaryContainer')
  // For the new UI, we'll use specific semantic colors
  const iconColorClass = icon === IconName.Activity ? 'text-blue-500' :
                         icon === IconName.Heart ? 'text-rose-500' :
                         icon === IconName.Layers ? 'text-indigo-500' : 'text-amber-500';
                         
  const bgClass = icon === IconName.Activity ? 'bg-blue-50' :
                  icon === IconName.Heart ? 'bg-rose-50' :
                  icon === IconName.Layers ? 'bg-indigo-50' : 'bg-amber-50';

  return (
    <button 
      onClick={onClick}
      className={`bg-white p-6 ${shape.card} shadow-sm border border-slate-100 flex flex-col items-center text-center group cursor-pointer hover:shadow-md active:scale-95 transition-all`}
    >
      <div className={`w-14 h-14 ${bgClass} rounded-2xl flex items-center justify-center ${iconColorClass} mb-4 group-hover:scale-110 transition-transform`}>
        <M3Icon name={icon} size={28} />
      </div>
      <p className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest text-[10px]">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </button>
  );
};
