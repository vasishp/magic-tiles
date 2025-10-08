import { GameOverScreen } from '@/screens/GameOverScreen';
import { GameScreen } from '@/screens/GameScreen';
import { StartScreen } from '@/screens/StartScreen';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type GameMode = 'start' | 'playing' | 'gameOver';

export default function HomeScreen() {
  const [gameMode, setGameMode] = useState<GameMode>('start');
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = useCallback(() => {
    setGameMode('playing');
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setGameMode('gameOver');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameMode('playing');
  }, []);

  const handleGoToDashboard = useCallback(() => {
    setGameMode('start');
  }, []);

  return (
    <View style={styles.container}>
      {gameMode === 'start' && <StartScreen onStartGame={handleStartGame} />}
      {gameMode === 'playing' && <GameScreen onGameOver={handleGameOver} />}
      {gameMode === 'gameOver' && (
        <GameOverScreen
          score={finalScore}
          onPlayAgain={handlePlayAgain}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
