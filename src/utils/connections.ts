/**
 * Connections Utility Functions
 * This file contains utility functions for connections-related operations.
 * These functions are designed to handle data operations for user connections.
 */

/**
 * Validate a connection object to ensure all required fields are present.
 * @param {object} connection - The connection object to validate.
 * @param {string} connection.name - The name of the connection.
 * @param {string[]} connection.sharedPatterns - An array of shared patterns.
 * @returns {boolean} - Returns true if the connection is valid, otherwise false.
 */
export const validateConnection = (connection: { name: string; sharedPatterns: string[] }): boolean => {
  const { name, sharedPatterns } = connection;
  return !!name && Array.isArray(sharedPatterns) && sharedPatterns.length > 0;
};

/**
 * Filter connections by a search term in the name or shared patterns.
 * @param {Array} connections - An array of connection objects.
 * @param {string} connections[].name - The name of the connection.
 * @param {string[]} connections[].sharedPatterns - An array of shared patterns.
 * @param {string} searchTerm - The search term to filter by.
 * @returns {Array} - The filtered array of connections.
 */
export const filterConnections = (
  connections: { name: string; sharedPatterns: string[] }[],
  searchTerm: string
): { name: string; sharedPatterns: string[] }[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      connection.sharedPatterns.some((pattern) => pattern.toLowerCase().includes(lowerCaseSearchTerm))
  );
};

/**
 * Sort connections alphabetically by name.
 * @param {Array} connections - An array of connection objects.
 * @param {string} connections[].name - The name of the connection.
 * @returns {Array} - The sorted array of connections.
 */
export const sortConnectionsByName = (
  connections: { name: string; sharedPatterns: string[] }[]
): { name: string; sharedPatterns: string[] }[] => {
  return connections.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Generate a summary of shared patterns for a connection.
 * @param {string[]} sharedPatterns - An array of shared patterns.
 * @param {number} maxLength - The maximum number of patterns to include in the summary.
 * @returns {string} - A summary string of shared patterns.
 */
export const generateSharedPatternsSummary = (sharedPatterns: string[], maxLength: number = 3): string => {
  if (sharedPatterns.length <= maxLength) {
    return sharedPatterns.join(', ');
  }
  return `${sharedPatterns.slice(0, maxLength).join(', ')} and ${sharedPatterns.length - maxLength} more`;
};
