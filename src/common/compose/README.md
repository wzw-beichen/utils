#### compose
`compose` 的数据流是 `从右至左` 的，因为最右侧的函数首先执行，最左侧的函数最后执行! 

```
// demo.ts
export const add = (sum) => sum + 10;
export const minus = (sum) => sum - 10;
export const mult = (sum) => sum * 10;
export const div = (sum) => sum / 10;
compose(div, minus, mult, add)(10); // 19
```

`reduce`
|    | `accumulator`  | `currentValue` | `index` | 返回函数 | 结果值 |
|:--------:|:---------:|:---------:|:--------:|:---------: | :---------: |
|   第一次调用   |  `div` | `minus` |   `1`   |  `div(minus(..args))` |  ` `
|   第二次调用   |  `div(minus(...args))` | `mult` |   `2`   |  `div(minus(mult(...args)))` | ` `
|   第三次调用   |  `div(minus(mult(...args)))` | `add` |  `3` |  `div(minus(mult(add(...args))))`  | `19` 