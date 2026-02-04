
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { Badge } from '../components/ui/Badge';
import { ActivityCard } from '../components/features/ActivityCard';

interface DashboardViewProps {
  metrics: any[];
  onSelectActivity: (id: string) => void;
  onStartAI?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ metrics, onSelectActivity, onStartAI }) => {
  const { typography, shape } = useM3Theme();
  
  const healthScores = [
    { label: 'Metabolic', score: 82, color: 'bg-blue-500' },
    { label: 'Cardio', score: 75, color: 'bg-rose-500' },
    { label: 'Sleep', score: 64, color: 'bg-indigo-500' },
    { label: 'Lifestyle', score: 91, color: 'bg-emerald-500' },
  ];

  return (
    <div className="flex flex-col gap-dp-32 animate-in fade-in duration-700 pb-24">
      {/* Greeting */}
      <section className="mt-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Hello, Alex</h2>
        <p className="text-slate-500 font-medium">Intelligent Health Monitoring</p>
      </section>

      {/* Main Score Card - Mesh Background */}
      <section className={`relative overflow-hidden ${shape.card} p-8 mesh-bg-light shadow-2xl shadow-blue-200/50`}>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Overall Health Score</h3>
            <M3Icon name={IconName.Info} size={20} className="text-slate-400 cursor-help" />
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-8xl font-black text-slate-900 tracking-tighter leading-none">78</span>
            <div className="flex flex-col">
              <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                IMPROVING
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-sm font-medium leading-snug max-w-[200px]">
            Peaks in metabolic activity detected. Keep it up!
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/30 rounded-full blur-3xl"></div>
      </section>

      {/* Upcoming Appointment */}
      <section className="space-y-4">
        <h4 className="text-xl font-bold px-1">Upcoming Appointment</h4>
        <div className={`bg-white p-5 ${shape.card} shadow-sm border border-slate-100 flex items-center gap-4 group cursor-pointer active:scale-[0.98] transition-all`}>
          <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-primary">
            <span className="text-[10px] font-bold uppercase">May</span>
            <span className="text-2xl font-black">22</span>
          </div>
          <div className="flex-grow">
            <h5 className="font-bold text-slate-900">Innotech Central</h5>
            <p className="text-sm text-slate-500 font-medium">Dr. Sarah Wilson • 10:30 AM</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
            <M3Icon name={IconName.Calendar} />
          </div>
        </div>
      </section>

      {/* Health Categories */}
      <section className="space-y-4">
        <h4 className="text-xl font-bold px-1">Health Categories</h4>
        <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-6 px-6 pb-2">
          {healthScores.map(item => (
            <div key={item.label} className={`flex-shrink-0 w-36 bg-white p-5 ${shape.card} shadow-sm border border-slate-100 space-y-3`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-3xl font-black text-slate-900">{item.score}</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Tracker Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xl font-bold">Activity Tracker</h4>
          <button className="text-primary text-sm font-bold">Insights</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map(m => (
            <ActivityCard 
              key={m.id}
              icon={m.icon}
              label={m.label}
              value={m.value}
              color={m.color}
              onClick={() => onSelectActivity(m.id)}
            />
          ))}
        </div>
      </section>

      {/* FAB - AI Assistant */}
      <button 
        onClick={window.dispatchEvent.bind(window, new CustomEvent('nav-ai'))}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-100 text-primary rounded-2xl shadow-xl flex items-center justify-center border border-white backdrop-blur-sm active:scale-90 transition-transform z-40"
      >
        <M3Icon name={IconName.Chat} size={28} />
      </button>
    </div>
  );
};
