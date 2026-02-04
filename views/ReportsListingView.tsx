
import React from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { ReportItem } from '../components/features/ReportItem';

interface ReportsListingViewProps {
  reports: any[];
  onSelectReport: (id: string) => void;
}

export const ReportsListingView: React.FC<ReportsListingViewProps> = ({ reports, onSelectReport }) => {
  const { typography, shape } = useM3Theme();

  return (
    <div className="flex flex-col gap-dp-24 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className={typography.headline.small}>My Reports</h2>
        <div className="flex gap-2">
           <button className="p-2 bg-m3-surfaceContainerHigh rounded-m3-full">
             <M3Icon name={IconName.Search} size={20} />
           </button>
           <button className="p-2 bg-m3-surfaceContainerHigh rounded-m3-full">
             <M3Icon name={IconName.More} size={20} />
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-dp-12">
        {reports.map(report => (
          <ReportItem 
            key={report.id}
            id={report.id}
            packageName={report.packageName}
            date={report.date}
            clinic={report.clinic}
            summary={report.summary}
            unread={report.unread}
            onClick={() => onSelectReport(report.id)}
          />
        ))}
      </div>

      <button className={`h-dp-48 bg-m3-secondary text-m3-onSecondary ${shape.full} ${typography.label.large} mt-dp-8 active:scale-95 transition-transform`}>
        REQUEST PREVIOUS RECORDS
      </button>
    </div>
  );
};
