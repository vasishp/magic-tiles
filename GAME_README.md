# Magic Tiles - Phase 1 Implementation

## 🎮 Overview
A rhythm-based tile tapping game built with Expo (React Native) where players must tap falling tiles before they reach the bottom of the screen.

## ✅ Phase 1 Features Implemented

### Core Gameplay
- **4 Vertical Lanes**: Full-screen layout with equal-width lanes
- **Falling Tiles**: Tiles spawn from the top and fall at a configurable speed
- **Tap Detection**: Players tap tiles within a hit zone near the bottom
- **Score System**: +10 points for each successfully tapped tile
- **Game Over Condition**: Game ends when a tile reaches the bottom untapped
- **Hit Zone Indicator**: White line marking the valid tap zone

### Game Screens
1. **Start Screen**: Welcome screen with "Start Game" button
2. **Game Screen**: Main gameplay with 4 lanes, falling tiles, and score display
3. **Game Over Screen**: Shows final score, ad placeholder, and replay options

### Architecture

```
/types
  └── game.ts              # TypeScript interfaces for game state and config

/constants
  └── gameConfig.ts        # Game configuration (speed, lanes, hit zone)

/utils
  └── tileUtils.ts         # Helper functions (tile generation, collision detection)

/hooks
  └── useGameLoop.ts       # Custom hook managing game loop and state

/components/game
  ├── Tile.tsx            # Individual tile component
  ├── Lane.tsx            # Lane component with tap detection
  ├── HitZone.tsx         # Visual hit zone indicator
  └── ScoreDisplay.tsx    # Score display component

/screens
  ├── StartScreen.tsx     # Initial welcome screen
  ├── GameScreen.tsx      # Main game screen
  └── GameOverScreen.tsx  # Game over with replay options

/app/(tabs)
  └── index.tsx           # Main app entry point with game state management
```

## 🎯 How to Play

1. **Start**: Tap "Start Game" on the welcome screen
2. **Play**: Tap tiles as they fall through the white hit line
3. **Score**: Each successful tap awards 10 points
4. **Game Over**: Miss a tile and the game ends
5. **Replay**: Choose "Play Again" or return to dashboard

## ⚙️ Configuration

All game parameters are adjustable in `/constants/gameConfig.ts`:

```typescript
export const GAME_CONFIG = {
  numberOfLanes: 4,        // Number of vertical lanes
  tileSpeed: 5,            // Pixels per frame
  spawnInterval: 800,      // Milliseconds between spawns
  hitZoneY: 100,           // Distance from bottom
  hitZoneHeight: 80,       // Height of hit zone
};

export const TILE_HEIGHT = 120;  // Height of each tile
```

## 🔧 Technical Implementation

### Game Loop
- Uses `requestAnimationFrame` for smooth 60fps animation
- Frame-independent movement
- Automatic cleanup on unmount

### State Management
- React hooks for game state
- Functional components throughout
- Proper separation of concerns

### Collision Detection
- Precise hit zone detection
- Lane-based tap recognition
- Miss detection for game over

## 🚀 Running the Game

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📱 Tested On
- iOS Simulator
- Android Emulator
- Web Browser

## 🎨 Color Scheme
- Background: `#1a1a2e` (Dark blue-gray)
- Primary: `#5f27cd` (Purple)
- Tiles: `#000` (Black)
- Hit Zone: `#fff` (White)
- Score: `#fff` (White)

## 📋 Next Phases

### Phase 2: Animations & Speed
- [ ] Gradually increase tile speed
- [ ] Smooth tile animations with react-native-reanimated
- [ ] Tile bounce/fade effects on miss

### Phase 3: Tile Types
- [ ] Hold tiles (long press)
- [ ] Drag tiles (swipe along lane)
- [ ] Visual indicators for tile types
- [ ] Color coding for different types

### Phase 4: Polish
- [ ] Replay functionality
- [ ] Real ads integration (expo-ads-admob)
- [ ] Screen transitions
- [ ] Sound effects
- [ ] Haptic feedback
- [ ] Leaderboard

## 🐛 Known Issues
- None currently identified in Phase 1

## 📝 Notes
- The game uses a modular architecture for easy expansion
- All components are functional with hooks
- TypeScript ensures type safety throughout
- Responsive design works on all screen sizes

