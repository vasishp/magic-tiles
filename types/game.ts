export interface Tile {
  id: string;
  lane: number; // 0-3 for 4 lanes
  y: number; // vertical position
  type: 'tap'; // For Phase 1, only tap type
  isTapped: boolean;
}

export interface GameConfig {
  numberOfLanes: number;
  tileSpeed: number; // pixels per frame
  spawnInterval: number; // milliseconds
  hitZoneY: number; // Y position of hit zone from bottom
  hitZoneHeight: number; // Height of hit zone
}

export interface GameState {
  tiles: Tile[];
  score: number;
  isPlaying: boolean;
  gameOver: boolean;
}

