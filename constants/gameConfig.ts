import { GameConfig } from '@/types/game';

export const GAME_CONFIG: GameConfig = {
  numberOfLanes: 4,
  tileSpeed: 5, // pixels per frame (legacy - overridden by TILE_INITIAL_SPEED when ramping enabled)
  spawnInterval: 800, // milliseconds between spawns (overridden by dynamic spawn interval when ramping enabled)
  hitZoneY: 160, // Distance from bottom of screen
  hitZoneHeight: 80, // Height of the hit zone
};

/**
 * Tile dimensions
 * TILE_HEIGHT increased to 160 for improved tap comfort
 * Width is determined by lane width (screen width / numberOfLanes)
 */
export const TILE_HEIGHT = 160;
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

/**
 * Tile speed ramping configuration
 * 
 * When ENABLE_SPEED_RAMP is true, tiles gradually increase speed from
 * TILE_INITIAL_SPEED to TILE_MAX_SPEED over SPEED_RAMP_DURATION seconds.
 * 
 * Speed values are in pixels per frame (at ~60fps).
 * 
 * @example
 * - TILE_INITIAL_SPEED: 5 = ~300 pixels/second (gentle start)
 * - TILE_MAX_SPEED: 12 = ~720 pixels/second (challenging)
 * - SPEED_RAMP_DURATION: 60 = ramps up over 60 seconds
 */

/**
 * Initial tile falling speed (pixels per frame)
 * Default: 5 (comfortable starting speed)
 */
export const TILE_INITIAL_SPEED = 5;

/**
 * Maximum tile falling speed (pixels per frame)
 * Default: 12 (challenging but playable)
 */
export const TILE_MAX_SPEED = 12;

/**
 * Initial tile spawn interval (milliseconds)
 * Default: 800ms (1.25 tiles per second - comfortable starting rate)
 * Note: This value is used from GAME_CONFIG.spawnInterval
 */
export const TILE_INITIAL_SPAWN_INTERVAL = 800;

/**
 * Minimum tile spawn interval (milliseconds)
 * Default: 300ms (3.33 tiles per second - fast but playable)
 * At max speed, tiles spawn more frequently to maintain challenge
 */
export const TILE_MIN_SPAWN_INTERVAL = 300;

/**
 * Duration in seconds to ramp from initial to max speed
 * Default: 60 seconds (gradual difficulty increase)
 * Note: Both speed and spawn rate ramp over this duration
 */
export const SPEED_RAMP_DURATION = 60;

/**
 * Enable gradual speed and spawn rate ramping
 * When true: Speed increases and spawn rate increases over time (progressive difficulty)
 * When false: Speed and spawn rate remain constant
 * Default: true (progressive challenge)
 * 
 * Performance impact when enabled: minimal
 * - Single speed calculation per frame
 * - Single spawn interval calculation per spawn check
 * - No additional rendering or component updates
 */
export const ENABLE_SPEED_RAMP = true;

