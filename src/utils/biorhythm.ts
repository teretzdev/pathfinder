/**
 * Biorhythm Utility Functions
 * This file contains utility functions for calculating biorhythms.
 * These functions are designed to handle the core logic for biorhythm calculations.
 */

/**
 * Calculate the biorhythm value for a given cycle and day.
 * @param {number} daysSinceBirth - The number of days since the user's birth.
 * @param {number} cycleLength - The length of the biorhythm cycle in days.
 * @returns {number} - The biorhythm value as a percentage (-100 to 100).
 */
export const calculateBiorhythm = (daysSinceBirth: number, cycleLength: number): number => {
  return Math.sin((2 * Math.PI * daysSinceBirth) / cycleLength) * 100;
};

/**
 * Calculate all three primary biorhythms (physical, emotional, intellectual) for a given date.
 * @param {string} dateOfBirth - The user's date of birth in ISO format (YYYY-MM-DD).
 * @param {string} targetDate - The target date for which to calculate biorhythms in ISO format (YYYY-MM-DD).
 * @returns {object} - An object containing the biorhythm values for physical, emotional, and intellectual cycles.
 */
export const calculateBiorhythmsForDate = (
  dateOfBirth: string,
  targetDate: string
): { physical: number; emotional: number; intellectual: number } => {
  const birthDate = new Date(dateOfBirth);
  const target = new Date(targetDate);

  // Calculate the number of days since birth
  const daysSinceBirth = Math.floor((target.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate biorhythm values
  const physical = calculateBiorhythm(daysSinceBirth, 23); // Physical cycle: 23 days
  const emotional = calculateBiorhythm(daysSinceBirth, 28); // Emotional cycle: 28 days
  const intellectual = calculateBiorhythm(daysSinceBirth, 33); // Intellectual cycle: 33 days

  return { physical, emotional, intellectual };
};

/**
 * Format a biorhythm value to a human-readable string with a percentage sign.
 * @param {number} value - The biorhythm value as a percentage (-100 to 100).
 * @returns {string} - The formatted biorhythm value as a string with a percentage sign.
 */
export const formatBiorhythmValue = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
