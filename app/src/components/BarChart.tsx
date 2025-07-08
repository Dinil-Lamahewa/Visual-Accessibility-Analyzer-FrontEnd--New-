import React from 'react';
interface BarChartData {
  label: string;
  value: number;
  color: string;
  maxValue?: number;
}
interface BarChartProps {
  data: BarChartData[];
  title: string;
  className?: string;
}
export function BarChart({
  data,
  title,
  className = ''
}: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.maxValue || item.value));
  return <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 dark:text-gray-300 truncate">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
              <div className="h-4 rounded-full transition-all duration-500 ease-out" style={{
            width: `${item.value / maxValue * 100}%`,
            backgroundColor: item.color
          }} role="progressbar" aria-valuenow={item.value} aria-valuemax={maxValue} aria-label={`${item.label}: ${item.value}%`} />
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 dark:text-white text-right">
              {item.value}%
            </div>
          </div>)}
      </div>
    </div>;
}