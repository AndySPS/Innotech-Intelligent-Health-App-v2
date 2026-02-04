
import React, { useState } from 'react';
import { M3Icon, IconName } from '../Icons';
import { useM3Theme } from '../../theme/ThemeConfig';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
  onNavigate?: (index: number) => void;
  hideNav?: boolean;
  hideAppBar?: boolean;
  activeTab?: number;
  showBack?: boolean;
  onBack?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  title, 
  children, 
  onNavigate, 
  hideNav = false, 
  hideAppBar = false,
  activeTab: externalActiveTab,
  showBack = false,
  onBack
}) => {
  const { typography, shape } = useM3Theme();
  const [internalActiveTab, setInternalActiveTab] = useState(0);

  const activeTab = externalActiveTab !== undefined && externalActiveTab !== -1 ? externalActiveTab : internalActiveTab;

  const handleTabClick = (idx: number) => {
    setInternalActiveTab(idx);
    if (onNavigate) onNavigate(idx);
  };

  const mainNavItems = [
    { icon: IconName.Home, label: 'Home', idx: 0 },
    { icon: IconName.Layers, label: 'Reports', idx: 1 },
    { icon: IconName.MapPin, label: 'Clinics', idx: 2 },
    { icon: IconName.Zap, label: 'Optimizer', idx: 3 },
  ];

  return (
    <div className="relative flex flex-col h-screen w-full bg-background-light text-slate-900 overflow-hidden font-display">
      {/* Top App Bar - Glass Effect */}
      {!hideAppBar && (
        <header className="sticky top-0 z-30 h-dp-64 px-dp-16 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-dp-12">
            {showBack && (
              <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <M3Icon name={IconName.Back} />
              </button>
            )}
            <h1 className="text-lg font-extrabold tracking-tight ml-1">{title}</h1>
          </div>
          <div className="flex items-center gap-dp-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 relative transition-colors">
              <M3Icon name={IconName.Notification} size={22} className="text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => onNavigate?.(4)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 active:scale-95 transition-all hover:bg-slate-100"
            >
              <M3Icon name={IconName.Profile} size={22} />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto px-dp-6 pt-dp-8 scroll-smooth scrollbar-hide ${hideNav ? 'pb-dp-32' : 'pb-dp-64'}`}>
        <div className="max-w-md mx-auto h-full px-dp-16">
          {children}
        </div>
      </main>

      {/* Navigation Bar (Bottom Nav) - Frosted Glass Pill */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 pb-8 flex justify-between items-center z-50">
          {mainNavItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleTabClick(item.idx)}
              className="flex flex-col items-center gap-1 transition-all"
            >
              <div className={`
                w-12 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${activeTab === item.idx ? 'bg-blue-100 text-primary' : 'text-slate-400'}
              `}>
                <M3Icon name={item.icon} size={24} />
              </div>
              <span className={`text-[10px] font-bold ${activeTab === item.idx ? 'text-primary' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      )}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full z-[60]"></div>
    </div>
  );
};
