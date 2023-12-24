#### 管道(pipeline)
`pipeline` 的数据流是从左至右的，因为最左侧的函数首先执行，最右侧的函数最后执行！
```
// demo.ts
export const add = (sum) => sum + 10;
export const minus = (sum) => sum - 10;
export const mult = (sum) => sum * 10;
export const div = (sum) => sum / 10;
pipe(div, minus, mult, add)(10); // -80
```

|    | `accumulator`  | `currentValue` | `index` | 返回函数 | 结果值 |
|:--------:|:---------:|:---------:|:--------:|:---------: | :---------: |
|   第一次调用   |  `div` | `minus` |   `1`   |  `minus(div(10))` |  `-9`
|   第二次调用   |  `minus(div(10))` | `mult` |   `2`   |  `mult(minus(div(10)))` | `-90`
|   第三次调用   |  `mult(minus(div(10)))` | `add` |  `3` |  `add(mult(minus(div(10))))`  | `-80` 


