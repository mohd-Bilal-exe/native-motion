"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeMotion = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_TRANSITION = {
    type: 'spring',
    damping: 15,
    stiffness: 100,
    duration: 300,
    repeat: 0,
    repeatType: 'loop',
};
function createMotionComponent(Component) {
    return function MotionComponent(props) {
        const { initial = {}, animate = {}, exit = {}, transition = DEFAULT_TRANSITION, shouldAnimate = false, shouldDeAnimate = false, shouldExit = false, onExitComplete, whileHover, whileTap, whileFocus, layout, layoutId, style = {}, children } = props, rest = __rest(props, ["initial", "animate", "exit", "transition", "shouldAnimate", "shouldDeAnimate", "shouldExit", "onExitComplete", "whileHover", "whileTap", "whileFocus", "layout", "layoutId", "style", "children"]);
        // Create shared values
        const opacity = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('opacity', initial));
        const x = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('x', initial));
        const y = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('y', initial));
        const z = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('z', initial));
        const translateX = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('translateX', initial));
        const translateY = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('translateY', initial));
        const scale = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('scale', initial));
        const scaleX = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('scaleX', initial));
        const scaleY = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('scaleY', initial));
        const rotate = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('rotate', initial));
        const rotateX = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('rotateX', initial));
        const rotateY = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('rotateY', initial));
        const rotateZ = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('rotateZ', initial));
        const skewX = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('skewX', initial));
        const skewY = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('skewY', initial));
        // Layout properties
        const width = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('width', initial));
        const height = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('height', initial));
        const minWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('minWidth', initial));
        const minHeight = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('minHeight', initial));
        const maxWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('maxWidth', initial));
        const maxHeight = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('maxHeight', initial));
        // Spacing properties
        const margin = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('margin', initial));
        const marginTop = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginTop', initial));
        const marginBottom = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginBottom', initial));
        const marginLeft = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginLeft', initial));
        const marginRight = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginRight', initial));
        const marginHorizontal = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginHorizontal', initial));
        const marginVertical = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('marginVertical', initial));
        const padding = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('padding', initial));
        const paddingTop = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingTop', initial));
        const paddingBottom = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingBottom', initial));
        const paddingLeft = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingLeft', initial));
        const paddingRight = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingRight', initial));
        const paddingHorizontal = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingHorizontal', initial));
        const paddingVertical = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('paddingVertical', initial));
        // Border properties
        const borderRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderRadius', initial));
        const borderTopLeftRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderTopLeftRadius', initial));
        const borderTopRightRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderTopRightRadius', initial));
        const borderBottomLeftRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderBottomLeftRadius', initial));
        const borderBottomRightRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderBottomRightRadius', initial));
        const borderWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderWidth', initial));
        const borderTopWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderTopWidth', initial));
        const borderBottomWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderBottomWidth', initial));
        const borderLeftWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderLeftWidth', initial));
        const borderRightWidth = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderRightWidth', initial));
        const borderTopColor = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderTopColor', initial));
        const borderBottomColor = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderBottomColor', initial));
        const borderLeftColor = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderLeftColor', initial));
        const borderRightColor = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderRightColor', initial));
        // Color properties - use progress values for interpolation
        const backgroundColorProgress = (0, react_native_reanimated_1.useSharedValue)(0);
        const colorProgress = (0, react_native_reanimated_1.useSharedValue)(0);
        const borderColorProgress = (0, react_native_reanimated_1.useSharedValue)(0);
        const shadowColorProgress = (0, react_native_reanimated_1.useSharedValue)(0);
        // Store color values for interpolation
        const backgroundColorFrom = (0, react_1.useRef)(getInitialValue('backgroundColor', initial));
        const backgroundColorTo = (0, react_1.useRef)(getInitialValue('backgroundColor', initial));
        const colorFrom = (0, react_1.useRef)(getInitialValue('color', initial));
        const colorTo = (0, react_1.useRef)(getInitialValue('color', initial));
        const borderColorFrom = (0, react_1.useRef)(getInitialValue('borderColor', initial));
        const borderColorTo = (0, react_1.useRef)(getInitialValue('borderColor', initial));
        const shadowColorFrom = (0, react_1.useRef)(getInitialValue('shadowColor', initial));
        const shadowColorTo = (0, react_1.useRef)(getInitialValue('shadowColor', initial));
        // Position properties
        const top = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('top', initial));
        const bottom = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('bottom', initial));
        const left = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('left', initial));
        const right = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('right', initial));
        // Shadow properties
        const shadowOpacity = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('shadowOpacity', initial));
        const shadowRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('shadowRadius', initial));
        const elevation = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('elevation', initial));
        // Animation helper
        const animateToValues = (targetValues, transitionConfig = transition) => {
            Object.entries(targetValues).forEach(([key, value]) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                if (value !== undefined) {
                    // Handle color properties with interpolation
                    if (key === 'backgroundColor') {
                        backgroundColorTo.current = value;
                        const config = transitionConfig.type === 'spring'
                            ? (0, react_native_reanimated_1.withSpring)(1, {
                                damping: (_a = transitionConfig.damping) !== null && _a !== void 0 ? _a : DEFAULT_TRANSITION.damping,
                                stiffness: (_b = transitionConfig.stiffness) !== null && _b !== void 0 ? _b : DEFAULT_TRANSITION.stiffness,
                            })
                            : (0, react_native_reanimated_1.withTiming)(1, { duration: (_c = transitionConfig.duration) !== null && _c !== void 0 ? _c : DEFAULT_TRANSITION.duration });
                        backgroundColorProgress.value = config;
                        return;
                    }
                    if (key === 'color') {
                        colorTo.current = value;
                        const config = transitionConfig.type === 'spring'
                            ? (0, react_native_reanimated_1.withSpring)(1, {
                                damping: (_d = transitionConfig.damping) !== null && _d !== void 0 ? _d : DEFAULT_TRANSITION.damping,
                                stiffness: (_e = transitionConfig.stiffness) !== null && _e !== void 0 ? _e : DEFAULT_TRANSITION.stiffness,
                            })
                            : (0, react_native_reanimated_1.withTiming)(1, { duration: (_f = transitionConfig.duration) !== null && _f !== void 0 ? _f : DEFAULT_TRANSITION.duration });
                        colorProgress.value = config;
                        return;
                    }
                    if (key === 'borderColor') {
                        borderColorTo.current = value;
                        const config = transitionConfig.type === 'spring'
                            ? (0, react_native_reanimated_1.withSpring)(1, {
                                damping: (_g = transitionConfig.damping) !== null && _g !== void 0 ? _g : DEFAULT_TRANSITION.damping,
                                stiffness: (_h = transitionConfig.stiffness) !== null && _h !== void 0 ? _h : DEFAULT_TRANSITION.stiffness,
                            })
                            : (0, react_native_reanimated_1.withTiming)(1, { duration: (_j = transitionConfig.duration) !== null && _j !== void 0 ? _j : DEFAULT_TRANSITION.duration });
                        borderColorProgress.value = config;
                        return;
                    }
                    if (key === 'shadowColor') {
                        shadowColorTo.current = value;
                        const config = transitionConfig.type === 'spring'
                            ? (0, react_native_reanimated_1.withSpring)(1, {
                                damping: (_k = transitionConfig.damping) !== null && _k !== void 0 ? _k : DEFAULT_TRANSITION.damping,
                                stiffness: (_l = transitionConfig.stiffness) !== null && _l !== void 0 ? _l : DEFAULT_TRANSITION.stiffness,
                            })
                            : (0, react_native_reanimated_1.withTiming)(1, { duration: (_m = transitionConfig.duration) !== null && _m !== void 0 ? _m : DEFAULT_TRANSITION.duration });
                        shadowColorProgress.value = config;
                        return;
                    }
                    // Handle non-color properties
                    const sharedValue = getSharedValue(key);
                    if (sharedValue) {
                        let config;
                        if (transitionConfig.repeat && (transitionConfig.repeat > 0 || transitionConfig.repeat === 'infinity')) {
                            const baseAnimation = transitionConfig.type === 'spring'
                                ? (0, react_native_reanimated_1.withSpring)(value, {
                                    damping: (_o = transitionConfig.damping) !== null && _o !== void 0 ? _o : DEFAULT_TRANSITION.damping,
                                    stiffness: (_p = transitionConfig.stiffness) !== null && _p !== void 0 ? _p : DEFAULT_TRANSITION.stiffness,
                                    mass: (_q = transitionConfig.mass) !== null && _q !== void 0 ? _q : 1,
                                })
                                : (0, react_native_reanimated_1.withTiming)(value, {
                                    duration: (_r = transitionConfig.duration) !== null && _r !== void 0 ? _r : DEFAULT_TRANSITION.duration,
                                    easing: react_native_reanimated_1.Easing.linear,
                                });
                            const repeatCount = transitionConfig.repeat === 'infinity' ? -1 : transitionConfig.repeat;
                            const reverse = transitionConfig.repeatType === 'reverse';
                            config = (0, react_native_reanimated_1.withRepeat)(baseAnimation, repeatCount, reverse);
                        }
                        else {
                            config = transitionConfig.type === 'spring'
                                ? (0, react_native_reanimated_1.withSpring)(value, {
                                    damping: (_s = transitionConfig.damping) !== null && _s !== void 0 ? _s : DEFAULT_TRANSITION.damping,
                                    stiffness: (_t = transitionConfig.stiffness) !== null && _t !== void 0 ? _t : DEFAULT_TRANSITION.stiffness,
                                    mass: (_u = transitionConfig.mass) !== null && _u !== void 0 ? _u : 1,
                                })
                                : (0, react_native_reanimated_1.withTiming)(value, {
                                    duration: (_v = transitionConfig.duration) !== null && _v !== void 0 ? _v : DEFAULT_TRANSITION.duration,
                                });
                        }
                        if (transitionConfig.delay) {
                            setTimeout(() => {
                                sharedValue.value = config;
                            }, transitionConfig.delay);
                        }
                        else {
                            sharedValue.value = config;
                        }
                    }
                }
            });
        };
        // Get shared value by key
        const getSharedValue = (key) => {
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
        (0, react_1.useEffect)(() => {
            if (initial !== false) {
                Object.entries(initial).forEach(([key, value]) => {
                    const sharedValue = getSharedValue(key);
                    if (sharedValue && value !== undefined) {
                        sharedValue.value = value;
                    }
                });
            }
        }, []);
        // Handle shouldAnimate: initial -> animate
        (0, react_1.useEffect)(() => {
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
        (0, react_1.useEffect)(() => {
            if (shouldDeAnimate && initial !== false) {
                const initialProps = initial;
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
        (0, react_1.useEffect)(() => {
            var _a;
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
                    const exitDuration = (_a = transition.duration) !== null && _a !== void 0 ? _a : 300;
                    setTimeout(() => {
                        onExitComplete();
                    }, exitDuration);
                }
            }
        }, [shouldExit]);
        // Animated style
        const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
            const style = {};
            const transform = [];
            // Transform properties
            style.opacity = opacity.value;
            if (x.value !== 0)
                transform.push({ translateX: x.value });
            if (y.value !== 0)
                transform.push({ translateY: y.value });
            if (z.value !== 0)
                transform.push({ translateZ: z.value });
            if (translateX.value !== 0)
                transform.push({ translateX: translateX.value });
            if (translateY.value !== 0)
                transform.push({ translateY: translateY.value });
            if (scale.value !== 1)
                transform.push({ scale: scale.value });
            if (scaleX.value !== 1)
                transform.push({ scaleX: scaleX.value });
            if (scaleY.value !== 1)
                transform.push({ scaleY: scaleY.value });
            if (rotate.value !== '0deg')
                transform.push({ rotate: rotate.value });
            if (rotateX.value !== '0deg')
                transform.push({ rotateX: rotateX.value });
            if (rotateY.value !== '0deg')
                transform.push({ rotateY: rotateY.value });
            if (rotateZ.value !== '0deg')
                transform.push({ rotateZ: rotateZ.value });
            if (skewX.value !== '0deg')
                transform.push({ skewX: skewX.value });
            if (skewY.value !== '0deg')
                transform.push({ skewY: skewY.value });
            if (transform.length > 0)
                style.transform = transform;
            // Layout properties
            if (width.value !== 0)
                style.width = width.value;
            if (height.value !== 0)
                style.height = height.value;
            if (minWidth.value !== 0)
                style.minWidth = minWidth.value;
            if (minHeight.value !== 0)
                style.minHeight = minHeight.value;
            if (maxWidth.value !== 0)
                style.maxWidth = maxWidth.value;
            if (maxHeight.value !== 0)
                style.maxHeight = maxHeight.value;
            // Spacing properties
            if (margin.value !== 0)
                style.margin = margin.value;
            if (marginTop.value !== 0)
                style.marginTop = marginTop.value;
            if (marginBottom.value !== 0)
                style.marginBottom = marginBottom.value;
            if (marginLeft.value !== 0)
                style.marginLeft = marginLeft.value;
            if (marginRight.value !== 0)
                style.marginRight = marginRight.value;
            if (marginHorizontal.value !== 0)
                style.marginHorizontal = marginHorizontal.value;
            if (marginVertical.value !== 0)
                style.marginVertical = marginVertical.value;
            if (padding.value !== 0)
                style.padding = padding.value;
            if (paddingTop.value !== 0)
                style.paddingTop = paddingTop.value;
            if (paddingBottom.value !== 0)
                style.paddingBottom = paddingBottom.value;
            if (paddingLeft.value !== 0)
                style.paddingLeft = paddingLeft.value;
            if (paddingRight.value !== 0)
                style.paddingRight = paddingRight.value;
            if (paddingHorizontal.value !== 0)
                style.paddingHorizontal = paddingHorizontal.value;
            if (paddingVertical.value !== 0)
                style.paddingVertical = paddingVertical.value;
            // Border properties
            if (borderRadius.value !== 0)
                style.borderRadius = borderRadius.value;
            if (borderTopLeftRadius.value !== 0)
                style.borderTopLeftRadius = borderTopLeftRadius.value;
            if (borderTopRightRadius.value !== 0)
                style.borderTopRightRadius = borderTopRightRadius.value;
            if (borderBottomLeftRadius.value !== 0)
                style.borderBottomLeftRadius = borderBottomLeftRadius.value;
            if (borderBottomRightRadius.value !== 0)
                style.borderBottomRightRadius = borderBottomRightRadius.value;
            if (borderWidth.value !== 0)
                style.borderWidth = borderWidth.value;
            if (borderTopWidth.value !== 0)
                style.borderTopWidth = borderTopWidth.value;
            if (borderBottomWidth.value !== 0)
                style.borderBottomWidth = borderBottomWidth.value;
            if (borderLeftWidth.value !== 0)
                style.borderLeftWidth = borderLeftWidth.value;
            if (borderRightWidth.value !== 0)
                style.borderRightWidth = borderRightWidth.value;
            style.borderColor = (0, react_native_reanimated_1.interpolateColor)(borderColorProgress.value, [0, 1], [borderColorFrom.current, borderColorTo.current]);
            if (borderTopColor.value !== 'transparent')
                style.borderTopColor = borderTopColor.value;
            if (borderBottomColor.value !== 'transparent')
                style.borderBottomColor = borderBottomColor.value;
            if (borderLeftColor.value !== 'transparent')
                style.borderLeftColor = borderLeftColor.value;
            if (borderRightColor.value !== 'transparent')
                style.borderRightColor = borderRightColor.value;
            // Color properties with interpolation
            style.backgroundColor = (0, react_native_reanimated_1.interpolateColor)(backgroundColorProgress.value, [0, 1], [backgroundColorFrom.current, backgroundColorTo.current]);
            style.color = (0, react_native_reanimated_1.interpolateColor)(colorProgress.value, [0, 1], [colorFrom.current, colorTo.current]);
            // Position properties
            if (top.value !== 0)
                style.top = top.value;
            if (bottom.value !== 0)
                style.bottom = bottom.value;
            if (left.value !== 0)
                style.left = left.value;
            if (right.value !== 0)
                style.right = right.value;
            // Shadow properties
            style.shadowColor = (0, react_native_reanimated_1.interpolateColor)(shadowColorProgress.value, [0, 1], [shadowColorFrom.current, shadowColorTo.current]);
            if (shadowOpacity.value !== 0)
                style.shadowOpacity = shadowOpacity.value;
            if (shadowRadius.value !== 0)
                style.shadowRadius = shadowRadius.value;
            if (elevation.value !== 0)
                style.elevation = elevation.value;
            return style;
        });
        const AnimatedComponent = react_native_reanimated_1.default.createAnimatedComponent(Component);
        return react_1.default.createElement(AnimatedComponent, Object.assign({ style: [style, animatedStyle] }, rest), children);
    };
}
function getInitialValue(key, initial) {
    if (initial === false) {
        return getDefaultValue(key);
    }
    const value = initial[key];
    return value !== undefined ? value : getDefaultValue(key);
}
function getDefaultValue(key) {
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
exports.NativeMotion = {
    View: createMotionComponent(react_native_1.View),
    Text: createMotionComponent(react_native_1.Text),
    Image: createMotionComponent(react_native_1.Image),
    ImageBackground: createMotionComponent(react_native_1.ImageBackground),
    TextInput: createMotionComponent(react_native_1.TextInput),
    TouchableOpacity: createMotionComponent(react_native_1.TouchableOpacity),
    ScrollView: createMotionComponent(react_native_1.ScrollView),
    FlatList: createMotionComponent(react_native_1.FlatList),
    SectionList: createMotionComponent(react_native_1.SectionList),
    Pressable: createMotionComponent(react_native_1.Pressable),
};
