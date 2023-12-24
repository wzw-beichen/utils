export const addMethod = (
  object: Record<string, any>,
  name: string,
  fn: (...rest) => unknown
) => {
  const old = object[name];
  object[name] = (...args) => {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      return old.apply(this, args);
    }
  };
};
