import { get } from "./index";

const data = { a: { b: { c: 1 } } };

const a = get(data, "a.b.c");
const b = get(data, ["a", "b"]);
const c = get(data, "a、b、c", "、");

const dataArr = [{ a: 1 }];

const d = get(dataArr, 0);

console.log("a", a); // 1
console.log("b", b); // { c: 1 }
console.log("c", c); // 1
console.log("d", d); // { a: 1 }
