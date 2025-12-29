
import React from 'react';
// FIX: Removed unused UserIcon import
import { BellIcon, SearchIcon, DownloadIcon } from '../icons/DashboardIcons';

const TopNav: React.FC = () => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-20 px-4 lg:px-6 bg-gray-900/70 backdrop-blur-lg border-b border-purple-500/20">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent hidden md:block">
        Samyak Civic Platform
      </h1>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search issues by category, area, or ID"
            className="w-full p-3 pl-10 bg-gray-800/50 border border-purple-500/30 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="p-2 rounded-full hover:bg-purple-500/20 transition-colors">
          <DownloadIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-purple-500/20 transition-colors relative">
          <BellIcon />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
        </button>
        <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-purple-500/20 transition-colors">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-purple-500"
          />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
