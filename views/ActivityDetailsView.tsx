
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface ActivityDetailsViewProps {
  metric: any;
}

export const ActivityDetailsView: React.FC<ActivityDetailsViewProps> = ({ metric }) => {
  const { typography, shape } = useM3Theme();
  const [filter, setFilter] = useState('DAILY');

  // Heart Rate specific colors if the metric is heart rate
  const isHeartRate = metric.id === 'heart';
  const accentColor = isHeartRate ? 'text-primary' : metric.color;
  const accentBg = isHeartRate ? 'bg-primary' : metric.bgColor;

  return (
    <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-8 duration-300 pb-10">
      
      {/* Current Snapshot Card */}
      <section className={`bg-white p-8 ${shape.extraLarge} shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden text-center`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full opacity-20"></div>
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Current Snapshot</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-6xl font-extrabold tracking-tighter text-slate-900">{metric.value}</span>
            <span className="text-xl font-semibold text-slate-300">{metric.unit}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-emerald-500 font-bold text-sm">
            <M3Icon name={IconName.Activity} size={16} className="fill-emerald-500" />
            <span>+8% from yesterday</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs - Pill shaped exactly like screenshot */}
      <div className="bg-slate-100/80 p-1 rounded-full flex items-center mx-4 border border-slate-200/50">
        {['DAILY', 'WEEKLY', 'MONTHLY'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            className={`flex-1 py-2 text-[10px] font-black rounded-full transition-all duration-300 ${
              filter === f 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* History Chart Section */}
      <section className={`bg-white p-6 ${shape.extraLarge} border border-slate-100 shadow-sm`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-800">History</h2>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${accentBg}`}></span>
            <span className="text-[11px] font-bold text-slate-400">{metric.label}</span>
          </div>
        </div>

        <div className="relative h-48 w-full">
          {/* Target Zone Overlay */}
          <div className="absolute inset-x-0 top-1/4 bottom-1/4 bg-slate-50/50 border-y border-dashed border-slate-200 flex items-center justify-end pr-2 pointer-events-none">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Target Zone</span>
          </div>
          
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2"></stop>
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            
            {/* Horizontal Grid Lines */}
            <line className="text-slate-50" stroke="currentColor" strokeWidth="1" x1="0" x2="400" y1="30" y2="30"></line>
            <line className="text-slate-50" stroke="currentColor" strokeWidth="1" x1="0" x2="400" y1="75" y2="75"></line>
            <line className="text-slate-50" stroke="currentColor" strokeWidth="1" x1="0" x2="400" y1="120" y2="120"></line>
            
            {/* Area Fill */}
            <path 
              d="M0,150 L0,110 C40,105 60,130 100,100 C140,70 160,85 200,60 C240,35 260,100 300,90 C340,80 360,40 400,30 L400,150 Z" 
              fill="url(#chartGradient)"
            ></path>
            
            {/* Line Path */}
            <path 
              d="M0,110 C40,105 60,130 100,100 C140,70 160,85 200,60 C240,35 260,100 300,90 C340,80 360,40 400,30" 
              fill="none" 
              stroke="#EF4444" 
              strokeLinecap="round" 
              strokeWidth="3"
            ></path>
            
            {/* Current Point Marker */}
            <circle className="fill-primary" cx="200" cy="60" r="5"></circle>
            <circle className="fill-primary/20" cx="200" cy="60" r="12"></circle>
          </svg>

          {/* Floating Tooltip */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg pointer-events-none">
            124 bpm · 1:45 PM
          </div>
        </div>

        <div className="flex justify-between mt-6 px-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <span key={idx} className={`text-[10px] font-black ${idx === 6 ? 'text-slate-900' : 'text-slate-400'}`}>
              {day}
            </span>
          ))}
        </div>
      </section>

      {/* Summary Metrics Grid */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
          <p className="text-[9px] font-extrabold uppercase text-slate-400 mb-1">Avg HR</p>
          <p className="text-xl font-black tracking-tight text-slate-900">68</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">bpm</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
          <p className="text-[9px] font-extrabold uppercase text-slate-400 mb-1">Max HR</p>
          <p className="text-xl font-black tracking-tight text-primary">145</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">bpm</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
          <p className="text-[9px] font-extrabold uppercase text-slate-400 mb-1">Resting</p>
          <p className="text-xl font-black tracking-tight text-emerald-500">58</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">bpm</p>
        </div>
      </section>

      {/* AI Performance Lab Section */}
      <section className="bg-indigo-50/50 p-6 rounded-[32px] border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-500">
            <M3Icon name={IconName.Zap} size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-900">AI Performance Lab</h3>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">Insight generated 5m ago</p>
          </div>
        </div>
        <div className="pl-4 border-l-2 border-indigo-200">
          <p className="text-sm leading-relaxed text-slate-600 italic font-medium">
            "{metric.insight}"
          </p>
        </div>
        <button className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-2xl transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest">
          View Deep Analysis
        </button>
      </section>
    </div>
  );
};
