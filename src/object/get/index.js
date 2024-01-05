"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
/**
 * @description 取对象对应字段
 * @param entity Record<string, any> 对象数据
 * @param path string ｜ number | `(string | number)[]` 前端处理层级字符串
 * @param separator string 字符串分割符
 * @returns 处理之后的数据 T
 * @example const data = { a: { b: { c: 1 } } }
 * get(data, "a.b.c"); // 1
 * get(data, ["a", "b"]); // { c: 1 }
 * get(data, "a、b、c", "、"); // 1
 */
var get = function (entity, path, separator) {
    if (separator === void 0) { separator = "."; }
    var paths = [path];
    if (Array.isArray(path)) {
        paths = path;
    }
    if (typeof path === "string") {
        paths = path.split(separator);
    }
    return paths.reduce(function (total, item) { return total === null || total === void 0 ? void 0 : total[item]; }, entity);
};
exports.get = get;
