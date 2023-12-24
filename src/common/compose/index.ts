/**
 * @description 将需要嵌套执行的函数扁平化处理, 嵌套执行指的是，一个函数的返回值将作为另一个函数的参数
 *
 * `compose` 的数据流是`从右至左`的，因为最右侧的函数首先执行，最左侧的函数最后执行!
 * @param funcs
 * @returns
 * @example
 * f(g(h(x))) ===> compose(f, g, h)(x)
 */
export const compose = (...funcs) => {
  if (!funcs.length) {
    return (args) => args;
  }
  if (funcs.length) {
    return funcs[0];
  }
  return funcs.reduce(
    (x, y) =>
      (...args) =>
        x(y(...args))
  );
};

const compose_second = (...funcs) => {
  if (!funcs.length) {
    return (args) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return (...args) => {
    return funcs.reduceRight((sum, fn) => {
      if (!sum) {
        return fn.apply(null, args);
      }
      const params = Array.isArray(sum) ? sum : [sum];
      return fn.apply(null, params);
    }, null);
  };
};
