import React from 'react';
import { useApp } from '../../App';
import { BellIcon, SearchIcon, DownloadIcon, MenuIcon } from '../icons/DashboardIcons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useApp();
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-20 px-4 lg:px-6 bg-black/20 backdrop-blur-lg border-b border-white/10 z-10">
      <div className="flex items-center">
        {/* Mobile hamburger menu */}
        <button
          className="p-2 mr-2 rounded-md text-gray-300 hover:bg-purple-500/20 md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
            Samyak Civic Platform
          </h1>
        </div>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            aria-label="Search issues"
            placeholder="Search issues by category, area, or ID"
            className="w-full p-3 pl-10 bg-white/5 border border-white/10 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="p-2 rounded-full hover:bg-purple-500/20 transition-colors" aria-label="Download Report">
          <DownloadIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-purple-500/20 transition-colors relative" aria-label="Notifications">
          <BellIcon />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0b1020]"></span>
        </button>
        <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-500/20 transition-colors" aria-label="User Profile">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-purple-500"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;