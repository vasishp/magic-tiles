import { TILE_HEIGHT } from '@/constants/gameConfig';
import { Tile as TileType } from '@/types/game';
import React from 'react';
import { Pressable } from 'react-native';

interface TileProps {
  tile: TileType;
  laneWidth: number;
  onTap: (tileId: string) => void;
}

export const Tile: React.FC<TileProps> = ({ tile, laneWidth, onTap }) => {
  const tileStyle = {
    position: 'absolute' as const,
    left: tile.lane * laneWidth,
    top: tile.y,
    width: laneWidth - 4,
    height: TILE_HEIGHT,
    backgroundColor: '#000',
    borderRadius: 8,
    marginHorizontal: 2,
  };

  return (
    <Pressable
      style={tileStyle}
      onPress={() => onTap(tile.id)}
    />
  );
};

