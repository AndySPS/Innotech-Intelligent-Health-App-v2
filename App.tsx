
import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { IconName } from './components/Icons';

// Views
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { ActivityDetailsView } from './views/ActivityDetailsView';
import { ReportsListingView } from './views/ReportsListingView';
import { ReportsDetailView } from './views/ReportsDetailView';
import { ClinicDiscoveryView } from './views/ClinicDiscoveryView';
import { ProfileView } from './views/ProfileView';
import { HealthPlanView } from './views/HealthPlanView';
import { GoalSelectionView } from './views/GoalSelectionView';
import { BookingDoctorView } from './views/BookingDoctorView';
import { BookingDateTimeView } from './views/BookingDateTimeView';
import { BookingConfirmationView } from './views/BookingConfirmationView';
import { AIAssistantView } from './views/AIAssistantView';

// --- Types ---
export type Screen = 
  | 'auth' 
  | 'onboarding' 
  | 'dashboard' 
  | 'profile' 
  | 'activity-details' 
  | 'reports-listing' 
  | 'reports-details' 
  | 'clinics'
  | 'health-plans'
  | 'goal-selection'
  | 'booking-doctor'
  | 'booking-datetime'
  | 'booking-success'
  | 'ai-assistant';

// --- Mock Data ---
const METRICS = [
  {
    id: 'steps',
    label: 'Steps',
    value: '8,432',
    unit: 'steps',
    icon: IconName.Activity,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    insight: 'You are 15% more active than last week. Keep walking to improve your metabolic score.',
    data: [6200, 7100, 5800, 9100, 8432, 7600, 8900, 6200, 7100, 8300, 9500, 8800, 7400, 8100]
  },
  {
    id: 'heart',
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    icon: IconName.Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
    insight: 'Your resting heart rate is within the athletic range. This indicates strong cardiovascular efficiency.',
    data: [68, 70, 72, 69, 71, 74, 72, 70, 69, 72, 74, 71, 68, 72]
  },
  {
    id: 'sleep',
    label: 'Sleep',
    value: '7h 20m',
    unit: '',
    icon: IconName.Layers,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500',
    insight: 'Sleep quality was "Good" (82/100). You entered REM cycle 3 times, which is optimal for recovery.',
    data: [6.5, 7.2, 8.0, 7.0, 6.8, 7.5, 8.2, 6.0, 7.2, 7.8, 8.1, 7.4, 6.9, 7.3]
  },
  {
    id: 'calories',
    label: 'Calories',
    value: '1,840',
    unit: 'kcal',
    icon: IconName.Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    insight: 'You have burned more calories today than 80% of users in your age group.',
    data: [1650, 1800, 1550, 2100, 1840, 1900, 2200, 1700, 1850, 2050, 2300, 1950, 1800, 1920]
  }
];

const REPORTS = [
  {
    id: 'REP-001',
    packageName: 'Comprehensive Wellness Plus',
    date: '15 May 2024',
    clinic: 'Innotech Health Clinic Central',
    doctor: 'Dr. Sarah Wilson',
    summary: 'Cholesterol levels are slightly elevated. Liver function is optimal.',
    status: 'Released',
    unread: true
  },
  {
    id: 'REP-002',
    packageName: 'Executive Heart Check',
    date: '10 Apr 2024',
    clinic: 'Metropolitan General Hospital',
    doctor: 'Dr. James Miller',
    summary: 'Cardiovascular assessment shows excellent heart rate variability.',
    status: 'Released',
    unread: false
  }
];

const CLINICS = [
  {
    id: 'CL-001',
    name: 'Innotech Central',
    specialty: 'Multispecialty Wellness',
    distance: '1.2 km',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
    packages: ['Full Metabolic', 'Cardio Screen']
  },
  {
    id: 'CL-002',
    name: 'Wellness Hub Sukhumvit',
    specialty: 'Anti-Aging & Longevity',
    distance: '3.5 km',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
    packages: ['Bio-Age Test', 'Vitamin Panel']
  }
];

