"use strict";
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
exports.getKeys = void 0;
var isObject_1 = require("../isObject");
var getKeys = function (entity, withValue) {
    if (withValue === void 0) { withValue = false; }
    var entityArr = [];
    var loopKeys = function (entity, paths) {
        if (paths === void 0) { paths = []; }
        var keys = Object.keys(entity);
        if (!keys.length && paths.length) {
            entityArr.push(__spreadArray(__spreadArray([], paths, true), (withValue ? [entity] : []), true));
        }
        keys.forEach(function (key) {
            var value = entity[key];
            var newPaths = __spreadArray(__spreadArray([], paths, true), [key], false);
            if ((0, isObject_1.isObject)(value)) {
                loopKeys(value, newPaths);
            }
            else {
                entityArr.push(__spreadArray(__spreadArray([], newPaths, true), (withValue ? [value] : []), true));
            }
        });
    };
    loopKeys(entity);
    return entityArr;
};
exports.getKeys = getKeys;
