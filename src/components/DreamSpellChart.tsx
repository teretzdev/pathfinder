import React from 'react';
import {
  Chart as ChartJS,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

const DreamSpellChart: React.FC = () => {
  // Simulated Dream Spell astrology data
  const labels = [
    'Red Dragon',
    'White Wind',
    'Blue Night',
    'Yellow Seed',
    'Red Serpent',
    'White Worldbridger',
    'Blue Hand',
    'Yellow Star',
  ];
  const dataPoints = [12, 19, 8, 15, 10, 7, 14, 18];

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Dream Spell Energies',
        data: dataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(255, 255, 255, 0.5)', // White
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(255, 255, 255, 0.5)', // White
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(255, 255, 255, 1)', // White
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(255, 99, 132, 1)', // Red
          'rgba(255, 255, 255, 1)', // White
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
        ],
        borderWidth: 1,
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
          label: (context: any) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      r: {
        ticks: {
          color: '#ffffff', // White text for dark theme
          backdropColor: 'transparent', // Remove background behind ticks
        },
        grid: {
          color: '#3f3f3f', // Grid color matching dark theme
        },
        angleLines: {
          color: '#3f3f3f', // Angle lines color matching dark theme
        },
        pointLabels: {
          color: '#ffffff', // Labels color for dark theme
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Dream Spell Chart</h2>
      <p className="text-gray-300 mb-6">
        Visualize the energies of the Dream Spell astrology system.
      </p>
      <div className="relative">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
};

export default DreamSpellChart;
