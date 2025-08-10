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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
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
        const margin = (0, react_native_reanimated_1.useSharedValue)((_k = initial.margin) !== null && _k !== void 0 ? _k : null);
        const marginTop = (0, react_native_reanimated_1.useSharedValue)((_l = initial.marginTop) !== null && _l !== void 0 ? _l : null);
        const marginBottom = (0, react_native_reanimated_1.useSharedValue)((_m = initial.marginBottom) !== null && _m !== void 0 ? _m : null);
        const marginLeft = (0, react_native_reanimated_1.useSharedValue)((_o = initial.marginLeft) !== null && _o !== void 0 ? _o : null);
        const marginRight = (0, react_native_reanimated_1.useSharedValue)((_p = initial.marginRight) !== null && _p !== void 0 ? _p : null);
        const padding = (0, react_native_reanimated_1.useSharedValue)((_q = initial.padding) !== null && _q !== void 0 ? _q : null);
        const paddingTop = (0, react_native_reanimated_1.useSharedValue)((_r = initial.paddingTop) !== null && _r !== void 0 ? _r : null);
        const paddingBottom = (0, react_native_reanimated_1.useSharedValue)((_s = initial.paddingBottom) !== null && _s !== void 0 ? _s : null);
        const paddingLeft = (0, react_native_reanimated_1.useSharedValue)((_t = initial.paddingLeft) !== null && _t !== void 0 ? _t : null);
        const paddingRight = (0, react_native_reanimated_1.useSharedValue)((_u = initial.paddingRight) !== null && _u !== void 0 ? _u : null);
        const borderWidth = (0, react_native_reanimated_1.useSharedValue)((_v = initial.borderWidth) !== null && _v !== void 0 ? _v : null);
        const borderColor = (0, react_native_reanimated_1.useSharedValue)((_w = initial.borderColor) !== null && _w !== void 0 ? _w : null);
        const top = (0, react_native_reanimated_1.useSharedValue)((_x = initial.top) !== null && _x !== void 0 ? _x : null);
        const bottom = (0, react_native_reanimated_1.useSharedValue)((_y = initial.bottom) !== null && _y !== void 0 ? _y : null);
        const left = (0, react_native_reanimated_1.useSharedValue)((_z = initial.left) !== null && _z !== void 0 ? _z : null);
        const right = (0, react_native_reanimated_1.useSharedValue)((_0 = initial.right) !== null && _0 !== void 0 ? _0 : null);
        const runAnim = (sharedVal, target) => {
            var _a;
            const config = transition.type === 'spring' ? (0, react_native_reanimated_1.withSpring)(target, transition) : (0, react_native_reanimated_1.withTiming)(target, { duration: (_a = transition.duration) !== null && _a !== void 0 ? _a : 300 });
            sharedVal.value = config;
        };
        (0, react_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
            opacity.value = (_a = initial.opacity) !== null && _a !== void 0 ? _a : 1;
            translateX.value = (_b = initial.x) !== null && _b !== void 0 ? _b : 0;
            translateY.value = (_c = initial.y) !== null && _c !== void 0 ? _c : 0;
            scale.value = (_d = initial.scale) !== null && _d !== void 0 ? _d : 1;
            rotate.value = (_e = initial.rotate) !== null && _e !== void 0 ? _e : '0deg';
            width.value = (_f = initial.width) !== null && _f !== void 0 ? _f : null;
            height.value = (_g = initial.height) !== null && _g !== void 0 ? _g : null;
            borderRadius.value = (_h = initial.borderRadius) !== null && _h !== void 0 ? _h : null;
            backgroundColor.value = (_j = initial.backgroundColor) !== null && _j !== void 0 ? _j : null;
            margin.value = (_k = initial.margin) !== null && _k !== void 0 ? _k : null;
            marginTop.value = (_l = initial.marginTop) !== null && _l !== void 0 ? _l : null;
            marginBottom.value = (_m = initial.marginBottom) !== null && _m !== void 0 ? _m : null;
            marginLeft.value = (_o = initial.marginLeft) !== null && _o !== void 0 ? _o : null;
            marginRight.value = (_p = initial.marginRight) !== null && _p !== void 0 ? _p : null;
            padding.value = (_q = initial.padding) !== null && _q !== void 0 ? _q : null;
            paddingTop.value = (_r = initial.paddingTop) !== null && _r !== void 0 ? _r : null;
            paddingBottom.value = (_s = initial.paddingBottom) !== null && _s !== void 0 ? _s : null;
            paddingLeft.value = (_t = initial.paddingLeft) !== null && _t !== void 0 ? _t : null;
            paddingRight.value = (_u = initial.paddingRight) !== null && _u !== void 0 ? _u : null;
            borderWidth.value = (_v = initial.borderWidth) !== null && _v !== void 0 ? _v : null;
            borderColor.value = (_w = initial.borderColor) !== null && _w !== void 0 ? _w : null;
            top.value = (_x = initial.top) !== null && _x !== void 0 ? _x : null;
            bottom.value = (_y = initial.bottom) !== null && _y !== void 0 ? _y : null;
            left.value = (_z = initial.left) !== null && _z !== void 0 ? _z : null;
            right.value = (_0 = initial.right) !== null && _0 !== void 0 ? _0 : null;
        }, [initial.opacity, initial.x, initial.y, initial.scale, initial.rotate, initial.width, initial.height, initial.borderRadius, initial.backgroundColor, initial.margin, initial.marginTop, initial.marginBottom, initial.marginLeft, initial.marginRight, initial.padding, initial.paddingTop, initial.paddingBottom, initial.paddingLeft, initial.paddingRight, initial.borderWidth, initial.borderColor, initial.top, initial.bottom, initial.left, initial.right]);
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
            if (animate.margin !== undefined)
                runAnim(margin, animate.margin);
            if (animate.marginTop !== undefined)
                runAnim(marginTop, animate.marginTop);
            if (animate.marginBottom !== undefined)
                runAnim(marginBottom, animate.marginBottom);
            if (animate.marginLeft !== undefined)
                runAnim(marginLeft, animate.marginLeft);
            if (animate.marginRight !== undefined)
                runAnim(marginRight, animate.marginRight);
            if (animate.padding !== undefined)
                runAnim(padding, animate.padding);
            if (animate.paddingTop !== undefined)
                runAnim(paddingTop, animate.paddingTop);
            if (animate.paddingBottom !== undefined)
                runAnim(paddingBottom, animate.paddingBottom);
            if (animate.paddingLeft !== undefined)
                runAnim(paddingLeft, animate.paddingLeft);
            if (animate.paddingRight !== undefined)
                runAnim(paddingRight, animate.paddingRight);
            if (animate.borderWidth !== undefined)
                runAnim(borderWidth, animate.borderWidth);
            if (animate.borderColor !== undefined)
                runAnim(borderColor, animate.borderColor);
            if (animate.top !== undefined)
                runAnim(top, animate.top);
            if (animate.bottom !== undefined)
                runAnim(bottom, animate.bottom);
            if (animate.left !== undefined)
                runAnim(left, animate.left);
            if (animate.right !== undefined)
                runAnim(right, animate.right);
        }, [animate.opacity, animate.x, animate.y, animate.scale, animate.rotate, animate.width, animate.height, animate.borderRadius, animate.backgroundColor, animate.margin, animate.marginTop, animate.marginBottom, animate.marginLeft, animate.marginRight, animate.padding, animate.paddingTop, animate.paddingBottom, animate.paddingLeft, animate.paddingRight, animate.borderWidth, animate.borderColor, animate.top, animate.bottom, animate.left, animate.right]);
        (0, react_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
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
                if (exit.margin !== undefined)
                    runAnim(margin, exit.margin);
                if (exit.marginTop !== undefined)
                    runAnim(marginTop, exit.marginTop);
                if (exit.marginBottom !== undefined)
                    runAnim(marginBottom, exit.marginBottom);
                if (exit.marginLeft !== undefined)
                    runAnim(marginLeft, exit.marginLeft);
                if (exit.marginRight !== undefined)
                    runAnim(marginRight, exit.marginRight);
                if (exit.padding !== undefined)
                    runAnim(padding, exit.padding);
                if (exit.paddingTop !== undefined)
                    runAnim(paddingTop, exit.paddingTop);
                if (exit.paddingBottom !== undefined)
                    runAnim(paddingBottom, exit.paddingBottom);
                if (exit.paddingLeft !== undefined)
                    runAnim(paddingLeft, exit.paddingLeft);
                if (exit.paddingRight !== undefined)
                    runAnim(paddingRight, exit.paddingRight);
                if (exit.borderWidth !== undefined)
                    runAnim(borderWidth, exit.borderWidth);
                if (exit.borderColor !== undefined)
                    runAnim(borderColor, exit.borderColor);
                if (exit.top !== undefined)
                    runAnim(top, exit.top);
                if (exit.bottom !== undefined)
                    runAnim(bottom, exit.bottom);
                if (exit.left !== undefined)
                    runAnim(left, exit.left);
                if (exit.right !== undefined)
                    runAnim(right, exit.right);
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
                margin.value = (_r = initial.margin) !== null && _r !== void 0 ? _r : null;
                marginTop.value = (_s = initial.marginTop) !== null && _s !== void 0 ? _s : null;
                marginBottom.value = (_t = initial.marginBottom) !== null && _t !== void 0 ? _t : null;
                marginLeft.value = (_u = initial.marginLeft) !== null && _u !== void 0 ? _u : null;
                marginRight.value = (_v = initial.marginRight) !== null && _v !== void 0 ? _v : null;
                padding.value = (_w = initial.padding) !== null && _w !== void 0 ? _w : null;
                paddingTop.value = (_x = initial.paddingTop) !== null && _x !== void 0 ? _x : null;
                paddingBottom.value = (_y = initial.paddingBottom) !== null && _y !== void 0 ? _y : null;
                paddingLeft.value = (_z = initial.paddingLeft) !== null && _z !== void 0 ? _z : null;
                paddingRight.value = (_0 = initial.paddingRight) !== null && _0 !== void 0 ? _0 : null;
                borderWidth.value = (_1 = initial.borderWidth) !== null && _1 !== void 0 ? _1 : null;
                borderColor.value = (_2 = initial.borderColor) !== null && _2 !== void 0 ? _2 : null;
                top.value = (_3 = initial.top) !== null && _3 !== void 0 ? _3 : null;
                bottom.value = (_4 = initial.bottom) !== null && _4 !== void 0 ? _4 : null;
                left.value = (_5 = initial.left) !== null && _5 !== void 0 ? _5 : null;
                right.value = (_6 = initial.right) !== null && _6 !== void 0 ? _6 : null;
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
                    if (animate.margin !== undefined)
                        runAnim(margin, animate.margin);
                    if (animate.marginTop !== undefined)
                        runAnim(marginTop, animate.marginTop);
                    if (animate.marginBottom !== undefined)
                        runAnim(marginBottom, animate.marginBottom);
                    if (animate.marginLeft !== undefined)
                        runAnim(marginLeft, animate.marginLeft);
                    if (animate.marginRight !== undefined)
                        runAnim(marginRight, animate.marginRight);
                    if (animate.padding !== undefined)
                        runAnim(padding, animate.padding);
                    if (animate.paddingTop !== undefined)
                        runAnim(paddingTop, animate.paddingTop);
                    if (animate.paddingBottom !== undefined)
                        runAnim(paddingBottom, animate.paddingBottom);
                    if (animate.paddingLeft !== undefined)
                        runAnim(paddingLeft, animate.paddingLeft);
                    if (animate.paddingRight !== undefined)
                        runAnim(paddingRight, animate.paddingRight);
                    if (animate.borderWidth !== undefined)
                        runAnim(borderWidth, animate.borderWidth);
                    if (animate.borderColor !== undefined)
                        runAnim(borderColor, animate.borderColor);
                    if (animate.top !== undefined)
                        runAnim(top, animate.top);
                    if (animate.bottom !== undefined)
                        runAnim(bottom, animate.bottom);
                    if (animate.left !== undefined)
                        runAnim(left, animate.left);
                    if (animate.right !== undefined)
                        runAnim(right, animate.right);
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
            if (margin.value !== null)
                styleObj.margin = margin.value;
            if (marginTop.value !== null)
                styleObj.marginTop = marginTop.value;
            if (marginBottom.value !== null)
                styleObj.marginBottom = marginBottom.value;
            if (marginLeft.value !== null)
                styleObj.marginLeft = marginLeft.value;
            if (marginRight.value !== null)
                styleObj.marginRight = marginRight.value;
            if (padding.value !== null)
                styleObj.padding = padding.value;
            if (paddingTop.value !== null)
                styleObj.paddingTop = paddingTop.value;
            if (paddingBottom.value !== null)
                styleObj.paddingBottom = paddingBottom.value;
            if (paddingLeft.value !== null)
                styleObj.paddingLeft = paddingLeft.value;
            if (paddingRight.value !== null)
                styleObj.paddingRight = paddingRight.value;
            if (borderWidth.value !== null)
                styleObj.borderWidth = borderWidth.value;
            if (borderColor.value !== null)
                styleObj.borderColor = borderColor.value;
            if (top.value !== null)
                styleObj.top = top.value;
            if (bottom.value !== null)
                styleObj.bottom = bottom.value;
            if (left.value !== null)
                styleObj.left = left.value;
            if (right.value !== null)
                styleObj.right = right.value;
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
