import React, { useState } from 'react';
import Card from './Card';
import { ViewType } from './Dashboard';
import { UploadIcon, MapPinIcon, CheckCircleIcon } from '../icons/DashboardIcons';

interface ReportIssueProps {
  setActiveView: (view: ViewType) => void;
}

const ReportIssue: React.FC<ReportIssueProps> = ({ setActiveView }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
        <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <Card title="Success!" className="max-w-md w-full">
                <div className="flex flex-col items-center text-center p-8">
                    <CheckCircleIcon />
                    <h2 className="text-2xl font-bold mt-4">Issue Submitted Successfully</h2>
                    <p className="text-gray-400 mt-2">Your report has been received and is being processed.</p>
                    <p className="font-semibold text-lg mt-4 bg-gray-700/50 px-4 py-2 rounded-lg">Tracking ID: <span className="text-purple-400">#SYMCV789</span></p>
                    <button
                        onClick={() => setActiveView('overview')}
                        className="mt-8 w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </Card>
        </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Report a New Issue</h2>
        <Card title="Submit a Report" className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="font-semibold mb-2 block">1. Upload Picture</label>
                    <div className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-purple-500 transition-colors">
                        <div className="flex flex-col items-center">
                            <UploadIcon />
                            <p className="mt-2 text-gray-400">Drag & drop or <span className="text-purple-400">browse files</span></p>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="font-semibold mb-2 block">2. Choose Category</label>
                    <select id="category" className="w-full p-3 bg-gray-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Pothole</option>
                        <option>Garbage Disposal</option>
                        <option>Street Lights</option>
                        <option>Water Supply</option>
                        <option>Illegal Dumping</option>
                        <option>Others</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="font-semibold mb-2 block">3. Write Description</label>
                    <textarea id="description" rows={4} placeholder="Provide a detailed description of the issue..." className="w-full p-3 bg-gray-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>

                <div>
                    <label className="font-semibold mb-2 block">4. Set Location</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button type="button" className="flex-1 p-3 bg-gray-700/50 border border-purple-500/30 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"><MapPinIcon /> Auto-detect Location</button>
                        <div className="flex-1 h-32 bg-gray-700/30 rounded-lg flex items-center justify-center text-gray-400 italic">Map Pin-drop Area</div>
                    </div>
                </div>
                
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Submit Issue
                </button>
            </form>
        </Card>
    </div>
  );
};

export default ReportIssue;