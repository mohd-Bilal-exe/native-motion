import React, { useEffect, useState, ComponentType, useRef, useMemo } from 'react';
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, FlatList, SectionList, Pressable, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withRepeat, Easing, runOnJS, interpolateColor } from 'react-native-reanimated';

export interface AnimationProps {
  // Transform properties
  opacity?: number;
  x?: number;
  y?: number;
  z?: number;
  translateX?: number;
  translateY?: number;
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
  repeat?: number | 'infinity';
  repeatType?: 'loop' | 'reverse';
}

export interface MotionComponentProps {
  initial?: AnimationProps | false;
  animate?: AnimationProps;
  exit?: AnimationProps;
  transition?: TransitionProps;
  shouldAnimate?: boolean;
  shouldDeAnimate?: boolean;
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
  repeat: 0,
  repeatType: 'loop',
};

function createMotionComponent<T extends ComponentType<any>>(Component: T) {
  return function MotionComponent(props: MotionComponentProps & React.ComponentProps<T>) {
    const {
      initial = {},
      animate = {},
      exit = {},
      transition = DEFAULT_TRANSITION,
      shouldAnimate = false,
      shouldDeAnimate = false,
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

    // Create shared values
    const opacity = useSharedValue(getInitialValue('opacity', initial));
    const x = useSharedValue(getInitialValue('x', initial));
    const y = useSharedValue(getInitialValue('y', initial));
    const z = useSharedValue(getInitialValue('z', initial));
    const translateX = useSharedValue(getInitialValue('translateX', initial));
    const translateY = useSharedValue(getInitialValue('translateY', initial));
    const scale = useSharedValue(getInitialValue('scale', initial));
    const scaleX = useSharedValue(getInitialValue('scaleX', initial));
    const scaleY = useSharedValue(getInitialValue('scaleY', initial));
    const rotate = useSharedValue(getInitialValue('rotate', initial));
    const rotateX = useSharedValue(getInitialValue('rotateX', initial));
    const rotateY = useSharedValue(getInitialValue('rotateY', initial));
    const rotateZ = useSharedValue(getInitialValue('rotateZ', initial));
    const skewX = useSharedValue(getInitialValue('skewX', initial));
    const skewY = useSharedValue(getInitialValue('skewY', initial));
    
    // Layout properties
    const width = useSharedValue(getInitialValue('width', initial));
    const height = useSharedValue(getInitialValue('height', initial));
    const minWidth = useSharedValue(getInitialValue('minWidth', initial));
    const minHeight = useSharedValue(getInitialValue('minHeight', initial));
    const maxWidth = useSharedValue(getInitialValue('maxWidth', initial));
    const maxHeight = useSharedValue(getInitialValue('maxHeight', initial));
    
    // Spacing properties
    const margin = useSharedValue(getInitialValue('margin', initial));
    const marginTop = useSharedValue(getInitialValue('marginTop', initial));
    const marginBottom = useSharedValue(getInitialValue('marginBottom', initial));
    const marginLeft = useSharedValue(getInitialValue('marginLeft', initial));
    const marginRight = useSharedValue(getInitialValue('marginRight', initial));
    const marginHorizontal = useSharedValue(getInitialValue('marginHorizontal', initial));
    const marginVertical = useSharedValue(getInitialValue('marginVertical', initial));
    const padding = useSharedValue(getInitialValue('padding', initial));
    const paddingTop = useSharedValue(getInitialValue('paddingTop', initial));
    const paddingBottom = useSharedValue(getInitialValue('paddingBottom', initial));
    const paddingLeft = useSharedValue(getInitialValue('paddingLeft', initial));
    const paddingRight = useSharedValue(getInitialValue('paddingRight', initial));
    const paddingHorizontal = useSharedValue(getInitialValue('paddingHorizontal', initial));
    const paddingVertical = useSharedValue(getInitialValue('paddingVertical', initial));
    
    // Border properties
    const borderRadius = useSharedValue(getInitialValue('borderRadius', initial));
    const borderTopLeftRadius = useSharedValue(getInitialValue('borderTopLeftRadius', initial));
    const borderTopRightRadius = useSharedValue(getInitialValue('borderTopRightRadius', initial));
    const borderBottomLeftRadius = useSharedValue(getInitialValue('borderBottomLeftRadius', initial));
    const borderBottomRightRadius = useSharedValue(getInitialValue('borderBottomRightRadius', initial));
    const borderWidth = useSharedValue(getInitialValue('borderWidth', initial));
    const borderTopWidth = useSharedValue(getInitialValue('borderTopWidth', initial));
    const borderBottomWidth = useSharedValue(getInitialValue('borderBottomWidth', initial));
    const borderLeftWidth = useSharedValue(getInitialValue('borderLeftWidth', initial));
    const borderRightWidth = useSharedValue(getInitialValue('borderRightWidth', initial));
    const borderTopColor = useSharedValue(getInitialValue('borderTopColor', initial));
    const borderBottomColor = useSharedValue(getInitialValue('borderBottomColor', initial));
    const borderLeftColor = useSharedValue(getInitialValue('borderLeftColor', initial));
    const borderRightColor = useSharedValue(getInitialValue('borderRightColor', initial));
    
    // Color properties - use progress values for interpolation
    const backgroundColorProgress = useSharedValue(0);
    const colorProgress = useSharedValue(0);
    const borderColorProgress = useSharedValue(0);
    const shadowColorProgress = useSharedValue(0);
    
    // Store color values for interpolation
    const backgroundColorFrom = useRef(getInitialValue('backgroundColor', initial) as string);
    const backgroundColorTo = useRef(getInitialValue('backgroundColor', initial) as string);
    const colorFrom = useRef(getInitialValue('color', initial) as string);
    const colorTo = useRef(getInitialValue('color', initial) as string);
    const borderColorFrom = useRef(getInitialValue('borderColor', initial) as string);
    const borderColorTo = useRef(getInitialValue('borderColor', initial) as string);
    const shadowColorFrom = useRef(getInitialValue('shadowColor', initial) as string);
    const shadowColorTo = useRef(getInitialValue('shadowColor', initial) as string);
    
    // Position properties
    const top = useSharedValue(getInitialValue('top', initial));
    const bottom = useSharedValue(getInitialValue('bottom', initial));
    const left = useSharedValue(getInitialValue('left', initial));
    const right = useSharedValue(getInitialValue('right', initial));
    
    // Shadow properties

    const shadowOpacity = useSharedValue(getInitialValue('shadowOpacity', initial));
    const shadowRadius = useSharedValue(getInitialValue('shadowRadius', initial));
    const elevation = useSharedValue(getInitialValue('elevation', initial));

    // Animation helper
    const animateToValues = (targetValues: AnimationProps, transitionConfig = transition) => {
      Object.entries(targetValues).forEach(([key, value]) => {
        if (value !== undefined) {
          // Handle color properties with interpolation
          if (key === 'backgroundColor') {
            backgroundColorTo.current = value as string;
            const config = transitionConfig.type === 'spring' 
              ? withSpring(1, {
                  damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                  stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                })
              : withTiming(1, { duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration! });
            backgroundColorProgress.value = config;
            return;
          }
          if (key === 'color') {
            colorTo.current = value as string;
            const config = transitionConfig.type === 'spring' 
              ? withSpring(1, {
                  damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                  stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                })
              : withTiming(1, { duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration! });
            colorProgress.value = config;
            return;
          }
          if (key === 'borderColor') {
            borderColorTo.current = value as string;
            const config = transitionConfig.type === 'spring' 
              ? withSpring(1, {
                  damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                  stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                })
              : withTiming(1, { duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration! });
            borderColorProgress.value = config;
            return;
          }
          if (key === 'shadowColor') {
            shadowColorTo.current = value as string;
            const config = transitionConfig.type === 'spring' 
              ? withSpring(1, {
                  damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                  stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                })
              : withTiming(1, { duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration! });
            shadowColorProgress.value = config;
            return;
          }
          
          // Handle non-color properties
          const sharedValue = getSharedValue(key);
          if (sharedValue) {
            let config;
            
            if (transitionConfig.repeat && (transitionConfig.repeat > 0 || transitionConfig.repeat === 'infinity')) {
              const baseAnimation = transitionConfig.type === 'spring' 
                ? withSpring(value, {
                    damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                    stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                    mass: transitionConfig.mass ?? 1,
                  })
                : withTiming(value, { 
                    duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                    easing: Easing.linear,
                  });
              
              const repeatCount = transitionConfig.repeat === 'infinity' ? -1 : transitionConfig.repeat;
              const reverse = transitionConfig.repeatType === 'reverse';
              
              config = withRepeat(baseAnimation, repeatCount, reverse);
            } else {
              config = transitionConfig.type === 'spring' 
                ? withSpring(value, {
                    damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                    stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                    mass: transitionConfig.mass ?? 1,
                  })
                : withTiming(value, { 
                    duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                  });
            }
            
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
        // Transform properties
        case 'opacity': return opacity;
        case 'x': return x;
        case 'y': return y;
        case 'z': return z;
        case 'translateX': return translateX;
        case 'translateY': return translateY;
        case 'scale': return scale;
        case 'scaleX': return scaleX;
        case 'scaleY': return scaleY;
        case 'rotate': return rotate;
        case 'rotateX': return rotateX;
        case 'rotateY': return rotateY;
        case 'rotateZ': return rotateZ;
        case 'skewX': return skewX;
        case 'skewY': return skewY;
        
        // Layout properties
        case 'width': return width;
        case 'height': return height;
        case 'minWidth': return minWidth;
        case 'minHeight': return minHeight;
        case 'maxWidth': return maxWidth;
        case 'maxHeight': return maxHeight;
        
        // Spacing properties
        case 'margin': return margin;
        case 'marginTop': return marginTop;
        case 'marginBottom': return marginBottom;
        case 'marginLeft': return marginLeft;
        case 'marginRight': return marginRight;
        case 'marginHorizontal': return marginHorizontal;
        case 'marginVertical': return marginVertical;
        case 'padding': return padding;
        case 'paddingTop': return paddingTop;
        case 'paddingBottom': return paddingBottom;
        case 'paddingLeft': return paddingLeft;
        case 'paddingRight': return paddingRight;
        case 'paddingHorizontal': return paddingHorizontal;
        case 'paddingVertical': return paddingVertical;
        
        // Border properties
        case 'borderRadius': return borderRadius;
        case 'borderTopLeftRadius': return borderTopLeftRadius;
        case 'borderTopRightRadius': return borderTopRightRadius;
        case 'borderBottomLeftRadius': return borderBottomLeftRadius;
        case 'borderBottomRightRadius': return borderBottomRightRadius;
        case 'borderWidth': return borderWidth;
        case 'borderTopWidth': return borderTopWidth;
        case 'borderBottomWidth': return borderBottomWidth;
        case 'borderLeftWidth': return borderLeftWidth;
        case 'borderRightWidth': return borderRightWidth;

        case 'borderTopColor': return borderTopColor;
        case 'borderBottomColor': return borderBottomColor;
        case 'borderLeftColor': return borderLeftColor;
        case 'borderRightColor': return borderRightColor;
        

        
        // Position properties
        case 'top': return top;
        case 'bottom': return bottom;
        case 'left': return left;
        case 'right': return right;
        
        // Shadow properties

        case 'shadowOpacity': return shadowOpacity;
        case 'shadowRadius': return shadowRadius;
        case 'elevation': return elevation;
        
        default: return null;
      }
    };

    // Set initial values on mount
    useEffect(() => {
      if (initial !== false) {
        Object.entries(initial as AnimationProps).forEach(([key, value]) => {
          const sharedValue = getSharedValue(key);
          if (sharedValue && value !== undefined) {
            sharedValue.value = value;
          }
        });
      }
    }, []);

    // Handle shouldAnimate: initial -> animate
    useEffect(() => {
      if (shouldAnimate) {
        // Reset color progress and update from/to values
        if (animate.backgroundColor) {
          backgroundColorFrom.current = backgroundColorTo.current;
          backgroundColorProgress.value = 0;
        }
        if (animate.color) {
          colorFrom.current = colorTo.current;
          colorProgress.value = 0;
        }
        if (animate.borderColor) {
          borderColorFrom.current = borderColorTo.current;
          borderColorProgress.value = 0;
        }
        if (animate.shadowColor) {
          shadowColorFrom.current = shadowColorTo.current;
          shadowColorProgress.value = 0;
        }
        animateToValues(animate);
      }
    }, [shouldAnimate]);

    // Handle shouldDeAnimate: animate -> initial
    useEffect(() => {
      if (shouldDeAnimate && initial !== false) {
        const initialProps = initial as AnimationProps;
        // Reset color progress and update from/to values
        if (initialProps.backgroundColor) {
          backgroundColorFrom.current = backgroundColorTo.current;
          backgroundColorTo.current = initialProps.backgroundColor;
          backgroundColorProgress.value = 0;
        }
        if (initialProps.color) {
          colorFrom.current = colorTo.current;
          colorTo.current = initialProps.color;
          colorProgress.value = 0;
        }
        if (initialProps.borderColor) {
          borderColorFrom.current = borderColorTo.current;
          borderColorTo.current = initialProps.borderColor;
          borderColorProgress.value = 0;
        }
        if (initialProps.shadowColor) {
          shadowColorFrom.current = shadowColorTo.current;
          shadowColorTo.current = initialProps.shadowColor;
          shadowColorProgress.value = 0;
        }
        animateToValues(initialProps);
      }
    }, [shouldDeAnimate]);

    // Handle shouldExit: animate -> exit (no unmount)
    useEffect(() => {
      if (shouldExit && exit && Object.keys(exit).length > 0) {
        // Reset color progress and update from/to values
        if (exit.backgroundColor) {
          backgroundColorFrom.current = backgroundColorTo.current;
          backgroundColorTo.current = exit.backgroundColor;
          backgroundColorProgress.value = 0;
        }
        if (exit.color) {
          colorFrom.current = colorTo.current;
          colorTo.current = exit.color;
          colorProgress.value = 0;
        }
        if (exit.borderColor) {
          borderColorFrom.current = borderColorTo.current;
          borderColorTo.current = exit.borderColor;
          borderColorProgress.value = 0;
        }
        if (exit.shadowColor) {
          shadowColorFrom.current = shadowColorTo.current;
          shadowColorTo.current = exit.shadowColor;
          shadowColorProgress.value = 0;
        }
        animateToValues(exit, transition);
        
        if (onExitComplete) {
          const exitDuration = transition.duration ?? 300;
          setTimeout(() => {
            onExitComplete();
          }, exitDuration);
        }
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
      if (z.value !== 0) transform.push({ translateZ: z.value });
      if (translateX.value !== 0) transform.push({ translateX: translateX.value });
      if (translateY.value !== 0) transform.push({ translateY: translateY.value });
      if (scale.value !== 1) transform.push({ scale: scale.value });
      if (scaleX.value !== 1) transform.push({ scaleX: scaleX.value });
      if (scaleY.value !== 1) transform.push({ scaleY: scaleY.value });
      if (rotate.value !== '0deg') transform.push({ rotate: rotate.value });
      if (rotateX.value !== '0deg') transform.push({ rotateX: rotateX.value });
      if (rotateY.value !== '0deg') transform.push({ rotateY: rotateY.value });
      if (rotateZ.value !== '0deg') transform.push({ rotateZ: rotateZ.value });
      if (skewX.value !== '0deg') transform.push({ skewX: skewX.value });
      if (skewY.value !== '0deg') transform.push({ skewY: skewY.value });

      if (transform.length > 0) style.transform = transform;

      // Layout properties
      if (width.value !== 0) style.width = width.value;
      if (height.value !== 0) style.height = height.value;
      if (minWidth.value !== 0) style.minWidth = minWidth.value;
      if (minHeight.value !== 0) style.minHeight = minHeight.value;
      if (maxWidth.value !== 0) style.maxWidth = maxWidth.value;
      if (maxHeight.value !== 0) style.maxHeight = maxHeight.value;
      
      // Spacing properties
      if (margin.value !== 0) style.margin = margin.value;
      if (marginTop.value !== 0) style.marginTop = marginTop.value;
      if (marginBottom.value !== 0) style.marginBottom = marginBottom.value;
      if (marginLeft.value !== 0) style.marginLeft = marginLeft.value;
      if (marginRight.value !== 0) style.marginRight = marginRight.value;
      if (marginHorizontal.value !== 0) style.marginHorizontal = marginHorizontal.value;
      if (marginVertical.value !== 0) style.marginVertical = marginVertical.value;
      if (padding.value !== 0) style.padding = padding.value;
      if (paddingTop.value !== 0) style.paddingTop = paddingTop.value;
      if (paddingBottom.value !== 0) style.paddingBottom = paddingBottom.value;
      if (paddingLeft.value !== 0) style.paddingLeft = paddingLeft.value;
      if (paddingRight.value !== 0) style.paddingRight = paddingRight.value;
      if (paddingHorizontal.value !== 0) style.paddingHorizontal = paddingHorizontal.value;
      if (paddingVertical.value !== 0) style.paddingVertical = paddingVertical.value;
      
      // Border properties
      if (borderRadius.value !== 0) style.borderRadius = borderRadius.value;
      if (borderTopLeftRadius.value !== 0) style.borderTopLeftRadius = borderTopLeftRadius.value;
      if (borderTopRightRadius.value !== 0) style.borderTopRightRadius = borderTopRightRadius.value;
      if (borderBottomLeftRadius.value !== 0) style.borderBottomLeftRadius = borderBottomLeftRadius.value;
      if (borderBottomRightRadius.value !== 0) style.borderBottomRightRadius = borderBottomRightRadius.value;
      if (borderWidth.value !== 0) style.borderWidth = borderWidth.value;
      if (borderTopWidth.value !== 0) style.borderTopWidth = borderTopWidth.value;
      if (borderBottomWidth.value !== 0) style.borderBottomWidth = borderBottomWidth.value;
      if (borderLeftWidth.value !== 0) style.borderLeftWidth = borderLeftWidth.value;
      if (borderRightWidth.value !== 0) style.borderRightWidth = borderRightWidth.value;
      style.borderColor = interpolateColor(
        borderColorProgress.value,
        [0, 1],
        [borderColorFrom.current, borderColorTo.current]
      );
      if (borderTopColor.value !== 'transparent') style.borderTopColor = borderTopColor.value;
      if (borderBottomColor.value !== 'transparent') style.borderBottomColor = borderBottomColor.value;
      if (borderLeftColor.value !== 'transparent') style.borderLeftColor = borderLeftColor.value;
      if (borderRightColor.value !== 'transparent') style.borderRightColor = borderRightColor.value;
      
      // Color properties with interpolation
      style.backgroundColor = interpolateColor(
        backgroundColorProgress.value,
        [0, 1],
        [backgroundColorFrom.current, backgroundColorTo.current]
      );
      style.color = interpolateColor(
        colorProgress.value,
        [0, 1],
        [colorFrom.current, colorTo.current]
      );
      
      // Position properties
      if (top.value !== 0) style.top = top.value;
      if (bottom.value !== 0) style.bottom = bottom.value;
      if (left.value !== 0) style.left = left.value;
      if (right.value !== 0) style.right = right.value;
      
      // Shadow properties
      style.shadowColor = interpolateColor(
        shadowColorProgress.value,
        [0, 1],
        [shadowColorFrom.current, shadowColorTo.current]
      );
      if (shadowOpacity.value !== 0) style.shadowOpacity = shadowOpacity.value;
      if (shadowRadius.value !== 0) style.shadowRadius = shadowRadius.value;
      if (elevation.value !== 0) style.elevation = elevation.value;

      return style;
    });

    const AnimatedComponent = Animated.createAnimatedComponent(Component);

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

function getInitialValue(key: string, initial: AnimationProps | false): number | string {
  if (initial === false) {
    return getDefaultValue(key);
  }
  
  const value = (initial as AnimationProps)[key as keyof AnimationProps];
  return value !== undefined ? value : getDefaultValue(key);
}

function getDefaultValue(key: string): number | string {
  switch (key) {
    case 'opacity':
    case 'scale':
    case 'scaleX':
    case 'scaleY':
      return 1;
    case 'x':
    case 'y':
    case 'z':
    case 'translateX':
    case 'translateY':
      return 0;
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'skewX':
    case 'skewY':
      return '0deg';
    case 'backgroundColor':
    case 'color':
    case 'borderColor':
    case 'borderTopColor':
    case 'borderBottomColor':
    case 'borderLeftColor':
    case 'borderRightColor':
    case 'shadowColor':
      return 'transparent';
    default:
      return 0;
  }
}

export const NativeMotion = {
  View: createMotionComponent(View),
  Text: createMotionComponent(Text),
  Image: createMotionComponent(Image),
  ImageBackground: createMotionComponent(ImageBackground),
  TextInput: createMotionComponent(TextInput),
  TouchableOpacity: createMotionComponent(TouchableOpacity),
  ScrollView: createMotionComponent(ScrollView),
  FlatList: createMotionComponent(FlatList),
  SectionList: createMotionComponent(SectionList),
  Pressable: createMotionComponent(Pressable),
};