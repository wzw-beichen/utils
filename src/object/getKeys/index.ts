import { isObject } from "../isObject";
import { Key } from "../type";

export const getKeys = <Entity = Record<string, any>>(
  entity: Entity,
  withValue: boolean = false
): Key[][] => {
  const entityArr: Key[][] = [];
  const loopKeys = (entity, paths: Key[] = []) => {
    const keys = Object.keys(entity);
    if (!keys.length && paths.length) {
      entityArr.push([...paths, ...(withValue ? [entity] : [])]);
    }
    keys.forEach((key) => {
      const value = entity[key];
      const newPaths = [...paths, key];
      if (isObject(value)) {
        loopKeys(value, newPaths);
      } else {
        entityArr.push([...newPaths, ...(withValue ? [value] : [])]);
      }
    });
  };
  loopKeys(entity);
  return entityArr;
};
