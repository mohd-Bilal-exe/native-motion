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
// @ts-ignore
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
function createMotionComponent(Component) {
    return function MotionComponent(props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { initial = {}, animate = {}, exit = {}, transition = {}, style = {}, children, shouldExit = false, onExitComplete = () => { } } = props, rest = __rest(props, ["initial", "animate", "exit", "transition", "style", "children", "shouldExit", "onExitComplete"]);
        const [isPresent, setIsPresent] = (0, react_1.useState)(true);
        const [hasExited, setHasExited] = (0, react_1.useState)(false);
        const opacity = (0, react_native_reanimated_1.useSharedValue)((_a = initial.opacity) !== null && _a !== void 0 ? _a : 1);
        const translateX = (0, react_native_reanimated_1.useSharedValue)((_b = initial.x) !== null && _b !== void 0 ? _b : 0);
        const translateY = (0, react_native_reanimated_1.useSharedValue)((_c = initial.y) !== null && _c !== void 0 ? _c : 0);
        const scale = (0, react_native_reanimated_1.useSharedValue)((_d = initial.scale) !== null && _d !== void 0 ? _d : 1);
        const rotate = (0, react_native_reanimated_1.useSharedValue)((_e = initial.rotate) !== null && _e !== void 0 ? _e : '0deg');
        const width = (0, react_native_reanimated_1.useSharedValue)((_f = initial.width) !== null && _f !== void 0 ? _f : null);
        const height = (0, react_native_reanimated_1.useSharedValue)((_g = initial.height) !== null && _g !== void 0 ? _g : null);
        const borderRadius = (0, react_native_reanimated_1.useSharedValue)((_h = initial.borderRadius) !== null && _h !== void 0 ? _h : null);
        const backgroundColor = (0, react_native_reanimated_1.useSharedValue)((_j = initial.backgroundColor) !== null && _j !== void 0 ? _j : null);
        const runAnim = (sharedVal, target) => {
            var _a;
            const config = transition.type === 'spring' ? (0, react_native_reanimated_1.withSpring)(target, transition) : (0, react_native_reanimated_1.withTiming)(target, { duration: (_a = transition.duration) !== null && _a !== void 0 ? _a : 300 });
            sharedVal.value = config;
        };
        (0, react_1.useEffect)(() => {
            var _a, _b, _c, _d, _e;
            runAnim(opacity, (_a = animate.opacity) !== null && _a !== void 0 ? _a : opacity.value);
            runAnim(translateX, (_b = animate.x) !== null && _b !== void 0 ? _b : translateX.value);
            runAnim(translateY, (_c = animate.y) !== null && _c !== void 0 ? _c : translateY.value);
            runAnim(scale, (_d = animate.scale) !== null && _d !== void 0 ? _d : scale.value);
            runAnim(rotate, (_e = animate.rotate) !== null && _e !== void 0 ? _e : rotate.value);
            if (animate.width !== undefined)
                runAnim(width, animate.width);
            if (animate.height !== undefined)
                runAnim(height, animate.height);
            if (animate.borderRadius !== undefined)
                runAnim(borderRadius, animate.borderRadius);
            if (animate.backgroundColor !== undefined)
                runAnim(backgroundColor, animate.backgroundColor);
        }, [animate.opacity, animate.x, animate.y, animate.scale, animate.rotate, animate.width, animate.height, animate.borderRadius, animate.backgroundColor]);
        (0, react_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            if (shouldExit && !hasExited && Object.keys(exit).length > 0) {
                setHasExited(true);
                runAnim(opacity, (_a = exit.opacity) !== null && _a !== void 0 ? _a : 0);
                runAnim(translateX, (_b = exit.x) !== null && _b !== void 0 ? _b : translateX.value);
                runAnim(translateY, (_c = exit.y) !== null && _c !== void 0 ? _c : translateY.value);
                runAnim(scale, (_d = exit.scale) !== null && _d !== void 0 ? _d : scale.value);
                runAnim(rotate, (_e = exit.rotate) !== null && _e !== void 0 ? _e : rotate.value);
                if (exit.width !== undefined)
                    runAnim(width, exit.width);
                if (exit.height !== undefined)
                    runAnim(height, exit.height);
                if (exit.borderRadius !== undefined)
                    runAnim(borderRadius, exit.borderRadius);
                if (exit.backgroundColor !== undefined)
                    runAnim(backgroundColor, exit.backgroundColor);
                setTimeout(() => { setIsPresent(false); onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(); }, (_f = transition.duration) !== null && _f !== void 0 ? _f : 300);
            }
            else if (!shouldExit && hasExited) {
                setHasExited(false);
                setIsPresent(true);
                opacity.value = (_g = initial.opacity) !== null && _g !== void 0 ? _g : 1;
                translateX.value = (_h = initial.x) !== null && _h !== void 0 ? _h : 0;
                translateY.value = (_j = initial.y) !== null && _j !== void 0 ? _j : 0;
                scale.value = (_k = initial.scale) !== null && _k !== void 0 ? _k : 1;
                rotate.value = (_l = initial.rotate) !== null && _l !== void 0 ? _l : '0deg';
                width.value = (_m = initial.width) !== null && _m !== void 0 ? _m : null;
                height.value = (_o = initial.height) !== null && _o !== void 0 ? _o : null;
                borderRadius.value = (_p = initial.borderRadius) !== null && _p !== void 0 ? _p : null;
                backgroundColor.value = (_q = initial.backgroundColor) !== null && _q !== void 0 ? _q : null;
                setTimeout(() => {
                    var _a, _b, _c, _d, _e;
                    runAnim(opacity, (_a = animate.opacity) !== null && _a !== void 0 ? _a : opacity.value);
                    runAnim(translateX, (_b = animate.x) !== null && _b !== void 0 ? _b : translateX.value);
                    runAnim(translateY, (_c = animate.y) !== null && _c !== void 0 ? _c : translateY.value);
                    runAnim(scale, (_d = animate.scale) !== null && _d !== void 0 ? _d : scale.value);
                    runAnim(rotate, (_e = animate.rotate) !== null && _e !== void 0 ? _e : rotate.value);
                    if (animate.width !== undefined)
                        runAnim(width, animate.width);
                    if (animate.height !== undefined)
                        runAnim(height, animate.height);
                    if (animate.borderRadius !== undefined)
                        runAnim(borderRadius, animate.borderRadius);
                    if (animate.backgroundColor !== undefined)
                        runAnim(backgroundColor, animate.backgroundColor);
                }, 50);
            }
        }, [shouldExit]);
        const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
            const styleObj = { opacity: opacity.value, transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }, { rotate: rotate.value }] };
            if (width.value !== null)
                styleObj.width = width.value;
            if (height.value !== null)
                styleObj.height = height.value;
            if (borderRadius.value !== null)
                styleObj.borderRadius = borderRadius.value;
            if (backgroundColor.value !== null)
                styleObj.backgroundColor = backgroundColor.value;
            return styleObj;
        });
        const AnimatedComponent = react_native_reanimated_1.default.createAnimatedComponent(Component);
        if (!isPresent)
            return null;
        return react_1.default.createElement(AnimatedComponent, Object.assign({ style: [style, animatedStyle] }, rest), children);
    };
}
exports.NativeMotion = {
    View: createMotionComponent(react_native_1.View),
    Text: createMotionComponent(react_native_1.Text),
    Image: createMotionComponent(react_native_1.Image),
    TextInput: createMotionComponent(react_native_1.TextInput),
    TouchableOpacity: createMotionComponent(react_native_1.TouchableOpacity),
};
