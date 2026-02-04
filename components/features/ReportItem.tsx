
import React from 'react';
import { useM3Theme } from '../../theme/ThemeConfig';
import { Badge } from '../ui/Badge';

interface ReportItemProps {
  id: string;
  packageName: string;
  date: string;
  clinic: string;
  summary: string;
  unread: boolean;
  onClick: () => void;
}

export const ReportItem: React.FC<ReportItemProps> = ({ packageName, date, clinic, summary, unread, onClick }) => {
  const { typography, shape } = useM3Theme();
  return (
    <button 
      onClick={onClick}
      className={`p-dp-16 bg-m3-surfaceContainerLow ${shape.card} text-left border border-m3-outline/10 hover:bg-m3-surfaceContainerHigh transition-all active:scale-[0.98] relative overflow-hidden shadow-sm`}
    >
      {unread && (
        <div className="absolute top-0 right-0 w-8 h-8 bg-m3-primary text-white flex items-center justify-center rounded-bl-m3-xl">
          <span className="text-[10px] font-bold -mt-1 ml-1 uppercase">New</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start pr-8">
          <p className={`${typography.label.small} text-m3-primary`}>{date}</p>
          <Badge color="bg-green-600">Released</Badge>
        </div>
        <h3 className={typography.title.medium}>{packageName}</h3>
        <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>{clinic}</p>
        <div className="mt-dp-8 p-dp-8 bg-m3-surfaceContainerHighest/50 rounded-m3-sm italic text-m3-onSurface/80 border-l-2 border-m3-primary/20">
           <p className={typography.body.small}>"{summary}"</p>
        </div>
      </div>
    </button>
  );
};
