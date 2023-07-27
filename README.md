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
    id: 6,
    label: 6,
    children: [{ id: 600, label: 600, children: [{ id: 60000, label: 6000 }] }],
  },
  {
    id: 7,
    label: 7,
    children: [
      { id: 700, label: 700, children: [{ id: 70000, label: 70000 }] },
    ],
  },
  {
    id: 8,
    label: 8,
    children: [
      { id: 800, label: 800, children: [{ id: 80000, label: 80000 }] },
    ],
  },
  {
    id: 9,
    label: 9,
    children: [
      { id: 900, label: 900, children: [{ id: 90000, label: 90000 }] },
    ],
  },
  {
    id: 10,
    label: 10,
    children: [
      { id: 1000, label: 1000, children: [{ id: 100000, label: 100000 }] },
    ],
  },
];
pickTreeArray(data, 8) ===> [
  {
    id: 8,
    label: 8,
    children: [
      { id: 800, label: 800, children: [{ id: 80000, label: 80000 }] },
    ],
  },
]

pickTreeArray(data, 900) ===> [
  {
    id: 9,
    label: 9,
    children: [
      { id: 900, label: 900, children: [{ id: 90000, label: 90000 }] },
    ],
  },
];

pickTreeArray(data, 100000) ===> [
  {
    id: 10,
    label: 10,
    children: [
      { id: 1000, label: 1000, children: [{ id: 100000, label: 100000 }] },
    ],
  },
];
```  
#### 12.pickLevelTreeArray
描述：根据targetId获取树形数组某一层级，铺平获取到的层级数据  
```
const data = [
  {
    id: 8,
    label: 8,
    children: [
      { id: 800, label: 800, children: [{ id: 80000, label: 80000 }] },
    ],
  },
];
pickLevelTreeArray(data, 8) ===> [{ id: 8, label: 8 }];

pickLevelTreeArray(data, 800) ===> [
  { id: 8, label: 8 },
  { id: 800, label: 800 },
];

pickLevelTreeArray(data, 80000) ===> [
  { id: 8, label: 8 },
  { id: 800, label: 800 },
  { id: 80000, label: 80000 },
];
```  
#### 13.pickLabelValueTreeArray
描述：根据targetId获取树形数组的某一项，铺平获取到的某一项数据
```
const data = [
  {
    id: 6,
    label: 6,
    children: [{ id: 600, label: 600, children: [{ id: 60000, label: 6000 }] }],
  },
  {
    id: 7,
    label: 7,
    children: [
      { id: 700, label: 700, children: [{ id: 70000, label: 70000 }] },
    ],
  },
  {
    id: 8,
    label: 8,
    children: [
      { id: 800, label: 800, children: [{ id: 80000, label: 80000 }] },
    ],
  },
  {
    id: 9,
    label: 9,
    children: [
      { id: 900, label: 900, children: [{ id: 90000, label: 90000 }] },
    ],
  },
  {
    id: 10,
    label: 10,
    children: [
      { id: 1000, label: 1000, children: [{ id: 100000, label: 100000 }] },
    ],
  },
];
pickLabelValueTreeArray(data, 8) ===> [{ id: 8, label: 8 }];

pickLabelValueTreeArray(data, 800) ===> [
  { id: 8, label: 8 },
  { id: 800, label: 800 },
];

pickLabelValueTreeArray(data, 80000) ===> [
  { id: 8, label: 8 },
  { id: 800, label: 800 },
  { id: 80000, label: 80000 },
];
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

## element
#### 1.errorScrollIntoView
描述：form验证错误滚动到第一个
#### 2.formErrorScrollTips
描述：常用form错误验证提示和滚动