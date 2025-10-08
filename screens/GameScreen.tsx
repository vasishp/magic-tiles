import { HitZone } from '@/components/game/HitZone';
import { Lane } from '@/components/game/Lane';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Tile } from '@/components/game/Tile';
import { GAME_CONFIG } from '@/constants/gameConfig';
import { useGameLoop } from '@/hooks/useGameLoop';
import { checkTileHit } from '@/utils/tileUtils';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const GameScreen: React.FC<{ onGameOver: (score: number) => void }> = ({ onGameOver }) => {
  const laneWidth = SCREEN_WIDTH / GAME_CONFIG.numberOfLanes;
  const { gameState, startGame, handleTileTap } = useGameLoop(SCREEN_HEIGHT);

  // Start game when component mounts
  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleLanePress = useCallback(
    (lane: number) => {
      if (!gameState.isPlaying || gameState.gameOver) return;

      const tileToTap = gameState.tiles.find((tile) =>
        checkTileHit(tile, lane, SCREEN_HEIGHT)
      );

      if (tileToTap) {
        handleTileTap(tileToTap.id);
      }
    },
    [gameState, handleTileTap]
  );

  useEffect(() => {
    if (gameState.gameOver) {
      onGameOver(gameState.score);
    }
  }, [gameState.gameOver, gameState.score, onGameOver]);

  return (
    <View style={styles.container}>
      {/* Lanes */}
      {Array.from({ length: GAME_CONFIG.numberOfLanes }).map((_, index) => (
        <Lane
          key={index}
          laneIndex={index}
          laneWidth={laneWidth}
          screenHeight={SCREEN_HEIGHT}
          onPress={handleLanePress}
        />
      ))}

      {/* Tiles */}
      {gameState.tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          laneWidth={laneWidth}
          onTap={handleTileTap}
        />
      ))}

      {/* Hit Zone Indicator */}
      <HitZone screenHeight={SCREEN_HEIGHT} />

      {/* Score Display */}
      <ScoreDisplay score={gameState.score} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    position: 'relative',
  },
});

