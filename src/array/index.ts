import { omitObjectSomeKeys } from "../object";

/**
 * @description 数组位置对换
 * @param array 需要位置对换的数组
 * @param oldIndex 原有Index
 * @param newIndex 对换位置Index
 * @return newArray 新数组
 * @example const data = [1,2,3,4,5] ===> arrayExchange(data, 1, 2) => [1,3,2,4,5]
 */
export const arrayExchange = <T>(
  array: T[],
  oldIndex: number,
  newIndex: number
): T[] => {
  if (oldIndex < 0 || newIndex > array.length - 1) {
    return array;
  }
  const temp = array[oldIndex];
  array[oldIndex] = array[newIndex];
  array[newIndex] = temp;
  return array;
};

/**
 * @description 将数组对象转换成tree树形结构
 * @param flatData 需要转换成tree树形结构的数组
 * @param config 转换成对应tree树形结构的配置
 * @return 树形结构数组
 * @example const data = [{ parentId: 0, id: 1, name: '顶级组织' },{ parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }]
 *  ===> convertToTree(data) => [{ parentId: 0, id: 1, name: '顶级组织', children: [{ parentId: 1, id: 2, name: '组织1', children: [{ parentId: 2, id: 3, name: '组织2' }]}]}]
 */
export const convertToTree = <
  T extends Record<string, any> & { children?: T[] }
>(
  flatData: T[],
  config?: {
    parentId?: number;
    idKey?: string;
    parentKey?: string;
    renderNode?: (data: T) => Record<string, any>;
  }
) => {
  const {
    parentId,
    idKey = "id",
    renderNode,
    parentKey = "parentId",
  } = config || {};
  const children = flatData.filter((node) => node[parentKey] === parentId);
  if (!children.length) {
    return [];
  }
  return children.map((node) => {
    const nodeChildren = convertToTree(flatData, {
      ...config,
      parentId: node[idKey],
    });
    if (nodeChildren.length) {
      node.children = nodeChildren;
    }
    return {
      ...node,
      ...renderNode?.(node),
    };
  });
};

/**
 * @description 将tree树形结构转换成铺平的数组对象
 * @param flatData 需要转换成铺平的数组对象的tree树形数组
 * @param config 转换成对应铺平的数组对象的配置
 * @return 铺平的数组对象
 * @example const data = [{ parentId: 0, id: 1, name: '顶级组织', children: [{ parentId: 1, id: 2, name: '组织1', children: [{ parentId: 2, id: 3, name: '组织2' }]}]}]
 *  ===> arrayFlat(data) => [{ parentId: 0, id: 1, name: '顶级组织' },{ parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }]
 * @example const data = [{ parentId: 0, id: 1, name: '顶级组织', children: [{ parentId: 1, id: 2, name: '组织1', children: [{ parentId: 2, id: 3, name: '组织2' }]}]}, { parentId: 0, id: 1111, name: '顶级组织2',}]
 *  ===> arrayFlat(data) => [{ parentId: 0, id: 1, name: '顶级组织' }, { parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }, { parentId: 0, id: 1111, name: '顶级组织2' }]
 */
export const arrayFlat = <T extends Record<string, any> & { children?: T[] }>(
  flatData: T[],
  config?: {
    childrenKey?: string;
  }
): T[] => {
  const { childrenKey = "children" } = config || {};
  const newFlatData = flatData.reduce((total, item) => {
    const children = item[childrenKey];
    const otherKey = omitObjectSomeKeys(item, childrenKey);
    return children?.length
      ? [...total, otherKey, ...arrayFlat(children, config)]
      : [...total, otherKey];
  }, [] as T[]);
  return newFlatData as T[];
};

