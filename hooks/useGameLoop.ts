import { GAME_CONFIG, TILE_HEIGHT } from '@/constants/gameConfig';
import { GameState } from '@/types/game';
import { generateTile, isTileMissed } from '@/utils/tileUtils';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useGameLoop = (screenHeight: number) => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    score: 0,
    isPlaying: false,
    gameOver: false,
  });

  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now());

  // Game loop - update tile positions
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState((prevState) => {
      // Update tile positions
      const updatedTiles = prevState.tiles.map((tile) => ({
        ...tile,
        y: tile.y + GAME_CONFIG.tileSpeed,
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

      // Spawn new tiles
      const currentTime = Date.now();
      let newTiles = [...visibleTiles];
      
      if (currentTime - lastSpawnTimeRef.current > GAME_CONFIG.spawnInterval) {
        newTiles.push(generateTile(screenHeight));
        lastSpawnTimeRef.current = currentTime;
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
    setGameState({
      tiles: [],
      score: 0,
      isPlaying: true,
      gameOver: false,
    });
    lastSpawnTimeRef.current = Date.now();
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

