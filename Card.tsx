import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-xl shadow-lg shadow-black/20 ${className}`}>
      <div className="p-4 border-b border-purple-500/20">
        <h3 className="font-semibold text-gray-200">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;