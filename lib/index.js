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
};
function createMotionComponent(Component) {
    return function MotionComponent(props) {
        const { initial = {}, animate = {}, exit = {}, transition = DEFAULT_TRANSITION, shouldExit = false, onExitComplete, whileHover, whileTap, whileFocus, layout, layoutId, style = {}, children } = props, rest = __rest(props, ["initial", "animate", "exit", "transition", "shouldExit", "onExitComplete", "whileHover", "whileTap", "whileFocus", "layout", "layoutId", "style", "children"]);
        const [isPresent, setIsPresent] = (0, react_1.useState)(true);
        const [hasAnimated, setHasAnimated] = (0, react_1.useState)(false);
        const isExitingRef = (0, react_1.useRef)(false);
        // Create shared values
        const opacity = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('opacity', initial));
        const x = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('x', initial));
        const y = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('y', initial));
        const scale = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('scale', initial));
        const rotate = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('rotate', initial));
        const width = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('width', initial));
        const height = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('height', initial));
        const backgroundColor = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('backgroundColor', initial));
        const borderRadius = (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderRadius', initial));
        // Animation helper
        const animateToValues = (targetValues, transitionConfig = transition) => {
            Object.entries(targetValues).forEach(([key, value]) => {
                var _a, _b, _c, _d;
                if (value !== undefined) {
                    const sharedValue = getSharedValue(key);
                    if (sharedValue) {
                        const config = transitionConfig.type === 'spring'
                            ? (0, react_native_reanimated_1.withSpring)(value, {
                                damping: (_a = transitionConfig.damping) !== null && _a !== void 0 ? _a : DEFAULT_TRANSITION.damping,
                                stiffness: (_b = transitionConfig.stiffness) !== null && _b !== void 0 ? _b : DEFAULT_TRANSITION.stiffness,
                                mass: (_c = transitionConfig.mass) !== null && _c !== void 0 ? _c : 1,
                            })
                            : (0, react_native_reanimated_1.withTiming)(value, {
                                duration: (_d = transitionConfig.duration) !== null && _d !== void 0 ? _d : DEFAULT_TRANSITION.duration,
                            });
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
        (0, react_1.useEffect)(() => {
            if (!hasAnimated && !isExitingRef.current) {
                // Set initial values immediately
                if (initial !== false) {
                    Object.entries(initial).forEach(([key, value]) => {
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
        (0, react_1.useEffect)(() => {
            if (hasAnimated && !isExitingRef.current) {
                animateToValues(animate);
            }
        }, [animate]);
        // Handle shouldExit
        (0, react_1.useEffect)(() => {
            var _a;
            if (shouldExit && !isExitingRef.current) {
                isExitingRef.current = true;
                if (exit && Object.keys(exit).length > 0) {
                    animateToValues(exit, transition);
                    const exitDuration = (_a = transition.duration) !== null && _a !== void 0 ? _a : 300;
                    setTimeout(() => {
                        setIsPresent(false);
                        if (onExitComplete) {
                            onExitComplete();
                        }
                    }, exitDuration);
                }
                else {
                    setIsPresent(false);
                    if (onExitComplete) {
                        onExitComplete();
                    }
                }
            }
            else if (!shouldExit && isExitingRef.current) {
                // Re-entering: reset everything
                isExitingRef.current = false;
                setIsPresent(true);
                setHasAnimated(false);
                // Reset to initial values
                if (initial !== false) {
                    Object.entries(initial).forEach(([key, value]) => {
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
        const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
            const style = {};
            const transform = [];
            // Transform properties
            style.opacity = opacity.value;
            if (x.value !== 0)
                transform.push({ translateX: x.value });
            if (y.value !== 0)
                transform.push({ translateY: y.value });
            if (scale.value !== 1)
                transform.push({ scale: scale.value });
            if (rotate.value !== '0deg')
                transform.push({ rotate: rotate.value });
            if (transform.length > 0)
                style.transform = transform;
            // Layout properties
            if (width.value !== 0)
                style.width = width.value;
            if (height.value !== 0)
                style.height = height.value;
            if (backgroundColor.value !== 0)
                style.backgroundColor = backgroundColor.value;
            if (borderRadius.value !== 0)
                style.borderRadius = borderRadius.value;
            return style;
        });
        const AnimatedComponent = react_native_reanimated_1.default.createAnimatedComponent(Component);
        if (!isPresent)
            return null;
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
exports.NativeMotion = {
    View: createMotionComponent(react_native_1.View),
    Text: createMotionComponent(react_native_1.Text),
    Image: createMotionComponent(react_native_1.Image),
    TextInput: createMotionComponent(react_native_1.TextInput),
    TouchableOpacity: createMotionComponent(react_native_1.TouchableOpacity),
};
