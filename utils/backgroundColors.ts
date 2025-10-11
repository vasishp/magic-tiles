// file: utils/backgroundColors.ts

import { modulateGradientColors } from './colorUtils';

/**
 * Defines gradient color themes that shift as score increases
 */
export interface GradientTheme {
  colors: readonly string[];
  locations?: readonly number[];
}

/**
 * Vibrant gradient themes that cycle continuously throughout gameplay
 * Balanced mix of warm and cool tones with high saturation for visual energy
 * Each gradient maintains contrast with black tiles for optimal visibility
 */
const VIBRANT_GRADIENTS: readonly GradientTheme[] = [
  // 0 - Lavender Periwinkle (Cool Start - Brightened)
  {
    colors: ['#7B9FE3', '#A7B9F5', '#8BA3E3'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 1 - Sunset Glow (Warm)
  {
    colors: ['#FF512F', '#F09819', '#FF7B39'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 2 - Teal Dream (Cool)
  {
    colors: ['#11998E', '#38EF7D', '#29C17E'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 3 - Purple Pulse (Cool)
  {
    colors: ['#7F00FF', '#E100FF', '#A45DE6'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 4 - Sky Blue Aqua (Cool - Brightened)
  {
    colors: ['#4FC3F7', '#6DD5FA', '#51B9E5'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 5 - Fiery Coral (Warm)
  {
    colors: ['#F85032', '#E73827', '#FF5F6D'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 6 - Aurora Mint (Cool)
  {
    colors: ['#76B852', '#8DC26F', '#A3D08A'] as const,
    locations: [0, 0.5, 1] as const,
  },
  // 7 - Neon Sky (Cool/Fresh)
  {
    colors: ['#00C9FF', '#92FE9D', '#4EE7B3'] as const,
    locations: [0, 0.5, 1] as const,
  },
] as const;

/**
 * Total number of gradient themes available
 */
export const GRADIENT_COUNT = VIBRANT_GRADIENTS.length;

/**
 * Gets a gradient theme by index
 * Uses modular arithmetic to ensure index is always within bounds
 * 
 * @param index - Gradient index (will be wrapped using modulo)
 * @param enableVibrance - Optional: apply dynamic vibrance modulation
 * @param time - Optional: time in ms for vibrance calculation
 * @returns GradientTheme with colors and locations
 * 
 * @example
 * - Index 0: Lavender Periwinkle
 * - Index 1: Sunset Glow
 * - Index 2: Teal Dream
 * - Index 3: Purple Pulse
 * - Index 4: Sky Blue Aqua
 * - Index 5: Fiery Coral
 * - Index 6: Aurora Mint
 * - Index 7: Neon Sky
 * - Index 8+: Wraps back to 0 and repeats
 */
export const getGradientByIndex = (
  index: number,
  enableVibrance: boolean = false,
  time: number = 0
): GradientTheme => {
  const safeIndex = index % VIBRANT_GRADIENTS.length;
  const baseGradient = VIBRANT_GRADIENTS[safeIndex];

  if (enableVibrance && time > 0) {
    const modulatedColors = modulateGradientColors(baseGradient.colors, time);
    return {
      colors: modulatedColors as any,
      locations: baseGradient.locations,
    };
  }

  return baseGradient;
};

/**
 * Static gradient for non-game screens (Start, GameOver)
 * Uses the starting Lavender Periwinkle theme for consistency
 */
export const DEFAULT_GRADIENT: GradientTheme = {
  colors: ['#7B9FE3', '#A7B9F5', '#8BA3E3'] as const,
  locations: [0, 0.5, 1] as const,
};
