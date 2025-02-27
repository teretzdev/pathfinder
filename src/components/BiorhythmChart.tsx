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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BiorhythmChart: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = React.useState<string>('');
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const calculateBiorhythm = (days: number, cycle: number) => {
    return Math.sin((2 * Math.PI * days) / cycle) * 100;
  };

  const calculateBiorhythms = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const daysSinceBirth = Math.floor(
      (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      physical: labels.map((_, i) => calculateBiorhythm(daysSinceBirth + i, 23)),
      emotional: labels.map((_, i) => calculateBiorhythm(daysSinceBirth + i, 28)),
      intellectual: labels.map((_, i) => calculateBiorhythm(daysSinceBirth + i, 33)),
    };
  };

  const { physical, emotional, intellectual } = dateOfBirth
    ? calculateBiorhythms(dateOfBirth)
    : { physical: [], emotional: [], intellectual: [] };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Physical',
        data: physical,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Emotional',
        data: emotional,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Intellectual',
        data: intellectual,
        borderColor: '#facc15',
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
      <div className="mb-6">
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white">
          Enter your Date of Birth:
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BiorhythmChart;