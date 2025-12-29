
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-skeleton">
      <div className="h-40 bg-white/10 rounded-lg mb-4"></div>
      <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-white/10 rounded mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 w-1/4 bg-white/10 rounded"></div>
        <div className="h-8 w-1/4 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
