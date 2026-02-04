
import React from 'react';
import { M3Icon, IconName } from '../Icons';
import { useM3Theme } from '../../theme/ThemeConfig';

interface ClinicCardProps {
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  imageUrl: string;
  packages: string[];
  onBook: () => void;
}

export const ClinicCard: React.FC<ClinicCardProps> = ({ name, specialty, distance, rating, imageUrl, packages, onBook }) => {
  const { typography, shape } = useM3Theme();
  return (
    <div className={`bg-white border border-m3-outline/10 ${shape.card} overflow-hidden shadow-sm active:scale-[0.99] transition-transform`}>
      <div className="h-32 w-full relative">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-m3-xs flex items-center gap-1">
           <M3Icon name={IconName.Star} size={14} className="text-yellow-600 fill-yellow-600" />
           <span className={typography.label.small}>{rating}</span>
        </div>
      </div>
      <div className="p-dp-16 flex flex-col gap-dp-8">
        <div>
          <h3 className={typography.title.medium}>{name}</h3>
          <p className={`${typography.body.small} text-m3-onSurfaceVariant flex items-center gap-1`}>
            <M3Icon name={IconName.MapPin} size={14} /> {distance} • {specialty}
          </p>
        </div>
        <div className="flex gap-dp-8 flex-wrap">
          {packages.map(pkg => (
            <span key={pkg} className={`px-2 py-1 bg-m3-surfaceContainerLow text-m3-onSurfaceVariant ${typography.label.small} ${shape.small} border border-m3-outline/10`}>
              {pkg}
            </span>
          ))}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onBook(); }}
          className={`h-dp-48 mt-dp-4 bg-m3-primary text-m3-onPrimary ${shape.medium} ${typography.label.large} w-full active:scale-95 transition-transform`}
        >
          BOOK APPOINTMENT
        </button>
      </div>
    </div>
  );
};
