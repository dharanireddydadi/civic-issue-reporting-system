import React from 'react';

const data = [
  { name: 'Potholes', value: 35, color: '#8B5CF6' },
  { name: 'Garbage Disposal', value: 25, color: '#3B82F6' },
  { name: 'Street Lights', value: 15, color: '#10B981' },
  { name: 'Water Supply', value: 10, color: '#F59E0B' },
  { name: 'Illegal Dumping', value: 8, color: '#EF4444' },
  { name: 'Others', value: 7, color: '#6B7280' },
];

const PieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-48">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 32 32" className="transform -rotate-90">
          {data.map((item, index) => {
            const dasharray = (item.value / total) * 100;
            const dashoffset = accumulated;
            accumulated += dasharray;
            return (
              <circle
                key={index}
                r="15.915"
                cx="16"
                cy="16"
                fill="transparent"
                stroke={item.color}
                strokeWidth="4"
                strokeDasharray={`${dasharray} ${100 - dasharray}`}
                strokeDashoffset={-dashoffset}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>
      </div>
      <div className="text-xs space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span>{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;