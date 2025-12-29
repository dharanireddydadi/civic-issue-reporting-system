
import React, { useState } from 'react';

const steps = [
  { title: "Welcome to Samyak!", content: "This guided tour will walk you through the key features of the platform." },
  { title: "The Dashboard", content: "This is the main overview where you can see the latest reports and issue hotspots on the map." },
  { title: "Report an Issue", content: "Click 'Report an Issue' in the sidebar to file a new complaint about a civic problem." },
  { title: "AI Assistant", content: "You're here now! The AI assistant helps with solutions, guidance, and information." },
  { title: "Track Complaints", content: "Use 'Track My Complaints' to see a timeline of the status of your reports." },
  { title: "Earn Rewards", content: "Visit the 'Rewards' page to see your credit points and learn how to earn more by being an active citizen." },
  { title: "Tour Complete!", content: "You're all set! Feel free to explore the platform." },
];

const TutorialTour: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  };
  
  const handleSkip = () => {
    onFinish();
  }

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#1a2035] border border-purple-500/50 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl shadow-purple-500/20 transform transition-transform animate-fadeInUp">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">{step.title}</h2>
        <p className="text-gray-300 mb-8">{step.content}</p>
        <div className="flex justify-between items-center">
            <button onClick={handleSkip} className="text-sm text-gray-500 hover:text-white">Skip</button>
            <button onClick={handleNext} className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialTour;
