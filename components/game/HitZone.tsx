import { GAME_CONFIG } from '@/constants/gameConfig';
import React from 'react';
import { View } from 'react-native';

interface HitZoneProps {
  screenHeight: number;
}

export const HitZone: React.FC<HitZoneProps> = ({ screenHeight }) => {
  const hitZoneStyle = {
    position: 'absolute' as const,
    bottom: GAME_CONFIG.hitZoneY,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#fff',
    opacity: 0.8,
  };

  return <View style={hitZoneStyle} />;
};

