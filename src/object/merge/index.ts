import { getKeys } from "../getKeys";
import { set } from "../set";
import { Key } from "../type";

/**
 * @description 多个对象合并
 * @param sources 多个对象
 * @returns 合并后多个对象的值
 */
export const merge = (...sources: Record<string, any>[]) => {
  const keys = sources.reduce<Key[][]>(
    (total, item) => [...total, ...getKeys(item, true)],
    []
  );

  return keys.reduce((total, item) => {
    const value = item.slice(-1)[0];
    const paths = item.slice(0, -1);
    return set(total, paths, value, true);
  }, {});
};
