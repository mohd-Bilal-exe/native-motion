# Motion on Native

Framer Motion-like animations for React Native using Reanimated.

## Installation

```bash
npm install motion-on-native
# or
yarn add motion-on-native
```

## Prerequisites

This package requires:

- `react-native-reanimated` >= 3.0.0
- `react-native` >= 0.60.0
- `react` >= 16.8.0

## Usage

```tsx
import { NativeMotion } from 'motion-on-native';

// Controlled animation
<NativeMotion.View
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, scale: 0 }}
  shouldAnimate={shouldShow}
  shouldDeAnimate={shouldHide}
  shouldExit={shouldExit}
  transition={{ type: 'spring', damping: 15 }}
  onExitComplete={() => console.log('Exit animation complete')}
>
  <Text>Animated content</Text>
</NativeMotion.View>
```

## Components

- `NativeMotion.View`
- `NativeMotion.Text`
- `NativeMotion.Image`
- `NativeMotion.TextInput`
- `NativeMotion.TouchableOpacity`

## Animation Control Props

- `shouldAnimate`: boolean - Triggers animation from `initial` to `animate`
- `shouldDeAnimate`: boolean - Triggers animation from `animate` back to `initial`
- `shouldExit`: boolean - Triggers animation from current state to `exit` (element stays mounted)
- `onExitComplete`: callback - Called when exit animation completes

## Animation Properties

- `opacity`: 0-1
- `x`, `y`: translation in pixels
- `scale`: size multiplier
- `rotate`: rotation (e.g., '45deg')
- `width`, `height`: dimensions in pixels
- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `borderRadius`, `borderWidth`, `borderColor`
- `backgroundColor`: hex color
- `top`, `bottom`, `left`, `right`: positioning

## Transition Types

```tsx
// Spring animation
transition={{ type: 'spring', damping: 15, stiffness: 100 }}

// Timing animation
transition={{ type: 'timing', duration: 300 }}
```

## License

MIT
