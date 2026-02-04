
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface BookingDoctorViewProps {
  onSelect: (doctor: any) => void;
}

const DOCTORS = [
  { id: 'dr-1', name: 'Dr. Sarah Wilson', title: 'Senior Endocrinologist', experience: '12 yrs exp', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150' },
  { id: 'dr-2', name: 'Dr. James Miller', title: 'Cardiologist', experience: '8 yrs exp', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150' },
  { id: 'dr-3', name: 'Dr. Elena Chen', title: 'Metabolic Specialist', experience: '15 yrs exp', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150' },
];

export const BookingDoctorView: React.FC<BookingDoctorViewProps> = ({ onSelect }) => {
  const { typography, shape } = useM3Theme();

  return (
    <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-8 duration-300">
      <p className={`${typography.body.medium} text-m3-onSurfaceVariant`}>
        Choose a specialist based on your medical profile and health goals.
      </p>

      <div className="flex flex-col gap-dp-12">
        {DOCTORS.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => onSelect(doctor)}
            className={`p-dp-16 bg-white border border-m3-outline/20 ${shape.card} flex gap-dp-16 items-center hover:bg-m3-surfaceContainerLow active:scale-[0.98] transition-all text-left shadow-sm`}
          >
            <div className="w-16 h-16 rounded-m3-md overflow-hidden shrink-0 border border-m3-outline/10">
              <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className={typography.title.medium}>{doctor.name}</h4>
              <p className={`${typography.body.small} text-m3-onSurfaceVariant`}>{doctor.title} • {doctor.experience}</p>
              <div className="flex items-center gap-1 mt-1">
                <M3Icon name={IconName.Star} size={14} className="text-yellow-600 fill-yellow-600" />
                <span className={typography.label.small}>{doctor.rating}</span>
              </div>
            </div>
            <M3Icon name={IconName.Forward} size={20} className="text-m3-outline" />
          </button>
        ))}
      </div>
    </div>
  );
};
