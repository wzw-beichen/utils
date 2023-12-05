import { pickArrayItem } from "../array";

/**
 * @description 获取url searchParams数据
 * @param url 浏览器url
 */
export const getSearchParams = <T>(url: string): T => {
  const query = pickArrayItem(url.split("?"));
  const strArr = query.split("&");
  const searchParams = {} as T;
  strArr.forEach((itm) => {
    const [key, value] = itm.split("=");
    // 避免无search时
    if (value) {
      searchParams[key] = value;
    }
  });
  return searchParams as T;
};

/**
 * @description 生成随机uuid，一般用来作为唯一值
 * @param radix radix 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。
 * @return string
 */
export const uuid = (radix: number = 36): string => {
  return Math.random().toString(radix).substring(2);
};

/**
 * @description 字符串转换成图片数组
 * @param imgStr 字符串
 * @param separator 字符串分隔符
 * @return ImgItem[] 图片数组
 * @example data = "https://1.png,https://2.png";
 * stringToImgArr(data) ===> [
 * { url: 'https://1.png', uid: 'xxx1', status: 'done' },
 * { url: 'https://2.png', uid: 'xxx2', status: 'done' },
 * ]
 */
export const stringToImgArr = (
  imgStr: string,
  separator: string = ","
): {
  uid: string;
  status: "done";
  url: string;
}[] => {
  if (!imgStr) return [];
  const imgArr = imgStr.split(separator).map((item) => ({
    uid: uuid(),
    status: "done" as const,
    url: item,
  }));
  return imgArr;
};
