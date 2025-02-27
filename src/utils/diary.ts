/**
 * Diary Utility Functions
 * This file contains utility functions for diary-related operations.
 * These functions are designed to handle diary data operations such as validation, formatting, and manipulation.
 */

/**
 * Validate a diary entry to ensure all required fields are filled.
 * @param {object} entry - The diary entry object.
 * @param {string} entry.date - The date of the diary entry in ISO format (YYYY-MM-DD).
 * @param {string} entry.title - The title of the diary entry.
 * @param {string} entry.content - The content of the diary entry.
 * @returns {boolean} - Returns true if the entry is valid, otherwise false.
 */
export const validateDiaryEntry = (entry: { date: string; title: string; content: string }): boolean => {
  const { date, title, content } = entry;
  return !!date && !!title && !!content;
};

/**
 * Format a diary entry's date to a human-readable string.
 * @param {string} date - The date of the diary entry in ISO format (YYYY-MM-DD).
 * @returns {string} - The formatted date string.
 */
export const formatDiaryDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

/**
 * Sort diary entries by date in descending order (most recent first).
 * @param {Array} entries - An array of diary entries.
 * @param {string} entries[].date - The date of the diary entry in ISO format (YYYY-MM-DD).
 * @returns {Array} - The sorted array of diary entries.
 */
export const sortDiaryEntriesByDate = (entries: { date: string }[]): { date: string }[] => {
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Filter diary entries by a search term in the title or content.
 * @param {Array} entries - An array of diary entries.
 * @param {string} entries[].title - The title of the diary entry.
 * @param {string} entries[].content - The content of the diary entry.
 * @param {string} searchTerm - The search term to filter by.
 * @returns {Array} - The filtered array of diary entries.
 */
export const filterDiaryEntries = (
  entries: { title: string; content: string }[],
  searchTerm: string
): { title: string; content: string }[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      entry.content.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

/**
 * Generate a summary of a diary entry's content.
 * @param {string} content - The content of the diary entry.
 * @param {number} maxLength - The maximum length of the summary.
 * @returns {string} - The summary of the content, truncated to the specified length.
 */
export const generateDiarySummary = (content: string, maxLength: number = 100): string => {
  if (content.length <= maxLength) {
    return content;
  }
  return `${content.slice(0, maxLength)}...`;
};
