import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import useLogger from '../utils/useLogger';

interface DiaryEntry {
  id?: number;
  date: string;
  title: string;
  content: string;
}

const Diary: React.FC = () => {
  const logger = useLogger('Diary');
  
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: '2023-10-15',
      title: 'Unexpected Synchronicity',
      content: 'Today I was thinking about an old friend I hadn\'t seen in years, and then received a message from them minutes later. The universe works in mysterious ways.'
    },
    {
      id: 2,
      date: '2023-10-12',
      title: 'Recurring Number Pattern',
      content: 'I\'ve been seeing 11:11 on clocks for the past week. Today I received an invoice with the total $111.10. This pattern feels significant.'
    }
  ]);
  
  const [formData, setFormData] = useState<DiaryEntry>({
    date: '',
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Partial<DiaryEntry>>({});

  useEffect(() => {
    logger.info('Diary component mounted', { entriesCount: entries.length });
    
    return () => {
      logger.info('Diary component unmounted');
    };
  }, [logger, entries.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    logger.debug('Form field changed', { field: name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    logger.debug('Validating form', { formData });
    const newErrors: Partial<DiaryEntry> = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.content) newErrors.content = 'Content is required.';
    
    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0;
    logger.debug('Form validation result', { isValid, errors: newErrors });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('Diary entry form submitted');
    
    if (validateForm()) {
      logger.info('Creating new diary entry', { title: formData.title });
      
      // For preview purposes, we'll just add the entry to the state
      const newEntry = {
        ...formData,
        id: entries.length + 1
      };
      
      setEntries((prev) => [...prev, newEntry]);
      setFormData({ date: '', title: '', content: '' });
      setErrors({});
      
      logger.info('New diary entry created successfully', { entryId: newEntry.id });
    } else {
      logger.warn('Diary entry form has validation errors');
    }
  };

  logger.trace('Rendering Diary component');

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Synchronicity Diary</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">Log a New Entry</h2>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-white">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Add Entry
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Your Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-400">You have no diary entries yet. Use the form above to add your first entry and start tracking your synchronicities!</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                  <p className="text-sm text-gray-400">{entry.date}</p>
                  <p className="text-gray-300 mt-2">{entry.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Diary;