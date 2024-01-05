"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
var get_1 = require("../get");
var internalSet = function (entity, paths, value, removeIfUndefined) {
    if (!paths.length)
        return value;
    var path = paths[0], restPath = paths.slice(1);
    var clone;
    if (!entity && typeof path === "number") {
        clone = [];
    }
    else if (Array.isArray(entity)) {
        clone = __spreadArray([], entity, true);
    }
    else {
        clone = __assign({}, entity);
    }
    if (restPath.length === 1 && !value && removeIfUndefined) {
        delete clone[path][restPath[0]];
    }
    else {
        clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
    }
    return clone;
};
var set = function (entity, paths, value, removeIfUndefined) {
    if (paths.length &&
        removeIfUndefined &&
        value === undefined &&
        !(0, get_1.get)(entity, paths.slice(0, -1))) {
        return entity;
    }
    return internalSet(entity, paths, value, removeIfUndefined);
};
exports.set = set;
