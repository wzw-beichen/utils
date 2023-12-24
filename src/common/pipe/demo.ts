import { pipe } from "./index";

const add = (sum) => sum + 10;
const minus = (sum) => sum - 10;
const mult = (sum) => sum * 10;
const div = (sum) => sum / 10;

const sum = pipe(div, minus, mult, add)(10);
// (10 / 10 - 10) * 10 + 10;
console.log("sum", sum); // -80
