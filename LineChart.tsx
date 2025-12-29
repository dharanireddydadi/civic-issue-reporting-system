import React from 'react';

const data = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 450 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 700 },
];

const LineChart = () => {
    const width = 200;
    const height = 100;
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((point, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (point.value / maxValue) * height;
        return `${x},${y}`;
    }).join(' ');
    
    const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="w-full h-48 flex flex-col items-center justify-center p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                </linearGradient>
            </defs>
            <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                points={points}
                className="animate-draw-line"
            />
             <polygon
                fill="url(#areaGradient)"
                points={areaPoints}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
            />
             {data.map((point, i) => {
                const x = (i / (data.length - 1)) * width;
                const y = height - (point.value / maxValue) * height;
                return <circle key={i} cx={x} cy={y} r="2" fill="white" className="opacity-0 animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.1}s` }}/>
            })}
        </svg>
        <div className="w-full flex justify-between text-xs text-gray-400 mt-1 px-1">
            {data.map(d => <span key={d.name}>{d.name}</span>)}
        </div>
    </div>
  );
};

export default LineChart;