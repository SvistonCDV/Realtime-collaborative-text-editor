const adjectives = [
    'Swift', 'Brave', 'Clever', 'Mighty', 'Silent',
    'Golden', 'Crystal', 'Shadow', 'Thunder', 'Cosmic',
    'Noble', 'Fierce', 'Mystic', 'Radiant', 'Ancient',
    'Stellar', 'Crimson', 'Azure', 'Emerald', 'Silver'
];

const nouns = [
    'Fox', 'Wolf', 'Eagle', 'Tiger', 'Dragon',
    'Phoenix', 'Falcon', 'Panther', 'Lion', 'Hawk',
    'Bear', 'Owl', 'Raven', 'Shark', 'Cobra',
    'Jaguar', 'Viper', 'Griffin', 'Sphinx', 'Hydra'
];

const colors = [
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#00BCD4', // Cyan
    '#009688', // Teal
    '#4CAF50', // Green
    '#8BC34A', // Light Green
    '#FF9800', // Orange
    '#FF5722', // Deep Orange
    '#795548', // Brown
    '#607D8B', // Blue Grey
    '#F44336', // Red
    '#00ACC1', // Cyan Dark
];

/**
 * Generate a random username combining adjective + noun
 * @returns {string} Random username like "SwiftFox" or "BraveDragon"
 */
export function generateUsername() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}${noun}`;
}

/**
 * Generate a random color from the curated palette
 * @returns {string} Hex color code
 */
export function generateColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate complete user object with name and color
 * @returns {{ name: string, color: string }}
 */
export function generateUser() {
    return {
        name: generateUsername(),
        color: generateColor(),
    };
}
