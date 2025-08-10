import React, { useEffect, useState, ComponentType } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
// @ts-ignore
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

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
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderWidth?: number;
  borderColor?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
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
    const margin = useSharedValue<number | null>(initial.margin ?? null);
    const marginTop = useSharedValue<number | null>(initial.marginTop ?? null);
    const marginBottom = useSharedValue<number | null>(initial.marginBottom ?? null);
    const marginLeft = useSharedValue<number | null>(initial.marginLeft ?? null);
    const marginRight = useSharedValue<number | null>(initial.marginRight ?? null);
    const padding = useSharedValue<number | null>(initial.padding ?? null);
    const paddingTop = useSharedValue<number | null>(initial.paddingTop ?? null);
    const paddingBottom = useSharedValue<number | null>(initial.paddingBottom ?? null);
    const paddingLeft = useSharedValue<number | null>(initial.paddingLeft ?? null);
    const paddingRight = useSharedValue<number | null>(initial.paddingRight ?? null);
    const borderWidth = useSharedValue<number | null>(initial.borderWidth ?? null);
    const borderColor = useSharedValue<string | null>(initial.borderColor ?? null);
    const top = useSharedValue<number | null>(initial.top ?? null);
    const bottom = useSharedValue<number | null>(initial.bottom ?? null);
    const left = useSharedValue<number | null>(initial.left ?? null);
    const right = useSharedValue<number | null>(initial.right ?? null);

    const runAnim = (sharedVal: any, target: any) => {
      const config = transition.type === 'spring' ? withSpring(target, transition) : withTiming(target, { duration: transition.duration ?? 300 });
      sharedVal.value = config;
    };

    useEffect(() => {
      opacity.value = initial.opacity ?? 1;
      translateX.value = initial.x ?? 0;
      translateY.value = initial.y ?? 0;
      scale.value = initial.scale ?? 1;
      rotate.value = initial.rotate ?? '0deg';
      width.value = initial.width ?? null;
      height.value = initial.height ?? null;
      borderRadius.value = initial.borderRadius ?? null;
      backgroundColor.value = initial.backgroundColor ?? null;
      margin.value = initial.margin ?? null;
      marginTop.value = initial.marginTop ?? null;
      marginBottom.value = initial.marginBottom ?? null;
      marginLeft.value = initial.marginLeft ?? null;
      marginRight.value = initial.marginRight ?? null;
      padding.value = initial.padding ?? null;
      paddingTop.value = initial.paddingTop ?? null;
      paddingBottom.value = initial.paddingBottom ?? null;
      paddingLeft.value = initial.paddingLeft ?? null;
      paddingRight.value = initial.paddingRight ?? null;
      borderWidth.value = initial.borderWidth ?? null;
      borderColor.value = initial.borderColor ?? null;
      top.value = initial.top ?? null;
      bottom.value = initial.bottom ?? null;
      left.value = initial.left ?? null;
      right.value = initial.right ?? null;
    }, [initial.opacity, initial.x, initial.y, initial.scale, initial.rotate, initial.width, initial.height, initial.borderRadius, initial.backgroundColor, initial.margin, initial.marginTop, initial.marginBottom, initial.marginLeft, initial.marginRight, initial.padding, initial.paddingTop, initial.paddingBottom, initial.paddingLeft, initial.paddingRight, initial.borderWidth, initial.borderColor, initial.top, initial.bottom, initial.left, initial.right]);

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
      if (animate.margin !== undefined) runAnim(margin, animate.margin);
      if (animate.marginTop !== undefined) runAnim(marginTop, animate.marginTop);
      if (animate.marginBottom !== undefined) runAnim(marginBottom, animate.marginBottom);
      if (animate.marginLeft !== undefined) runAnim(marginLeft, animate.marginLeft);
      if (animate.marginRight !== undefined) runAnim(marginRight, animate.marginRight);
      if (animate.padding !== undefined) runAnim(padding, animate.padding);
      if (animate.paddingTop !== undefined) runAnim(paddingTop, animate.paddingTop);
      if (animate.paddingBottom !== undefined) runAnim(paddingBottom, animate.paddingBottom);
      if (animate.paddingLeft !== undefined) runAnim(paddingLeft, animate.paddingLeft);
      if (animate.paddingRight !== undefined) runAnim(paddingRight, animate.paddingRight);
      if (animate.borderWidth !== undefined) runAnim(borderWidth, animate.borderWidth);
      if (animate.borderColor !== undefined) runAnim(borderColor, animate.borderColor);
      if (animate.top !== undefined) runAnim(top, animate.top);
      if (animate.bottom !== undefined) runAnim(bottom, animate.bottom);
      if (animate.left !== undefined) runAnim(left, animate.left);
      if (animate.right !== undefined) runAnim(right, animate.right);
    }, [animate.opacity, animate.x, animate.y, animate.scale, animate.rotate, animate.width, animate.height, animate.borderRadius, animate.backgroundColor, animate.margin, animate.marginTop, animate.marginBottom, animate.marginLeft, animate.marginRight, animate.padding, animate.paddingTop, animate.paddingBottom, animate.paddingLeft, animate.paddingRight, animate.borderWidth, animate.borderColor, animate.top, animate.bottom, animate.left, animate.right]);

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
        if (exit.margin !== undefined) runAnim(margin, exit.margin);
        if (exit.marginTop !== undefined) runAnim(marginTop, exit.marginTop);
        if (exit.marginBottom !== undefined) runAnim(marginBottom, exit.marginBottom);
        if (exit.marginLeft !== undefined) runAnim(marginLeft, exit.marginLeft);
        if (exit.marginRight !== undefined) runAnim(marginRight, exit.marginRight);
        if (exit.padding !== undefined) runAnim(padding, exit.padding);
        if (exit.paddingTop !== undefined) runAnim(paddingTop, exit.paddingTop);
        if (exit.paddingBottom !== undefined) runAnim(paddingBottom, exit.paddingBottom);
        if (exit.paddingLeft !== undefined) runAnim(paddingLeft, exit.paddingLeft);
        if (exit.paddingRight !== undefined) runAnim(paddingRight, exit.paddingRight);
        if (exit.borderWidth !== undefined) runAnim(borderWidth, exit.borderWidth);
        if (exit.borderColor !== undefined) runAnim(borderColor, exit.borderColor);
        if (exit.top !== undefined) runAnim(top, exit.top);
        if (exit.bottom !== undefined) runAnim(bottom, exit.bottom);
        if (exit.left !== undefined) runAnim(left, exit.left);
        if (exit.right !== undefined) runAnim(right, exit.right);
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
        margin.value = initial.margin ?? null;
        marginTop.value = initial.marginTop ?? null;
        marginBottom.value = initial.marginBottom ?? null;
        marginLeft.value = initial.marginLeft ?? null;
        marginRight.value = initial.marginRight ?? null;
        padding.value = initial.padding ?? null;
        paddingTop.value = initial.paddingTop ?? null;
        paddingBottom.value = initial.paddingBottom ?? null;
        paddingLeft.value = initial.paddingLeft ?? null;
        paddingRight.value = initial.paddingRight ?? null;
        borderWidth.value = initial.borderWidth ?? null;
        borderColor.value = initial.borderColor ?? null;
        top.value = initial.top ?? null;
        bottom.value = initial.bottom ?? null;
        left.value = initial.left ?? null;
        right.value = initial.right ?? null;
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
          if (animate.margin !== undefined) runAnim(margin, animate.margin);
          if (animate.marginTop !== undefined) runAnim(marginTop, animate.marginTop);
          if (animate.marginBottom !== undefined) runAnim(marginBottom, animate.marginBottom);
          if (animate.marginLeft !== undefined) runAnim(marginLeft, animate.marginLeft);
          if (animate.marginRight !== undefined) runAnim(marginRight, animate.marginRight);
          if (animate.padding !== undefined) runAnim(padding, animate.padding);
          if (animate.paddingTop !== undefined) runAnim(paddingTop, animate.paddingTop);
          if (animate.paddingBottom !== undefined) runAnim(paddingBottom, animate.paddingBottom);
          if (animate.paddingLeft !== undefined) runAnim(paddingLeft, animate.paddingLeft);
          if (animate.paddingRight !== undefined) runAnim(paddingRight, animate.paddingRight);
          if (animate.borderWidth !== undefined) runAnim(borderWidth, animate.borderWidth);
          if (animate.borderColor !== undefined) runAnim(borderColor, animate.borderColor);
          if (animate.top !== undefined) runAnim(top, animate.top);
          if (animate.bottom !== undefined) runAnim(bottom, animate.bottom);
          if (animate.left !== undefined) runAnim(left, animate.left);
          if (animate.right !== undefined) runAnim(right, animate.right);
        }, 50);
      }
    }, [shouldExit]);

    const animatedStyle = useAnimatedStyle(() => {
      const styleObj: any = { opacity: opacity.value, transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }, { rotate: rotate.value }] };
      if (width.value !== null) styleObj.width = width.value;
      if (height.value !== null) styleObj.height = height.value;
      if (borderRadius.value !== null) styleObj.borderRadius = borderRadius.value;
      if (backgroundColor.value !== null) styleObj.backgroundColor = backgroundColor.value;
      if (margin.value !== null) styleObj.margin = margin.value;
      if (marginTop.value !== null) styleObj.marginTop = marginTop.value;
      if (marginBottom.value !== null) styleObj.marginBottom = marginBottom.value;
      if (marginLeft.value !== null) styleObj.marginLeft = marginLeft.value;
      if (marginRight.value !== null) styleObj.marginRight = marginRight.value;
      if (padding.value !== null) styleObj.padding = padding.value;
      if (paddingTop.value !== null) styleObj.paddingTop = paddingTop.value;
      if (paddingBottom.value !== null) styleObj.paddingBottom = paddingBottom.value;
      if (paddingLeft.value !== null) styleObj.paddingLeft = paddingLeft.value;
      if (paddingRight.value !== null) styleObj.paddingRight = paddingRight.value;
      if (borderWidth.value !== null) styleObj.borderWidth = borderWidth.value;
      if (borderColor.value !== null) styleObj.borderColor = borderColor.value;
      if (top.value !== null) styleObj.top = top.value;
      if (bottom.value !== null) styleObj.bottom = bottom.value;
      if (left.value !== null) styleObj.left = left.value;
      if (right.value !== null) styleObj.right = right.value;
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