import { merge } from "./index";

const data1 = { a: { b: { c: 1 } } };

const data2 = { a: { c: { b: 1 } } };

const d = merge(data1, data2);

console.log("d", d);
