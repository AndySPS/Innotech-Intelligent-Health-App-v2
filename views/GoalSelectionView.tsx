
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface GoalSelectionViewProps {
  onSelect: (goal: string) => void;
}

export const GoalSelectionView: React.FC<GoalSelectionViewProps> = ({ onSelect }) => {
  const { typography, shape } = useM3Theme();

  const suggestedGoals = [
    { id: 'insulin', title: 'Improve Insulin Sensitivity', sub: 'High Impact • Based on Lab Report REP-001', icon: IconName.Zap },
    { id: 'cardio', title: 'Cardiovascular Endurance', sub: 'Medium Impact • Targeted at resting HR', icon: IconName.Heart },
    { id: 'weight', title: 'Body Composition Opt.', sub: 'High Impact • Focused on visceral fat', icon: IconName.Activity },
    { id: 'stress', title: 'Cortisol Management', sub: 'Moderate Impact • Better recovery cycles', icon: IconName.Layers },
  ];

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col gap-dp-12 flex-1">
        <p className={`${typography.body.medium} text-m3-onSurfaceVariant`}>
          Our Intelligent Health OS suggests these goals based on your recent blood work and metabolic history.
        </p>

        {suggestedGoals.map(goal => (
          <button 
            key={goal.id}
            onClick={() => onSelect(goal.id)}
            className={`p-dp-20 text-left bg-white border border-m3-outline/20 ${shape.large} shadow-sm hover:border-m3-primary transition-all active:scale-[0.98] flex gap-dp-16 items-center`}
          >
            <div className="p-3 bg-m3-surfaceContainerHigh rounded-m3-md text-m3-onSurface">
              <M3Icon name={goal.icon} size={24} />
            </div>
            <div className="flex-1">
              <h4 className={typography.title.medium}>{goal.title}</h4>
              <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>{goal.sub}</p>
            </div>
            <M3Icon name={IconName.Forward} size={20} className="text-m3-outline" />
          </button>
        ))}
      </div>

      <div className="py-dp-24">
        <button 
          className={`h-dp-48 w-full border border-m3-outline/30 ${shape.full} ${typography.label.large} text-m3-onSurface`}
        >
          BROWSE ALL CATEGORIES
        </button>
      </div>
    </div>
  );
};
