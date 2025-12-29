import React, { useState, useEffect } from 'react';

const data = [
  { name: 'Roads', value: 150, color: '#8B5CF6' }, // Purple
  { name: 'Water', value: 120, color: '#3B82F6' }, // Blue
  { name: 'Waste', value: 90, color: '#10B981' }, // Green
  { name: 'Power', value: 60, color: '#F59E0B' }, // Yellow/Orange
  { name: 'Other', value: 45, color: '#EF4444' }, // Red
];

const CategoryBarChart: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
    // Calculate a sensible max value for the Y-axis, rounding up to the nearest 50
    const maxValue = Math.ceil(Math.max(...data.map(d => d.value), 0) / 50) * 50 || 50;
    const [heights, setHeights] = useState(data.map(() => '0%'));

    useEffect(() => {
        // Delay animation start to ensure CSS transition triggers on mount
        const timer = setTimeout(() => {
            setHeights(data.map(item => `${(item.value / maxValue) * 100}%`));
        }, 100);
        return () => clearTimeout(timer);
    }, [maxValue]);

    return (
        <div className={`w-full flex gap-3 ${className}`}>
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-xs text-gray-500 pt-4 pb-5">
                <span>{maxValue}</span>
                <span>{maxValue / 2}</span>
                <span>0</span>
            </div>
            
            {/* Chart Bars and X-Axis */}
            <div className="w-full flex items-end justify-around gap-2 border-b border-l border-white/10 px-2">
                {data.map((item, index) => (
                    <div key={item.name} className="flex-1 flex flex-col items-center gap-1 group h-full pt-4">
                        <div className="relative w-full h-full flex items-end">
                            {/* Tooltip */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black px-2 py-1 text-xs rounded-md z-10">
                                {item.value}
                            </div>
                            {/* Bar */}
                            <div
                                className="w-full rounded-t-sm hover:opacity-80"
                                style={{
                                    height: heights[index],
                                    backgroundColor: item.color,
                                    transition: `height 0.5s ease-out ${index * 60}ms`,
                                }}
                            />
                        </div>
                        {/* X-Axis Label */}
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBarChart;