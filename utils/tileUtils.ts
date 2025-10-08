import { GAME_CONFIG, TILE_HEIGHT } from '@/constants/gameConfig';
import { Tile } from '@/types/game';

export const generateTile = (screenHeight: number): Tile => {
  const randomLane = Math.floor(Math.random() * GAME_CONFIG.numberOfLanes);
  
  return {
    id: `tile-${Date.now()}-${Math.random()}`,
    lane: randomLane,
    y: -TILE_HEIGHT, // Start above screen
    type: 'tap',
    isTapped: false,
  };
};

export const isInHitZone = (tileY: number, screenHeight: number): boolean => {
  const hitZoneTop = screenHeight - GAME_CONFIG.hitZoneY - GAME_CONFIG.hitZoneHeight;
  const hitZoneBottom = screenHeight - GAME_CONFIG.hitZoneY;
  const tileBottom = tileY + TILE_HEIGHT;
  
  return tileBottom >= hitZoneTop && tileY <= hitZoneBottom;
};

export const isTileMissed = (tileY: number, screenHeight: number): boolean => {
  const hitZoneBottom = screenHeight - GAME_CONFIG.hitZoneY;
  return tileY > hitZoneBottom;
};

export const checkTileHit = (
  tile: Tile,
  lane: number,
  screenHeight: number
): boolean => {
  return tile.lane === lane && isInHitZone(tile.y, screenHeight) && !tile.isTapped;
};

