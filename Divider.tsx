import React from 'react';

interface DividerProps {
  text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-gray-500/50"></div>
      <span className="mx-4 text-sm font-medium text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-500/50"></div>
    </div>
  );
};

export default Divider;