// --- Main App Controller ---

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('steps');
  const [selectedReportId, setSelectedReportId] = useState<string>('');
  
  // Booking Flow State
  const [bookingData, setBookingData] = useState({
    clinic: null as any,
    doctor: null as any,
    date: '',
    time: ''
  });

  useEffect(() => {
    const handleAINav = () => setCurrentScreen('ai-assistant');
    window.addEventListener('nav-ai', handleAINav);
    return () => window.removeEventListener('nav-ai', handleAINav);
  }, []);

  const activeMetric = METRICS.find(m => m.id === selectedActivityId) || METRICS[0];
  const activeReport = REPORTS.find(r => r.id === selectedReportId) || REPORTS[0];

  const getOnBack = () => {
    if (currentScreen === 'activity-details') return () => setCurrentScreen('dashboard');
    if (currentScreen === 'reports-details') return () => setCurrentScreen('reports-listing');
    if (currentScreen === 'booking-doctor') return () => setCurrentScreen('clinics');
    if (currentScreen === 'booking-datetime') return () => setCurrentScreen('booking-doctor');
    if (currentScreen === 'goal-selection') return () => setCurrentScreen('health-plans');
    if (currentScreen === 'ai-assistant') return () => setCurrentScreen('dashboard');
    if (currentScreen === 'profile') return () => setCurrentScreen('dashboard');
    return undefined;
  };

  const renderContent = () => {
    switch(currentScreen) {
      case 'auth': return <AuthView onLogin={() => setCurrentScreen('onboarding')} />;
      case 'onboarding': return <OnboardingView onFinish={() => setCurrentScreen('dashboard')} />;
      case 'dashboard': 
        return <DashboardView metrics={METRICS} onSelectActivity={(id) => { setSelectedActivityId(id); setCurrentScreen('activity-details'); }} />;
      case 'activity-details': 
        return <ActivityDetailsView metric={activeMetric} />;
      case 'reports-listing': 
        return <ReportsListingView reports={REPORTS} onSelectReport={(id) => { setSelectedReportId(id); setCurrentScreen('reports-details'); }} />;
      case 'reports-details': 
        return <ReportsDetailView report={activeReport} />;
      case 'clinics': 
        return <ClinicDiscoveryView clinics={CLINICS} onBook={(clinic) => {
          setBookingData({ ...bookingData, clinic });
          setCurrentScreen('booking-doctor');
        }} />;
      case 'booking-doctor':
        return <BookingDoctorView onSelect={(doctor) => {
          setBookingData({ ...bookingData, doctor });
          setCurrentScreen('booking-datetime');
        }} />;
      case 'booking-datetime':
        return <BookingDateTimeView onConfirm={(date, time) => {
          setBookingData({ ...bookingData, date, time });
          setCurrentScreen('booking-success');
        }} />;
      case 'booking-success':
        return <BookingConfirmationView data={bookingData} onDone={() => setCurrentScreen('dashboard')} />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'profile': return <ProfileView onLogout={() => setCurrentScreen('auth')} />;
      case 'health-plans': 
        return <HealthPlanView onAddGoal={() => setCurrentScreen('goal-selection')} />;
      case 'goal-selection': 
        return <GoalSelectionView onSelect={() => setCurrentScreen('health-plans')} />;
      default: return null;
    }
  };

  const getTitle = () => {
    switch(currentScreen) {
      case 'auth': return 'Welcome';
      case 'onboarding': return 'Profile Setup';
      case 'dashboard': return 'Innotech Health';
      case 'activity-details': return `${activeMetric.label}`;
      case 'reports-listing': return 'Lab Reports';
      case 'reports-details': return 'Report Overview';
      case 'clinics': return 'Discover Clinics';
      case 'booking-doctor': return 'Select Specialist';
      case 'booking-datetime': return 'Schedule Visit';
      case 'booking-success': return 'Confirmed';
      case 'profile': return 'Profile';
      case 'health-plans': return 'Health Optimizer';
      case 'goal-selection': return 'Select Health Goal';
      case 'ai-assistant': return 'Health AI';
      default: return 'Innotech';
    }
  };

  const getActiveTab = () => {
    if (['dashboard', 'activity-details', 'ai-assistant'].includes(currentScreen)) return 0;
    if (['reports-listing', 'reports-details'].includes(currentScreen)) return 1;
    if (['clinics', 'booking-doctor', 'booking-datetime'].includes(currentScreen)) return 2;
    if (['health-plans', 'goal-selection'].includes(currentScreen)) return 3;
    if (currentScreen === 'profile') return 4;
    return -1;
  };

  const isNavHidden = () => {
    return (
      currentScreen === 'auth' || 
      currentScreen === 'onboarding' ||
      currentScreen === 'activity-details' || 
      currentScreen === 'reports-details' ||
      currentScreen === 'goal-selection' ||
      currentScreen === 'booking-doctor' ||
      currentScreen === 'booking-datetime' ||
      currentScreen === 'booking-success' ||
      currentScreen === 'ai-assistant' ||
      currentScreen === 'profile'
    );
  };

  const onBackHandler = getOnBack();

  return (
    <MainLayout 
      title={getTitle()} 
      activeTab={getActiveTab()}
      onNavigate={(idx) => {
        if (idx === 0) setCurrentScreen('dashboard');
        if (idx === 1) setCurrentScreen('reports-listing');
        if (idx === 2) setCurrentScreen('clinics');
        if (idx === 3) setCurrentScreen('health-plans');
        if (idx === 4) setCurrentScreen('profile');
      }}
      hideNav={isNavHidden()}
      hideAppBar={['auth', 'onboarding'].includes(currentScreen)}
      showBack={!!onBackHandler}
      onBack={onBackHandler}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default App;
