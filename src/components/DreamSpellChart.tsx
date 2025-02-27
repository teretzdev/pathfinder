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
import { getDreamSpellSignature } from '../utils/dreamSpell';

// Register Chart.js components
ChartJS.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

const DreamSpellChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>(new Date().toISOString().split('T')[0]);
  const [dreamSpellData, setDreamSpellData] = React.useState(() => getDreamSpellSignature(selectedDate));

  React.useEffect(() => {
    setDreamSpellData(getDreamSpellSignature(selectedDate));
  }, [selectedDate]);

  // Chart data
  const data = {
    labels: ['Kin Number', 'Glyph Name', 'Tone Name'],
    datasets: [
      {
        label: 'Dream Spell Insights',
        data: [dreamSpellData.kinNumber, 1, 1], // Placeholder for chart representation
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
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
        Select a date to explore the Dream Spell astrology insights.
      </p>

      {/* Date Input */}
      <div className="mb-6">
        <label htmlFor="date" className="block text-sm font-medium text-white">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Dream Spell Signature */}
      <div className="mb-6 text-gray-300">
        <p><strong>Kin Number:</strong> {dreamSpellData.kinNumber}</p>
        <p><strong>Glyph Name:</strong> {dreamSpellData.glyphName}</p>
        <p><strong>Tone Name:</strong> {dreamSpellData.toneName}</p>
      </div>

      <div className="relative">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
};

export default DreamSpellChart;