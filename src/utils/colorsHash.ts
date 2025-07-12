// Generate a consistent color for a given speaker name
export const getSpeakerColor = (speakerName: string): string => {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < speakerName.length; i++) {
    const char = speakerName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to generate a color
  const hue = Math.abs(hash) % 360; // 0-359 degrees
  const saturation = 70 + (Math.abs(hash) % 20); // 70-89%
  const lightness = 45 + (Math.abs(hash) % 15); // 45-59%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Alternative: Predefined color palette for better visual distinction
export const getSpeakerColorFromPalette = (speakerName: string): string => {
  const colors = [
    "#EF476F", // Coral Pink
    "#FFD166", // Warm Yellow
    "#06D6A0", // Mint Green
    "#118AB2", // Soft Teal Blue
    "#073B4C", // Deep Navy
    "#8E44AD", // Soft Purple
    "#F4A261", // Light Orange
    "#2A9D8F", // Dusty Turquoise
    "#E76F51", // Terracotta
    "#1D3557", // Midnight Blue
    "#A8DADC", // Pale Aqua
    "#FFB4A2", // Blush Peach
  ];

  // Simple hash to get consistent index
  let hash = 0;
  for (let i = 0; i < speakerName.length; i++) {
    const char = speakerName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return colors[Math.abs(hash) % colors.length];
};
