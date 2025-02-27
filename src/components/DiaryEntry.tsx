import React from 'react';

interface DiaryEntryProps {
  date: string;
  title: string;
  content: string;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ date, title, content }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{date}</p>
      <p className="text-gray-300">{content}</p>
    </div>
  );
};

export default DiaryEntry;
