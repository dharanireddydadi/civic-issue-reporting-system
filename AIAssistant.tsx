import React from 'react';
import { AIAssistantIcon } from '../icons/DashboardIcons';

const AIAssistant: React.FC = () => {
  return (
    <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 transform hover:scale-110 transition-transform duration-300">
      <AIAssistantIcon className="w-8 h-8 text-white" />
    </button>
  );
};

export default AIAssistant;