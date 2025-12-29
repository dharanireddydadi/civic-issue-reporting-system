import React from 'react';
import { Page } from './DashboardLayout';
import { HomeIcon, ReportIcon, AnalyticsIcon, CommunityIcon, AIAssistantIcon, TrackIcon, RewardsIcon, SettingsIcon, LogoIcon } from '../icons/DashboardIcons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'overview', icon: <HomeIcon />, name: 'Overview' },
    { id: 'report', icon: <ReportIcon />, name: 'Report an Issue' },
    { id: 'track', icon: <TrackIcon />, name: 'Track My Complaints' },
    { id: 'rewards', icon: <RewardsIcon />, name: 'Rewards' },
    { id: 'community', icon: <CommunityIcon />, name: 'Community' },
    { id: 'analytics', icon: <AnalyticsIcon />, name: 'Analytics & Insights' },
    { id: 'ai', icon: <AIAssistantIcon />, name: 'AI Assistant' },
    { id: 'settings', icon: <SettingsIcon />, name: 'Settings' },
  ] as const;

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-black/20 backdrop-blur-lg border-r border-white/10 transition-transform duration-300 ease-in-out md:relative md:w-16 md:translate-x-0 lg:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center lg:justify-start lg:px-6 h-20 border-b border-white/10">
        <LogoIcon />
        <span className="ml-3 text-xl font-bold text-white block md:hidden lg:block">Samyak</span>
      </div>
      <nav className="flex-1 px-2 py-6 space-y-2 lg:px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            aria-label={item.name}
            className={`w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all duration-200 group relative ${activePage === item.id ? 'bg-purple-500/20 text-white shadow-lg shadow-purple-500/10' : ''}`}
          >
            <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-purple-400 transition-all duration-300 ${activePage === item.id ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="transform transition-transform duration-300 group-hover:scale-110">
                {item.icon}
            </div>
            <span className="ml-4 font-medium block md:hidden lg:block">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;