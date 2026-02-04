
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { ClinicCard } from '../components/features/ClinicCard';

interface ClinicDiscoveryViewProps {
  clinics: any[];
  onBook: (clinic: any) => void;
}

export const ClinicDiscoveryView: React.FC<ClinicDiscoveryViewProps> = ({ clinics, onBook }) => {
  const { typography, shape } = useM3Theme();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Wellness', 'Cardiology', 'Metabolic', 'Labs'];

  return (
    <div className="flex flex-col gap-dp-24 animate-in fade-in duration-500 pb-dp-48">
      <div className="flex flex-col gap-dp-16">
        <h2 className={typography.headline.small}>Clinic Discovery</h2>
        
        <div className={`h-dp-48 px-dp-16 bg-m3-surfaceContainerHigh ${shape.full} flex items-center gap-dp-12 shadow-inner border border-m3-outline/10`}>
           <M3Icon name={IconName.Search} size={20} className="text-m3-onSurfaceVariant" />
           <input 
            type="text" 
            placeholder="Search clinics or packages" 
            className="bg-transparent flex-1 outline-none text-m3-onSurface h-full"
           />
        </div>

        <div className="flex gap-dp-8 overflow-x-auto no-scrollbar -mx-dp-16 px-dp-16">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-dp-16 py-dp-8 rounded-m3-md border ${activeFilter === f ? 'bg-m3-secondaryContainer border-m3-secondaryContainer text-m3-onSecondaryContainer font-bold' : 'border-m3-outline/30 text-m3-onSurfaceVariant'} ${typography.label.medium} transition-colors shrink-0`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-dp-16">
        {clinics.map(clinic => (
          <ClinicCard key={clinic.id} {...clinic} onBook={() => onBook(clinic)} />
        ))}
      </div>
    </div>
  );
};
