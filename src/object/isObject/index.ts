export const isObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === "[object Object]";
