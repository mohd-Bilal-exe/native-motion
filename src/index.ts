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
    const z = useSharedValue(getInitialValue('z', initial));
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
    const borderColor = useSharedValue(getInitialValue('borderColor', initial));
    const borderTopColor = useSharedValue(getInitialValue('borderTopColor', initial));
    const borderBottomColor = useSharedValue(getInitialValue('borderBottomColor', initial));
    const borderLeftColor = useSharedValue(getInitialValue('borderLeftColor', initial));
    const borderRightColor = useSharedValue(getInitialValue('borderRightColor', initial));
    
    // Color properties
    const backgroundColor = useSharedValue(getInitialValue('backgroundColor', initial));
    const color = useSharedValue(getInitialValue('color', initial));
    
    // Position properties
    const top = useSharedValue(getInitialValue('top', initial));
    const bottom = useSharedValue(getInitialValue('bottom', initial));
    const left = useSharedValue(getInitialValue('left', initial));
    const right = useSharedValue(getInitialValue('right', initial));
    
    // Shadow properties
    const shadowColor = useSharedValue(getInitialValue('shadowColor', initial));
    const shadowOpacity = useSharedValue(getInitialValue('shadowOpacity', initial));
    const shadowRadius = useSharedValue(getInitialValue('shadowRadius', initial));
    const elevation = useSharedValue(getInitialValue('elevation', initial));

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
        // Transform properties
        case 'opacity': return opacity;
        case 'x': return x;
        case 'y': return y;
        case 'z': return z;
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
        case 'borderColor': return borderColor;
        case 'borderTopColor': return borderTopColor;
        case 'borderBottomColor': return borderBottomColor;
        case 'borderLeftColor': return borderLeftColor;
        case 'borderRightColor': return borderRightColor;
        
        // Color properties
        case 'backgroundColor': return backgroundColor;
        case 'color': return color;
        
        // Position properties
        case 'top': return top;
        case 'bottom': return bottom;
        case 'left': return left;
        case 'right': return right;
        
        // Shadow properties
        case 'shadowColor': return shadowColor;
        case 'shadowOpacity': return shadowOpacity;
        case 'shadowRadius': return shadowRadius;
        case 'elevation': return elevation;
        
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

    // Handle animate prop changes (only animate if values actually changed)
    const prevAnimateRef = useRef(animate);
    useEffect(() => {
      if (hasAnimated && !isExitingRef.current) {
        // Only animate if animate prop actually changed
        const hasChanged = JSON.stringify(prevAnimateRef.current) !== JSON.stringify(animate);
        if (hasChanged) {
          animateToValues(animate);
          prevAnimateRef.current = animate;
        }
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
      if (z.value !== 0) transform.push({ translateZ: z.value });
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
      if (borderColor.value !== 0) style.borderColor = borderColor.value;
      if (borderTopColor.value !== 0) style.borderTopColor = borderTopColor.value;
      if (borderBottomColor.value !== 0) style.borderBottomColor = borderBottomColor.value;
      if (borderLeftColor.value !== 0) style.borderLeftColor = borderLeftColor.value;
      if (borderRightColor.value !== 0) style.borderRightColor = borderRightColor.value;
      
      // Color properties
      if (backgroundColor.value !== 0) style.backgroundColor = backgroundColor.value;
      if (color.value !== 0) style.color = color.value;
      
      // Position properties
      if (top.value !== 0) style.top = top.value;
      if (bottom.value !== 0) style.bottom = bottom.value;
      if (left.value !== 0) style.left = left.value;
      if (right.value !== 0) style.right = right.value;
      
      // Shadow properties
      if (shadowColor.value !== 0) style.shadowColor = shadowColor.value;
      if (shadowOpacity.value !== 0) style.shadowOpacity = shadowOpacity.value;
      if (shadowRadius.value !== 0) style.shadowRadius = shadowRadius.value;
      if (elevation.value !== 0) style.elevation = elevation.value;

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
      return 0;
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'skewX':
    case 'skewY':
      return '0deg';
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