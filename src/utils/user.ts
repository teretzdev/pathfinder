/**
 * User Utility Functions
 * This file contains utility functions for user-related operations.
 * These functions are designed to handle user data operations such as validation, formatting, and manipulation.
 */

/**
 * Validate the user's email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format the user's name to ensure proper capitalization.
 * @param {string} name - The user's name.
 * @returns {string} - The formatted name with each word capitalized.
 */
export const formatUserName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Calculate the user's age based on their date of birth.
 * @param {string} dateOfBirth - The user's date of birth in ISO format (YYYY-MM-DD).
 * @returns {number} - The user's age in years.
 */
export const calculateUserAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the current date is before the user's birthday this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Check if the user's profile is complete.
 * @param {object} profile - The user's profile object.
 * @param {string} profile.name - The user's name.
 * @param {string} profile.email - The user's email.
 * @param {string} profile.bio - The user's bio.
 * @returns {boolean} - Returns true if all required fields are filled, otherwise false.
 */
export const isProfileComplete = (profile: { name: string; email: string; bio: string }): boolean => {
  return !!profile.name && !!profile.email && !!profile.bio;
};

/**
 * Generate a user-friendly display name.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @returns {string} - A display name combining the user's name and email.
 */
export const generateDisplayName = (name: string, email: string): string => {
  const formattedName = formatUserName(name);
  const emailDomain = email.split('@')[1];
  return `${formattedName} (${emailDomain})`;
};
