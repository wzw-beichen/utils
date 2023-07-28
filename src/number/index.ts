/**
 * @description 四舍五入 默认保留1位小数
 * 当前已考虑以下情况
 * 1、纯整数
 * 2、小数，小数位不够或者刚好够保留位数
 * 3、小数，小数位超过保留位数，超过10往前进1，
 * @example toFixed四舍五入不准确
 * (0.45).toFixed(1) ===> 0.4
 * (3.55).toFixed(1) ===> 3.5
 *
 * numberFixed(0.45) ===> 0.5
 * numberFixed(3.55) ===> 3.5
 */
export const numberFixed = (num?: number, precision: number = 1) => {
  if (typeof num === "number" && num) {
    const numStr = `${num}`;
    const [integer, decimal] = numStr.split(".");
    /** 纯整数 */
    if (decimal?.length) {
      /** padEnd用于长度不够、刚好位数，用0填充
       *  example  num = 1.5  numberFixed(num);
       *  slice用于当用户小数位过多，只截取到保留位数后一位
       */
      const decimalStr = decimal
        .padEnd(precision + 1, "0")
        .slice(0, precision + 1);
      let i = 0;
      const decimalArr = decimalStr.split("");
      const newDecimalStr = decimalArr
        .reduceRight((total, item, index) => {
          /** 保留整数，只要小数点后一位 */
          if (index === decimalArr.length - 1) {
            i = Number(Number(item) >= 5);
            return total;
          }
          /** 加起来等于10，往前进一位 */
          if (Number(item) + i === 10) {
            i = 1;
            total[index] = 0;
            return total;
          }
          total[index] = Number(item) + i;
          i = 0;
          return total;
        }, [] as number[])
        .join("");
      /** 小数位为10，整数位加1 */
      const newInteger = Number(integer) + i;
      const numStr = `${newInteger}.${newDecimalStr}`;
      return Number(numStr);
    }
    return Number(integer);
  }
  return num;
};
