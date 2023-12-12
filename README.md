## Array
#### 1.arrayExchange 
描述：数组位置对换  
```
const data = [1,2,3,4,5];
arrayExchange(data, 1, 2) ===> [1,3,2,4,5];
```
#### 2.convertToTree
将数组对象转换成tree树形结构  
```
const data = [
  { parentId: 0, id: 1, name: "顶级组织" },
  { parentId: 1, id: 2, name: "组织1" },
  { parentId: 2, id: 3, name: "组织2" },
]; 
convertToTree(data) ===> [
  {
    parentId: 0,
    id: 1,
    name: "顶级组织",
    children: [
      {
        parentId: 1,
        id: 2,
        name: "组织1",
        children: [{ parentId: 2, id: 3, name: "组织2" }],
      },
    ],
  },
];
```
#### 3.arrayFlat
描述：将tree树形结构转换成铺平的数组对象
```
const data = [
  {
    parentId: 0,
    id: 1,
    name: "顶级组织",
    children: [
      {
        parentId: 1,
        id: 2,
        name: "组织1",
        children: [{ parentId: 2, id: 3, name: "组织2" }],
      },
    ],
  },
];
arrayFlat(data) ===> [
  { parentId: 0, id: 1, name: "顶级组织" },
  { parentId: 1, id: 2, name: "组织1" },
  { parentId: 2, id: 3, name: "组织2" },
];

const dataTwo = [
  {
    parentId: 0,
    id: 1,
    name: "顶级组织",
    children: [
      {
        parentId: 1,
        id: 2,
        name: "组织1",
        children: [{ parentId: 2, id: 3, name: "组织2" }],
      },
    ],
  },
  { parentId: 0, id: 1111, name: "顶级组织2" },
];
arrayFlat(dataTwo) ===> [
  { parentId: 0, id: 1, name: "顶级组织" },
  { parentId: 1, id: 2, name: "组织1" },
  { parentId: 2, id: 3, name: "组织2" },
  { parentId: 0, id: 1111, name: "顶级组织2" },
];
```
#### 4.arraySortKey 
描述：对应sortKey进行数组排序
```
const data = [
  { id: 1, name: "顶级组织" },
  { id: 2, name: "组织1" },
  { id: 3, name: "组织2" },
  { id: 1111, name: "顶级组织2" },
];
arraySortKey(data) ===> [
  { id: 1, name: "顶级组织" },
  { id: 2, name: "组织1" },
  { id: 3, name: "组织2" },
  { id: 1111, name: "顶级组织2" },
];

arraySortKey(data, { order: 'descend' }) ===> [
  { id: 1111, name: "顶级组织2" },
  { id: 3, name: "组织2" },
  { id: 2, name: "组织1" },
  { id: 1, name: "顶级组织" },
];
```
#### 5.pickArrayItem 
描述：取数组某一项，默认取数组最后一项
```
const data = [1, 2, 3, 4, 5]
pickArrayItem(data) ===> 5
pickArrayItem(data, 4) ===> 5
pickArrayItem(data, 5) ===> 5
pickArrayItem(data, -1) ===> 5
pickArrayItem(data, -5) ===> 1
pickArrayItem(data, -6) ===> 1
```
#### 6.arrayChunk 
描述：将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
```
const data = ["a", "b", "c", "d"];
arrayChunk(["a", "b", "c", "d"], 2) ===> [["a", "b"], ["c", "d"]];

arrayChunk(["a", "b", "c", "d"], 3) ===> [["a", "b", "c"], ["d"]];
```
#### 7.arrayCountBy 
描述：创建一个组成对象，key（键）是经过 iteratee（迭代函数） 执行处理collection中每个元素后返回的结果，每个key（键）对应的值是 iteratee（迭代函数）返回该key（键）的次数（注：迭代次数）。
```
countBy([6.1, 4.2, 6.3], Math.floor) ===> { "4": 1, "6": 2 }
countBy(["one", "two", "three"], "length") ===> { "3": 2, "5": 1 }
```
#### 8.arrayFindLast 
描述：遍历 collection（集合）元素，返回 predicate（断言函数）最后一个返回真值的元素及对应下标。
```
const data = [1, 2, 3, 4];
arrayFindLast(data, (n) => n % 2) ===> [3, 2]
arrayFindLast(data, (n) => !(n % 2)) ===> [4, 3]
arrayFindLast(data, (n) => n > 5) ===> [undefined, -1]
```
#### 9.toArray 
描述：转换成数组
```
toArray(1) ===> [1]
toArray({}) ===> [{}]
toArray([1,2,3]) ===> [1,2,3]
toArray(null) ===> []
toArray(undefined) ===> []
```
#### 10.imgArrayTransformString 
描述：常用图片数组转换成字符串  
```
const data = [{ url: "https://1.png" }, { url: "https://2.png" }];
imgArrayTransformString(data) ===> "https://1.png,https://2.png"
imgArrayTransformString(data, '%') ===> "https://1.png%https://2.png"
```
#### 11.pickTreeArray
描述：根据targetId获取树形数组里面的某一项
```
const data = [
  {
    label: 6,
    value: 6,
    children: [
      { 
        label: 60,
        value: 60, 
        children: [
          { 
            label: 600, 
            value: 600 
          },
          { 
            label: 601, 
            value: 601 
          }
        ] 
      },
      {
        label: 61,
        value: 61
      }
    ],
  },
  {
    label: 7,
    value: 7,
    children: [
      { label: 70, value: 70, children: [{ label: 700, value: 700 }] },
    ],
  },
  {
    label: 8,
    value: 8,
    children: [
      { label: 80, value: 80, children: [{ label: 800, value: 800 }] },
    ],
  }
];
pickTreeArray(data, 6) ===> [
  {
    label: 6,
    value: 6,
  },
]

pickTreeArray(data, 60) ===> [
  {
    label: 6,
    value: 6,
    children: [
      { label: 60, value: 60 },
    ],
  },
];

pickTreeArray(data, 600) ===> [
  {
    label: 6,
    value: 6,
    children: [
      { label: 60, value: 60, children: [{ label: 600, value: 600 }] },
    ],
  },
];
```  
#### 12.pickLevelTreeArray
描述：根据targetId获取树形数组某一层级，铺平获取到的层级数据  
```
const data = [
  {
    label: 8,
    value: 8,
    children: [
      { label: 800, value: 800, children: [{ label: 80000, value: 80000 }] },
    ],
  },
];
pickLevelTreeArray(data, 8) ===> [{ label: 8, value: 8 }];

pickLevelTreeArray(data, 800) ===> [
  { label: 8, value: 8 },
  { label: 800, value: 800 },
];

pickLevelTreeArray(data, 80000) ===> [
  { label: 8, value: 8 },
  { label: 800, value: 800 },
  { label: 80000, value: 80000 },
];

pickLevelTreeArray(data, 800, { callback: (item) => item.value }) ===> [8, 800];
```  
#### 13.arrayCombination
描述：数组根据对应某个key进行组合
```
const data = [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }, { uuid: "xxx3", id: 2, name: 333 }];
arrayCombination(data, { key: "id" }) ===> {
  1: [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }],
  2: [{ uuid: "xxx3", id: 2, name: 333 }]
}
arrayCombination(data, { key: "id", returnArray: true }) ===>  [
  ["1", [{ uuid: "xxx1", id: 1, name: 111 }, { uuid: "xxx2", id: 1, name: 222 }]],
  ["2", [{ uuid: "xxx3", id: 2, name: 333 }]
]
```  
#### 14.differenceBy
描述：取两个数组分别对应的交集、并集
```
const data = [
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
```  
#### 15.arrayIntersectionAndUnion
描述：取两个数组分别对应的交集、并集
```
const initParams = [
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
```
#### 16.arrayFilterMap
描述：取两个数组分别对应的交集、并集
```
const data = [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 }, { id: 4, name: 4 }, { id: 5, name: 5 }];
arrayFilterMap(data, [{ key: "id", value: 1 }], { id: "value", name: 'label' }) ===> 
[{ value: 1, label: 1 }]

arrayFilterMap(data, [{ key: "id", value: 1, equalType: "unEqual" }], { id: 'value', name: 'label' }) ===> 
[{ value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }]

arrayFilterMap(data, [{ key: "id", value: 1 }, { key: "name", value: 2, filterType: 'or' }], { id: 'value', name: 'label' }) ===> 
[{ value: 1, label: 1 }, { value: 2, label: 2 }]

arrayFilterMap(data, [{ key: "id", value: 1, equalType: "unEqual" }, { key: "name", value: 1, filterType: 'or' }], { id: 'value', name: 'label' }) ===>
[{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }]

arrayFilterMap(data, [{ value: (item) => item.name === 2 }], { id: 'value', name: 'label' }) ===>
[{ value: 2, label: 2 }]

arrayFilterMap(data, [{ value: (item) => item.name === 2 }], { name: (item) => `${item.id}/${item.name}`, id: 'value' }) ===>
[{ name: '2/2', value: 2 }]

arrayFilterMap(data, [], { name: (item) => `${item.id}/${item.name}`, id: 'value' }) ===>
[{ name: '1/1', value: 1 }, { name: '2/2', value: 2 }, { name: '3/3', value: 3 }, { name: '4/4', value: 4 }, { name: '5/5', value: 5 }]
```
#### 17.treeArrayOrderProperty
描述：树形数组增加层级结构属性，层级结构属性默认order
```
const data = [{ 
  label: 1,
  value: 1, 
  children: [
    { label: 11, value: 11 },
    { label: 12, value: 12 }
  ]
}]
treeArrayOrderProperty(data) ===>
[
  { 
    label: 1, 
    value: 1, 
    order: "1", 
    children: [
      { label: 11, value: 11, order: "1-1" }, 
      { label: 12, value: 12, order: "1-2" }
    ]
  }
]

treeArrayOrderProperty(data, "*") ===>
[
  { 
    label: 1, 
    value: 1, 
    order: "*-1", 
    children: [
      { label: 11, value: 11, order: "*-1-1" }, 
      { label: 12, value: 12, order: "*-1-2" }
    ]
  }
]
```

