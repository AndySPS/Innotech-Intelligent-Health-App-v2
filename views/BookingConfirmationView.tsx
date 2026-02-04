
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface BookingConfirmationViewProps {
  data: {
    clinic: any;
    doctor: any;
    date: string;
    time: string;
  };
  onDone: () => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({ data, onDone }) => {
  const { typography, shape } = useM3Theme();

  return (
    <div className="flex flex-col h-full items-center justify-center text-center animate-in zoom-in-95 fade-in duration-500 pt-dp-32">
      <div className="w-24 h-24 bg-m3-primaryContainer text-m3-primary rounded-m3-full flex items-center justify-center mb-dp-24 shadow-inner">
        <M3Icon name={IconName.Done} size={48} className="animate-in slide-in-from-bottom-2 duration-700" />
      </div>

      <h2 className={typography.headline.medium}>Booking Confirmed!</h2>
      <p className={`${typography.body.large} text-m3-onSurfaceVariant mt-2 px-dp-24`}>
        Your appointment has been successfully scheduled. We've sent a confirmation SMS to your device.
      </p>

      <div className={`mt-dp-32 w-full p-dp-24 bg-m3-surfaceContainerHigh ${shape.large} border border-m3-outline/10 text-left flex flex-col gap-dp-16`}>
        <div className="flex items-start gap-dp-12">
          <M3Icon name={IconName.MapPin} size={20} className="text-m3-primary mt-1" />
          <div>
            <p className={typography.label.medium}>Clinic Location</p>
            <p className={typography.title.medium}>{data.clinic?.name || 'Innotech Central'}</p>
          </div>
        </div>

        <div className="flex items-start gap-dp-12">
          <M3Icon name={IconName.Profile} size={20} className="text-m3-primary mt-1" />
          <div>
            <p className={typography.label.medium}>With Specialist</p>
            <p className={typography.title.medium}>{data.doctor?.name || 'Dr. Sarah Wilson'}</p>
          </div>
        </div>

        <div className="flex items-start gap-dp-12">
          <M3Icon name={IconName.Calendar} size={20} className="text-m3-primary mt-1" />
          <div>
            <p className={typography.label.medium}>Date & Time</p>
            <p className={typography.title.medium}>{data.date} at {data.time}</p>
          </div>
        </div>
      </div>

      <div className="mt-dp-48 w-full flex flex-col gap-dp-12">
        <button
          onClick={onDone}
          className={`h-dp-56 w-full bg-m3-primary text-m3-onPrimary ${shape.full} ${typography.label.large} shadow-md active:scale-95 transition-all`}
        >
          BACK TO DASHBOARD
        </button>
        <button
          className={`h-dp-48 w-full text-m3-primary ${typography.label.large} hover:bg-m3-primary/5 rounded-m3-full`}
        >
          ADD TO CALENDAR
        </button>
      </div>
    </div>
  );
};
