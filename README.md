# React Native Motion

Framer Motion-like animations for React Native using Reanimated.

## Installation

```bash
npm install react-native-motion
# or
yarn add react-native-motion
```

## Prerequisites

This package requires:
- `react-native-reanimated` >= 3.0.0
- `react-native` >= 0.60.0
- `react` >= 16.8.0

## Usage

```tsx
import { NativeMotion } from 'react-native-motion';

// Basic animation
<NativeMotion.View
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ type: 'spring', damping: 15 }}
>
  <Text>Animated content</Text>
</NativeMotion.View>

// Exit animation
<NativeMotion.View
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0 }}
  shouldExit={shouldHide}
  onExitComplete={() => console.log('Animation complete')}
>
  <Text>Content with exit animation</Text>
</NativeMotion.View>
```

## Components

- `NativeMotion.View`
- `NativeMotion.Text`
- `NativeMotion.Image`
- `NativeMotion.TextInput`
- `NativeMotion.TouchableOpacity`

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