
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface OnboardingViewProps {
  onFinish: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onFinish }) => {
  const { typography, shape } = useM3Theme();
  const [step, setStep] = useState(1); // Starting at 1 for the prompt's context
  const [selections, setSelections] = useState<string[]>([]);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleToggleSelection = (val: string) => {
    setSelections(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onFinish();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className={`${typography.headline.small} text-slate-900`}>Let's build your Metabolic Signature</h2>
              <p className={`${typography.body.medium} text-slate-500 mt-1`}>This helps us personalize your health journey.</p>
            </div>
            <div className="flex flex-col gap-dp-16">
              {[
                { label: 'Age', placeholder: '25' },
                { label: 'Height (cm)', placeholder: '175' },
                { label: 'Weight (kg)', placeholder: '70' }
              ].map(field => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className={typography.label.medium}>{field.label}</label>
                  <input 
                    type="number" 
                    placeholder={field.placeholder} 
                    className={`h-dp-56 px-dp-24 bg-slate-100/50 rounded-full outline-none border border-transparent focus:border-primary/30 focus:bg-white transition-all font-bold text-slate-900`} 
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className={typography.label.medium}>Gender</label>
                <select className={`h-dp-56 px-dp-24 bg-slate-100/50 rounded-full outline-none border border-transparent focus:border-primary/30 font-bold text-slate-900 appearance-none`}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Metabolic History</h2>
              <p className="text-sm font-bold text-slate-400 mt-1">Select any conditions that apply to you.</p>
            </div>
            <div className="flex flex-col gap-dp-8">
              {['Diabetes (Type 1 or 2)', 'Hypertension', 'High Cholesterol', 'Fatty Liver', 'Thyroid Disorder', 'None of these'].map(condition => (
                <button 
                  key={condition}
                  onClick={() => handleToggleSelection(condition)}
                  className={`h-dp-56 px-dp-24 rounded-full text-left flex items-center justify-between transition-all active:scale-[0.97] ${
                    selections.includes(condition) 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-slate-100/80 text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="text-sm font-black tracking-tight">{condition}</span>
                  {selections.includes(condition) && (
                    <M3Icon name={IconName.Done} size={20} className="animate-in zoom-in-50 duration-200" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Lifestyle & Habits</h2>
              <p className="text-sm font-bold text-slate-400 mt-1">How would you describe your daily activity?</p>
            </div>
            <div className="flex flex-col gap-dp-8">
              {[
                { label: 'Sedentary', sub: 'Office work, little exercise' },
                { label: 'Lightly Active', sub: '1-2 days of exercise/week' },
                { label: 'Moderately Active', sub: '3-5 days of exercise/week' },
                { label: 'Very Active', sub: 'Daily intense training' }
              ].map(item => (
                <button 
                  key={item.label}
                  onClick={() => handleToggleSelection(item.label)}
                  className={`h-dp-56 px-dp-24 rounded-full text-left flex items-center justify-between transition-all active:scale-[0.97] ${
                    selections.includes(item.label) 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-slate-100/80 text-slate-900'
                  }`}
                >
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-black tracking-tight leading-tight">{item.label}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-wider ${selections.includes(item.label) ? 'text-white/70' : 'text-slate-400'}`}>{item.sub}</p>
                  </div>
                  {selections.includes(item.label) && (
                    <M3Icon name={IconName.Done} size={18} />
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-dp-32 items-center text-center animate-in slide-in-from-right-4 duration-300 pt-dp-32">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center animate-bounce shadow-xl">
               <M3Icon name={IconName.Zap} size={48} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">All Set!</h2>
              <p className="text-sm font-bold text-slate-400 mt-2 px-6 leading-relaxed">We've calculated your initial metabolic baseline. You can now access personalized insights.</p>
            </div>
            <div className={`w-full p-dp-32 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Metabolic Readiness</span>
                <span className="text-3xl font-black text-primary">84%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[84%] transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white">
      {/* Top Progress Bar */}
      <div className="p-dp-24 pt-dp-32">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-1 px-dp-24">
        {renderStepContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="p-dp-24 pb-dp-48 flex gap-dp-12 items-center">
        {step > 0 && (
          <button 
            onClick={prevStep} 
            className={`h-dp-56 px-dp-32 bg-slate-100/50 rounded-full font-black text-slate-600 active:scale-95 transition-all text-xs uppercase tracking-widest`}
          >
            BACK
          </button>
        )}
        <button 
          onClick={nextStep} 
          className={`h-dp-56 flex-1 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 uppercase tracking-widest font-black active:scale-95 transition-all`}
        >
          <span>{step === totalSteps - 1 ? 'Get Started' : 'CONTINUE'}</span>
          {step < totalSteps - 1 && <M3Icon name={IconName.Forward} size={18} />}
        </button>
      </div>
      
      {/* Device Home Indicator Spacer */}
      <div className="h-dp-16"></div>
    </div>
  );
};
