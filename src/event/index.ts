import { isPlainObject } from "../object";
type EventArgs = any[];

/**
 * @description 默认从event获取value
 * @param valuePropName 获取value的key
 * @param args
 * @returns
 */
export const defaultGetValueFormEvent = (
  valuePropName: string,
  ...args: EventArgs
) => {
  const event = args[0];
  if (
    event &&
    event.target &&
    isPlainObject(event.target) &&
    valuePropName in event.target
  ) {
    return (event.target as HTMLInputElement)[valuePropName];
  }
  return event;
};
