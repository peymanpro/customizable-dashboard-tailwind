// src/components/dashboard/RevenueChart.tsx
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export default function RevenueChart() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/chart-data')
      .then(res => res.json())
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching chart data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Card className="h-80 animate-pulse bg-gray-200 dark:bg-gray-700" padding="none" />;
  }

  if (!chartData) {
    return (
      <Card className="h-80 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </Card>
    );
  }

  const maxValue = Math.max(...chartData.datasets[0].data);

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Overview</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {chartData.labels.map((label: string, index: number) => {
          const value = chartData.datasets[0].data[index];
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-primary-500 dark:bg-primary-600 rounded-t transition-all duration-300 hover:bg-primary-600 dark:hover:bg-primary-500 relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  ${value}
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-block w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
        {chartData.datasets[0].label}
      </div>
    </Card>
  );
}