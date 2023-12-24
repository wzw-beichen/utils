import { toArray } from "../array";

/**
 * @description 取对象对应字段
 * @param data Record<string, any> 对象数据
 * @param str string 前端处理层级字符串
 * @param separator string 字符串分割符
 * @returns 处理之后的数据 T
 * @example const data = { a: { b: { c: 1 }}} ===> pickObjectField(data, 'a.b.c') => 1
 */
export const pickObjectField = <T, K = Record<string, any>>(
  data: K,
  pickStr: string | (string | number)[],
  separator = "."
): T => {
  const array = Array.isArray(pickStr) ? pickStr : pickStr.split(separator);
  return array.reduce((total, item) => {
    const value = total?.[item];
    if (typeof value === "number") {
      return value;
    }
    return value;
  }, data) as unknown as T;
};

/**
 * @description 对象转数组
 * @param obj Record<string, any> 需要转数组的对象
 * @param data {label?: string; value?: string} 对象转数组对应的label，value Key值，默认label，value
 * @example const data = { 1: 'xxx' } ===> objectTransformArray(data) => [{ label: 'xxx', value: 1 }]
 */
export const objectTransformArray = <T>(
  obj: Record<string, any>,
  data?: {
    label?: string;
    value?: string;
  }
): T[] => {
  const { label = "label", value = "value" } = data || {};
  return Object.entries(obj).map(
    ([key, val]) =>
      ({
        [label]: val,
        [value]: key,
      } as T)
  );
};

/**
 * @description 判断是否是object类型
 * @param val unknown 需要转数组的对象
 * @returns boolean
 * @example const data = { a: 1 } ===> isPlainObject(data) => true
 * @example const data = '11' ===> isPlainObject(data) => false
 */
export const isPlainObject = (val: unknown): boolean => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

/**
 * @description 动态去除对象中的属性
 * @param obj Record<string, any> 目标对象
 * @param omitKeys string[] | string 去除对象的key值
 * @returns 去除key值的对象
 * @example const data = { a: 1, b: 2, c: 3, d: 4 } ===> omitObjectKeys(data, 'a') => { b: 2, c: 3, d: 4 }
 * @example const data = { a: 1, b: 2, c: 3, d: 4 } ===> omitObjectKeys(data, ['a', 'b']) => { c: 3, d: 4 }
 */
export const omitObjectSomeKeys = <
  T extends Record<string, any>,
  K extends keyof T
>(
  obj: T,
  omitKeys: K[] | K
): Omit<T, K> => {
  const newOmitKeys = toArray(omitKeys);
  const omitObj = Object.keys(obj).reduce((total, keyItem) => {
    if (!newOmitKeys.includes(keyItem as K)) {
      total[keyItem] = obj[keyItem];
    }
    return total;
  }, {} as Omit<T, K>);
  return omitObj;
};

/**
 * @description 动态取对象中的属性
 * @param obj Record<string, any> 目标对象
 * @param pickKeys string[] | string 取对象的key值
 * @returns 取key值的对象
 * @example const data = { a: 1, b: 2, c: 3, d: 4 } ===> pickObjectSomeKeys(data, 'a') => { a: 1 }
 * @example const data = { a: 1, b: 2, c: 3, d: 4 } ===> pickObjectSomeKeys(data, ['a', 'b']) => { a: 1, b: 2 }
 */
export const pickObjectSomeKeys = <
  T extends Record<string, any>,
  K extends keyof T
>(
  obj: T,
  pickKeys: K[] | K
): Pick<T, K> => {
  const newPickKeys = toArray(pickKeys);
  const pickObj = Object.keys(obj).reduce((total, keyItem) => {
    if (newPickKeys.includes(keyItem as K)) {
      total[keyItem] = obj[keyItem];
    }
    return total;
  }, {} as Pick<T, K>);
  return pickObj;
};