/**
 * @description 对应sortKey进行数组排序
 * @param arrayData 需要进行排序的数组
 * @param config { sortKey?: string; order?: "ascend" | "descend" } 进行排序的数组的配置
 * @return 排序之后的数组
 * @example const data = [{ parentId: 0, id: 1, name: '顶级组织' }, { parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }, { parentId: 0, id: 1111, name: '顶级组织2' }]
 *  ===> arraySortKey(data) => [{ parentId: 0, id: 1, name: '顶级组织' }, { parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }, { parentId: 0, id: 1111, name: '顶级组织2' }]
 * @example const data = [{ parentId: 0, id: 1, name: '顶级组织' }, { parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }, { parentId: 0, id: 1111, name: '顶级组织2' }]
 *  ===> arraySortKey(data, { order: 'descend' }) => [{ parentId: 0, id: 1111, name: '顶级组织2' }, { parentId: 2, id: 3, name: '组织2' }, { parentId: 1, id: 2, name: '组织1' }, { parentId: 0, id: 1, name: '顶级组织' }]
 */
export const arraySortKey = <T extends Record<string, any>>(
  arrayData: T[],
  config?: {
    sortKey?: string;
    /** ascend升序 descend降序 */
    order?: "ascend" | "descend";
  }
): T[] => {
  const { sortKey = "id", order = "ascend" } = config || {};
  return arrayData.sort((pre, cur) => {
    if (order === "descend") {
      return cur[sortKey] - pre[sortKey];
    }
    return pre[sortKey] - cur[sortKey];
  });
};

/**
 * @description 取数组某一项，默认取数组最后一项
 * @param array 数组
 * @param pickIndex 取某一项对应下标，可以传负数，传负数超过数组最大长度，返回第一项
 * @return 数组对应下标一项
 * @example const data = [1, 2, 3, 4, 5]
 *          pickArrayItem(data) ===> 5
 *          pickArrayItem(data, 4) ===> 5
 *          pickArrayItem(data, 5) ===> 5
 *          pickArrayItem(data, -1) ===> 5
 *          pickArrayItem(data, -5) ===> 1
 *          pickArrayItem(data, -6) ===> 1
 */
export const pickArrayItem = <T>(array: T[], pickIndex?: number): T => {
  const newArray = Array.isArray(array) ? array : [];
  const arrLength = newArray.length;
  if (!arrLength) return undefined;
  const newIndex = pickIndex ?? arrLength - 1;
  const lastIndex = arrLength - 1;
  const numIndex = Math.abs(newIndex);
  if (newIndex < 0) {
    if (numIndex > arrLength) {
      return array[0];
    }
    return array[arrLength + newIndex];
  }
  const minIndex = Math.min(numIndex, lastIndex);
  return array[minIndex];
};

/**
 * @description 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
 *              如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
 * @param array Array  需要处理的数组
 * @param size  number 每个数组区块的长度 [size=1]
 * @returns {Array} 返回一个包含拆分区块的新数组（注：相当于一个二维数组）
 * @example const data = ['a', 'b', 'c', 'd']
 *          arrayChunk(['a', 'b', 'c', 'd'], 2) ===> [['a', 'b'], ['c', 'd']]
 *          arrayChunk(['a', 'b', 'c', 'd'], 3) ===> [['a', 'b', 'c'], ['d']]
 */
export const arrayChunk = <T>(array: T[], size = 1): T[][] => {
  const length = Array.isArray(array) ? array.length : 0;
  if (size < 1 || !length) {
    return [];
  }
  const chunkLength = Math.ceil(length / size);
  const result = new Array(chunkLength);
  let index = 0;
  for (let i = 0; i < length; i += size) {
    result[index] = array.slice(i, i + size);
    index++;
  }
  return result;
};

/**
 * @description 创建一个组成对象，key（键）是经过 iteratee（迭代函数） 执行处理collection中每个元素后返回的结果，
 *              每个key（键）对应的值是 iteratee（迭代函数）返回该key（键）的次数（注：迭代次数）。
 *              iteratee 调用一个参数：(value)。
 * @param collection 一个用来迭代的集合
 * @param iteratee 一个迭代函数，用来转换key（键）
 * @returns 返回一个组成集合对象
 * @example countBy([6.1, 4.2, 6.3], Math.floor) ===> { '4': 1, '6': 2 }
 *    countBy(['one', 'two', 'three'], 'length') ===> { '3': 2, '5': 1 }
 */
