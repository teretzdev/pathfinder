import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ComparisonChartProps {
  chart1Data: number[];
  chart2Data: number[];
  labels: string[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ chart1Data, chart2Data, labels }) => {
  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Chart 1',
        data: chart1Data,
        borderColor: '#4f46e5', // Primary color
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Chart 2',
        data: chart2Data,
        borderColor: '#22d3ee', // Secondary color
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff', // White text for dark theme
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // White text for dark theme
        },
        grid: {
          color: '#3f3f3f', // Grid color matching dark theme
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // White text for dark theme
        },
        grid: {
          color: '#3f3f3f', // Grid color matching dark theme
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Comparison Chart</h2>
      <p className="text-gray-300 mb-6">
        Compare two datasets side by side to identify trends and differences.
      </p>
      <div className="relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ComparisonChart;
