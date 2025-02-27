/**
 * Human Design Utility Functions
 * This file contains utility functions for human design-related calculations.
 * These functions are designed to handle the core logic for human design insights.
 */

/**
 * Calculate the activation percentage for a given center in the human design chart.
 * @param {number} activations - The number of activations for the center.
 * @param {number} totalGates - The total number of gates in the center.
 * @returns {number} - The activation percentage as a value between 0 and 100.
 */
export const calculateActivationPercentage = (activations: number, totalGates: number): number => {
  if (totalGates <= 0) {
    throw new Error('Total gates must be greater than zero.');
  }
  return (activations / totalGates) * 100;
};

/**
 * Determine the type of a human design center based on its activation percentage.
 * @param {number} activationPercentage - The activation percentage of the center.
 * @returns {string} - The type of the center: "Defined", "Undefined", or "Open".
 */
export const determineCenterType = (activationPercentage: number): string => {
  if (activationPercentage >= 50) {
    return 'Defined';
  } else if (activationPercentage > 0) {
    return 'Undefined';
  } else {
    return 'Open';
  }
};

/**
 * Calculate the profile based on the conscious and unconscious lines.
 * @param {number} consciousLine - The conscious line number (1-6).
 * @param {number} unconsciousLine - The unconscious line number (1-6).
 * @returns {string} - The human design profile as a string (e.g., "1/3", "4/6").
 */
export const calculateProfile = (consciousLine: number, unconsciousLine: number): string => {
  if (consciousLine < 1 || consciousLine > 6 || unconsciousLine < 1 || unconsciousLine > 6) {
    throw new Error('Line numbers must be between 1 and 6.');
  }
  return `${consciousLine}/${unconsciousLine}`;
};

/**
 * Determine the strategy based on the human design type.
 * @param {string} type - The human design type (e.g., "Manifestor", "Generator").
 * @returns {string} - The strategy associated with the type.
 */
export const getStrategyByType = (type: string): string => {
  const strategies: Record<string, string> = {
    Manifestor: 'Inform before acting',
    Generator: 'Wait to respond',
    'Manifesting Generator': 'Wait to respond, then inform',
    Projector: 'Wait for the invitation',
    Reflector: 'Wait a lunar cycle',
  };

  return strategies[type] || 'Unknown strategy';
};

/**
 * Calculate the authority based on the defined centers in the chart.
 * @param {string[]} definedCenters - An array of defined centers (e.g., ["Solar Plexus", "Sacral"]).
 * @returns {string} - The authority type (e.g., "Emotional", "Sacral").
 */
export const calculateAuthority = (definedCenters: string[]): string => {
  if (definedCenters.includes('Solar Plexus')) {
    return 'Emotional';
  } else if (definedCenters.includes('Sacral')) {
    return 'Sacral';
  } else if (definedCenters.includes('Spleen')) {
    return 'Splenic';
  } else if (definedCenters.includes('Ego')) {
    return 'Ego';
  } else if (definedCenters.includes('G Center')) {
    return 'Self-Projected';
  } else if (definedCenters.includes('Environment')) {
    return 'Environmental';
  } else if (definedCenters.includes('Lunar')) {
    return 'Lunar';
  } else {
    return 'None';
  }
};
