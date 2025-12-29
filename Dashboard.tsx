import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import DashboardContent from './DashboardContent';
import AIAssistant from './AIAssistant';
import ReportIssue from './ReportIssue';
import ViewInsights from './ViewInsights';

export type ViewType = 'overview' | 'report' | 'insights' | 'analytics' | 'community' | 'ai' | 'settings';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardContent setActiveView={setActiveView} />;
      case 'report':
        return <ReportIssue setActiveView={setActiveView} />;
      case 'insights':
        return <ViewInsights setActiveView={setActiveView} />;
      // Add cases for other views if they get their own components
      case 'analytics':
      case 'community':
      case 'ai':
      case 'settings':
      default:
        return <DashboardContent setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex animate-fade-in">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Dashboard;