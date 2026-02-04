
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { GoalCard } from '../components/features/GoalCard';
import { PlanTaskCard } from '../components/features/PlanTaskCard';

interface HealthPlanViewProps {
  onAddGoal: () => void;
}

export const HealthPlanView: React.FC<HealthPlanViewProps> = ({ onAddGoal }) => {
  const { typography, shape } = useM3Theme();
  
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Fasted Morning Walk', category: 'Metabolic', duration: '20 min', completed: false },
    { id: 2, label: 'Omega-3 Supplement', category: 'Nutrition', duration: '1 cap', completed: true },
    { id: 3, label: 'HIIT Session', category: 'Cardio', duration: '15 min', completed: false },
    { id: 4, label: 'Deep Breathing', category: 'Recovery', duration: '5 min', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="flex flex-col gap-dp-24 animate-in fade-in duration-500 pb-dp-48">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={typography.headline.small}>Health Optimizer</h2>
          <p className={`${typography.body.medium} text-m3-onSurfaceVariant`}>Based on your Metabolic Signature</p>
        </div>
        <button 
          onClick={onAddGoal}
          className="p-3 bg-m3-primaryContainer text-m3-onPrimaryContainer rounded-m3-full shadow-sm active:scale-90 transition-all"
        >
          <M3Icon name={IconName.Add} size={24} />
        </button>
      </div>

      <section className="flex flex-col gap-dp-12">
        <h3 className={typography.title.large}>Active Goals</h3>
        <GoalCard 
          title="Insulin Sensitivity"
          progress={65}
          icon={IconName.Zap}
          statusText="On track • 4 days streak"
          active
        />
        <GoalCard 
          title="Sleep Hygiene"
          progress={32}
          icon={IconName.Layers}
          statusText="Needs attention • 2 late nights"
        />
      </section>

      <section className="flex flex-col gap-dp-16">
        <div className="flex justify-between items-end">
          <h3 className={typography.title.large}>Daily Plan</h3>
          <p className={`${typography.label.large} text-m3-primary`}>
            {tasks.filter(t => t.completed).length}/{tasks.length} Done
          </p>
        </div>
        <div className="flex flex-col gap-dp-8">
          {tasks.map(task => (
            <PlanTaskCard 
              key={task.id}
              label={task.label}
              category={task.category}
              duration={task.duration}
              completed={task.completed}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </section>

      <div className={`p-dp-16 bg-m3-surfaceContainerHighest/40 border border-m3-outline/10 ${shape.large} flex gap-dp-16 items-start`}>
        <div className="p-2 bg-m3-secondaryContainer rounded-m3-md">
          <M3Icon name={IconName.Info} size={20} />
        </div>
        <div className="flex-1">
          <p className={typography.title.small}>AI Optimizer Tip</p>
          <p className={`${typography.body.small} text-m3-onSurfaceVariant mt-1`}>
            Your metabolic rate is highest in the next 2 hours. Completing your HIIT session now will double your post-exercise oxygen consumption.
          </p>
        </div>
      </div>
    </div>
  );
};