export const arrayCountBy = <T extends any>(
  collection: Array<T> | Object,
  iteratee?: Function | string
): Record<string, number> => {
  const newCollection = collection as Array<T>;
  const total: Record<string, number> = {};
  for (let item of newCollection) {
    let value = item as string;
    if (typeof iteratee === "string") {
      value = value[iteratee];
    }
    if (typeof iteratee === "function") {
      value = iteratee(value);
    }
    total[value] = total[value] ? ++total[value] : 1;
  }
  return total;
};

/**
 * @description 遍历 collection（集合）元素，返回 predicate（断言函数）最后一个返回真值的元素。
 * @param collection 一个用来迭代的集合
 * @param predicate 断言函数
 * @param fromIndex 开始搜索的索引位置
 * @returns 返回一个组成集合对象
 * @example data = [1, 2, 3, 4];
 * arrayFindLast(data, (n) => n % 2) ===> [3, 2]
 * arrayFindLast(data, (n) => !(n % 2)) ===> [4, 3]
 * arrayFindLast(data, (n) => n > 5) ===> [undefined, -1]
 */
export const arrayFindLast = <T>(
  collection: T[],
  predicate: (item: T, index?: number, array?: T[]) => boolean,
  fromIndex = 0
): [T | undefined, number] => {
  const newArray = collection.slice(fromIndex);
  const [lastItem, lastIndex] = newArray.reduce((total, item, index) => {
    const bool = predicate(item, index, collection);
    total = bool ? [item, index] : [undefined, -1];
    return total;
  }, [] as unknown as [T | undefined, number]);
  return [lastItem, lastIndex];
};

/**
 * @description 转换成数组
 * @param value 要转换为数组的数据
 * @returns 数组
 * @example toArray(1) ===> [1]
 * toArray({}) ===> [{}]
 * toArray([1,2,3]) ===> [1,2,3]
 * toArray(null) ===> []
 * toArray(undefined) ===> []
 */
export const toArray = <T>(value?: T | T[] | null) => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/**
 * @description 常用图片数组转换成字符串。
 * @param imgArr 图片数组
 * @param separator 可选。要使用的分隔符。如果省略，元素用逗号分隔。
 * @example data = [{ url: 'https://1.png' }, { url: 'https://2.png' }];
 * imgArrayTransformString(data) ===> 'https://1.png,https://2.png'
 * imgArrayTransformString(data, '%') ===> 'https://1.png%https://2.png'
 */
export const imgArrayTransformString = (
  imgArr?: { url: string }[],
  separator: string = ","
) => {
  if (!imgArr?.length) {
    return "";
  }
  return imgArr
    .map((item) => item.url)
    .filter(Boolean)
    .join(separator);
};

/**
 * @description 根据targetId获取树形数组里面的某一项
 * @params array 树形结构数组
 * @params targetId 目标id
 * @params fieldNames 自定义树形结构中label、value、children的字段
 * @example data = [
 *  { id: 6, label: 6, children: [{ id: 600, label: 600,children: [{ id: 60000, label: 6000 }]}]},
 *  { id: 7, label: 7, children: [{ id: 700, label: 700,children: [{ id: 70000, label: 70000 }]}]},
 *  { id: 8, label: 8, children: [{ id: 800, label: 800,children: [{ id: 80000, label: 80000 }]}]},
 *  { id: 9, label: 9, children: [{ id: 900, label: 900,children: [{ id: 90000, label: 90000 }]}]},
 *  { id: 10, label: 10, children: [{ id: 1000, label: 1000,children: [{ id: 100000, label: 100000 }]}]},
 * ]
 * pickTreeArray(data, 8) ===> [{ id: 8, label: 8, children: [{ id: 800, label: 800,children: [{ id: 80000, label: 80000 }]}]}]
 * pickTreeArray(data, 900) ===> [{ id: 9, label: 9, children: [{ id: 900, label: 900,children: [{ id: 90000, label: 90000 }]}]}]
 * pickTreeArray(data, 100000) ===> [{ id: 10, label: 10, children: [{ id: 1000, label: 1000,children: [{ id: 100000, label: 100000 }]}]}]
 */
