import React from 'react';
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const HumanDesignChart: React.FC = () => {
  // Dynamic human design data
  const labels = [
    'Head',
    'Ajna',
    'Throat',
    'G Center',
    'Heart',
    'Sacral',
    'Solar Plexus',
    'Root',
    'Spleen',
  ];
  const calculateHumanDesignData = React.useCallback((): number[] => {
    // Mock function to simulate dynamic data calculation
    return labels.map(() => Math.floor(Math.random() * 100) + 1);
  }, []);

  const dataPoints = React.useMemo(() => calculateHumanDesignData(), [calculateHumanDesignData]);

  // Chart data
  const data = React.useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Human Design Insights',
        data: dataPoints,
        borderColor: '#4f46e5', // Primary color
        backgroundColor: 'rgba(79, 70, 229, 0.2)', // Transparent fill
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#4f46e5',
      },
    ],
  }), [labels, dataPoints]);

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
          label: (context: any) => context.raw ? `${context.raw}%` : 'No data available',
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Human Design Chart</h2>
      <p className="text-gray-300 mb-6">
        Explore insights into your unique human design based on key centers.
      </p>
      <div className="relative">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default HumanDesignChart;