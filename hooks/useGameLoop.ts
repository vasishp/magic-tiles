import { TILE_HEIGHT } from '@/constants/gameConfig';
import { GameState } from '@/types/game';
import { calculateSpawnInterval, calculateTileSpeed } from '@/utils/speedUtils';
import { generateTile, isTileMissed } from '@/utils/tileUtils';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useGameLoop = (screenHeight: number) => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    score: 0,
    isPlaying: false,
    gameOver: false,
  });

  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastSpawnTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(0);

  // Game loop - update tile positions
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    // Calculate current speed and spawn interval based on elapsed time
    const currentTime = Date.now();
    const elapsedTime = currentTime - gameStartTimeRef.current;
    const currentSpeed = calculateTileSpeed(elapsedTime);
    const currentSpawnInterval = calculateSpawnInterval(elapsedTime);

    setGameState((prevState) => {
      // Update tile positions using dynamic speed
      const updatedTiles = prevState.tiles.map((tile) => ({
        ...tile,
        y: tile.y + currentSpeed,
      }));

      // Check for missed tiles (game over condition)
      const missedTile = updatedTiles.find(
        (tile) => !tile.isTapped && isTileMissed(tile.y, screenHeight)
      );

      if (missedTile) {
        return {
          ...prevState,
          tiles: updatedTiles,
          gameOver: true,
          isPlaying: false,
        };
      }

      // Remove tiles that are off screen
      const visibleTiles = updatedTiles.filter(
        (tile) => tile.y < screenHeight + TILE_HEIGHT
      );

      // Spawn new tiles using dynamic spawn interval
      let newTiles = [...visibleTiles];
      
      if (currentTime - lastSpawnTimeRef.current > currentSpawnInterval) {
        const newTile = generateTile(screenHeight);
        
        // Collision prevention: Check if there's already a tile too close in the same lane
        const minSafeDistance = TILE_HEIGHT * 1.5; // Minimum distance between tiles in same lane
        const hasCollision = visibleTiles.some(
          (existingTile) =>
            existingTile.lane === newTile.lane &&
            Math.abs(existingTile.y - newTile.y) < minSafeDistance
        );

        // Only spawn if there's no collision
        if (!hasCollision) {
          newTiles.push(newTile);
          lastSpawnTimeRef.current = currentTime;
        } else {
          // If there's a collision, delay spawn by a short time (half the spawn interval)
          lastSpawnTimeRef.current = currentTime - currentSpawnInterval / 2;
        }
      }

      return {
        ...prevState,
        tiles: newTiles,
      };
    });

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPlaying, gameState.gameOver, screenHeight]);

  // Start game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.gameOver, gameLoop]);

  const startGame = useCallback(() => {
    const now = Date.now();
    setGameState({
      tiles: [],
      score: 0,
      isPlaying: true,
      gameOver: false,
    });
    lastSpawnTimeRef.current = now;
    gameStartTimeRef.current = now; // Initialize game start time for speed ramping
  }, []);

  const handleTileTap = useCallback((tileId: string) => {
    setGameState((prevState) => {
      const tileIndex = prevState.tiles.findIndex((t) => t.id === tileId);
      if (tileIndex === -1) return prevState;

      const updatedTiles = [...prevState.tiles];
      updatedTiles[tileIndex] = { ...updatedTiles[tileIndex], isTapped: true };

      return {
        ...prevState,
        tiles: updatedTiles.filter((t) => t.id !== tileId),
        score: prevState.score + 10,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      tiles: [],
      score: 0,
      isPlaying: false,
      gameOver: false,
    });
  }, []);

  return {
    gameState,
    startGame,
    handleTileTap,
    resetGame,
  };
};

