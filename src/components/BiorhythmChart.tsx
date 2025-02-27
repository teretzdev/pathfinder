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

const BiorhythmChart: React.FC = () => {
  // Simulated biorhythm data
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const physical = labels.map((_, i) => Math.sin((2 * Math.PI * i) / 23) * 100);
  const emotional = labels.map((_, i) => Math.sin((2 * Math.PI * i) / 28) * 100);
  const intellectual = labels.map((_, i) => Math.sin((2 * Math.PI * i) / 33) * 100);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Physical',
        data: physical,
        borderColor: '#4f46e5', // Primary color
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Emotional',
        data: emotional,
        borderColor: '#22d3ee', // Secondary color
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Intellectual',
        data: intellectual,
        borderColor: '#facc15', // Yellow color
        backgroundColor: 'rgba(250, 204, 21, 0.2)',
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
          label: (context: any) => `${context.dataset.label}: ${context.raw.toFixed(2)}%`,
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
      <h2 className="text-2xl font-semibold text-white mb-4">Biorhythm Chart</h2>
      <p className="text-gray-300 mb-6">
        Visualize your physical, emotional, and intellectual cycles over the next 30 days.
      </p>
      <div className="relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BiorhythmChart;
