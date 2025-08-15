import React, { useEffect, useState, ComponentType, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export interface AnimationProps {
  // Transform properties
  opacity?: number;
  x?: number;
  y?: number;
  z?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  skewX?: string;
  skewY?: string;
  
  // Layout properties
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  
  // Spacing properties
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  
  // Border properties
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderColor?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  
  // Color properties
  backgroundColor?: string;
  color?: string;
  
  // Position properties
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  
  // Shadow properties (iOS)
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  
  // Elevation (Android)
  elevation?: number;
}

export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  delay?: number;
  ease?: string;
}

export interface MotionComponentProps {
  initial?: AnimationProps | false;
  animate?: AnimationProps;
  exit?: AnimationProps;
  transition?: TransitionProps;
  shouldExit?: boolean;
  onExitComplete?: () => void;
  whileHover?: AnimationProps;
  whileTap?: AnimationProps;
  whileFocus?: AnimationProps;
  layout?: boolean;
  layoutId?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const DEFAULT_TRANSITION: TransitionProps = {
  type: 'spring',
  damping: 15,
  stiffness: 100,
  duration: 300,
};

function createMotionComponent<T extends ComponentType<any>>(Component: T) {
  return function MotionComponent(props: MotionComponentProps & React.ComponentProps<T>) {
    const {
      initial = {},
      animate = {},
      exit = {},
      transition = DEFAULT_TRANSITION,
      shouldExit = false,
      onExitComplete,
      whileHover,
      whileTap,
      whileFocus,
      layout,
      layoutId,
      style = {},
      children,
      ...rest
    } = props;

    const [isPresent, setIsPresent] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);
    const isExitingRef = useRef(false);

    // Create shared values
    const opacity = useSharedValue(getInitialValue('opacity', initial));
    const x = useSharedValue(getInitialValue('x', initial));
    const y = useSharedValue(getInitialValue('y', initial));
    const scale = useSharedValue(getInitialValue('scale', initial));
    const rotate = useSharedValue(getInitialValue('rotate', initial));
    const width = useSharedValue(getInitialValue('width', initial));
    const height = useSharedValue(getInitialValue('height', initial));
    const backgroundColor = useSharedValue(getInitialValue('backgroundColor', initial));
    const borderRadius = useSharedValue(getInitialValue('borderRadius', initial));

    // Animation helper
    const animateToValues = (targetValues: AnimationProps, transitionConfig = transition) => {
      Object.entries(targetValues).forEach(([key, value]) => {
        if (value !== undefined) {
          const sharedValue = getSharedValue(key);
          if (sharedValue) {
            const config = transitionConfig.type === 'spring' 
              ? withSpring(value, {
                  damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                  stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                  mass: transitionConfig.mass ?? 1,
                })
              : withTiming(value, { 
                  duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                });
            
            if (transitionConfig.delay) {
              setTimeout(() => {
                sharedValue.value = config;
              }, transitionConfig.delay);
            } else {
              sharedValue.value = config;
            }
          }
        }
      });
    };

    // Get shared value by key
    const getSharedValue = (key: string) => {
      switch (key) {
        case 'opacity': return opacity;
        case 'x': return x;
        case 'y': return y;
        case 'scale': return scale;
        case 'rotate': return rotate;
        case 'width': return width;
        case 'height': return height;
        case 'backgroundColor': return backgroundColor;
        case 'borderRadius': return borderRadius;
        default: return null;
      }
    };

    // Mount animation: initial -> animate
    useEffect(() => {
      if (!hasAnimated && !isExitingRef.current) {
        // Set initial values immediately
        if (initial !== false) {
          Object.entries(initial as AnimationProps).forEach(([key, value]) => {
            const sharedValue = getSharedValue(key);
            if (sharedValue && value !== undefined) {
              sharedValue.value = value;
            }
          });
        }

        // Animate to target values
        const timer = setTimeout(() => {
          if (!isExitingRef.current) {
            animateToValues(animate);
            setHasAnimated(true);
          }
        }, 16);

        return () => clearTimeout(timer);
      }
      return undefined;
    }, []);

    // Handle animate prop changes
    useEffect(() => {
      if (hasAnimated && !isExitingRef.current) {
        animateToValues(animate);
      }
    }, [animate]);

    // Handle shouldExit
    useEffect(() => {
      if (shouldExit && !isExitingRef.current) {
        isExitingRef.current = true;
        
        if (exit && Object.keys(exit).length > 0) {
          animateToValues(exit, transition);
          
          const exitDuration = transition.duration ?? 300;
          setTimeout(() => {
            setIsPresent(false);
            if (onExitComplete) {
              onExitComplete();
            }
          }, exitDuration);
        } else {
          setIsPresent(false);
          if (onExitComplete) {
            onExitComplete();
          }
        }
      } else if (!shouldExit && isExitingRef.current) {
        // Re-entering: reset everything
        isExitingRef.current = false;
        setIsPresent(true);
        setHasAnimated(false);
        
        // Reset to initial values
        if (initial !== false) {
          Object.entries(initial as AnimationProps).forEach(([key, value]) => {
            const sharedValue = getSharedValue(key);
            if (sharedValue && value !== undefined) {
              sharedValue.value = value;
            }
          });
        }
        
        // Animate to target after a frame
        setTimeout(() => {
          if (!isExitingRef.current) {
            animateToValues(animate);
            setHasAnimated(true);
          }
        }, 16);
      }
    }, [shouldExit]);

    // Animated style
    const animatedStyle = useAnimatedStyle(() => {
      const style: any = {};
      const transform: any[] = [];

      // Transform properties
      style.opacity = opacity.value;
      if (x.value !== 0) transform.push({ translateX: x.value });
      if (y.value !== 0) transform.push({ translateY: y.value });
      if (scale.value !== 1) transform.push({ scale: scale.value });
      if (rotate.value !== '0deg') transform.push({ rotate: rotate.value });

      if (transform.length > 0) style.transform = transform;

      // Layout properties
      if (width.value !== 0) style.width = width.value;
      if (height.value !== 0) style.height = height.value;
      if (backgroundColor.value !== 0) style.backgroundColor = backgroundColor.value;
      if (borderRadius.value !== 0) style.borderRadius = borderRadius.value;

      return style;
    });

    const AnimatedComponent = Animated.createAnimatedComponent(Component);
    
    if (!isPresent) return null;

    return React.createElement(
      AnimatedComponent,
      {
        style: [style, animatedStyle],
        ...rest,
      },
      children
    );
  };
}

function getInitialValue(key: string, initial: AnimationProps | false): number | string | { width: number; height: number } {
  if (initial === false) {
    return getDefaultValue(key);
  }
  
  const value = (initial as AnimationProps)[key as keyof AnimationProps];
  return value !== undefined ? value : getDefaultValue(key);
}

function getDefaultValue(key: string): number | string | { width: number; height: number } {
  switch (key) {
    case 'opacity':
    case 'scale':
    case 'scaleX':
    case 'scaleY':
      return 1;
    case 'x':
    case 'y':
    case 'z':
      return 0;
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'skewX':
    case 'skewY':
      return '0deg';
    case 'shadowOffset':
      return { width: 0, height: 0 };
    default:
      return 0;
  }
}

export const NativeMotion = {
  View: createMotionComponent(View),
  Text: createMotionComponent(Text),
  Image: createMotionComponent(Image),
  TextInput: createMotionComponent(TextInput),
  TouchableOpacity: createMotionComponent(TouchableOpacity),
};