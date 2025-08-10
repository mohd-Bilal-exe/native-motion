import React from 'react';
import { ViewStyle } from 'react-native';
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
export declare const NativeMotion: {
    View: (props: MotionComponentProps & import("react-native").ViewProps) => React.FunctionComponentElement<{
        style: any[];
    } & Omit<MotionComponentProps & import("react-native").ViewProps, "style" | "animate" | "initial" | "exit" | "transition" | "children" | "shouldExit" | "onExitComplete">> | null;
    Text: (props: MotionComponentProps & import("react-native").TextProps) => React.FunctionComponentElement<{
        style: any[];
    } & Omit<MotionComponentProps & import("react-native").TextProps, "style" | "animate" | "initial" | "exit" | "transition" | "children" | "shouldExit" | "onExitComplete">> | null;
    Image: (props: MotionComponentProps & import("react-native").ImageProps) => React.FunctionComponentElement<{
        style: any[];
    } & Omit<MotionComponentProps & import("react-native").ImageProps, "style" | "animate" | "initial" | "exit" | "transition" | "children" | "shouldExit" | "onExitComplete">> | null;
    TextInput: (props: MotionComponentProps & import("react-native").TextInputProps) => React.FunctionComponentElement<{
        style: any[];
    } & Omit<MotionComponentProps & import("react-native").TextInputProps, "style" | "animate" | "initial" | "exit" | "transition" | "children" | "shouldExit" | "onExitComplete">> | null;
    TouchableOpacity: (props: MotionComponentProps & import("react-native").TouchableOpacityProps) => React.FunctionComponentElement<{
        style: any[];
    } & Omit<MotionComponentProps & import("react-native").TouchableOpacityProps, "style" | "animate" | "initial" | "exit" | "transition" | "children" | "shouldExit" | "onExitComplete">> | null;
};
