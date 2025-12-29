import React from 'react';
import { CheckCircleIcon, ClockIcon, WrenchIcon, FlagIcon, ExclamationTriangleIcon } from '../icons/DashboardIcons';

const steps = [
  { name: 'Submitted', icon: <FlagIcon className="w-5 h-5" /> },
  { name: 'Under Review', icon: <ClockIcon className="w-5 h-5" /> },
  { name: 'In Progress', icon: <WrenchIcon className="w-5 h-5" /> },
  { name: 'Escalated', icon: <ExclamationTriangleIcon className="w-5 h-5" /> },
  { name: 'Resolved', icon: <CheckCircleIcon className="w-5 h-5" /> },
];

const Timeline: React.FC<{ status: 'Pending' | 'In Progress' | 'Resolved' | 'Escalated' }> = ({ status }) => {
    let activeIndex = 0;
    if (status === 'In Progress') activeIndex = 2;
    if (status === 'Escalated') activeIndex = 3;
    if (status === 'Resolved') activeIndex = 4;

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${index <= activeIndex ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {step.icon}
            </div>
            <p className={`mt-2 text-xs text-center ${index <= activeIndex ? 'text-white' : 'text-gray-500'}`}>{step.name}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-grow h-1 transition-colors ${index < activeIndex ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Timeline;
