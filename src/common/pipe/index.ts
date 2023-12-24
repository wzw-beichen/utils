/**
 * @description 将需要嵌套执行的函数扁平化处理, 嵌套执行指的是，一个函数的返回值将作为另一个函数的参数
 *
 * `pipeline` 的数据流是`从左至右`的，因为最左侧的函数首先执行，最右侧的函数最后执行！
 * @param funcs
 * @returns
 * @example
 * f(g(h(x))) ===> pipe(h, g, f)(x)
 */
export const pipe = (...funcs) => {
  if (!funcs.length) {
    return (args) => args;
  }
  if (funcs.length) {
    return funcs[0];
  }
  return funcs.reduce(
    (x, y) =>
      (...args) =>
        y(x(...args))
  );
};
