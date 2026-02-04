
import React, { useState } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';

interface ReportsDetailViewProps {
  report: any;
}

export const ReportsDetailView: React.FC<ReportsDetailViewProps> = ({ report }) => {
  const { typography, shape } = useM3Theme();
  const [activeTab, setActiveTab] = useState('Overview');

  const vitals = [
    { label: 'BP', value: '120/80', unit: 'mmHg' },
    { label: 'HR', value: '72', unit: 'bpm' },
    { label: 'BMI', value: '22.4', unit: '' },
    { label: 'Temp', value: '36.6', unit: '°C' }
  ];

  return (
    <div className="flex flex-col gap-dp-24 animate-in slide-in-from-right-8 duration-300">
      <div className={`p-dp-20 bg-m3-surfaceContainerHighest ${shape.large} shadow-sm`}>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className={typography.title.large}>{report.packageName}</h3>
            <M3Icon name={IconName.Done} className="text-green-600" />
          </div>
          <p className={typography.body.small}>{report.clinic}</p>
          <p className={`${typography.label.medium} mt-1`}>Doctor: {report.doctor}</p>
        </div>
      </div>

      <div className="flex bg-m3-surfaceContainerHigh p-1 rounded-m3-full self-center shadow-inner overflow-x-auto w-full no-scrollbar">
        {['Overview', 'Vitals', 'Trends'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-[80px] px-dp-12 py-dp-8 rounded-m3-full ${typography.label.medium} transition-all ${activeTab === tab ? 'bg-m3-primary text-m3-onPrimary shadow-md' : 'text-m3-onSurfaceVariant'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="flex flex-col gap-dp-16 animate-in fade-in duration-300">
          <section className="flex flex-col gap-dp-8">
             <h4 className={typography.title.small}>Key Findings</h4>
             <div className={`p-dp-16 bg-white border border-m3-outline/10 ${shape.medium}`}>
                <p className={typography.body.medium}>{report.summary}</p>
             </div>
          </section>
          <section className="flex flex-col gap-dp-8">
             <h4 className={typography.title.small}>Recommendations</h4>
             <ul className="list-disc ml-dp-20 flex flex-col gap-dp-4 text-m3-onSurfaceVariant">
                <li className={typography.body.medium}>Increase omega-3 fatty acid intake.</li>
                <li className={typography.body.medium}>Moderate aerobic exercise (30 mins, 5 days/week).</li>
                <li className={typography.body.medium}>Follow-up in 6 months for blood lipid profile.</li>
             </ul>
          </section>
        </div>
      )}

      {activeTab === 'Vitals' && (
        <div className="grid grid-cols-2 gap-dp-12 animate-in fade-in duration-300">
          {vitals.map(v => (
            <div key={v.label} className={`p-dp-16 bg-m3-surfaceContainerLow ${shape.medium} flex flex-col items-center`}>
              <p className={typography.label.small}>{v.label}</p>
              <h5 className={typography.headline.small}>{v.value}</h5>
              <p className={`${typography.body.small} opacity-60`}>{v.unit}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-dp-12">
        <button className={`flex-1 h-dp-48 bg-m3-primary text-m3-onPrimary ${shape.medium} ${typography.label.large} flex items-center justify-center gap-2`}>
           <M3Icon name={IconName.Done} size={18} /> DOWNLOAD PDF
        </button>
        <button className={`h-dp-48 px-dp-16 border border-m3-primary text-m3-primary ${shape.medium} ${typography.label.large}`}>
           PRINT
        </button>
      </div>
    </div>
  );
};
