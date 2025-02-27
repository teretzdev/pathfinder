/**
 * Astrology Utility Functions
 * This file contains utility functions for astrological calculations.
 * These functions are designed to handle core astrological logic and computations.
 */

import { format } from 'date-fns';

/**
 * Calculate the zodiac sign based on the given date of birth.
 * @param {string} dateOfBirth - The date of birth in ISO format (YYYY-MM-DD).
 * @returns {string} - The zodiac sign corresponding to the date of birth.
 */
export const getZodiacSign = (dateOfBirth: string): string => {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-based

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';

  throw new Error('Invalid date of birth');
};

/**
 * Calculate the planetary ruler based on the zodiac sign.
 * @param {string} zodiacSign - The zodiac sign.
 * @returns {string} - The planetary ruler of the zodiac sign.
 */
export const getPlanetaryRuler = (zodiacSign: string): string => {
  const rulers: Record<string, string> = {
    Aries: 'Mars',
    Taurus: 'Venus',
    Gemini: 'Mercury',
    Cancer: 'Moon',
    Leo: 'Sun',
    Virgo: 'Mercury',
    Libra: 'Venus',
    Scorpio: 'Pluto',
    Sagittarius: 'Jupiter',
    Capricorn: 'Saturn',
    Aquarius: 'Uranus',
    Pisces: 'Neptune',
  };

  return rulers[zodiacSign] || 'Unknown';
};

/**
 * Format a date to a human-readable string.
 * @param {string} date - The date in ISO format (YYYY-MM-DD).
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMMM d, yyyy');
};

/**
 * Calculate the compatibility score between two zodiac signs.
 * @param {string} sign1 - The first zodiac sign.
 * @param {string} sign2 - The second zodiac sign.
 * @returns {number} - A compatibility score between 0 and 100.
 */
export const calculateCompatibility = (sign1: string, sign2: string): number => {
  const compatibilityMatrix: Record<string, Record<string, number>> = {
    Aries: { Aries: 80, Taurus: 60, Gemini: 90, Cancer: 50, Leo: 95, Virgo: 70, Libra: 85, Scorpio: 65, Sagittarius: 90, Capricorn: 55, Aquarius: 85, Pisces: 75 },
    Taurus: { Aries: 60, Taurus: 85, Gemini: 70, Cancer: 90, Leo: 65, Virgo: 95, Libra: 75, Scorpio: 80, Sagittarius: 55, Capricorn: 90, Aquarius: 60, Pisces: 85 },
    // Add compatibility scores for other signs...
  };

  return compatibilityMatrix[sign1]?.[sign2] || 50; // Default compatibility score
};
