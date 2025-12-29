import React from 'react';
import Card from './Card';
import { CloseIcon } from '../icons/DashboardIcons';

interface ChangelogProps {
  onClose: () => void;
}

const updates = [
    {
        version: 'v1.2.0',
        date: 'July 26, 2024',
        changes: [
            'New Feature: Comprehensive Analytics & Insights dashboard.',
            'New Feature: Professional, multi-section Settings page.',
            'Improvement: Interactive map with pin-drop for issue reporting.',
            'UI: Responsive sidebar with a hamburger menu on mobile.',
            'Fix: Sidebar navigation labels are now always visible on mobile.',
        ],
    },
    {
        version: 'v1.1.0',
        date: 'July 24, 2024',
        changes: [
            'New Feature: Floating AI chatbot for instant assistance.',
            'UI: Dark-themed "Report Issue" form with image previews.',
            'Improvement: Added upvoting and sorting to the Community page.',
            'Data: Added realistic images for issue reports.',
        ],
    },
     {
        version: 'v1.0.0',
        date: 'July 22, 2024',
        changes: [
            'Initial release of the Samyak Civic Platform.',
            'Core features: Dashboard overview, issue reporting, and user authentication.',
        ],
    },
];

const Changelog: React.FC<ChangelogProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4" onClick={onClose}>
        <Card className="w-full max-w-2xl animate-fadeInUp flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()} padding="p-0">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
                <h3 className="font-semibold text-gray-200">Platform Updates & Changelog</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10"><CloseIcon /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-8">
                {updates.map((update) => (
                    <div key={update.version}>
                        <div className="flex justify-between items-baseline mb-2">
                            <h2 className="text-xl font-bold text-purple-400">{update.version}</h2>
                            <p className="text-sm text-gray-400">{update.date}</p>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 border-l-2 border-purple-500/30 pl-4 py-2">
                            {update.changes.map((change, i) => (
                                <li key={i}>{change}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Card>
    </div>
  );
};

export default Changelog;
