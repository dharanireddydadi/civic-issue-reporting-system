import React from 'react';

const data = [
  { name: 'Zone A', value: 150, color: '#8B5CF6' },
  { name: 'Zone B', value: 120, color: '#6366F1' },
  { name: 'Zone C', value: 90, color: '#3B82F6' },
  { name: 'Zone D', value: 60, color: '#10B981' },
  { name: 'Zone E', value: 45, color: '#F59E0B' },
];

const BarChart = () => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full h-48 flex items-end justify-around gap-2 px-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="relative w-full h-full flex items-end">
            <div
              className="w-full rounded-t-md animate-grow transition-all duration-300 group-hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
                animationDelay: `${index * 100}ms`
              }}
            >
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 text-xs rounded-md">
                {item.value}
             </div>
            </div>
          </div>
          <span className="text-xs text-gray-400">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;