
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const { typography, shape } = useM3Theme();
  const logoUrl = "https://image.makewebeasy.net/makeweb/m_1920x0/x5zVUyMtL/Logo/Logo_innotech.jpg?v=202405291424";

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-dp-64">
      <div className="flex-1 flex flex-col items-center justify-center gap-dp-32 pt-dp-48">
        <div className="flex flex-col gap-dp-16 items-center text-center">
          <div className={`w-32 h-32 bg-white ${shape.extraLarge} shadow-sm overflow-hidden flex items-center justify-center p-dp-12`}>
            <img src={logoUrl} alt="Innotech Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className={typography.headline.medium}>Innotech Health</h1>
            <p className={`${typography.body.large} text-m3-onSurfaceVariant`}>Intelligent Health OS</p>
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-dp-16">
          <div className="flex flex-col gap-dp-4">
            <label className={`${typography.label.medium} ml-4 text-m3-onSurfaceVariant`}>Phone Number</label>
            <div className={`h-dp-56 px-dp-16 flex items-center gap-dp-12 bg-m3-surfaceContainerHighest ${shape.medium} border-b-2 border-m3-primary shadow-inner`}>
              <span className={`${typography.body.large} font-bold text-slate-400`}>+66</span>
              <input type="tel" placeholder="081 234 5678" className="bg-transparent flex-1 outline-none h-full text-m3-onSurface font-bold text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button Container */}
      <div className="fixed bottom-0 left-0 right-0 p-dp-24 bg-background-light/80 backdrop-blur-md z-40 max-w-md mx-auto">
        <button 
          onClick={onLogin} 
          className={`h-dp-56 w-full bg-m3-primary text-m3-onPrimary ${shape.full} ${typography.label.large} shadow-xl active:scale-95 transition-all uppercase tracking-widest font-black`}
        >
          SEND OTP
        </button>
      </div>
    </div>
  );
};
