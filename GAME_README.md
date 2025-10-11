# Magic Tiles - Phase 1 Implementation

## 🎮 Overview
A rhythm-based tile tapping game built with Expo (React Native) where players must tap falling tiles before they reach the bottom of the screen.

## ✅ Phase 1 Features Implemented

### Core Gameplay
- **4 Vertical Lanes**: Full-screen layout with equal-width lanes
- **Falling Tiles**: Tiles spawn from the top and fall at a configurable speed (160px tall for improved tap comfort)
- **Progressive Difficulty**: 
  - Tile speed gradually increases from 5 to 12 pixels/frame over 60 seconds (ease-in curve)
  - Spawn rate increases from 1.25 to 3.33 tiles/second (800ms → 300ms interval)
  - Both speed and spawn rate ramp simultaneously for balanced difficulty scaling
- **Collision Prevention**: Tiles maintain minimum safe distance in same lane to avoid overlap
- **Tap Detection**: Players tap tiles within a hit zone near the bottom (80px tall zone, 160px from bottom)
- **Score System**: +10 points for each successfully tapped tile
- **Game Over Condition**: Game ends when a tile reaches the bottom untapped
- **Hit Zone Indicator**: White line marking the valid tap zone
- **Dynamic Backgrounds**: 8 vibrant gradient themes that cycle every 7 seconds with smooth crossfade transitions and dynamic vibrance modulation

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
  ├── tileUtils.ts         # Helper functions (tile generation, collision detection)
  ├── backgroundColors.ts  # Gradient themes and cycling logic (8 vibrant themes)
  ├── colorUtils.ts        # Color conversion and vibrance modulation utilities
  └── speedUtils.ts        # Speed ramping calculations (ease-in interpolation)

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
  tileSpeed: 5,            // Pixels per frame (legacy - overridden by speed ramp)
  spawnInterval: 800,      // Milliseconds between spawns
  hitZoneY: 160,           // Distance from bottom
  hitZoneHeight: 80,       // Height of hit zone
};

export const TILE_HEIGHT = 160;  // Height of each tile (increased for better tap comfort)

// Background gradients
export const BACKGROUND_CYCLE_INTERVAL = 7000;  // Gradient cycle interval (7 seconds)
export const ENABLE_SMOOTH_GRADIENTS = true;    // Enable smooth gradient transitions

// Speed ramping (progressive difficulty)
export const TILE_INITIAL_SPEED = 5;              // Starting speed (pixels/frame)
export const TILE_MAX_SPEED = 12;                 // Maximum speed (pixels/frame)
export const TILE_INITIAL_SPAWN_INTERVAL = 800;   // Starting spawn rate (ms)
export const TILE_MIN_SPAWN_INTERVAL = 300;       // Maximum spawn rate (ms)
export const SPEED_RAMP_DURATION = 60;            // Ramp duration (seconds)
export const ENABLE_SPEED_RAMP = true;            // Enable speed & spawn ramping
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

### Speed & Spawn Rate Ramping (Progressive Difficulty)
- **Time-based ramping** (not score-based) for predictable difficulty scaling
- **Dual ramping system**:
  - Tile speed: 5 → 12 pixels/frame (140% increase)
  - Spawn rate: 800ms → 300ms interval (167% faster spawning)
- **Ease-in quadratic interpolation** for smooth, natural acceleration
- **Collision prevention**: Tiles maintain minimum safe distance (1.5× tile height) in same lane
- **Performance optimized**:
  - Speed calculated once per frame (not per tile)
  - Spawn interval calculated once per spawn check
  - Uses `useRef` to avoid re-renders
  - Tiles remain isolated from ramping logic
- **Feature flag** allows instant toggle for testing/performance tuning (`ENABLE_SPEED_RAMP`)

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
- Background: Dynamic gradients (8 vibrant themes cycling every 7 seconds)
  - Themes include: Lavender Periwinkle, Sunset Glow, Teal Dream, Purple Pulse, Sky Blue Aqua, Fiery Coral, Aurora Mint, Neon Sky
  - Smooth crossfade transitions with dynamic vibrance modulation (when enabled)
- Tiles: `#000` (Black)
- Hit Zone: `#fff` (White, 80% opacity)
- Score: `#fff` (White)

## 📋 Next Phases

### Phase 2: Animations & Speed
- [x] Gradually increase tile speed (✅ Implemented with ease-in curve)
- [x] Gradually increase spawn rate (✅ Implemented with collision prevention)
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

