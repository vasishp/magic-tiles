// file: screens/GameScreen.tsx

import { HitZone } from '@/components/game/HitZone';
import { Lane } from '@/components/game/Lane';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Tile } from '@/components/game/Tile';
import { BACKGROUND_CYCLE_INTERVAL, GAME_CONFIG } from '@/constants/gameConfig';
import { useGameLoop } from '@/hooks/useGameLoop';
import { getGradientByIndex, GRADIENT_COUNT } from '@/utils/backgroundColors';
import { checkTileHit } from '@/utils/tileUtils';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const GameScreen: React.FC<{ onGameOver: (score: number) => void }> = ({ onGameOver }) => {
  const laneWidth = SCREEN_WIDTH / GAME_CONFIG.numberOfLanes;
  const { gameState, startGame, handleTileTap } = useGameLoop(SCREEN_HEIGHT);

  // Timer-based gradient cycling state
  const [gradientIndex, setGradientIndex] = useState(0);

  // Calculate gradient colors based on current index (timer-based cycling)
  const gradientTheme = useMemo(() => {
    return getGradientByIndex(gradientIndex);
  }, [gradientIndex]);

  // Timer-based gradient cycling - changes every BACKGROUND_CYCLE_INTERVAL ms
  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    const intervalId = setInterval(() => {
      setGradientIndex((prevIndex) => (prevIndex + 1) % GRADIENT_COUNT);
    }, BACKGROUND_CYCLE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [gameState.isPlaying, gameState.gameOver]);

  // Start game when component mounts
  useEffect(() => {
    startGame();
    setGradientIndex(0); // Reset gradient to start
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
      {/* Dynamic Gradient Background */}
      <LinearGradient
        colors={gradientTheme.colors as any}
        locations={gradientTheme.locations as any}
        style={StyleSheet.absoluteFillObject}
      />

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
    position: 'relative',
  },
});