export const pickTreeArray = <T>(
  array: T[],
  targetId?: number | string,
  fieldNames?: {
    value?: string;
    children?: string;
  }
): T[] => {
  const { value: valueKey = "id", children: childrenKey = "children" } =
    fieldNames || {};
  return array.filter((item) => {
    const children = item[childrenKey];
    const value = item[valueKey];
    if (value === targetId) {
      return true;
    }
    if (children?.length) {
      return pickTreeArray(children, targetId, fieldNames).length;
    }
  });
};

/**
 * @description 根据targetId获取树形数组某一层级，铺平获取到的层级数据
 * @params array 树形结构数组
 * @params targetId 目标id
 * @params fieldNames 自定义树形结构中label、value、children的字段
 * @example data = [{ id: 8, label: 8, children: [{ id: 800, label: 800,children: [{ id: 80000, label: 80000 }]}]}]
 * pickTreeArray(data, 8) ===> [{ id: 8, label: 8 }]
 * pickTreeArray(data, 800) ===> [{ id: 8, label: 8 }, { id: 800, label: 800 }]
 * pickTreeArray(data, 80000) ===> [{ id: 8, label: 8 }, { id: 800, label: 800 }, { id: 80000, label: 80000 }]
 */
export const pickLevelTreeArray = <T>(
  array: T[],
  targetId?: number | string,
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  }
): T[] => {
  const {
    value: valueKey = "id",
    label: labelKey = "name",
    children: childrenKey = "children",
  } = fieldNames || {};
  return array.reduce((total, item) => {
    const children = item[childrenKey];
    const value = item[valueKey];
    const label = item[labelKey];
    const newItem = {
      [labelKey]: label,
      [valueKey]: value,
    };
    if (value === targetId) {
      return [...total, newItem];
    }
    if (children) {
      const pickArr = pickLevelTreeArray(children, targetId, fieldNames);
      return [...total, ...(pickArr.length ? [newItem, ...pickArr] : [])];
    }
    return total;
  }, []);
};

/**
 * @description 根据targetId获取树形数组的某一项，铺平获取到的某一项数据
 * @params array 树形结构数组
 * @params targetId 目标id
 * @params fieldNames 自定义树形结构中label、value、children的字段
 * @example data = [
 *  { id: 6, label: 6, children: [{ id: 600, label: 600,children: [{ id: 60000, label: 6000 }]}]},
 *  { id: 7, label: 7, children: [{ id: 700, label: 700,children: [{ id: 70000, label: 70000 }]}]},
 *  { id: 8, label: 8, children: [{ id: 800, label: 800,children: [{ id: 80000, label: 80000 }]}]},
 *  { id: 9, label: 9, children: [{ id: 900, label: 900,children: [{ id: 90000, label: 90000 }]}]},
 *  { id: 10, label: 10, children: [{ id: 1000, label: 1000,children: [{ id: 100000, label: 100000 }]}]},
 * ]
 * pickTreeArray(data, 8) ===> [{ id: 8, label: 8 }]
 * pickTreeArray(data, 800) ===> [{ id: 8, label: 8 }, { id: 800, label: 800 }]
 * pickTreeArray(data, 80000) ===> [{ id: 8, label: 8 }, { id: 800, label: 800 }, { id: 80000, label: 80000 }]
 */
export const pickLabelValueTreeArray = <T>(
  array: T[],
  targetId?: number | string,
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  }
): T[] => {
  const {
    value: valueKey = "id",
    label: labelKey = "name",
    children: childrenKey = "children",
  } = fieldNames || {};
  const newFieldNames = {
    value: valueKey,
    label: labelKey,
    children: childrenKey,
  };
  const treeArray = pickTreeArray(array, targetId, newFieldNames);
  return pickLevelTreeArray(treeArray, targetId, newFieldNames);
};
