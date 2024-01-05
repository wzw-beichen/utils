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
exports.merge = void 0;
var getKeys_1 = require("../getKeys");
var set_1 = require("../set");
/**
 * @description 多个对象合并
 * @param sources 多个对象
 * @returns 合并后多个对象的值
 */
var merge = function () {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var keys = sources.reduce(function (total, item) { return __spreadArray(__spreadArray([], total, true), (0, getKeys_1.getKeys)(item, true), true); }, []);
    return keys.reduce(function (total, item) {
        var value = item.slice(-1)[0];
        var paths = item.slice(0, -1);
        return (0, set_1.set)(total, paths, value, true);
    }, {});
};
exports.merge = merge;
