import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../../pages/Dashboard';
import ReportIssue from '../../pages/ReportIssue';
import AIAssistantPage from '../../pages/AIAssistantPage';
import TrackComplaints from '../../pages/TrackComplaints';
import Rewards from '../../pages/Rewards';
import CommunityFeedback from '../../pages/CommunityFeedback';
import AnalyticsInsights from '../../pages/AnalyticsInsights';
import Settings from '../../pages/Settings';
import Chatbot from '../common/Chatbot';
import NotificationContainer from '../common/NotificationContainer';
import { useApp } from '../../App';
import { AIAssistantIcon, CloseIcon } from '../icons/DashboardIcons';

export type Page = 'overview' | 'report' | 'analytics' | 'community' | 'ai' | 'track' | 'rewards' | 'settings';

const pageComponents: { [key in Page]: React.ComponentType<any> } = {
    overview: Dashboard,
    report: ReportIssue,
    analytics: AnalyticsInsights,
    community: CommunityFeedback,
    ai: AIAssistantPage,
    track: TrackComplaints,
    rewards: Rewards,
    settings: Settings,
};

const DashboardLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { addNotification } = useApp();

  const ActivePageComponent = pageComponents[activePage];

  // Simulate a real-time notification
  useEffect(() => {
    const notificationShown = sessionStorage.getItem('notification-simulation-shown');
    if (!notificationShown) {
      const timer = setTimeout(() => {
        addNotification({
            message: "Issue #ISS-002 status updated to 'In Progress'.",
            type: 'info'
        });
        sessionStorage.setItem('notification-simulation-shown', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-[#0b1020] text-gray-100 font-sans flex animate-fadeIn">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <ActivePageComponent setActivePage={setActivePage} />
        </main>
      </div>
      
      {/* Floating UI Elements */}
      <NotificationContainer />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
       <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 transform hover:scale-110 transition-all duration-300"
        aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isChatOpen ? 
            <CloseIcon className="w-8 h-8 text-white" /> : 
            <AIAssistantIcon className="w-8 h-8 text-white" />
        }
      </button>
    </div>
  );
};

export default DashboardLayout;