// file: screens/GameScreen.tsx

import { HitZone } from '@/components/game/HitZone';
import { Lane } from '@/components/game/Lane';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Tile } from '@/components/game/Tile';
import {
  BACKGROUND_CYCLE_INTERVAL,
  ENABLE_SMOOTH_GRADIENTS,
  GAME_CONFIG,
} from '@/constants/gameConfig';
import { useGameLoop } from '@/hooks/useGameLoop';
import { getGradientByIndex, GRADIENT_COUNT } from '@/utils/backgroundColors';
import { checkTileHit } from '@/utils/tileUtils';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Transition duration for smooth gradient crossfade (2 seconds)
const TRANSITION_DURATION = 2000;

// Vibrance update interval (200ms for better performance on lower-end devices)
const VIBRANCE_UPDATE_INTERVAL = 200;

// Create animated LinearGradient component
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// Styles defined here so BackgroundGradient can access them
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Gradients stay in background
  },
  gameContentLayer: {
    flex: 1,
    zIndex: 10, // Game content always on top
    position: 'relative',
  },
});

/**
 * Background gradient component - fully isolated to prevent tile re-renders
 */
const BackgroundGradient: React.FC<{
  isPlaying: boolean;
  gameOver: boolean;
}> = React.memo(({ isPlaying, gameOver }) => {
  // Current and next gradient indices
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  
  // Vibrance modulation time (throttled updates)
  const [vibranceTime, setVibranceTime] = useState(0);
  const vibranceIntervalRef = useRef<any>(null);
  const cycleIntervalRef = useRef<any>(null);

  // Opacity control for crossfade with separate shared values
  const currentOpacity = useSharedValue(1);
  const nextOpacity = useSharedValue(0);

  // Calculate current and next gradients with memoization
  const currentGradient = useMemo(() => {
    if (!ENABLE_SMOOTH_GRADIENTS) {
      return getGradientByIndex(currentIndex, false, 0);
    }
    return getGradientByIndex(currentIndex, true, vibranceTime);
  }, [currentIndex, vibranceTime]);

  const nextGradient = useMemo(() => {
    if (!ENABLE_SMOOTH_GRADIENTS) {
      return getGradientByIndex(currentIndex, false, 0);
    }
    return getGradientByIndex(nextIndex, true, vibranceTime);
  }, [currentIndex, nextIndex, vibranceTime]);

  // Animated styles with proper z-index (gradients stay in background)
  const currentGradientStyle = useAnimatedStyle(() => ({
    opacity: currentOpacity.value,
  }));

  const nextGradientStyle = useAnimatedStyle(() => ({
    opacity: nextOpacity.value,
  }));

  // Vibrance modulation (throttled to reduce re-renders)
  useEffect(() => {
    if (!ENABLE_SMOOTH_GRADIENTS || !isPlaying || gameOver) {
      if (vibranceIntervalRef.current) {
        clearInterval(vibranceIntervalRef.current);
        vibranceIntervalRef.current = null;
      }
      return;
    }

    const startTime = Date.now();
    vibranceIntervalRef.current = setInterval(() => {
      setVibranceTime(Date.now() - startTime);
    }, VIBRANCE_UPDATE_INTERVAL);

    return () => {
      if (vibranceIntervalRef.current) {
        clearInterval(vibranceIntervalRef.current);
        vibranceIntervalRef.current = null;
      }
    };
  }, [isPlaying, gameOver]);

  // Callback to update indices after transition completes
  const updateIndices = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GRADIENT_COUNT);
    setNextIndex((prev) => (prev + 1) % GRADIENT_COUNT);
  }, []);

  // Gradient cycling with smooth transitions
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      return;
    }

    cycleIntervalRef.current = setInterval(() => {
      if (ENABLE_SMOOTH_GRADIENTS) {
        // Start crossfade animation
        nextOpacity.value = withTiming(
          1,
          {
            duration: TRANSITION_DURATION,
            easing: Easing.inOut(Easing.ease),
          },
          (finished) => {
            if (finished) {
              // After animation completes, update indices and reset opacities
              runOnJS(updateIndices)();
              currentOpacity.value = 1;
              nextOpacity.value = 0;
            }
          }
        );
        currentOpacity.value = withTiming(0, {
          duration: TRANSITION_DURATION,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        // Instant switch
        updateIndices();
      }
    }, BACKGROUND_CYCLE_INTERVAL);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
    };
  }, [isPlaying, gameOver, currentOpacity, nextOpacity, updateIndices]);

  // Reset on game start
  useEffect(() => {
    if (isPlaying && !gameOver) {
      setCurrentIndex(0);
      setNextIndex(1);
      setVibranceTime(0);
      currentOpacity.value = 1;
      nextOpacity.value = 0;
    }
  }, [isPlaying, gameOver, currentOpacity, nextOpacity]);

  if (ENABLE_SMOOTH_GRADIENTS) {
    return (
      <>
        {/* Current gradient layer - stays in background */}
        <AnimatedLinearGradient
          colors={currentGradient.colors as any}
          locations={currentGradient.locations as any}
          style={[styles.gradientLayer, currentGradientStyle]}
          pointerEvents="none"
        />
        {/* Next gradient layer (crossfading in) - stays in background */}
        <AnimatedLinearGradient
          colors={nextGradient.colors as any}
          locations={nextGradient.locations as any}
          style={[styles.gradientLayer, nextGradientStyle]}
          pointerEvents="none"
        />
      </>
    );
  }

  // Instant mode - single gradient
  return (
    <LinearGradient
      colors={currentGradient.colors as any}
      locations={currentGradient.locations as any}
      style={styles.gradientLayer}
      pointerEvents="none"
    />
  );
});

BackgroundGradient.displayName = 'BackgroundGradient';

/**
 * Main game screen component
 */
export const GameScreen: React.FC<{ onGameOver: (score: number) => void }> = ({
  onGameOver,
}) => {
  const laneWidth = SCREEN_WIDTH / GAME_CONFIG.numberOfLanes;
  const { gameState, startGame, handleTileTap } = useGameLoop(SCREEN_HEIGHT);

  // Start game when component mounts
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Memoized lane press handler to prevent unnecessary re-renders
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
    [gameState.isPlaying, gameState.gameOver, gameState.tiles, handleTileTap]
  );

  useEffect(() => {
    if (gameState.gameOver) {
      onGameOver(gameState.score);
    }
  }, [gameState.gameOver, gameState.score, onGameOver]);

  return (
    <View style={styles.container}>
      {/* Background Gradient - Fully Isolated Component (z-index: 0) */}
      <BackgroundGradient
        isPlaying={gameState.isPlaying}
        gameOver={gameState.gameOver}
      />

      {/* Game Content Layer - All game elements above gradients (z-index: 10) */}
      <View style={styles.gameContentLayer}>
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

        {/* Tiles - fully isolated from gradient updates */}
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
    </View>
  );
};
