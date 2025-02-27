import React from 'react';
import PropTypes from 'prop-types';

const DiaryEntry = ({ date, title, content }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2" role="article">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{date}</p>
      <p className="text-gray-300">{content}</p>
    </div>
  );
};

DiaryEntry.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

DiaryEntry.defaultProps = {
  date: 'Unknown Date',
  title: 'Untitled Entry',
  content: 'No content available.',
};

export default DiaryEntry;