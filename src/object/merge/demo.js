"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var data1 = { a: { b: { c: 1 } } };
var data2 = { a: { c: { b: 1 } } };
var d = (0, index_1.merge)(data1, data2);
console.log("d", d);
