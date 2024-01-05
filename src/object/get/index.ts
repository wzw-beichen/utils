/**
 * @description 取对象对应字段
 * @param entity Record<string, any> 对象数据
 * @param path string ｜ number | `(string | number)[]` 前端处理层级字符串
 * @param separator string 字符串分割符
 * @returns 处理之后的数据 T
 * @example const data = { a: { b: { c: 1 } } }
 * get(data, "a.b.c"); // 1
 * get(data, ["a", "b"]); // { c: 1 }
 * get(data, "a、b、c", "、"); // 1
 */
export const get = <T, K = Record<string, any>>(
  entity: K,
  path: string | number | (string | number)[],
  separator = "."
): T => {
  let paths: (string | number)[] = [path as number];
  if (Array.isArray(path)) {
    paths = path;
  }
  if (typeof path === "string") {
    paths = path.split(separator);
  }
  return paths.reduce((total, item) => total?.[item], entity) as unknown as T;
};
