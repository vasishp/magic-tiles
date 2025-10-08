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

