// file: screens/StartScreen.tsx

import { DEFAULT_GRADIENT } from '@/utils/backgroundColors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface StartScreenProps {
  onStartGame: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={DEFAULT_GRADIENT.colors as any}
        locations={DEFAULT_GRADIENT.locations as any}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Magic Tiles</Text>
        <Text style={styles.subtitle}>Tap the tiles, don't miss any!</Text>

        <Pressable style={styles.button} onPress={onStartGame}>
          <Text style={styles.buttonText}>Start Game</Text>
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
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#5f27cd',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 50,
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#5f27cd',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});

