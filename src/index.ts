import React, { useEffect, useState, ComponentType } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
// @ts-ignore
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, SharedValue } from 'react-native-reanimated';

export interface AnimationProps {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
}

export interface MotionComponentProps {
  initial?: AnimationProps;
  animate?: AnimationProps;
  exit?: AnimationProps;
  transition?: TransitionProps;
  shouldExit?: boolean;
  onExitComplete?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

function createMotionComponent<T extends ComponentType<any>>(Component: T) {
  return function MotionComponent(props: MotionComponentProps & React.ComponentProps<T>) {
    const { initial = {}, animate = {}, exit = {}, transition = {}, style = {}, children, shouldExit = false, onExitComplete = () => {}, ...rest } = props;
    const [isPresent, setIsPresent] = useState<boolean>(true);
    const [hasExited, setHasExited] = useState<boolean>(false);
    const opacity = useSharedValue<number>(initial.opacity ?? 1);
    const translateX = useSharedValue<number>(initial.x ?? 0);
    const translateY = useSharedValue<number>(initial.y ?? 0);
    const scale = useSharedValue<number>(initial.scale ?? 1);
    const rotate = useSharedValue<string>(initial.rotate ?? '0deg');
    const width = useSharedValue<number | null>(initial.width ?? null);
    const height = useSharedValue<number | null>(initial.height ?? null);
    const borderRadius = useSharedValue<number | null>(initial.borderRadius ?? null);
    const backgroundColor = useSharedValue<string | null>(initial.backgroundColor ?? null);

    const runAnim = (sharedVal: any, target: any) => {
      const config = transition.type === 'spring' ? withSpring(target, transition) : withTiming(target, { duration: transition.duration ?? 300 });
      sharedVal.value = config;
    };

    useEffect(() => {
      runAnim(opacity, animate.opacity ?? opacity.value);
      runAnim(translateX, animate.x ?? translateX.value);
      runAnim(translateY, animate.y ?? translateY.value);
      runAnim(scale, animate.scale ?? scale.value);
      runAnim(rotate, animate.rotate ?? rotate.value);
      if (animate.width !== undefined) runAnim(width, animate.width);
      if (animate.height !== undefined) runAnim(height, animate.height);
      if (animate.borderRadius !== undefined) runAnim(borderRadius, animate.borderRadius);
      if (animate.backgroundColor !== undefined) runAnim(backgroundColor, animate.backgroundColor);
    }, [animate.opacity, animate.x, animate.y, animate.scale, animate.rotate, animate.width, animate.height, animate.borderRadius, animate.backgroundColor]);

    useEffect(() => {
      if (shouldExit && !hasExited && Object.keys(exit).length > 0) {
        setHasExited(true);
        runAnim(opacity, exit.opacity ?? 0);
        runAnim(translateX, exit.x ?? translateX.value);
        runAnim(translateY, exit.y ?? translateY.value);
        runAnim(scale, exit.scale ?? scale.value);
        runAnim(rotate, exit.rotate ?? rotate.value);
        if (exit.width !== undefined) runAnim(width, exit.width);
        if (exit.height !== undefined) runAnim(height, exit.height);
        if (exit.borderRadius !== undefined) runAnim(borderRadius, exit.borderRadius);
        if (exit.backgroundColor !== undefined) runAnim(backgroundColor, exit.backgroundColor);
        setTimeout(() => { setIsPresent(false); onExitComplete?.(); }, transition.duration ?? 300);
      } else if (!shouldExit && hasExited) {
        setHasExited(false);
        setIsPresent(true);
        opacity.value = initial.opacity ?? 1;
        translateX.value = initial.x ?? 0;
        translateY.value = initial.y ?? 0;
        scale.value = initial.scale ?? 1;
        rotate.value = initial.rotate ?? '0deg';
        width.value = initial.width ?? null;
        height.value = initial.height ?? null;
        borderRadius.value = initial.borderRadius ?? null;
        backgroundColor.value = initial.backgroundColor ?? null;
        setTimeout(() => {
          runAnim(opacity, animate.opacity ?? opacity.value);
          runAnim(translateX, animate.x ?? translateX.value);
          runAnim(translateY, animate.y ?? translateY.value);
          runAnim(scale, animate.scale ?? scale.value);
          runAnim(rotate, animate.rotate ?? rotate.value);
          if (animate.width !== undefined) runAnim(width, animate.width);
          if (animate.height !== undefined) runAnim(height, animate.height);
          if (animate.borderRadius !== undefined) runAnim(borderRadius, animate.borderRadius);
          if (animate.backgroundColor !== undefined) runAnim(backgroundColor, animate.backgroundColor);
        }, 50);
      }
    }, [shouldExit]);

    const animatedStyle = useAnimatedStyle(() => {
      const styleObj: any = { opacity: opacity.value, transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }, { rotate: rotate.value }] };
      if (width.value !== null) styleObj.width = width.value;
      if (height.value !== null) styleObj.height = height.value;
      if (borderRadius.value !== null) styleObj.borderRadius = borderRadius.value;
      if (backgroundColor.value !== null) styleObj.backgroundColor = backgroundColor.value;
      return styleObj;
    });

    const AnimatedComponent = Animated.createAnimatedComponent(Component);
    if (!isPresent) return null;
    return React.createElement(AnimatedComponent, { style: [style, animatedStyle], ...rest }, children);
  };
}

export const NativeMotion = {
  View: createMotionComponent(View),
  Text: createMotionComponent(Text),
  Image: createMotionComponent(Image),
  TextInput: createMotionComponent(TextInput),
  TouchableOpacity: createMotionComponent(TouchableOpacity),
};