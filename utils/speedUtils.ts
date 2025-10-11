// file: utils/speedUtils.ts

import {
    ENABLE_SPEED_RAMP,
    SPEED_RAMP_DURATION,
    TILE_INITIAL_SPAWN_INTERVAL,
    TILE_INITIAL_SPEED,
    TILE_MAX_SPEED,
    TILE_MIN_SPAWN_INTERVAL,
} from '@/constants/gameConfig';

/**
 * Calculates the current tile speed based on elapsed game time
 * 
 * When ENABLE_SPEED_RAMP is true:
 * - Speed gradually increases from TILE_INITIAL_SPEED to TILE_MAX_SPEED
 * - Uses ease-in interpolation for smooth acceleration
 * - Speed caps at TILE_MAX_SPEED after SPEED_RAMP_DURATION seconds
 * 
 * When ENABLE_SPEED_RAMP is false:
 * - Returns TILE_INITIAL_SPEED (constant speed)
 * 
 * @param elapsedTimeMs - Time elapsed since game start (in milliseconds)
 * @returns Current tile speed (pixels per frame)
 * 
 * @example
 * // Game just started (0ms)
 * calculateTileSpeed(0) // → 5 (TILE_INITIAL_SPEED)
 * 
 * // Halfway through ramp (30 seconds)
 * calculateTileSpeed(30000) // → ~8.5 (interpolated)
 * 
 * // After ramp completes (60+ seconds)
 * calculateTileSpeed(70000) // → 12 (TILE_MAX_SPEED)
 */
export const calculateTileSpeed = (elapsedTimeMs: number): number => {
  // If speed ramping is disabled, return constant speed
  if (!ENABLE_SPEED_RAMP) {
    return TILE_INITIAL_SPEED;
  }

  // Convert elapsed time to seconds
  const elapsedSeconds = elapsedTimeMs / 1000;

  // If ramp duration has passed, return max speed
  if (elapsedSeconds >= SPEED_RAMP_DURATION) {
    return TILE_MAX_SPEED;
  }

  // Calculate progress (0 to 1) through the ramp duration
  const progress = elapsedSeconds / SPEED_RAMP_DURATION;

  // Apply ease-in interpolation for smooth acceleration
  // Using quadratic ease-in: progress^2
  const easedProgress = progress * progress;

  // Interpolate between initial and max speed
  const speedRange = TILE_MAX_SPEED - TILE_INITIAL_SPEED;
  const currentSpeed = TILE_INITIAL_SPEED + speedRange * easedProgress;

  return currentSpeed;
};

/**
 * Calculates the current spawn interval based on elapsed game time
 * 
 * When ENABLE_SPEED_RAMP is true:
 * - Spawn interval gradually decreases from TILE_INITIAL_SPAWN_INTERVAL to TILE_MIN_SPAWN_INTERVAL
 * - Uses ease-in interpolation for smooth increase in spawn frequency
 * - Interval caps at TILE_MIN_SPAWN_INTERVAL after SPEED_RAMP_DURATION seconds
 * - Faster spawning = higher difficulty (more tiles to manage)
 * 
 * When ENABLE_SPEED_RAMP is false:
 * - Returns TILE_INITIAL_SPAWN_INTERVAL (constant spawn rate)
 * 
 * @param elapsedTimeMs - Time elapsed since game start (in milliseconds)
 * @returns Current spawn interval (milliseconds between tile spawns)
 * 
 * @example
 * // Game just started (0ms)
 * calculateSpawnInterval(0) // → 800ms (TILE_INITIAL_SPAWN_INTERVAL)
 * 
 * // Halfway through ramp (30 seconds)
 * calculateSpawnInterval(30000) // → ~675ms (interpolated)
 * 
 * // After ramp completes (60+ seconds)
 * calculateSpawnInterval(70000) // → 300ms (TILE_MIN_SPAWN_INTERVAL - fastest spawn rate)
 */
export const calculateSpawnInterval = (elapsedTimeMs: number): number => {
  // If speed ramping is disabled, return constant spawn interval
  if (!ENABLE_SPEED_RAMP) {
    return TILE_INITIAL_SPAWN_INTERVAL;
  }

  // Convert elapsed time to seconds
  const elapsedSeconds = elapsedTimeMs / 1000;

  // If ramp duration has passed, return minimum spawn interval (fastest)
  if (elapsedSeconds >= SPEED_RAMP_DURATION) {
    return TILE_MIN_SPAWN_INTERVAL;
  }

  // Calculate progress (0 to 1) through the ramp duration
  const progress = elapsedSeconds / SPEED_RAMP_DURATION;

  // Apply ease-in interpolation for smooth acceleration
  // Using quadratic ease-in: progress^2
  const easedProgress = progress * progress;

  // Interpolate between initial and min spawn interval
  // Note: We're decreasing the interval, so larger progress = smaller interval
  const intervalRange = TILE_INITIAL_SPAWN_INTERVAL - TILE_MIN_SPAWN_INTERVAL;
  const currentInterval = TILE_INITIAL_SPAWN_INTERVAL - intervalRange * easedProgress;

  return currentInterval;
};

/**
 * Alternative: Linear interpolation (commented out)
 * Uncomment this for constant acceleration instead of ease-in
 */
// export const calculateTileSpeedLinear = (elapsedTimeMs: number): number => {
//   if (!ENABLE_SPEED_RAMP) {
//     return TILE_INITIAL_SPEED;
//   }
//
//   const elapsedSeconds = elapsedTimeMs / 1000;
//
//   if (elapsedSeconds >= SPEED_RAMP_DURATION) {
//     return TILE_MAX_SPEED;
//   }
//
//   const progress = elapsedSeconds / SPEED_RAMP_DURATION;
//   const speedRange = TILE_MAX_SPEED - TILE_INITIAL_SPEED;
//   const currentSpeed = TILE_INITIAL_SPEED + speedRange * progress;
//
//   return currentSpeed;
// };

/**
 * Formats speed for debugging/display purposes
 * @param speed - Current tile speed (pixels per frame)
 * @returns Formatted string with pixels/sec conversion
 */
export const formatSpeed = (speed: number): string => {
  const pixelsPerSecond = Math.round(speed * 60); // Assuming 60fps
  return `${speed.toFixed(2)} px/frame (~${pixelsPerSecond} px/s)`;
};

/**
 * Formats spawn interval for debugging/display purposes
 * @param interval - Current spawn interval (milliseconds)
 * @returns Formatted string with tiles per second
 */
export const formatSpawnInterval = (interval: number): string => {
  const tilesPerSecond = (1000 / interval).toFixed(2);
  return `${interval.toFixed(0)}ms (~${tilesPerSecond} tiles/s)`;
};

