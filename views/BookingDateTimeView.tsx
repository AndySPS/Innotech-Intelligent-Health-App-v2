
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface BookingDateTimeViewProps {
  onConfirm: (date: string, time: string) => void;
}

export const BookingDateTimeView: React.FC<BookingDateTimeViewProps> = ({ onConfirm }) => {
  const { typography, shape } = useM3Theme();
  const [selectedDate, setSelectedDate] = useState('22 May');
  const [selectedTime, setSelectedTime] = useState('');

  const dates = [
    { day: 'Wed', date: '22', month: 'May' },
    { day: 'Thu', date: '23', month: 'May' },
    { day: 'Fri', date: '24', month: 'May' },
    { day: 'Sat', date: '25', month: 'May' },
    { day: 'Mon', date: '27', month: 'May' },
  ];

  const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00'];
  const afternoonSlots = ['13:30', '14:00', '14:30', '15:30', '16:00'];

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-8 duration-300 h-full">
      <section>
        <h3 className={`${typography.title.small} mb-dp-12 text-m3-onSurfaceVariant uppercase tracking-tight`}>Available Dates</h3>
        <div className="flex gap-dp-8 overflow-x-auto no-scrollbar -mx-dp-16 px-dp-16 pb-dp-4">
          {dates.map((d) => (
            <button
              key={`${d.date}${d.month}`}
              onClick={() => setSelectedDate(`${d.date} ${d.month}`)}
              className={`min-w-[72px] p-dp-12 flex flex-col items-center gap-1 border transition-all ${
                selectedDate === `${d.date} ${d.month}`
                  ? 'bg-m3-primary border-m3-primary text-m3-onPrimary'
                  : 'bg-white border-m3-outline/20 text-m3-onSurfaceVariant'
              } ${shape.medium} shadow-sm`}
            >
              <span className={typography.label.small}>{d.day}</span>
              <span className={typography.title.large}>{d.date}</span>
              <span className={typography.label.small}>{d.month}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-dp-16">
        <div>
          <h3 className={`${typography.title.small} mb-dp-12 text-m3-onSurfaceVariant uppercase tracking-tight`}>Morning</h3>
          <div className="flex flex-wrap gap-dp-8">
            {morningSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-dp-16 py-dp-8 border transition-colors ${
                  selectedTime === time
                    ? 'bg-m3-secondaryContainer border-m3-secondary text-m3-onSecondaryContainer'
                    : 'bg-m3-surface border-m3-outline/20'
                } ${shape.full} ${typography.label.large}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`${typography.title.small} mb-dp-12 text-m3-onSurfaceVariant uppercase tracking-tight`}>Afternoon</h3>
          <div className="flex flex-wrap gap-dp-8">
            {afternoonSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-dp-16 py-dp-8 border transition-colors ${
                  selectedTime === time
                    ? 'bg-m3-secondaryContainer border-m3-secondary text-m3-onSecondaryContainer'
                    : 'bg-m3-surface border-m3-outline/20'
                } ${shape.full} ${typography.label.large}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-auto pt-dp-24">
        <button
          onClick={handleConfirm}
          disabled={!selectedTime}
          className={`h-dp-56 w-full ${
            selectedTime ? 'bg-m3-primary text-m3-onPrimary shadow-lg' : 'bg-m3-surfaceContainerHigh text-m3-outline'
          } ${shape.full} ${typography.label.large} active:scale-95 transition-all uppercase tracking-widest font-bold`}
        >
          CONFIRM APPOINTMENT
        </button>
      </div>
    </div>
  );
};
