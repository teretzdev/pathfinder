/**
 * Mock Data Utility
 * This file contains mock data for development purposes.
 * The mock data is designed to simulate real-world scenarios for testing and prototyping.
 */

// Mock data for user profiles
export const mockUserProfiles = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    bio: 'Astrology enthusiast and avid traveler.',
    dateOfBirth: '1990-05-15',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    bio: 'Tech geek and human design expert.',
    dateOfBirth: '1985-08-22',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    bio: 'Dream Spell astrology researcher.',
    dateOfBirth: '1992-11-03',
  },
];

// Mock data for diary entries
export const mockDiaryEntries = [
  {
    id: 1,
    date: '2023-10-01',
    title: 'A Day of Synchronicity',
    content: 'Today, I noticed repeating numbers everywhere. It felt magical.',
  },
  {
    id: 2,
    date: '2023-10-02',
    title: 'Unexpected Encounter',
    content: 'I met someone who shared the same birth chart placements as me!',
  },
  {
    id: 3,
    date: '2023-10-03',
    title: 'Reflection on Patterns',
    content: 'I realized how certain patterns keep repeating in my life.',
  },
];

// Mock data for connections
export const mockConnections = [
  {
    id: 1,
    name: 'Alice Johnson',
    sharedPatterns: ['Transit A', 'Transit B', 'Transit C'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    sharedPatterns: ['Transit D', 'Transit E'],
  },
  {
    id: 3,
    name: 'Charlie Brown',
    sharedPatterns: ['Transit F', 'Transit G', 'Transit H', 'Transit I'],
  },
];

// Mock data for astrological transits
export const mockTransits = [
  {
    planet: 'Mars',
    aspect: 'Conjunction',
    sign: 'Aries',
    date: '2023-10-01',
  },
  {
    planet: 'Venus',
    aspect: 'Square',
    sign: 'Cancer',
    date: '2023-10-02',
  },
  {
    planet: 'Mercury',
    aspect: 'Trine',
    sign: 'Leo',
    date: '2023-10-03',
  },
];

// Mock data for biorhythm cycles
export const mockBiorhythmData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  physical: Array.from({ length: 30 }, (_, i) => Math.sin((2 * Math.PI * i) / 23) * 100),
  emotional: Array.from({ length: 30 }, (_, i) => Math.sin((2 * Math.PI * i) / 28) * 100),
  intellectual: Array.from({ length: 30 }, (_, i) => Math.sin((2 * Math.PI * i) / 33) * 100),
};

// Mock data for Dream Spell astrology
export const mockDreamSpellData = [
  {
    date: '2023-10-01',
    kinNumber: 1,
    glyphName: 'Red Dragon',
    toneName: 'Magnetic',
  },
  {
    date: '2023-10-02',
    kinNumber: 2,
    glyphName: 'White Wind',
    toneName: 'Lunar',
  },
  {
    date: '2023-10-03',
    kinNumber: 3,
    glyphName: 'Blue Night',
    toneName: 'Electric',
  },
];

// Mock data for human design centers
export const mockHumanDesignData = [
  {
    center: 'Head',
    activations: 5,
    totalGates: 9,
    activationPercentage: 55.56,
    type: 'Defined',
  },
  {
    center: 'Ajna',
    activations: 3,
    totalGates: 9,
    activationPercentage: 33.33,
    type: 'Undefined',
  },
  {
    center: 'Throat',
    activations: 0,
    totalGates: 11,
    activationPercentage: 0,
    type: 'Open',
  },
];
