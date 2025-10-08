import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface LaneProps {
  laneIndex: number;
  laneWidth: number;
  screenHeight: number;
  onPress: (lane: number) => void;
}

export const Lane: React.FC<LaneProps> = ({ laneIndex, laneWidth, screenHeight, onPress }) => {
  return (
    <Pressable
      style={[
        styles.lane,
        {
          width: laneWidth,
          height: screenHeight,
          left: laneIndex * laneWidth,
        },
      ]}
      onPress={() => onPress(laneIndex)}
    >
      <View style={styles.laneBorder} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lane: {
    position: 'absolute',
    top: 0,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  laneBorder: {
    flex: 1,
  },
});

