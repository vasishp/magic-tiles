import { GameConfig } from '@/types/game';

export const GAME_CONFIG: GameConfig = {
  numberOfLanes: 4,
  tileSpeed: 5, // pixels per frame
  spawnInterval: 800, // milliseconds between spawns
  hitZoneY: 100, // Distance from bottom of screen
  hitZoneHeight: 80, // Height of the hit zone
};

export const TILE_HEIGHT = 120;
export const TILE_GAP = 10;

/**
 * Background gradient cycle interval in milliseconds
 * Determines how often the background gradient changes during gameplay
 * Default: 7000ms (7 seconds) - provides smooth, non-distracting transitions
 */
export const BACKGROUND_CYCLE_INTERVAL = 7000;

/**
 * Enable smooth gradient transitions and dynamic vibrance modulation
 * When true: Gradients crossfade over 2 seconds with subtle vibrance shifts
 * When false: Gradients switch instantly with no vibrance modulation
 * Default: false (for better performance and to avoid flicker)
 * 
 * Performance impact when enabled:
 * - Dual gradient rendering (2 LinearGradient components)
 * - Vibrance updates every 100ms
 * - Reanimated opacity animations
 * 
 * Set to true only if device can handle the extra rendering load
 */
export const ENABLE_SMOOTH_GRADIENTS = true;

