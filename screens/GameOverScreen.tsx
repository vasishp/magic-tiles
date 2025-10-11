// file: screens/GameOverScreen.tsx

import { DEFAULT_GRADIENT } from '@/utils/backgroundColors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
  onGoToDashboard: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onPlayAgain,
  onGoToDashboard,
}) => {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={DEFAULT_GRADIENT.colors as any}
        locations={DEFAULT_GRADIENT.locations as any}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>

        {/* Ad Placeholder */}
        <View style={styles.adPlaceholder}>
          <Text style={styles.adText}>[ Ad Placeholder ]</Text>
        </View>

        <Pressable style={styles.button} onPress={onPlayAgain}>
          <Text style={styles.buttonText}>Play Again</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={onGoToDashboard}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Go to Dashboard
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff4757',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
  },
  adPlaceholder: {
    width: 300,
    height: 100,
    backgroundColor: '#2f3542',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#57606f',
    borderStyle: 'dashed',
  },
  adText: {
    color: '#747d8c',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5f27cd',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#5f27cd',
  },
  secondaryButtonText: {
    color: '#5f27cd',
  },
});

