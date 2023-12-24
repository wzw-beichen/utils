import { compose } from "./index";

const add = (sum: number) => sum + 10;
const minus = (sum: number) => sum - 10;
const mult = (sum: number) => sum * 10;
const div = (sum: number) => sum / 10;

const sum = compose(div, minus, mult, add)(10);
// ((10 + 10) * 10 - 10) / 10;
console.log("sum", sum); // 19
