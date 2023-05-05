## Array
#### 1.arrayExchange 
描述：数组位置对换  
`const data = [1,2,3,4,5] ===> arrayExchange(data, 1, 2) => [1,3,2,4,5]`
#### 2.convertToTree
将数组对象转换成tree树形结构  
`const data = [{ parentId: 0, id: 1, name: '顶级组织' },{ parentId: 1, id: 2, name: '组织1' }, { parentId: 2, id: 3, name: '组织2' }]
===> convertToTree(data) => [{ parentId: 0, id: 1, name: '顶级组织', children: [{ parentId: 1, id: 2, name: '组织1', children: [{ parentId: 2, id: 3, name: '组织2' }]}]}]`
#### 3.arrayFlat
描述：将tree树形结构转换成铺平的数组对象
#### 4.arraySortKey 
描述：对应sortKey进行数组排序
#### 5.pickArrayItem 
描述：取数组某一项，默认取数组最后一项
#### 6.arrayChunk 
描述：将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
#### 7.arrayCountBy 
描述：创建一个组成对象，key（键）是经过 iteratee（迭代函数） 执行处理collection中每个元素后返回的结果，每个key（键）对应的值是 iteratee（迭代函数）返回该key（键）的次数（注：迭代次数）。
#### 8.arrayFindLast 
描述：遍历 collection（集合）元素，返回 predicate（断言函数）最后一个返回真值的元素。
#### 9.toArray 
描述：转换成数组
#### 10.imgArrayTransformString 
描述：常用图片数组转换成字符串  
## Enum
#### 1.enumTransformArray
描述：枚举转数组
## Object
#### 1.pickObjectField
描述：取对象对应字段
#### 2.objectTransformArray
描述：对象转数组
#### 3.isPlainObject
描述：判断是否是object类型
#### 4.omitObjectSomeKeys
描述：动态去除对象中的属性
## String
#### 1.getSearchParams
描述：获取url searchParams数据
#### 2.stringTransformImgArr
描述：字符串转换成图片数组
## element
#### 1.errorScrollIntoView
描述：form验证错误滚动到第一个
#### 2.formErrorScrollTips
描述：常用form错误验证提示和滚动