## Enum
#### 1.enumTransformArray
描述：枚举转数组
```
enum SuitEnum { '非套装','套装' } ===> [
  { label: "非套装", value: 0 },
  { label: "套装", value: 1 },
];

enum TestEnum {'是' = 1, '否' = 0 } ===> [
  { label: "否", value: 0 },
  { label: "是", value: 1 },
];
```

## Object
#### 1.pickObjectField
描述：取对象对应字段
```
const data = { a: { b: { c: 1, e: 0 } } };
pickObjectField(data, "a.b") ===> { c: 1 }
pickObjectField(data, "a.b.c") ===> 1
pickObjectField(data, "a.b.e") ===> 0
```
#### 2.objectTransformArray
描述：对象转数组
```
const data = { 1: "xxx" };
objectTransformArray(data) ===> [{ label: "xxx", value: 1 }]
```
#### 3.isPlainObject
描述：判断是否是object类型
```
const data = { a: 1 };
isPlainObject(data) ===> true

const dataTwo = "11";
isPlainObject(dataTwo) ===> false
```
#### 4.omitObjectSomeKeys
描述：动态去除对象中的属性
```
const data = { a: 1, b: 2, c: 3, d: 4 };
omitObjectKeys(data, "a") ===> { b: 2, c: 3, d: 4 }
omitObjectKeys(data, ["a", "b"]); ===> { c: 3, d: 4 }
```
## String
#### 1.getSearchParams
描述：获取url searchParams数据
#### 2.uuid
描述：生成随机uuid，一般用来作为唯一值
```
uuid() ===> "xxxxxxxxxxx"
```
#### 3.stringTransformImgArr
描述：字符串转换成图片数组
```
const data = "https://1.png,https://2.png";
stringTransformImgArr(data) ===> [
  { url: "https://1.png", uid: "xxx1", status: "done" },
  { url: "https://2.png", uid: "xxx2", status: "done" },
];
```

## Number
#### 1.numberFixed
描述：四舍五入 默认保留1位小数
```
 当前已考虑以下情况
 1、纯整数
 2、小数，小数位不够或者刚好够保留位数
 3、小数，小数位超过保留位数，超过10往前进1，
 toFixed四舍五入不准确
 (0.45).toFixed(1) ===> 0.4
 (3.55).toFixed(1) ===> 3.5

 numberFixed(0.45) ===> 0.5
 numberFixed(3.55) ===> 3.5
```

## element
#### 1.errorScrollIntoView
描述：form验证错误滚动到第一个
#### 2.formErrorScrollTips
描述：常用form错误验证提示和滚动