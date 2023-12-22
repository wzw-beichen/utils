import { omitObjectSomeKeys } from "../object";
import { isFunction } from "../utils";

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
  T extends Record<string, any> & { children?: T[] },
  K extends keyof T
>(
  flatData: T[],
  config?: {
    parentId?: number;
    idKey?: K;
    parentKey?: K;
    renderNode?: (data: T) => Record<string, any>;
  }
): T[] => {
  const {
    parentId,
    idKey = "id",
    renderNode,
    parentKey = "parentId",
  } = config || {};
  const children = flatData.filter((node) => node[parentKey as K] === parentId);
  if (!children.length) {
    return [];
  }
  return children.map((node) => {
    const nodeChildren = convertToTree(flatData, {
      ...config,
      parentId: node[idKey as K],
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
export const arrayFlat = <
  T extends Record<string, any> & { children?: T[] },
  K extends keyof T
>(
  flatData: T[],
  config?: {
    childrenKey?: K;
  }
): Omit<T, K>[] => {
  const { childrenKey = "children" } = config || {};
  return flatData.reduce((total, item) => {
    const children = toArray(item[childrenKey as K]);
    const otherKey = omitObjectSomeKeys(item, childrenKey as K);
    const nodeChildren = children.length ? arrayFlat(children, config) : [];
    return [...total, otherKey, ...nodeChildren];
  }, [] as Omit<T, K>[]);
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
export const arraySortKey = <T extends Record<string, any>, K extends keyof T>(
  arrayData: T[],
  config?: {
    sortKey?: K;
    /** ascend升序 descend降序 */
    order?: "ascend" | "descend";
  }
): T[] => {
  const { sortKey = "id", order = "ascend" } = config || {};
  const newSortKey = sortKey as K;
  return arrayData.sort((pre, cur) => {
    if (order === "descend") {
      return cur[newSortKey] - pre[newSortKey];
    }
    return pre[newSortKey] - cur[newSortKey];
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
 * @description 取数组某个字段的值用separator拼接成字符串。
 * @param array 需要转为字符串的数组
 * @param config 配置
 * @example data = [{ url: 'https://1.png' }, { url: 'https://2.png' }];
 * pickArrayKeyToString(data) ===> 'https://1.png,https://2.png'
 * pickArrayKeyToString(data, '%') ===> 'https://1.png%https://2.png'
 */
export const pickArrayKeyToString = <
  T extends Record<string, any>,
  K extends keyof T
>(
  array?: T[],
  config?: {
    /** 取数组每一项的值 */
    key?: K;
    /** 可选。要使用的分隔符。如果省略，元素用逗号分隔。 */
    separator?: string;
  }
) => {
  const { key = "url", separator = "," } = config || {};
  if (!array?.length) {
    return "";
  }
  return array
    .map((item) => item[key as K])
    .filter(Boolean)
    .join(separator);
};

/**
 * @description 根据targetId获取树形数组里面的某一项, 具有层级关系
 * @params array 树形结构数组
 * @params targetId 目标id
 * @params fieldNames 自定义树形结构中label、value、children的字段
 * @example data = [
 *  {
 *   label: 6,
 *   value: 6,
 *   children: [
 *    { label: 60, value: 60, children: [{ label: 600, value: 600 }, { label: 601, value: 601 }]},
 *    { label: 61, value: 61 }
 *   ]
 * },
 *  { label: 7, value: 7, children: [{ label: 70, value: 70, children: [{ label: 700, value: 700 }, { label: 701, value: 701 }]}]},
 *  { label: 8, value: 8, children: [{ label: 80, value: 80, children: [{ label: 800, value: 800 }, { label: 801, value: 801 }]}]},
 * ]
 * pickTreeArray(data, 6) ===> [{ label: 6, value: 6 }]
 * pickTreeArray(data, 60) ===> [{ label: 6, value: 6, children: [{ label: 60, value: 60 }]}]
 * pickTreeArray(data, 600) ===> [{ label: 6, value: 6, children: [{ label: 60, value: 60, children: [{ label: 600, value: 600 }]}]}]
 */
export const pickTreeArray = <T>(
  array: T[],
  targetId?: number | string,
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  }
): T[] => {
  const {
    label: labelKey = "label",
    value: valueKey = "value",
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
      total.push(newItem);
    }
    if (children?.length) {
      const subArr = pickTreeArray(children, targetId, fieldNames);
      if (subArr.length) {
        total = [
          {
            ...newItem,
            [childrenKey]: subArr,
          },
        ];
      }
    }
    return total;
  }, []);
};

/**
 * @description 根据targetId获取树形数组某一层级，铺平获取到的层级数据
 * @params array 树形结构数组
 * @params targetId 目标id
 * @params fieldNames 自定义树形结构中label、value、children的字段
 * @example data = [{ label: 8, value: 8, children: [{ label: 800, value: 800, children: [{ label: 80000, value: 80000 }]}]}]
 * pickTreeArray(data, 8) ===> [{ label: 8, value: 8 }]
 * pickTreeArray(data, 800) ===> [{ label: 8, value: 8 }, { label: 800, value: 800 }]
 * pickTreeArray(data, 80000) ===> [{ label: 8, value: 8 }, { label: 800, value: 800 }, { label: 80000, value: 80000 }]
 * pickTreeArray(data, 800, { callback: (item) => item.label }) ===> [8, 800]
 */
export const pickLevelTreeArray = <T>(
  array: T[],
  targetId?: number | string,
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
    callback?: (item: T) => unknown;
  }
): T[] | string[] | number[] => {
  const {
    label: labelKey = "label",
    value: valueKey = "value",
    children: childrenKey = "children",
    callback,
  } = fieldNames || {};
  return array.reduce((total, item) => {
    const children = item[childrenKey];
    const value = item[valueKey];
    const label = item[labelKey];
    let newItem = {
      [labelKey]: label,
      [valueKey]: value,
    };
    newItem = callback
      ? callback({
          ...item,
          ...newItem,
        })
      : newItem;
    if (value === targetId) {
      total.push(newItem);
    }
    if (children) {
      const pickArr = pickLevelTreeArray(children, targetId, fieldNames);
      if (pickArr?.length) {
        return [...total, newItem, ...pickArr];
      }
    }
    return total;
  }, []);
};

/**
 * @description 数组根据对应某个key进行组合
 * @params array 需要组合的array
 * @params config { key: string; returnArray?: boolean;dealItem?: (item: T) => Record<string, any>; }
 * @example const data = [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }, { uuid: "xxx3", id: 2, name: 333 }];
 * arrayCombination(data, { key: "id" }) ===> { 1: [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }], 2: [ { uuid: "xxx3", id: 2, name: 333 }] }
 * arrayCombination(data, { key: "id", returnArray: true }) ===>  [["1", [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }]], ["2", [{ uuid: "xxx3", id: 2, name: 333 }]]]
 */
export const arrayCombination = <T extends Record<string, any>>(
  array: T[],
  config: {
    key: string;
    returnArray?: boolean;
    dealItem?: (item: T) => string | number;
  }
) => {
  const { key, returnArray, dealItem } = config;
  const allValues = array.reduce((total, item) => {
    const combinationKey = item[key];
    const newItem = dealItem ? dealItem(item) : item;
    if (!total[combinationKey]) {
      total[combinationKey] = [newItem];
    } else {
      total[combinationKey].push(newItem);
    }
    return total;
  }, {} as Record<string, any[]>);
  if (returnArray) {
    const values = Object.entries(allValues);
    return values;
  }
  return allValues;
};

/**
 * @description 取两个数组分别对应的交集、并集
 * @param array 
 * @param targetArray 
 * @param func 
 * @returns  [addList, sameList]
 * @example const data = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ];
  differenceBy(data, [1, 2], item => item.value) ===> [
    [3, 4, 5],
    [1, 2]
  ]
 */
export const differenceBy = <
  T extends Record<string, any>,
  U extends string | number = string
>(
  array: T[],
  targetArray: U[],
  func?: (item: T) => U
): [U[], U[]] => {
  const [diffArray, sameArray] = array.reduce(
    (total, item) => {
      const newItem = func ? func(item) : (item as unknown as U);
      let newIndex = 0;
      if (targetArray.includes(newItem)) {
        newIndex = 1;
      }
      total[newIndex].push(newItem);
      return total;
    },
    [[], []] as [U[], U[]]
  );
  return [diffArray, sameArray];
};

/**
 * @description 取两个数组分别对应的交集、并集
 * @return [addList, delList，sameList]
 * @example 
 * const initParams = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ];
  const formData = [
    { label: 1, value: 1 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
  ];
  arrayIntersectionAndUnion(formData, initParams, (item) => item.value) ===> [
    [6, 7, 8, 9, 10],
    [2, 3, 4, 5]
    [1],
  ]
 */
export const arrayIntersectionAndUnion = <T extends Record<string, any>>(
  array: T[],
  targetArray: T[],
  /** type 0源数组 1目标数组 */
  func?: (item: T, type: number, index: number) => string | number,
  index: number = 0
) => {
  const targetKeys = targetArray.map((item) =>
    func ? func(item, 1, index) : item
  ) as (string | number)[];
  const sourceKeys = array.map((item) =>
    func ? func(item, 0, index) : item
  ) as (string | number)[];
  const [sourceDiffArray, sameArray] = differenceBy(
    array,
    targetKeys,
    (item) => {
      return func ? func(item, 0, index) : (item as unknown as string | number);
    }
  );
  const [targetDiffArray] = differenceBy(targetArray, sourceKeys, (item) => {
    return func ? func(item, 1, index) : (item as unknown as string | number);
  });
  return [sourceDiffArray, targetDiffArray, sameArray];
};

/**
 * @description 数组map、filter结合
 * @param array 数组
 * @param filter string | string[] | (item: T) => boolean
 * @param map string | ((item: T) => any)
 * @return 筛选后映射的数组
 * @example const data = [{id: 1, name: 1 }, {id: 2, name: 2 }, {id: 3, name: 3 }, {id: 4, name: 4 }, {id: 5, name: 5 }]
 *          arrayFilterMap(data, [{key: "id", value: 1 }], {id: "value", name: 'label' }) ===>
 *          [{value: 1, label: 1 }]
 *          arrayFilterMap(data, [{key: "id", value: 1, equalType: "unEqual" }], {id: 'value', name: 'label' }) ===>
 *          [{value: 2, label: 2 }, {value: 3, label: 3 }, {value: 4, label: 4 }, {value: 5, label: 5 }]
 *          arrayFilterMap(data, [{key: "id", value: 1 }, {key: "name", value: 2, filterType: 'or' }], {id: 'value', name: 'label' }) ===>
 *          [{value: 1, label: 1 }, {value: 2, label: 2 }]
 *          arrayFilterMap(data, [{key: "id", value: 1, equalType: "unEqual" }, {key: "name", value: 1, filterType: 'or' }], {id: 'value', name: 'label' }) ===>
 *          [{value: 1, label: 1 }, {value: 2, label: 2 }, {value: 3, label: 3 }, {value: 4, label: 4 }, {value: 5, label: 5 }]
 *          arrayFilterMap(data, [{value: (item) => item.name === 2 }], {id: 'value', name: 'label' }) ===>
 *          [{value: 2, label: 2 }]
 *          arrayFilterMap(data, [{value: (item) => item.name === 2 }], {name: (item) => `${item.id}/${item.name}`, id: 'value' }) ===>
 *          [{name: '2/2', value: 2 }]
 *          arrayFilterMap(data, [], {name: (item) => `${item.id}/${item.name}`, id: 'value' }) ===>
 *          [{name: '1/1', value: 1 }, {name: '2/2', value: 2 }, {name: '3/3', value: 3 }, {name: '4/4', value: 4 }, {name: '5/5', value: 5 }]
 */
export const arrayFilterMap = <T extends any, U extends any>(
  array: T[],
  filter?: {
    key?: string;
    value: (string | number) | ((item: T) => boolean);
    /** or或者、"also"并且, 默认also */
    filterType?: "or" | "also";
    /** equal等于、unEqual不等于, 默认等于equal */
    equalType?: "equal" | "unEqual";
  }[],
  map?: Record<string, string | ((item: T) => any)>
) => {
  return array.reduce<U[]>((total, item) => {
    let newItem = { ...(item as any) };
    let bool = true;
    if (!!filter?.length) {
      filter?.forEach((filterItem) => {
        const {
          key: filterKey = "",
          value: filterValue,
          filterType = "also",
          equalType = "equal",
        } = filterItem;
        let itemValue;
        if (isFunction(filterValue)) {
          itemValue = filterValue(newItem);
        } else {
          itemValue =
            equalType === "equal"
              ? newItem[filterKey] === filterValue
              : newItem[filterKey] !== filterValue;
        }
        bool = filterType === "also" ? bool && itemValue : bool || itemValue;
      });
    }
    if (bool) {
      const keys = Object.keys(map ?? {}) as string[];
      keys.forEach((keyItem) => {
        const keyValue = map?.[keyItem] as string;
        let finalValue = newItem[keyItem];
        const isFunc = isFunction(keyValue);
        if (isFunc) {
          finalValue = keyValue(newItem);
        } else {
          delete newItem[keyItem];
        }
        const key = isFunc ? keyItem : keyValue;
        newItem[key] = finalValue;
      });
      total.push(newItem as U);
    }
    return total;
  }, []);
};

/**
 * Check if `namePath` is super set or equal of `subNamePath`.
 * @param namePath A list of `InternalNamePath[]`
 * @param subNamePath Compare `InternalNamePath`
 * @param partialMatch True will make `[a, b]` match `[a, b, c]`
 */
export const matchNamePath = <T = string | number>(
  /** `[a, b, c]` */
  namePath: T[],
  /** `[a, b]` */
  subNamePath: T[],
  /** `partialMatch`部分匹配 `true`部分匹配 `false`全匹配 */
  partialMatch: boolean = false
): boolean => {
  if (!namePath || !subNamePath) {
    return false;
  }
  if (!partialMatch && namePath.length !== subNamePath.length) {
    return false;
  }
  return subNamePath.every((nameUnit, i) => namePath[i] === nameUnit);
};

/**
 * Check if `namePathList` includes `namePath`.
 * @param namePathList A list of `InternalNamePath[]`
 * @param namePath Compare `InternalNamePath`
 * @param partialMatch True will make `[a, b]` match `[a, b, c]`
 * @returns boolean
 * @explame
 */
export const containsNamePath = <T = string | number>(
  /** 需要验证的二维数组 `[[a, b]]` */
  namePathList: T[][],
  /** 一维数组 `[a, b, c]` */
  namePath: T[],
  /** `partialMatch`部分匹配 `true`部分匹配 `false`全匹配 */
  partialMatch = false
): boolean => {
  return (
    !!namePathList &&
    namePathList.some((path) => matchNamePath(namePath, path, partialMatch))
  );
};

/**
 * @description 树形数组增加层级结构属性，层级结构属性默认order
 * @param arr 树形数组
 * @param prefix 需要增加的属性的前缀
 * @param fieldNames 树形配置`{ children?: string, order?: string; callback?: (index: string[]) => string }`
 * @returns
 * @example
 * const data = [{ label: 1,value: 1, children: [{ label: 11, value: 11 }, { label: 12, value: 12 }]}]
 * treeArrayOrderProperty(data) ===>
 * [{ label: 1,value: 1, order: "1", children: [{ label: 11, value: 11, order: "1-1" }, { label: 12, value: 12, order: "1-2" }]}]
 */
export const treeArrayOrderProperty = <T>(
  arr: T[],
  prefix?: string,
  fieldNames?: {
    children?: string;
    order?: string;
    callback?: (index: string[]) => string;
  }
): (T & Record<string, string>)[] => {
  const {
    children: childrenKey = "children",
    order: orderKey = "order",
    callback,
  } = fieldNames;
  return arr.reduce((total, item, index) => {
    const subArr = item[childrenKey] || [];
    const indexArr = prefix ? [prefix, index + 1] : [index + 1];
    const newIndex = callback
      ? callback(indexArr as string[])
      : indexArr.join("-");
    item[orderKey] = newIndex;
    if (subArr.length) {
      return [
        ...total,
        {
          ...item,
          [childrenKey]: treeArrayOrderProperty(subArr, newIndex, fieldNames),
        },
      ];
    }
    return [...total, item];
  }, []);
};
