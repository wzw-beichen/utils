import { getKeys } from "./index";

const data = { a: { b: { c: 1, d: 2 } }, e: { g: 1, h: 2 }, qq: {} };

const a = getKeys(data);
const b = getKeys(data, true);

console.log("a", a);
console.log("--------------");
console.log("b", b);
// a
// [
//   [ 'a', 'b', 'c' ],
//   [ 'a', 'b', 'd' ],
//   [ 'e', 'g' ],
//   [ 'e', 'h' ],
//   [ 'qq' ]
// ]
// --------------
// b
// [
//   [ 'a', 'b', 'c', 1 ],
//   [ 'a', 'b', 'd', 2 ],
//   [ 'e', 'g', 1 ],
//   [ 'e', 'h', 2 ],
//   [ 'qq', {} ]
// ]
