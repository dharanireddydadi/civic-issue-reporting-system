import React, { useState, useEffect } from 'react';
import Card from './Card';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import { ViewType } from './Dashboard';
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon, ReportIcon, TrackIcon, InsightsIcon } from '../icons/DashboardIcons';

const AnimatedCounter = ({ endValue }: { endValue: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / endValue));
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === endValue) {
                clearInterval(timer);
            }
        }, stepTime);
        
        return () => clearInterval(timer);
    }, [endValue]);

    return <>{count.toLocaleString()}</>;
};

const InteractiveMap = () => (
    <div className="relative w-full h-64 bg-gray-800/50 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/20">
        <p className="z-10 text-lg font-bold">Samyak City Map</p>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-500/50 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-orange-500/50 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-yellow-500/50 rounded-full blur-md animate-pulse"></div>
    </div>
);

const MobilePreview = () => <div className="w-40 h-80 bg-gray-800 border-4 border-gray-600 rounded-2xl flex items-center justify-center text-center p-2 text-sm text-gray-400">Samyak Mobile App Preview</div>;


const DashboardContent: React.FC<{setActiveView: (view: ViewType) => void}> = ({ setActiveView }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
            
            <div className="lg:col-span-2 xl:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => setActiveView('report')} className="p-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2"><ReportIcon /> Report Issue</button>
                    <button className="p-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"><TrackIcon /> Track My Complaints</button>
                    <button onClick={() => setActiveView('insights')} className="p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"><InsightsIcon /> View Insights</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Issue Categories"><PieChart /></Card>
                    <Card title="Issues per Zone"><BarChart /></Card>
                    <Card title="Resolution Trends"><LineChart /></Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-2">
                        <Card title="Impact Metrics">
                            <div className="text-center p-4">
                                <p className="text-gray-400">Issues Resolved This Month</p>
                                <p className="text-5xl font-bold text-teal-400 my-2">
                                    <AnimatedCounter endValue={1204} />
                                </p>
                                <p className="text-green-400 font-semibold">+15% Faster Resolution</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-3">
                        <Card title="Top Supportive Citizens">
                            <div className="space-y-3 p-2">
                                <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
                                    <div className="flex items-center gap-3"><GoldMedalIcon /> <span className="font-semibold">John Doe</span></div>
                                    <span className="font-bold text-yellow-400">2500 pts</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
                                    <div className="flex items-center gap-3"><SilverMedalIcon /> <span className="font-semibold">Jane Smith</span></div>
                                    <span className="font-bold text-gray-300">2100 pts</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
                                    <div className="flex items-center gap-3"><BronzeMedalIcon /> <span className="font-semibold">Sam Wilson</span></div>
                                    <span className="font-bold text-orange-400">1850 pts</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                 <Card title="Latest Reports">
                    <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                        {[{title: 'Pothole on Main St', status: 'In Progress'}, {title: 'Garbage Overflow', status: 'Resolved'}, {title: 'Streetlight Outage', status: 'In Progress'}, {title: 'Water Leakage', status: 'Pending'}, {title: 'Illegal Parking', status: 'Resolved'}].map((report, i) => (
                             <div key={i} className="flex-shrink-0 w-64 p-4 bg-gray-700/50 rounded-lg border border-purple-500/20">
                                <h4 className="font-bold">{report.title}</h4>
                                <p className="text-sm text-gray-400">Reported {i + 2}h ago</p>
                                <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${report.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : report.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{report.status}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-1 xl:col-span-1 space-y-6">
                <Card title="City Hotspots"><InteractiveMap /></Card>
                <Card title="AI Insights">
                    <p>Predicted Time to Resolve: <span className="font-bold text-cyan-400">~2.5 days</span></p>
                    <p className="mt-2">Next Week's High-Complaint Areas: <span className="font-bold text-red-400">Zone 4, Ward C</span></p>
                </Card>
                <Card title="Community Poll">
                    <p className="mb-2 font-semibold">Which issue should be prioritized?</p>
                     <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>Garbage Disposal</span><span>45%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>Water Supply</span><span>35%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width: '35%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>Road Safety</span><span>20%</span></div>
                            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-teal-500 h-2 rounded-full" style={{width: '20%'}}></div></div>
                        </div>
                    </div>
                </Card>
                <Card title="Samyak AI Summarizer">
                    <p className="text-sm">This week’s major Samyak concerns: Garbage overflow, water shortage, and road repairs.</p>
                </Card>
                <div className="flex justify-center pt-4">
                    <MobilePreview />
                </div>
            </div>

        </div>
    );
};

export default DashboardContent;